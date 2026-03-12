import { f as defaultRuntime, k as theme } from "./subsystem-BruFJSKI.js";
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
import "./tool-display-BcbAPaJF.js";
import "./commands-Kab_XaTV.js";
import "./commands-registry-CerHpmeN.js";
import "./call-DEcPKb0n.js";
import "./pairing-token-Bu2Xt1ri.js";
import { t as parseTimeoutMs } from "./parse-timeout-BtTjGPGT.js";
import { t as formatDocsLink } from "./links-7k9JkgeM.js";
import { t as runTui } from "./tui-DF0kKK1w.js";
//#region src/cli/tui-cli.ts
function registerTuiCli(program) {
	program.command("tui").description("Open a terminal UI connected to the Gateway").option("--url <url>", "Gateway WebSocket URL (defaults to gateway.remote.url when configured)").option("--token <token>", "Gateway token (if required)").option("--password <password>", "Gateway password (if required)").option("--session <key>", "Session key (default: \"main\", or \"global\" when scope is global)").option("--deliver", "Deliver assistant replies", false).option("--thinking <level>", "Thinking level override").option("--message <text>", "Send an initial message after connecting").option("--timeout-ms <ms>", "Agent timeout in ms (defaults to agents.defaults.timeoutSeconds)").option("--history-limit <n>", "History entries to load", "200").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/tui", "docs.openclaw.ai/cli/tui")}\n`).action(async (opts) => {
		try {
			const timeoutMs = parseTimeoutMs(opts.timeoutMs);
			if (opts.timeoutMs !== void 0 && timeoutMs === void 0) defaultRuntime.error(`warning: invalid --timeout-ms "${String(opts.timeoutMs)}"; ignoring`);
			const historyLimit = Number.parseInt(String(opts.historyLimit ?? "200"), 10);
			await runTui({
				url: opts.url,
				token: opts.token,
				password: opts.password,
				session: opts.session,
				deliver: Boolean(opts.deliver),
				thinking: opts.thinking,
				message: opts.message,
				timeoutMs,
				historyLimit: Number.isNaN(historyLimit) ? void 0 : historyLimit
			});
		} catch (err) {
			defaultRuntime.error(String(err));
			defaultRuntime.exit(1);
		}
	});
}
//#endregion
export { registerTuiCli };
