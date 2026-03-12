import "./message-channel-DAoAqPuX.js";
import { B as shouldLogVerbose, R as logVerbose } from "./utils-C0UD7T2g.js";
import "./paths-Dmn791zP.js";
import "./tool-images-B4qGf9xQ.js";
import "./run-with-concurrency-C21l-3oD.js";
import "./plugins-DlF5uidn.js";
import "./accounts-Cv7tbhnv.js";
import "./model-auth-gdEyA2v2.js";
import "./github-copilot-token-B_Z-mAek.js";
import "./thinking-DvhekZzd.js";
import "./ssrf-DWj_o3mR.js";
import "./fetch-guard-ONAWhtPS.js";
import "./pi-embedded-helpers-BytVDP31.js";
import "./accounts-DKGQl-B7.js";
import "./paths-CLtInYId.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-ba7oGXen.js";
import "./image-BgSFHAQa.js";
import "./chrome-vUfCG7XG.js";
import "./skills-CIFfJMqD.js";
import "./path-alias-guards-Cmf_vPa7.js";
import "./redact-BbbzluSP.js";
import "./errors-BNr5ebO-.js";
import "./fs-safe-C4x6-x5H.js";
import "./store-DLkcQcsz.js";
import "./api-key-rotation-BQjJDtC6.js";
import "./local-roots-CeIMARXd.js";
import "./proxy-fetch-Brlqw0JN.js";
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
