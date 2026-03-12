import "./paths-BJV7vkaX.js";
import { t as createSubsystemLogger } from "./subsystem-BAQ2m6Js.js";
import "./utils-B_PMBV44.js";
import "./thinking-BYwvlJ3S.js";
import { S as loadOpenClawPlugins } from "./reply-C1MNr-_5.js";
import { d as resolveAgentWorkspaceDir, f as resolveDefaultAgentId } from "./agent-scope-Cbtc4cHx.js";
import "./openclaw-root-DrFjwUcG.js";
import "./logger-qYJxsCRn.js";
import "./exec-SVcQfmh4.js";
import { rn as loadConfig } from "./model-selection-9r_l_jO9.js";
import "./github-copilot-token-D37fjdwy.js";
import "./boolean-CJxfhBkG.js";
import "./env-BKK2pChy.js";
import "./host-env-security-3AOqVC6Z.js";
import "./registry-BYgG14tL.js";
import "./manifest-registry-BCnnVyU8.js";
import "./dock-BtmSyWtK.js";
import "./message-channel-BNbH-Xir.js";
import "./send-C160fhtj.js";
import "./plugins-yg1pTqjZ.js";
import "./sessions-BaTxBens.js";
import "./audio-transcription-runner-CVmAjXi9.js";
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
import "./send-CJFELrFR.js";
import "./paths-BXRmsWer.js";
import "./chat-envelope-BkySjpPY.js";
import "./tool-images-BVyUsytG.js";
import "./tool-display-CfWjGi3o.js";
import "./fetch-guard-BoA8lbsc.js";
import "./api-key-rotation-BpA1t27I.js";
import "./local-roots-C2tAxN3M.js";
import "./model-catalog-shDq4Nud.js";
import "./proxy-fetch-DNYiw0-b.js";
import "./tokens-jQvQpJuA.js";
import "./deliver-Bse_sxIE.js";
import "./commands-xJFiUB9b.js";
import "./commands-registry-CTLdhP2w.js";
import "./call-eIv48HMT.js";
import "./pairing-token-CYfrO-Yo.js";
import "./send-CdfW6qpY.js";
import "./pi-model-discovery-Bq3pk7x4.js";
import "./ir-D1nyYViq.js";
import "./render-DW1ufaCx.js";
import "./target-errors-AqvJ7isg.js";
import "./with-timeout-CIwq538s.js";
import "./diagnostic-DGvDmIQV.js";
import "./exec-approvals-allowlist-DarYmpVc.js";
import "./exec-safe-bin-runtime-policy-BzAtCo4N.js";
import "./exec-approvals-DODENM6Z.js";
import "./nodes-screen-ClouIxHE.js";
import "./restart-Cvp8dq-I.js";
import "./system-run-command-gU1AtdbF.js";
import "./runtime-lifecycle-CHpkm7l-.js";
import "./stagger-Bg3n7FlQ.js";
import "./channel-selection-ClluDNVu.js";
import "./plugin-auto-enable-ClfsYviW.js";
import "./send-DkXZhyK1.js";
import "./outbound-attachment-BD75pb9A.js";
import "./fetch-CRD8Jhcq.js";
import "./delivery-queue-Bdmrf3y0.js";
import "./send-5Dqbw-GU.js";
import "./pairing-store-DHtby4Os.js";
import "./session-cost-usage-D8S-fJa3.js";
import "./read-only-account-inspect-CicWAxtQ.js";
import "./sqlite-CDn-vI8J.js";
import "./channel-activity-DFUgd1j_.js";
import "./tables-F3myexoV.js";
import "./proxy-CRODgiWq.js";
import "./timeouts-DeXgc5B0.js";
import "./skill-commands-DFWVCqnh.js";
import "./workspace-dirs-DFN7iOGs.js";
import "./runtime-config-collectors-U-dOZBZd.js";
import "./command-secret-targets-Byc9IRa6.js";
import "./connection-auth-BKVAhhv6.js";
import "./onboard-helpers-CMokEY54.js";
import "./prompt-style-yjQNUNlK.js";
import "./pairing-labels-Bwj7rCCS.js";
import "./memory-cli-Dz2LM3b5.js";
import "./manager-BDNGw-nJ.js";
import "./links-aksHGt07.js";
import "./cli-utils-B5O9_EBZ.js";
import "./help-format-CkNH6eoG.js";
import "./progress-CSyIpZoS.js";
//#region src/plugins/cli.ts
const log = createSubsystemLogger("plugins");
function registerPluginCliCommands(program, cfg) {
	const config = cfg ?? loadConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	const logger = {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
	const registry = loadOpenClawPlugins({
		config,
		workspaceDir,
		logger
	});
	const existingCommands = new Set(program.commands.map((cmd) => cmd.name()));
	for (const entry of registry.cliRegistrars) {
		if (entry.commands.length > 0) {
			const overlaps = entry.commands.filter((command) => existingCommands.has(command));
			if (overlaps.length > 0) {
				log.debug(`plugin CLI register skipped (${entry.pluginId}): command already registered (${overlaps.join(", ")})`);
				continue;
			}
		}
		try {
			const result = entry.register({
				program,
				config,
				workspaceDir,
				logger
			});
			if (result && typeof result.then === "function") result.catch((err) => {
				log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
			});
			for (const command of entry.commands) existingCommands.add(command);
		} catch (err) {
			log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
		}
	}
}
//#endregion
export { registerPluginCliCommands };
