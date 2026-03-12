import "./run-with-concurrency-ChSRxwwI.js";
import "./paths-DinMprTu.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BK29I_K-.js";
import "./accounts-DHiWET7d.js";
import "./thinking-C9t7woJA.js";
import "./model-auth-DUY3Nyzg.js";
import "./plugins-Dy9-rA2y.js";
import "./accounts-BZyJOSg0.js";
import "./github-copilot-token-Cpk7my6q.js";
import "./ssrf-c3XC8YXa.js";
import "./fetch-guard-B5RGsAls.js";
import "./message-channel-Ob4-ESqR.js";
import "./path-alias-guards-D6BITtID.js";
import "./fs-safe-DLHV_Yl_.js";
import "./store-Dxq2S8Nq.js";
import "./local-roots-sE3m93Ml.js";
import "./pi-embedded-helpers-aCgeBcZw.js";
import "./paths-BGRTPW62.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-BWMG4C41.js";
import "./image-svQSU3Gb.js";
import "./chrome-CWT_tn90.js";
import "./skills-DMJ5QI7f.js";
import "./redact-NlQpW48P.js";
import "./errors-CYUA0zwn.js";
import "./tool-images-CeL8wgEC.js";
import "./api-key-rotation-D4Z1n8es.js";
import "./proxy-fetch-DcJIUETR.js";
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
