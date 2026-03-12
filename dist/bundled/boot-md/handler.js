import { l as resolveAgentWorkspaceDir, r as listAgentIds } from "../../run-with-concurrency-COe6h7d7.js";
import "../../paths-hfkBoC7i.js";
import { a as defaultRuntime, t as createSubsystemLogger } from "../../subsystem-ruU4fm6Y.js";
import { B as resolveAgentIdFromSessionKey } from "../../workspace-DY0eDzNF.js";
import "../../logger-D5-2dTJM.js";
import "../../model-selection-CIU6CwkT.js";
import "../../github-copilot-token-CQmATy5E.js";
import { a as isGatewayStartupEvent } from "../../legacy-names-qEH4CUIG.js";
import "../../thinking-CekxowXE.js";
import { n as SILENT_REPLY_TOKEN } from "../../tokens-CxlE9Oju.js";
import { o as agentCommand, s as createDefaultDeps } from "../../pi-embedded-CgvPlTre.js";
import "../../plugins-rpoc4CQ9.js";
import "../../accounts-D5eCuBPJ.js";
import "../../send-4xDa1u5T.js";
import "../../send-CACKStKd.js";
import "../../deliver-B36Uuc0C.js";
import "../../diagnostic-Sqe0u4rc.js";
import "../../accounts-DzDnkxkx.js";
import "../../image-ops-6q3RpL6d.js";
import "../../send-BJxNnRRy.js";
import "../../pi-model-discovery-CTHCriuX.js";
import { Dt as resolveAgentMainSessionKey, W as loadSessionStore, Y as updateSessionStore, kt as resolveMainSessionKey } from "../../pi-embedded-helpers-Ds-NcQ0i.js";
import "../../chrome-CUSMVLRf.js";
import "../../frontmatter-DJA9VqLz.js";
import "../../skills-BHOB5peM.js";
import "../../path-alias-guards-CMrnyY6K.js";
import "../../proxy-env-BsF0ekPs.js";
import "../../redact-BM2flUn0.js";
import "../../errors-BGYTuaiN.js";
import "../../fs-safe-DahuJuB3.js";
import "../../store-DBGRqmhv.js";
import { s as resolveStorePath } from "../../paths-BYQHT94K.js";
import "../../tool-images-l6KID5Et.js";
import "../../image-DoIA6Dlu.js";
import "../../audio-transcription-runner-B3d1CZni.js";
import "../../fetch-DOgJTU1l.js";
import "../../fetch-guard-CS95LO0t.js";
import "../../api-key-rotation-Dq8kwGfv.js";
import "../../proxy-fetch-DXhDFnX7.js";
import "../../ir-C1gzun_P.js";
import "../../render-7C7EDC8_.js";
import "../../target-errors-BZTFJZ5F.js";
import "../../commands-registry-GP2X0iK4.js";
import "../../skill-commands-BiLrP7Dn.js";
import "../../fetch-CONQGbzL.js";
import "../../channel-activity-C0er3rZF.js";
import "../../tables-ChlpI3jw.js";
import "../../send-CoFjiBXO.js";
import "../../outbound-attachment-CR-wizsI.js";
import "../../send-B3KXlmso.js";
import "../../proxy-o7sro0Y0.js";
import "../../manager-VUwr7r39.js";
import "../../query-expansion-B5XZQUXp.js";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
//#region src/gateway/boot.ts
function generateBootSessionId() {
	return `boot-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")}-${crypto.randomUUID().slice(0, 8)}`;
}
const log$1 = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function buildBootPrompt(content) {
	return [
		"You are running a boot check. Follow BOOT.md instructions exactly.",
		"",
		"BOOT.md:",
		content,
		"",
		"If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
		"Use the `target` field (not `to`) for message tool destinations.",
		`After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
		`If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`
	].join("\n");
}
async function loadBootFile(workspaceDir) {
	const bootPath = path.join(workspaceDir, BOOT_FILENAME);
	try {
		const trimmed = (await fs.readFile(bootPath, "utf-8")).trim();
		if (!trimmed) return { status: "empty" };
		return {
			status: "ok",
			content: trimmed
		};
	} catch (err) {
		if (err.code === "ENOENT") return { status: "missing" };
		throw err;
	}
}
function snapshotMainSessionMapping(params) {
	const agentId = resolveAgentIdFromSessionKey(params.sessionKey);
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId });
	try {
		const entry = loadSessionStore(storePath, { skipCache: true })[params.sessionKey];
		if (!entry) return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: false
		};
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: true,
			entry: structuredClone(entry)
		};
	} catch (err) {
		log$1.debug("boot: could not snapshot main session mapping", {
			sessionKey: params.sessionKey,
			error: String(err)
		});
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: false,
			hadEntry: false
		};
	}
}
async function restoreMainSessionMapping(snapshot) {
	if (!snapshot.canRestore) return;
	try {
		await updateSessionStore(snapshot.storePath, (store) => {
			if (snapshot.hadEntry && snapshot.entry) {
				store[snapshot.sessionKey] = snapshot.entry;
				return;
			}
			delete store[snapshot.sessionKey];
		}, { activeSessionKey: snapshot.sessionKey });
		return;
	} catch (err) {
		return err instanceof Error ? err.message : String(err);
	}
}
async function runBootOnce(params) {
	const bootRuntime = {
		log: () => {},
		error: (message) => log$1.error(String(message)),
		exit: defaultRuntime.exit
	};
	let result;
	try {
		result = await loadBootFile(params.workspaceDir);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
		return {
			status: "failed",
			reason: message
		};
	}
	if (result.status === "missing" || result.status === "empty") return {
		status: "skipped",
		reason: result.status
	};
	const sessionKey = params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg);
	const message = buildBootPrompt(result.content ?? "");
	const sessionId = generateBootSessionId();
	const mappingSnapshot = snapshotMainSessionMapping({
		cfg: params.cfg,
		sessionKey
	});
	let agentFailure;
	try {
		await agentCommand({
			message,
			sessionKey,
			sessionId,
			deliver: false,
			senderIsOwner: true
		}, bootRuntime, params.deps);
	} catch (err) {
		agentFailure = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: agent run failed: ${agentFailure}`);
	}
	const mappingRestoreFailure = await restoreMainSessionMapping(mappingSnapshot);
	if (mappingRestoreFailure) log$1.error(`boot: failed to restore main session mapping: ${mappingRestoreFailure}`);
	if (!agentFailure && !mappingRestoreFailure) return { status: "ran" };
	return {
		status: "failed",
		reason: [agentFailure ? `agent run failed: ${agentFailure}` : void 0, mappingRestoreFailure ? `mapping restore failed: ${mappingRestoreFailure}` : void 0].filter((part) => Boolean(part)).join("; ")
	};
}
//#endregion
//#region src/hooks/bundled/boot-md/handler.ts
const log = createSubsystemLogger("hooks/boot-md");
const runBootChecklist = async (event) => {
	if (!isGatewayStartupEvent(event)) return;
	if (!event.context.cfg) return;
	const cfg = event.context.cfg;
	const deps = event.context.deps ?? createDefaultDeps();
	const agentIds = listAgentIds(cfg);
	for (const agentId of agentIds) {
		const workspaceDir = resolveAgentWorkspaceDir(cfg, agentId);
		const result = await runBootOnce({
			cfg,
			deps,
			workspaceDir,
			agentId
		});
		if (result.status === "failed") {
			log.warn("boot-md failed for agent startup run", {
				agentId,
				workspaceDir,
				reason: result.reason
			});
			continue;
		}
		if (result.status === "skipped") log.debug("boot-md skipped for agent startup run", {
			agentId,
			workspaceDir,
			reason: result.reason
		});
	}
};
//#endregion
export { runBootChecklist as default };
