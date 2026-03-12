import "./run-with-concurrency-COe6h7d7.js";
import "./paths-hfkBoC7i.js";
import { d as logVerbose, m as shouldLogVerbose } from "./subsystem-ruU4fm6Y.js";
import "./workspace-DY0eDzNF.js";
import "./logger-D5-2dTJM.js";
import "./model-selection-CIU6CwkT.js";
import "./github-copilot-token-CQmATy5E.js";
import "./legacy-names-qEH4CUIG.js";
import "./thinking-CekxowXE.js";
import "./plugins-rpoc4CQ9.js";
import "./accounts-D5eCuBPJ.js";
import "./accounts-DzDnkxkx.js";
import "./image-ops-6q3RpL6d.js";
import "./pi-embedded-helpers-Ds-NcQ0i.js";
import "./chrome-CUSMVLRf.js";
import "./frontmatter-DJA9VqLz.js";
import "./skills-BHOB5peM.js";
import "./path-alias-guards-CMrnyY6K.js";
import "./proxy-env-BsF0ekPs.js";
import "./redact-BM2flUn0.js";
import "./errors-BGYTuaiN.js";
import "./fs-safe-DahuJuB3.js";
import "./store-DBGRqmhv.js";
import "./paths-BYQHT94K.js";
import "./tool-images-l6KID5Et.js";
import "./image-DoIA6Dlu.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, v as isAudioAttachment } from "./audio-transcription-runner-B3d1CZni.js";
import "./fetch-DOgJTU1l.js";
import "./fetch-guard-CS95LO0t.js";
import "./api-key-rotation-Dq8kwGfv.js";
import "./proxy-fetch-DXhDFnX7.js";
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
