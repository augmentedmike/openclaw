import "./run-with-concurrency-B4gc6qHs.js";
import "./config-bR-cXt8z.js";
import "./logger-C3PYuWHy.js";
import "./paths-D6tDENa_.js";
import { i as resolveWhatsAppAccount } from "./accounts-5Cm8G0Sh.js";
import "./plugins-Dt_FXgLz.js";
import { f as readStringParam, l as readReactionParams, o as jsonResult, r as createActionGate, t as ToolAuthorizationError } from "./common-sQVOj6F1.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-DZdy2yCd.js";
import "./image-ops-BjolU_rj.js";
import "./github-copilot-token-xlpfBCoP.js";
import "./path-alias-guards-B1a1nWHa.js";
import "./proxy-env-UPc5OeNw.js";
import "./fs-safe-CmlqHapC.js";
import "./tool-images-YSvh1KWr.js";
import "./fetch-guard-Cwp4umzk.js";
import "./local-roots-CcifrjJn.js";
import "./ir-vYJGxWnG.js";
import "./render-7C7EDC8_.js";
import "./tables-C62-mYS-.js";
import { r as sendReactionWhatsApp } from "./outbound-0pInfukq.js";
//#region src/agents/tools/whatsapp-target-auth.ts
function resolveAuthorizedWhatsAppOutboundTarget(params) {
	const account = resolveWhatsAppAccount({
		cfg: params.cfg,
		accountId: params.accountId
	});
	const resolution = resolveWhatsAppOutboundTarget({
		to: params.chatJid,
		allowFrom: account.allowFrom ?? [],
		mode: "implicit"
	});
	if (!resolution.ok) throw new ToolAuthorizationError(`WhatsApp ${params.actionLabel} blocked: chatJid "${params.chatJid}" is not in the configured allowFrom list for account "${account.accountId}".`);
	return {
		to: resolution.to,
		accountId: account.accountId
	};
}
//#endregion
//#region src/agents/tools/whatsapp-actions.ts
async function handleWhatsAppAction(params, cfg) {
	const action = readStringParam(params, "action", { required: true });
	const isActionEnabled = createActionGate(cfg.channels?.whatsapp?.actions);
	if (action === "react") {
		if (!isActionEnabled("reactions")) throw new Error("WhatsApp reactions are disabled.");
		const chatJid = readStringParam(params, "chatJid", { required: true });
		const messageId = readStringParam(params, "messageId", { required: true });
		const { emoji, remove, isEmpty } = readReactionParams(params, { removeErrorMessage: "Emoji is required to remove a WhatsApp reaction." });
		const participant = readStringParam(params, "participant");
		const accountId = readStringParam(params, "accountId");
		const fromMeRaw = params.fromMe;
		const fromMe = typeof fromMeRaw === "boolean" ? fromMeRaw : void 0;
		const resolved = resolveAuthorizedWhatsAppOutboundTarget({
			cfg,
			chatJid,
			accountId,
			actionLabel: "reaction"
		});
		const resolvedEmoji = remove ? "" : emoji;
		await sendReactionWhatsApp(resolved.to, messageId, resolvedEmoji, {
			verbose: false,
			fromMe,
			participant: participant ?? void 0,
			accountId: resolved.accountId
		});
		if (!remove && !isEmpty) return jsonResult({
			ok: true,
			added: emoji
		});
		return jsonResult({
			ok: true,
			removed: true
		});
	}
	throw new Error(`Unsupported WhatsApp action: ${action}`);
}
//#endregion
export { handleWhatsAppAction };
