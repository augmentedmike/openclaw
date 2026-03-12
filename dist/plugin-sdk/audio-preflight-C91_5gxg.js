import "./run-with-concurrency-BYfj5fuC.js";
import "./accounts-BdEP6OJN.js";
import "./paths-eFexkPEh.js";
import "./github-copilot-token-Cxf8QYZb.js";
import "./config-BepKzj02.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BvBD-Tss.js";
import "./thinking-C87EQdYj.js";
import "./image-ops-B0DVP62Z.js";
import "./pi-embedded-helpers-DUd8TQzG.js";
import "./plugins-BRropv2j.js";
import "./accounts-DXalqdqn.js";
import "./paths-Bl-XsUtT.js";
import "./redact-Dj56eRJL.js";
import "./errors-Cxp10Ayv.js";
import "./path-alias-guards-BD9ojW0E.js";
import "./fs-safe-DLJrROza.js";
import "./ssrf-DE7KKLx5.js";
import "./fetch-guard-CxqerVj8.js";
import "./local-roots-HMUYvCKK.js";
import "./tool-images-DfqzNwy6.js";
import { i as normalizeMediaAttachments, m as isAudioAttachment, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription } from "./audio-transcription-runner-2dTbTXt7.js";
import "./image-y-vyaAMV.js";
import "./chrome-CLesXWUD.js";
import "./skills-WOKIAWfy.js";
import "./store-DslCGRui.js";
import "./api-key-rotation-C1wowRrZ.js";
import "./proxy-fetch-DX9HTSpC.js";
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
