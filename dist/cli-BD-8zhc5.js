import { t as createSubsystemLogger } from "./subsystem-BruFJSKI.js";
import "./paths-BfR2LXbA.js";
import "./boolean-BHdNsbzF.js";
import { H as loadConfig } from "./auth-profiles-CNmVtedA.js";
import { d as resolveAgentWorkspaceDir, f as resolveDefaultAgentId } from "./agent-scope-BKFTsQIT.js";
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
import "./tokens-D_70MsBb.js";
import { c as loadOpenClawPlugins } from "./compact-Bjrdj5JY.js";
import "./plugins-D6gyItzg.js";
import "./accounts-CereXX3C.js";
import "./channel-config-helpers-CE7PnKj-.js";
import "./send-B6XxWbMV.js";
import "./send-BvY0MpHL.js";
import "./with-timeout-Bqrf01r4.js";
import "./deliver-CuBpXAjm.js";
import "./diagnostic-DOSZpn_I.js";
import "./accounts-DoF4wStd.js";
import "./image-ops-CdcrmTRQ.js";
import "./send-V_5WvkG1.js";
import "./pi-model-discovery-C97U838V.js";
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
import "./exec-approvals-allowlist-BqMiFv3e.js";
import "./exec-safe-bin-runtime-policy-EhxEQl4F.js";
import "./model-catalog-B3SEVKTP.js";
import "./fetch-jE_tIA0G.js";
import "./audio-transcription-runner-BrDYEyPd.js";
import "./fetch-guard-BmDheOGp.js";
import "./image-GyYxGR1J.js";
import "./tool-display-BcbAPaJF.js";
import "./api-key-rotation-oNW4a4o-.js";
import "./proxy-fetch-7CaoZgu1.js";
import "./ir-DUJnWk-d.js";
import "./render-DT-umBSz.js";
import "./target-errors-Hu-Dg1Ny.js";
import "./commands-Kab_XaTV.js";
import "./commands-registry-CerHpmeN.js";
import "./session-cost-usage-0f4Id4RU.js";
import "./session-utils-oAU8BBF-.js";
import "./sqlite-Dhsacr6i.js";
import "./call-DEcPKb0n.js";
import "./pairing-token-Bu2Xt1ri.js";
import "./fetch-Q5enmqDF.js";
import "./pairing-store-iSey3eJV.js";
import "./exec-approvals-Bc3G-ceB.js";
import "./nodes-screen-CYTpdNc-.js";
import "./restart-QnmH7R-D.js";
import "./system-run-command-YpJAnMie.js";
import "./skill-commands-B085LydY.js";
import "./pi-tools.policy-D41v2sDp.js";
import "./workspace-dirs-DB5xi0-D.js";
import "./channel-activity-CJVumnyg.js";
import "./tables-hvO8CR7i.js";
import "./runtime-lifecycle-SLbRnB-d.js";
import "./stagger-BBJI9ikk.js";
import "./channel-selection-DVauGvOT.js";
import "./plugin-auto-enable-BjK0meBY.js";
import "./send-BHfUqBki.js";
import "./outbound-attachment-d-9odxZu.js";
import "./delivery-queue-cVcGAG6r.js";
import "./send-CUvzQwYN.js";
import "./proxy-3O29IgJK.js";
import "./timeouts-r52PcxXY.js";
import "./runtime-config-collectors-BzEwgMGt.js";
import "./command-secret-targets-BeE9L5Cn.js";
import "./connection-auth-CEeBFhO1.js";
import "./onboard-helpers-DmuPauTc.js";
import "./prompt-style-Bzzb5XKX.js";
import "./pairing-labels-D667psgE.js";
import "./memory-cli-CCZMQ_05.js";
import "./manager-BTjAUTqC.js";
import "./links-7k9JkgeM.js";
import "./cli-utils-ChNkua_i.js";
import "./help-format-BFpuN7w6.js";
import "./progress-Cbwf1Zy5.js";
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
