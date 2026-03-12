import "./run-with-concurrency-B4gc6qHs.js";
import "./config-bR-cXt8z.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-C3PYuWHy.js";
import "./paths-D6tDENa_.js";
import "./accounts-5Cm8G0Sh.js";
import "./plugins-Dt_FXgLz.js";
import "./thinking-B8ew8log.js";
import "./image-ops-BjolU_rj.js";
import "./pi-embedded-helpers-C9v3H25j.js";
import "./accounts-Cu-W1rXv.js";
import "./github-copilot-token-xlpfBCoP.js";
import "./paths-B-XukPIr.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-DAWEQn3z.js";
import "./image-BehYyYcj.js";
import "./chrome-B8VmC1FI.js";
import "./skills-C9Vd7mJ9.js";
import "./path-alias-guards-B1a1nWHa.js";
import "./proxy-env-UPc5OeNw.js";
import "./redact-CqYFeSop.js";
import "./errors-D-T-PGS3.js";
import "./fs-safe-CmlqHapC.js";
import "./store-Byz_-Vjk.js";
import "./tool-images-YSvh1KWr.js";
import "./fetch-guard-Cwp4umzk.js";
import "./api-key-rotation-DA57CTmy.js";
import "./local-roots-CcifrjJn.js";
import "./proxy-fetch-CZyuc1VO.js";
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
