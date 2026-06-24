---
sidebar_position: 3
title: LLM & Inference
description: "Source code: controllers/llmController, services/llmService, services/inference/, services/embeddingService, services/localEmbeddingService,."
---

# LLM & Inference Subsystem

Every LLM call in Codebolt goes through one service. That service decides: which provider, which model, local or remote, stream or not, with which tool schemas, against which budget.

> **Source code:** `controllers/llmController`, `services/llmService`, `services/inference/`, `services/embeddingService`, `services/localEmbeddingService`, `services/localModelInferenceService`, `services/localModelManager`, `services/localModelService`, `services/tokenizerService`, sibling package `packages/multillm`.

## Responsibilities

1. **Provider routing** — pick the right provider for the current request (explicit config, model alias, fallback).
2. **Remote + local parity** — same interface whether the model is a remote API or running on the user's machine.
3. **Embeddings** — a separate but parallel path (`embeddingService`, `localEmbeddingService`).
4. **Tokenization** — `tokenizerService` owns token counting so cost/budget checks are accurate.
5. **Model lifecycle** — `localModelManager` downloads, warms, and evicts local models.

## Components

### `llmService`
The single entry point. Takes a typed `LLMRequest` (messages, tools, model, options) and returns a typed `LLMResponse` or a stream. Internally dispatches to `inference/` for the actual provider call.

### `inference/`
Per-provider adapters (OpenAI, Anthropic, Google, local, etc.). Each adapter:
- Translates Codebolt's canonical message format into the provider's wire format.
- Translates the provider's tool-call format back into Codebolt's.
- Handles streaming, retries, rate limits, and error normalisation.

### `packages/multillm`
Sibling package that holds the actual provider client code. Kept separate from the server so CLI and SDK can reuse it.

### `localModelInferenceService` + `localModelManager` + `localModelService`
The local inference path. `localModelManager` handles download + caching + eviction. `localModelInferenceService` runs the inference. `localModelService` is the high-level controller surface.

### `embeddingService` + `localEmbeddingService`
Parallel to the chat path but for embeddings. Used by the [memory ingestion pipeline](./04_memory.md) to produce vectors.

### `tokenizerService`
One place for token counting. Critical because budget enforcement, context-window truncation, and cost reporting all depend on accurate counts.

## The request path

```
agent loop
   │
   ▼
llmService.chat({ messages, tools, model })
   │
   ├── tokenizerService.count → budget check
   │
   ├── provider resolution (explicit model? alias? fallback?)
   │
   ▼
inference/<provider>.call()
   │
   ├── local?  → localModelInferenceService
   └── remote? → multillm provider client
   │
   ▼
normalized LLMResponse (or stream)
```

## What this subsystem does NOT own

- **Prompt assembly.** That's [`contextAssembly`](./07_context-assembly.md). `llmService` only receives a fully assembled message list.
- **Tool execution.** The LLM returns *intent* to call a tool; the agent loop passes it to [`toolService`](./02_mcp-and-tools.md).
- **Memory.** The response goes back through the agent loop, which then writes to memory. `llmService` is stateless per-call.
- **Guardrails.** A separate sidecar runs before and after the call.

This strict separation is why you can swap providers, add local inference, or change prompt assembly without touching each other's code.

## See also

- [Memory](./04_memory.md) — consumer of embeddings
- [Context Assembly](./07_context-assembly.md) — the thing that feeds `llmService`
- [LLM Providers integration](../../02_using-codebolt/08_integrations/01_llm-providers.md) — user-facing setup
- [Custom Provider](../05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) — build your own
