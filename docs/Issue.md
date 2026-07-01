# Documentation Issues Report

This file documents all issues found during a cross-reference audit of the documentation in `documentation/docs/` against the actual source code in `packages/`. The documentation was AI-generated and contained numerous hallucinated commands, APIs, packages, and features.

---

## CRITICAL Issues

### 1. CLI Command Structure is Entirely Fabricated
**Files affected:** Nearly every doc page that shows CLI commands across all sections.
**Claim:** Rich subcommand CLI: `codebolt agent start`, `codebolt tool install`, `codebolt provider add`, `codebolt app start`, `codebolt flow run`, `codebolt config get/set`, `codebolt project open`, `codebolt tui`, `codebolt status`, etc.
**Actual:** The CLI (`packages/cli/src/index.ts`) uses a flat flag-based interface:
- `codebolt` (start server + UI)
- `codebolt --server` (headless)
- `codebolt --prompt "..." --agent name`
- `codebolt <type> create/publish/list` (extension commands)
- Flags: `--port`, `--project`, `--provider`, `--model`, `--api-key`, `--connect`, `--web`, `--auth-token`
**Status: FIXED**

### 2. Wrong npm Package Name for CLI
**Files affected:** `01_getting-started/03_installation/03_cli.md`, `07_install-troubleshooting.md`
**Claim:** `npm install -g @codebolt/cli`
**Actual:** The package name is `codebolt` (not `@codebolt/cli`)
**Status: FIXED**

### 3. Wrong Default Port
**Files affected:** `01_getting-started/03_installation/07_install-troubleshooting.md`
**Claim:** Default port is 3456
**Actual:** Default port is 12345 (from `packages/cli/src/index.ts` line 10: `const DEFAULT_PORT = 12345`)
**Status: FIXED**

### 4. Agent Config File Name is Wrong
**Files affected:** Nearly every guide referencing agent configuration
**Claim:** Agent manifest file is `agent.yaml`
**Actual:** The correct filename is `codeboltagent.yaml` (from `packages/server/src/types/extension.ts` line 16)
**Status: FIXED**

### 5. `@codebolt/agent` Package — Partially Resolved
**Files affected:** `03_guides/02_first-steps/build-your-first-agent.md`, `05_multi-agent/*.md`, `04_build-on-codebolt/02_creating-agents/`
**Claim:** `import { UnifiedAgent } from "@codebolt/agent/patterns"` and `npm install @codebolt/agent`
**Actual:** `@codebolt/agent` now exists in the main CodeBolt monorepo (`packages/agent`), exposing `@codebolt/agent/unified` and `@codebolt/agent/processor-pieces`. The planned pattern classes (`UnifiedAgent` config, `AgentBuilder`, `ComposableAgent`, `ProcessorAgent`) from `@codebolt/agent/patterns`, `@codebolt/agent/builder`, `@codebolt/agent/composable`, and `@codebolt/agent/processor` do not exist yet.
**Status: PARTIALLY FIXED** — working exports documented, planned patterns noted as planned

### 6. Flow System Does Not Exist
**Files affected:** `03_guides/05_multi-agent/build-a-code-review-swarm.md`, `build-a-plan-execute-review-flow.md`, `design-a-debate-pattern.md`
**Claim:** Multi-agent orchestration via `.codebolt/flows/*.yaml` with `codebolt flow run`
**Actual:** No flow YAML system exists. No `codebolt flow` CLI command exists.
**Status: FIXED**

### 7. `codebolt_mail` and `codebolt_calendar` Tool Families Do NOT Exist
**Files affected:** `02_using-codebolt/08_integrations/05_mail-and-calendar.md`
**Claim:** Tool families `codebolt_mail` and `codebolt_calendar` exist
**Actual:** These are NOT registered as agent tool families. Registered families: `codebolt_basic`, `codebolt_browser`, `codebolt_git`, `codebolt_codebase`, `codebolt_debug`, `codebolt_state`, `codebolt_agent`, `codebolt_memory`, `codebolt_config`, `codebolt_code`, `codebolt_chat`, `codebolt_fs`, `codebolt_app`, `codebolt_tokenizer`
**Status: FIXED**

### 8. Utility Classes in `12_utility-functions-v2/` Are Fabricated
**Files affected:** `05_reference/12_utility-functions-v2/promptBuilder.md`, `llmoutputhandler.md`, `followupquestionbuilder.md`
**Claim:** Classes `InitialPromptBuilder`, `LLMOutputHandler`, `FollowUpQuestionBuilder` exist
**Actual:** None of these classes exist anywhere in the codebase
**Status: FIXED**

### 9. `@codebolt/codeboltjs/utils` Import Path Does Not Exist
**Files affected:** `05_reference/12_utility-functions-v2/*.md`
**Claim:** `require("@codebolt/codeboltjs/utils")`
**Actual:** `@codebolt/codeboltjs` has no `./utils` subpath export
**Status: FIXED**

### 10. LLM `inference()` Return Type is Wrong
**Files affected:** `05_reference/10_api-access/llm/inference.md`
**Claim:** Returns `Promise<LLMResponse>` with direct properties `content`, `usage`, `choices`
**Actual:** Returns `Promise<{ completion: LLMCompletion }>` - response is nested under `.completion`
**Status: FIXED**

### 11. `waitForReady()` Method Does Not Exist
**Files affected:** `05_reference/10_api-access/1-index.md`, `swarm/index.md`
**Claim:** `await codebolt.waitForReady()`
**Actual:** The method is `codebolt.waitForReady()`
**Status: FIXED**

### 12. State Module Name Mismatch
**Files affected:** `05_reference/10_api-access/state/index.md`
**Claim:** `codebolt.state.getApplicationState()`
**Actual:** The module is `codebolt.cbstate` (not `codebolt.state`)
**Status: FIXED**

---

## HIGH Issues

### 13. Data Directory Paths Are Wrong
**Files affected:** `01_getting-started/03_installation/02_desktop-app.md`, `07_install-troubleshooting.md`, `06_uninstalling.md`
**Claim:** `~/.codebolt/` for all platforms
**Actual:**
- Linux (CLI): `~/.config/codebolt/`
- macOS (CLI): `~/Library/Application Support/codebolt/`
- Windows: `%APPDATA%\codebolt\`
- Database is a single file `{userData}/database.db`, NOT a `db/` subdirectory
**Status: FIXED**

### 14. Docker Image Does Not Exist
**Files affected:** `01_getting-started/03_installation/03_cli.md`
**Claim:** `codebolt/cli:latest` Docker image
**Actual:** No Dockerfile exists in the repository
**Status: FIXED**

### 15. `@codebolt/server` Cannot Be Installed via npm
**Files affected:** `01_getting-started/03_installation/06_uninstalling.md`
**Claim:** `npm uninstall -g @codebolt/server`
**Actual:** `@codebolt/server` is a private, monorepo-internal package never published to npm
**Status: FIXED**

### 16. Tool Names Are Wrong for `codebolt_git`
**Files affected:** `03_guides/02_first-steps/set-up-git-integration.md`, `build-your-first-agent.md`, etc.
**Claim:** `codebolt_git.status`, `codebolt_git.diff`, `codebolt_git.logs`, `codebolt_git.commit`, `codebolt_git.push`
**Actual:** `codebolt_git.git_status`, `codebolt_git.git_diff`, `codebolt_git.git_logs`, `codebolt_git.git_commit`, `codebolt_git.git_push`
**Status: FIXED**

### 17. Tool Name Wrong for `codebolt_fs.search`
**Files affected:** `03_guides/02_first-steps/build-your-first-agent.md`, etc.
**Claim:** `codebolt_fs.search`
**Actual:** `codebolt_fs.search_files`
**Status: FIXED**

### 18. `codebolt-server` Binary Does Not Exist
**Files affected:** `03_guides/07_advanced/self-host-for-a-team.md`
**Claim:** `codebolt-server` binary with `@codebolt/server` npm package
**Actual:** The CLI `codebolt --server` is the entry point for headless mode
**Status: FIXED**

### 19. Remix Agent Format is Markdown, Not YAML
**Files affected:** `03_guides/02_first-steps/build-your-first-agent.md`, `05_multi-agent/*.md`
**Claim:** Remix agents use `agent.yaml` with `remix_of`, `remix.system_prompt`, etc.
**Actual:** Remix agents are Markdown files with YAML frontmatter. Fields: `name`, `description`, `model`, `tools`, `customInstructions`, `remixedFromId`
**Status: FIXED**

### 20. `AtFileProcessorModifier` and `ResponseModifier` Do Not Exist
**Files affected:** `02_using-codebolt/02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md`, `04_agents/07_debugging-an-agent.md`
**Claim:** These classes exist
**Actual:** Neither exists in the codebase
**Status: FIXED**

### 21. Git `add()` Documented but Only `addAll()` Exists
**Files affected:** `05_reference/10_api-access/git/add.md`
**Claim:** `codebolt.git.add()`
**Actual:** Only `codebolt.git.addAll()` exists
**Status: FIXED**

### 22. MCP Access Index Has Pervasive Wrong API References
**Files affected:** `05_reference/11_mcp-access/1-index.md`
**Claim:** `codebolt.tools.executeTool()`, `codeboltjs.tools.getTools()`, `codebolt.tools.executeTool(llmResult.tools)`
**Actual:** Correct API is `codebolt.mcp.getTools()`, `codebolt.mcp.executeTool(toolbox, toolName, params)`
**Status: FIXED**

### 23. Job Module Has Wrong Import
**Files affected:** `05_reference/10_api-access/job/index.md`
**Claim:** `import codebolt from '@anthropic/codebolt'`
**Actual:** `import codebolt from '@codebolt/codeboltjs'`
**Status: FIXED**

### 24. `@codebolt/provider-sdk` Package Does Not Exist
**Files affected:** `04_build-on-codebolt/05_custom-providers/`
**Claim:** `import { LLMProvider } from "@codebolt/provider-sdk"`
**Actual:** No such package exists
**Status: FIXED**

---

## MEDIUM Issues

### 25. `foreach` Used Instead of Valid JavaScript
**Files affected:** `05_reference/11_mcp-access/1-index.md`
**Claim:** `foreach(tool in result.tools){...}`
**Actual:** Should be `for (const tool of result.tools) {...}` or `result.tools.forEach(...)`
**Status: FIXED**

### 26. Broken Links in `13_legacy-overview.md`
**Files affected:** `05_reference/13_legacy-overview.md`
**Claim:** Links to `./ApiAccess/1-index.md` and `./McpAccess/1-index.md`
**Actual:** Correct paths: `./10_api-access/1-index.md` and `./11_mcp-access/1-index.md`
**Status: FIXED**

### 27. LLM Inference Signature is Garbled
**Files affected:** `05_reference/10_api-access/llm/inference.md`
**Claim:** Multi-parameter signature with expanded sub-properties
**Actual:** Single parameter: `inference(params: LLMInferenceParams): Promise<{ completion: LLMCompletion }>`
**Status: FIXED**

### 28. `.codebolt/mcp-servers.yaml` Does Not Exist
**Files affected:** `03_guides/04_mcp-and-tools/install-a-third-party-mcp-server.md`
**Actual:** No such config file pattern exists
**Status: FIXED**

### 29. `.codebolt/guardrails.yaml` Does Not Exist
**Files affected:** `03_guides/02_first-steps/set-up-git-integration.md`
**Actual:** No such config file pattern exists
**Status: FIXED**

### 30. `.codebolt/hooks/` Auto-Loading Does Not Exist
**Files affected:** `03_guides/04_mcp-and-tools/write-a-simple-hook.md`
**Actual:** No auto-loading mechanism for hooks exists
**Status: FIXED**

### 31. Duplicate Utility Functions Directories
**Files affected:** `05_reference/12_utility-functions/` and `12_utility-functions-v2/`
**Finding:** Both have identical content. Should consolidate.
**Status: FIXED**

### 32. Return Type `InferenceParams` Should Be `LLMInferenceParams`
**Files affected:** `05_reference/12_utility-functions-v2/promptBuilder.md`, `followupquestionbuilder.md`
**Status: FIXED**

### 33. `askQuestion` Return Type is Wrong
**Files affected:** `05_reference/10_api-access/chat/askQuestion.md`
**Claim:** `Promise<askQuestion>`
**Actual:** `Promise<string>`
**Status: FIXED**

### 34. Invalid CI/Headless Examples
**Files affected:** `01_getting-started/03_installation/03_cli.md`
**Status: FIXED**

---

## LOW Issues

### 35. Ollama URL `ollama.ai` Should Be `ollama.com`
**Files affected:** `03_guides/02_first-steps/connect-a-local-model.md`, `06_providers-and-models/use-ollama-locally.md`
**Status: FIXED**

### 36. Package Names Referenced Informally
**Claim:** `pluginsdk`, `clientsdk`, `codeboltjs`
**Actual:** `@codebolt/plugin-sdk`, `@codebolt/client-sdk`, `@codebolt/codeboltjs`
**Status: FIXED**

### 37. `1_index.md` is Empty
**File:** `documentation/docs/1_index.md`
**Status: FIXED**

### 38. `02_sdks_legacy/overview.md` is Truncated
**File:** `05_reference/02_sdks_legacy/overview.md` - only 16 lines with no content under "Getting Started"
**Status: NOTED** - Legacy section, low priority

---

## Summary

| Severity | Count | Description |
|----------|-------|-------------|
| CRITICAL | 12 | Non-existent packages, wrong CLI commands, fabricated APIs, wrong config files |
| HIGH | 12 | Wrong tool names, wrong paths, non-existent Docker/binary, wrong return types |
| MEDIUM | 10 | Invalid syntax, broken links, non-existent config files, duplicates |
| LOW | 4 | Wrong URLs, informal package names, empty/truncated files |
| **Total** | **38** | |
