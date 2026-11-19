---
title: "LLM Gateway Commands"
---

Use `codebolt command llm` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `agent-get-llm-roles` | Lists the resolved LLM provider/model used by an agent for default inference and each overrideable llmrole. If agentId is omitted, uses the current running agent. | None | `codebolt command llm agent-get-llm-roles --help` |
| `delete-role` | Deletes a global or agent-specific LLM role mapping by name. Deleting an agent role does not delete a same-name global fallback role. | `--name` | `codebolt command llm delete-role --help` |
| `get-config` | Gets the model configuration for a specific model or the default application model. If modelId is provided, returns configuration for that specific model. If modelId is not provided, returns the default application LLM configuration. | None | `codebolt command llm get-config --help` |
| `get-configured-providers` | Lists configured LLM providers. By default the response only includes provider id/name/configured. To get live models, pass a provider filter; when provider is provided, the response includes that provider with its live models list. Use this before setting runtime llm provider/model overrides on agent_start, thread_create_start, thread_create_background, capability execution tools, or actionBlock_start. | None | `codebolt command llm get-configured-providers --help` |
| `inference` | Sends an inference request to the LLM using OpenAI message format with tools support. The model is selected based on the provided llmrole. Returns the LLM's completion response. | `--messages` | `codebolt command llm inference --help` |
| `list-roles` | Lists global LLM role mappings or an agent-specific role mapping set. For agent scope, also returns effective roles with global fallback unless includeEffective is false. | None | `codebolt command llm list-roles --help` |
| `set-role` | Creates or updates a global or agent-specific LLM role mapping. Provider and model default to "default" when omitted. | `--name` | `codebolt command llm set-role --help` |
