import "./run-with-concurrency-ChSRxwwI.js";
import "./paths-DinMprTu.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BK29I_K-.js";
import "./model-selection-DWnHEjCv.js";
import "./github-copilot-token-BLpWpVXm.js";
import "./thinking-Dgwubp0B.js";
import "./plugins-DVxQcCS_.js";
import "./accounts-C4kmgW5Q.js";
import "./accounts-0Afcjruv.js";
import "./image-ops-C2Xm0ho3.js";
import "./pi-embedded-helpers-8uG3ukMm.js";
import "./chrome-DnnGFWdq.js";
import "./skills-DlJs_isH.js";
import "./path-alias-guards-DGAdEw2c.js";
import "./proxy-env-A4euvNSx.js";
import "./redact-5Z8ZYwAO.js";
import "./errors-CB6JhDB9.js";
import "./fs-safe-B3D2SheX.js";
import "./store-BTFlrWHZ.js";
import "./paths-CqWoXxBf.js";
import "./tool-images-CMMptsko.js";
import "./image-E38Mr07O.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, v as isAudioAttachment } from "./audio-transcription-runner-M66YYNns.js";
import "./fetch-OqafS65q.js";
import "./fetch-guard-Ck-R3vA4.js";
import "./api-key-rotation-CHQjCVr_.js";
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
