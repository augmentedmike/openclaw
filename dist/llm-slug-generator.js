import { a as resolveAgentDir, l as resolveAgentWorkspaceDir, o as resolveAgentEffectiveModelPrimary, u as resolveDefaultAgentId } from "./run-with-concurrency-COe6h7d7.js";
import "./paths-hfkBoC7i.js";
import { t as createSubsystemLogger } from "./subsystem-ruU4fm6Y.js";
import "./workspace-DY0eDzNF.js";
import "./logger-D5-2dTJM.js";
import { Ar as DEFAULT_PROVIDER, l as parseModelRef } from "./model-selection-CIU6CwkT.js";
import "./github-copilot-token-CQmATy5E.js";
import "./legacy-names-qEH4CUIG.js";
import "./thinking-CekxowXE.js";
import "./tokens-CxlE9Oju.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-CgvPlTre.js";
import "./plugins-rpoc4CQ9.js";
import "./accounts-D5eCuBPJ.js";
import "./send-4xDa1u5T.js";
import "./send-CACKStKd.js";
import "./deliver-B36Uuc0C.js";
import "./diagnostic-Sqe0u4rc.js";
import "./accounts-DzDnkxkx.js";
import "./image-ops-6q3RpL6d.js";
import "./send-BJxNnRRy.js";
import "./pi-model-discovery-CTHCriuX.js";
import "./pi-embedded-helpers-Ds-NcQ0i.js";
import "./chrome-CUSMVLRf.js";
import "./frontmatter-DJA9VqLz.js";
import "./skills-BHOB5peM.js";
import "./path-alias-guards-CMrnyY6K.js";
import "./proxy-env-BsF0ekPs.js";
import "./redact-BM2flUn0.js";
import "./errors-BGYTuaiN.js";
import "./fs-safe-DahuJuB3.js";
import "./store-DBGRqmhv.js";
import "./paths-BYQHT94K.js";
import "./tool-images-l6KID5Et.js";
import "./image-DoIA6Dlu.js";
import "./audio-transcription-runner-B3d1CZni.js";
import "./fetch-DOgJTU1l.js";
import "./fetch-guard-CS95LO0t.js";
import "./api-key-rotation-Dq8kwGfv.js";
import "./proxy-fetch-DXhDFnX7.js";
import "./ir-C1gzun_P.js";
import "./render-7C7EDC8_.js";
import "./target-errors-BZTFJZ5F.js";
import "./commands-registry-GP2X0iK4.js";
import "./skill-commands-BiLrP7Dn.js";
import "./fetch-CONQGbzL.js";
import "./channel-activity-C0er3rZF.js";
import "./tables-ChlpI3jw.js";
import "./send-CoFjiBXO.js";
import "./outbound-attachment-CR-wizsI.js";
import "./send-B3KXlmso.js";
import "./proxy-o7sro0Y0.js";
import "./manager-VUwr7r39.js";
import "./query-expansion-B5XZQUXp.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
//#region src/hooks/llm-slug-generator.ts
/**
* LLM-based slug generator for session memory filenames
*/
const log = createSubsystemLogger("llm-slug-generator");
/**
* Generate a short 1-2 word filename slug from session content using LLM
*/
async function generateSlugViaLLM(params) {
	let tempSessionFile = null;
	try {
		const agentId = resolveDefaultAgentId(params.cfg);
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
		const agentDir = resolveAgentDir(params.cfg, agentId);
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-slug-"));
		tempSessionFile = path.join(tempDir, "session.jsonl");
		const prompt = `Based on this conversation, generate a short 1-2 word filename slug (lowercase, hyphen-separated, no file extension).

Conversation summary:
${params.sessionContent.slice(0, 2e3)}

Reply with ONLY the slug, nothing else. Examples: "vendor-pitch", "api-design", "bug-fix"`;
		const modelRef = resolveAgentEffectiveModelPrimary(params.cfg, agentId);
		const parsed = modelRef ? parseModelRef(modelRef, DEFAULT_PROVIDER) : null;
		const provider = parsed?.provider ?? "anthropic";
		const model = parsed?.model ?? "claude-opus-4-6";
		const result = await runEmbeddedPiAgent({
			sessionId: `slug-generator-${Date.now()}`,
			sessionKey: "temp:slug-generator",
			agentId,
			sessionFile: tempSessionFile,
			workspaceDir,
			agentDir,
			config: params.cfg,
			prompt,
			provider,
			model,
			timeoutMs: 15e3,
			runId: `slug-gen-${Date.now()}`
		});
		if (result.payloads && result.payloads.length > 0) {
			const text = result.payloads[0]?.text;
			if (text) return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || null;
		}
		return null;
	} catch (err) {
		const message = err instanceof Error ? err.stack ?? err.message : String(err);
		log.error(`Failed to generate slug: ${message}`);
		return null;
	} finally {
		if (tempSessionFile) try {
			await fs.rm(path.dirname(tempSessionFile), {
				recursive: true,
				force: true
			});
		} catch {}
	}
}
//#endregion
export { generateSlugViaLLM };
