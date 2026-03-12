import "./paths-BJV7vkaX.js";
import "./subsystem-BAQ2m6Js.js";
import "./utils-B_PMBV44.js";
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
import "./tailscale-8Hg9w-Si.js";
import "./tailnet-Dgn5MUCj.js";
import "./ws-9b__y0UM.js";
import "./auth-DSQKePpR.js";
import "./credentials-BwEqaAZD.js";
import "./accounts-DCagQgBc.js";
import "./channel-config-helpers-D8JM2cgl.js";
import "./accounts-DXzA7u8r.js";
import "./paths-BXRmsWer.js";
import "./chat-envelope-BkySjpPY.js";
import "./call-eIv48HMT.js";
import "./pairing-token-CYfrO-Yo.js";
import "./onboard-helpers-CMokEY54.js";
import "./prompt-style-yjQNUNlK.js";
import "./runtime-guard-BaziZaNk.js";
import "./note-Bp28VGG5.js";
import "./daemon-install-plan.shared-qSjcy_xf.js";
import { n as buildGatewayInstallPlan, r as gatewayInstallErrorHint, t as resolveGatewayInstallToken } from "./gateway-install-token-C4FqXkw9.js";
import { r as isGatewayDaemonRuntime } from "./daemon-runtime-BSeNz-AR.js";
import { i as isSystemdUserServiceAvailable } from "./systemd-Cht-sA5x.js";
import { t as resolveGatewayService } from "./service-C3vPElwM.js";
import { n as ensureSystemdUserLingerNonInteractive } from "./systemd-linger-Cjh8LhEP.js";
//#region src/commands/onboard-non-interactive/local/daemon-install.ts
async function installGatewayDaemonNonInteractive(params) {
	const { opts, runtime, port } = params;
	if (!opts.installDaemon) return;
	const daemonRuntimeRaw = opts.daemonRuntime ?? "node";
	const systemdAvailable = process.platform === "linux" ? await isSystemdUserServiceAvailable() : true;
	if (process.platform === "linux" && !systemdAvailable) {
		runtime.log("Systemd user services are unavailable; skipping service install.");
		return;
	}
	if (!isGatewayDaemonRuntime(daemonRuntimeRaw)) {
		runtime.error("Invalid --daemon-runtime (use node or bun)");
		runtime.exit(1);
		return;
	}
	const service = resolveGatewayService();
	const tokenResolution = await resolveGatewayInstallToken({
		config: params.nextConfig,
		env: process.env
	});
	for (const warning of tokenResolution.warnings) runtime.log(warning);
	if (tokenResolution.unavailableReason) {
		runtime.error([
			"Gateway install blocked:",
			tokenResolution.unavailableReason,
			"Fix gateway auth config/token input and rerun onboarding."
		].join(" "));
		runtime.exit(1);
		return;
	}
	const { programArguments, workingDirectory, environment } = await buildGatewayInstallPlan({
		env: process.env,
		port,
		runtime: daemonRuntimeRaw,
		warn: (message) => runtime.log(message),
		config: params.nextConfig
	});
	try {
		await service.install({
			env: process.env,
			stdout: process.stdout,
			programArguments,
			workingDirectory,
			environment
		});
	} catch (err) {
		runtime.error(`Gateway service install failed: ${String(err)}`);
		runtime.log(gatewayInstallErrorHint());
		return;
	}
	await ensureSystemdUserLingerNonInteractive({ runtime });
}
//#endregion
export { installGatewayDaemonNonInteractive };
