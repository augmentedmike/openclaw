import { k as theme } from "./subsystem-BruFJSKI.js";
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
import "./message-channel-BYwx41Q3.js";
import "./tailnet-Q1qQTAB5.js";
import "./ws-31_ycKdn.js";
import "./credentials-CLFFYOLF.js";
import "./resolve-configured-secret-input-string-DwB1jLZf.js";
import "./call-DEcPKb0n.js";
import "./pairing-token-Bu2Xt1ri.js";
import "./runtime-config-collectors-BzEwgMGt.js";
import "./command-secret-targets-BeE9L5Cn.js";
import { t as formatDocsLink } from "./links-7k9JkgeM.js";
import { n as registerQrCli } from "./qr-cli-CaC3DSri.js";
//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}
//#endregion
export { registerClawbotCli };
