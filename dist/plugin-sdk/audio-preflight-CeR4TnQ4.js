import "./run-with-concurrency-D-svGtMx.js";
import "./plugins-Mo61qfU5.js";
import "./accounts-B6yI154p.js";
import "./model-auth-yv4xiRkc.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BNcYKvVz.js";
import "./paths-CyBu6eBm.js";
import "./github-copilot-token-CYOZhiYW.js";
import "./thinking-BPjNSaMU.js";
import "./image-ops-Z9O65Hqm.js";
import "./pi-embedded-helpers-CQkE5_he.js";
import "./accounts-B_I7Hwpe.js";
import "./paths-DjI5HLt_.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-YFLxOp3_.js";
import "./image-BO2NDw_1.js";
import "./chrome-B_YTbRHd.js";
import "./skills-CgXAZTJ8.js";
import "./path-alias-guards-DX_NeuO6.js";
import "./proxy-env-il2QzUUT.js";
import "./redact-YQ_GYKfJ.js";
import "./errors-CWua5dMz.js";
import "./fs-safe-DQseOlaW.js";
import "./store-DjY7DJXM.js";
import "./tool-images-CzSqdLPI.js";
import "./fetch-guard-CeIf_hEp.js";
import "./api-key-rotation-DJtYFagn.js";
import "./local-roots-DPGSBEYs.js";
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
