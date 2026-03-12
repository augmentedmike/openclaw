import "./paths-BJV7vkaX.js";
import { f as defaultRuntime, k as theme } from "./subsystem-BAQ2m6Js.js";
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
import "./commands-xJFiUB9b.js";
import "./commands-registry-CTLdhP2w.js";
import "./call-eIv48HMT.js";
import "./pairing-token-CYfrO-Yo.js";
import { t as parseTimeoutMs } from "./parse-timeout-73Zg_jwg.js";
import { t as formatDocsLink } from "./links-aksHGt07.js";
import { t as runTui } from "./tui-BJBA16ru.js";
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
