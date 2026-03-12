import "./run-with-concurrency-BDwmkH2i.js";
import "./plugins-C-3ocidx.js";
import "./model-auth-B3mv6fc8.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BNcYKvVz.js";
import "./paths-CyBu6eBm.js";
import "./github-copilot-token-CYOZhiYW.js";
import "./thinking-CZ3oMcHx.js";
import "./accounts-Cq5rTdvY.js";
import "./ssrf-K87Fcr3A.js";
import "./fetch-guard-PJ7pnm7G.js";
import "./image-ops-CajLc2Dk.js";
import "./pi-embedded-helpers-Jw4BkttN.js";
import "./accounts-D254JxGh.js";
import "./paths-CfKKTIrN.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-C687OKev.js";
import "./image-B1toqjEa.js";
import "./chrome-DuMXTKyf.js";
import "./skills-CYFCiHLm.js";
import "./path-alias-guards-1mrnotvp.js";
import "./redact-CGzD43LQ.js";
import "./errors-By4SIF2p.js";
import "./fs-safe-CO43ltnZ.js";
import "./store-Cja_uR0i.js";
import "./tool-images-BseS-MeV.js";
import "./api-key-rotation-pMmL2xS8.js";
import "./local-roots-B4aNeAyc.js";
import "./proxy-fetch-sdaPsXr5.js";
//#region src/media-understanding/audio-preflight.ts
/**
* Transcribes the first audio attachment BEFORE mention checking.
* This allows voice notes to be processed in group chats with requireMention: true.
* Returns the transcript or undefined if transcription fails or no audio is found.
*/
async function transcribeFirstAudio(params) {
	const { ctx, cfg } = params;
	const audioConfig = cfg.tools?.media?.audio;
	if (!audioConfig || audioConfig.enabled === false) return;
	const attachments = normalizeMediaAttachments(ctx);
	if (!attachments || attachments.length === 0) return;
	const firstAudio = attachments.find((att) => att && isAudioAttachment(att) && !att.alreadyTranscribed);
	if (!firstAudio) return;
	if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribing attachment ${firstAudio.index} for mention check`);
	try {
		const { transcript } = await runAudioTranscription({
			ctx,
			cfg,
			attachments,
			agentDir: params.agentDir,
			providers: params.providers,
			activeModel: params.activeModel,
			localPathRoots: resolveMediaAttachmentLocalRoots({
				cfg,
				ctx
			})
		});
		if (!transcript) return;
		firstAudio.alreadyTranscribed = true;
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribed ${transcript.length} chars from attachment ${firstAudio.index}`);
		return transcript;
	} catch (err) {
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcription failed: ${String(err)}`);
		return;
	}
}
//#endregion
export { transcribeFirstAudio };
