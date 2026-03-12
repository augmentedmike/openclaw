import { f as defaultRuntime, k as theme } from "./subsystem-BruFJSKI.js";
import "./paths-BfR2LXbA.js";
import "./boolean-BHdNsbzF.js";
import { X as writeConfigFile, z as createConfigIO } from "./auth-profiles-CNmVtedA.js";
import { D as ensureAgentWorkspace, v as DEFAULT_AGENT_WORKSPACE_DIR } from "./agent-scope-BKFTsQIT.js";
import { x as shortenHomePath } from "./utils-BnJoR_rb.js";
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
import "./message-channel-BYwx41Q3.js";
import "./tailnet-Q1qQTAB5.js";
import "./ws-31_ycKdn.js";
import "./credentials-CLFFYOLF.js";
import "./redact-jk1akigs.js";
import "./errors-BVPzyAHI.js";
import "./sessions-B4JU7_e2.js";
import { o as resolveSessionTranscriptsDir } from "./paths-D3cXuvcv.js";
import "./chat-envelope-Ba8wEdTK.js";
import "./call-DEcPKb0n.js";
import "./pairing-token-Bu2Xt1ri.js";
import "./onboard-helpers-DmuPauTc.js";
import "./prompt-style-Bzzb5XKX.js";
import { t as formatDocsLink } from "./links-7k9JkgeM.js";
import { n as runCommandWithRuntime } from "./cli-utils-ChNkua_i.js";
import "./progress-Cbwf1Zy5.js";
import { t as hasExplicitOptions } from "./command-options-BihXZRbG.js";
import "./note-C6LRmCzz.js";
import "./clack-prompter-I3ZgwLuf.js";
import "./runtime-guard-FkLuqKkj.js";
import "./onboarding.secret-input-R2qzrDv7.js";
import "./onboarding-D_BS4aJ6.js";
import { n as logConfigUpdated, t as formatConfigPath } from "./logging-C9NbEA_-.js";
import { t as onboardCommand } from "./onboard-BOdMqE7c.js";
import JSON5 from "json5";
import fs from "node:fs/promises";
//#region src/commands/setup.ts
async function readConfigFileRaw(configPath) {
	try {
		const raw = await fs.readFile(configPath, "utf-8");
		const parsed = JSON5.parse(raw);
		if (parsed && typeof parsed === "object") return {
			exists: true,
			parsed
		};
		return {
			exists: true,
			parsed: {}
		};
	} catch {
		return {
			exists: false,
			parsed: {}
		};
	}
}
async function setupCommand(opts, runtime = defaultRuntime) {
	const desiredWorkspace = typeof opts?.workspace === "string" && opts.workspace.trim() ? opts.workspace.trim() : void 0;
	const configPath = createConfigIO().configPath;
	const existingRaw = await readConfigFileRaw(configPath);
	const cfg = existingRaw.parsed;
	const defaults = cfg.agents?.defaults ?? {};
	const workspace = desiredWorkspace ?? defaults.workspace ?? DEFAULT_AGENT_WORKSPACE_DIR;
	const next = {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...defaults,
				workspace
			}
		},
		gateway: {
			...cfg.gateway,
			mode: cfg.gateway?.mode ?? "local"
		}
	};
	if (!existingRaw.exists || defaults.workspace !== workspace || cfg.gateway?.mode !== next.gateway?.mode) {
		await writeConfigFile(next);
		if (!existingRaw.exists) runtime.log(`Wrote ${formatConfigPath(configPath)}`);
		else {
			const updates = [];
			if (defaults.workspace !== workspace) updates.push("set agents.defaults.workspace");
			if (cfg.gateway?.mode !== next.gateway?.mode) updates.push("set gateway.mode");
			logConfigUpdated(runtime, {
				path: configPath,
				suffix: updates.length > 0 ? `(${updates.join(", ")})` : void 0
			});
		}
	} else runtime.log(`Config OK: ${formatConfigPath(configPath)}`);
	const ws = await ensureAgentWorkspace({
		dir: workspace,
		ensureBootstrapFiles: !next.agents?.defaults?.skipBootstrap
	});
	runtime.log(`Workspace OK: ${shortenHomePath(ws.dir)}`);
	const sessionsDir = resolveSessionTranscriptsDir();
	await fs.mkdir(sessionsDir, { recursive: true });
	runtime.log(`Sessions OK: ${shortenHomePath(sessionsDir)}`);
}
//#endregion
//#region src/cli/program/register.setup.ts
function registerSetupCommand(program) {
	program.command("setup").description("Initialize ~/.openclaw/openclaw.json and the agent workspace").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/setup", "docs.openclaw.ai/cli/setup")}\n`).option("--workspace <dir>", "Agent workspace directory (default: ~/.openclaw/workspace; stored as agents.defaults.workspace)").option("--wizard", "Run the interactive onboarding wizard", false).option("--non-interactive", "Run the wizard without prompts", false).option("--mode <mode>", "Wizard mode: local|remote").option("--remote-url <url>", "Remote Gateway WebSocket URL").option("--remote-token <token>", "Remote Gateway token (optional)").action(async (opts, command) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const hasWizardFlags = hasExplicitOptions(command, [
				"wizard",
				"nonInteractive",
				"mode",
				"remoteUrl",
				"remoteToken"
			]);
			if (opts.wizard || hasWizardFlags) {
				await onboardCommand({
					workspace: opts.workspace,
					nonInteractive: Boolean(opts.nonInteractive),
					mode: opts.mode,
					remoteUrl: opts.remoteUrl,
					remoteToken: opts.remoteToken
				}, defaultRuntime);
				return;
			}
			await setupCommand({ workspace: opts.workspace }, defaultRuntime);
		});
	});
}
//#endregion
export { registerSetupCommand };
