import "./paths-BJV7vkaX.js";
import { w as shouldLogVerbose, x as logVerbose } from "./subsystem-BAQ2m6Js.js";
import "./utils-B_PMBV44.js";
import "./thinking-BYwvlJ3S.js";
import "./agent-scope-Cbtc4cHx.js";
import "./openclaw-root-DrFjwUcG.js";
import "./logger-qYJxsCRn.js";
import "./exec-SVcQfmh4.js";
import "./model-selection-9r_l_jO9.js";
import "./github-copilot-token-D37fjdwy.js";
import "./boolean-CJxfhBkG.js";
import "./env-BKK2pChy.js";
import "./host-env-security-3AOqVC6Z.js";
import "./registry-BYgG14tL.js";
import "./manifest-registry-BCnnVyU8.js";
import "./dock-BtmSyWtK.js";
import "./message-channel-BNbH-Xir.js";
import "./plugins-yg1pTqjZ.js";
import "./sessions-BaTxBens.js";
import { d as isAudioAttachment, i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription } from "./audio-transcription-runner-CVmAjXi9.js";
import "./image-B_eZLCcu.js";
import "./models-config-BS9OuQjQ.js";
import "./pi-embedded-helpers-B1-0aTcl.js";
import "./sandbox-CQhBK3oP.js";
import "./tool-catalog-Dm7UDWav.js";
import "./chrome-Ctzy35UA.js";
import "./tailscale-8Hg9w-Si.js";
import "./tailnet-Dgn5MUCj.js";
import "./ws-9b__y0UM.js";
import "./auth-DSQKePpR.js";
import "./credentials-BwEqaAZD.js";
import "./resolve-configured-secret-input-string-CJS9XNqN.js";
import "./server-context-BbBcLl8N.js";
import "./frontmatter-NDnrpxIv.js";
import "./env-overrides-BJKwHtgF.js";
import "./path-alias-guards-WL7vop6P.js";
import "./skills-BabkNMfr.js";
import "./paths-Cv7mB3kX.js";
import "./proxy-env-CIMCkGtq.js";
import "./redact-SPQ0OfPI.js";
import "./errors-pZWEjkX3.js";
import "./fs-safe-B5DZpzrx.js";
import "./image-ops-CzEcs72x.js";
import "./store-DqUvFkgx.js";
import "./ports-D-ujPtCC.js";
import "./trash-V27fl7-8.js";
import "./server-middleware-DMfviPq4.js";
import "./accounts-DCagQgBc.js";
import "./channel-config-helpers-D8JM2cgl.js";
import "./accounts-DXzA7u8r.js";
import "./paths-BXRmsWer.js";
import "./chat-envelope-BkySjpPY.js";
import "./tool-images-BVyUsytG.js";
import "./tool-display-CfWjGi3o.js";
import "./fetch-guard-BoA8lbsc.js";
import "./api-key-rotation-BpA1t27I.js";
import "./local-roots-C2tAxN3M.js";
import "./model-catalog-shDq4Nud.js";
import "./proxy-fetch-DNYiw0-b.js";
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
