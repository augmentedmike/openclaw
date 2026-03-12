import "./paths-BJV7vkaX.js";
import { k as theme } from "./subsystem-BAQ2m6Js.js";
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
import "./message-channel-BNbH-Xir.js";
import "./tailnet-Dgn5MUCj.js";
import "./ws-9b__y0UM.js";
import "./credentials-BwEqaAZD.js";
import "./resolve-configured-secret-input-string-CJS9XNqN.js";
import "./call-eIv48HMT.js";
import "./pairing-token-CYfrO-Yo.js";
import "./runtime-config-collectors-U-dOZBZd.js";
import "./command-secret-targets-Byc9IRa6.js";
import { t as formatDocsLink } from "./links-aksHGt07.js";
import { n as registerQrCli } from "./qr-cli-D-nTZicj.js";
//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}
//#endregion
export { registerClawbotCli };
