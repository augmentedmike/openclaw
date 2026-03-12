import { w as shouldLogVerbose, x as logVerbose } from "./subsystem-BruFJSKI.js";
import "./paths-BfR2LXbA.js";
import "./boolean-BHdNsbzF.js";
import "./auth-profiles-CNmVtedA.js";
import "./agent-scope-BKFTsQIT.js";
import "./utils-BnJoR_rb.js";
import "./boundary-file-read-CcBHg_z-.js";
import "./logger-C0JizASh.js";
import "./exec-BtIQ4l7N.js";
import "./github-copilot-token-CcBrBN3h.js";
import "./host-env-security-blJbxyQo.js";
import "./version-Bxx5bg6l.js";
import "./registry-H8qQ4Zvb.js";
import "./manifest-registry-DmpKzhbf.js";
import "./dock-oSaXELei.js";
import "./models-config-DrRYMoob.js";
import "./plugins-D6gyItzg.js";
import "./accounts-CereXX3C.js";
import "./channel-config-helpers-CE7PnKj-.js";
import "./accounts-DoF4wStd.js";
import "./image-ops-CdcrmTRQ.js";
import "./message-channel-BYwx41Q3.js";
import "./pi-embedded-helpers-C-i_hXkW.js";
import "./sandbox-Dfjmm1C-.js";
import "./tool-catalog-DAnzECvM.js";
import "./chrome-BS6eqJFC.js";
import "./tailscale-CdDpIDlU.js";
import "./tailnet-Q1qQTAB5.js";
import "./ws-31_ycKdn.js";
import "./auth-B2vIWcNh.js";
import "./credentials-CLFFYOLF.js";
import "./resolve-configured-secret-input-string-DwB1jLZf.js";
import "./server-context-BQ3TyaVp.js";
import "./frontmatter-B5Xx_5Cp.js";
import "./env-overrides-CCaWQmrh.js";
import "./path-alias-guards-2B2VwR9Z.js";
import "./skills-VNPuFaRm.js";
import "./paths-BLBkuJsj.js";
import "./proxy-env-CICc8epU.js";
import "./redact-jk1akigs.js";
import "./errors-BVPzyAHI.js";
import "./fs-safe-dZ_Mh1m9.js";
import "./store-D1j3i0PL.js";
import "./ports-5WYlFx4v.js";
import "./trash-CajfTDn6.js";
import "./server-middleware-BqJvRoYr.js";
import "./sessions-B4JU7_e2.js";
import "./paths-D3cXuvcv.js";
import "./chat-envelope-Ba8wEdTK.js";
import "./tool-images-DgVuzsMZ.js";
import "./thinking-CHrWXrB4.js";
import "./model-catalog-B3SEVKTP.js";
import "./fetch-jE_tIA0G.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, y as isAudioAttachment } from "./audio-transcription-runner-BrDYEyPd.js";
import "./fetch-guard-BmDheOGp.js";
import "./image-GyYxGR1J.js";
import "./tool-display-BcbAPaJF.js";
import "./api-key-rotation-oNW4a4o-.js";
import "./proxy-fetch-7CaoZgu1.js";
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
