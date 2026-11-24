---
sidebar_position: 2
title: Custom LLM Providers
description: Connect a hosted or local model to Codebolt using a provider plugin.
---

# Custom LLM Providers

A provider plugin registers model IDs with Codebolt and handles completion requests for those models. Use it to connect a hosted API or a local model server.

## When to Write a Custom LLM Provider

- You're running a local model (Ollama, llama.cpp, vLLM) and want agents to use it.
- Your organisation has a private Azure OpenAI deployment or an on-prem API endpoint.
- You've fine-tuned a model and want it selectable alongside built-in models.
- You need a provider with non-standard auth, routing, or rate-limiting logic.

## How It Works

A custom LLM provider is a **plugin** with `type: "llmProvider"` that registers itself on startup and handles inference requests from the application.

```
┌──────────────────────────┐
│  Codebolt Application    │
│  (Agent, Chat, etc.)     │
│                          │
│  "Use model X for this"  │
└────────────┬─────────────┘
             │ inference request
             │
┌────────────┴─────────────┐
│  Your LLM Provider       │
│  Plugin                  │
│                          │
│  1. Receive request      │
│  2. Call your API        │
│  3. Stream/send response │
└──────────────────────────┘
```

### Lifecycle

1. **Startup** — `plugin.onStart()` fires. Your plugin calls `llmProvider.register()` with provider metadata and model list.
2. **Request handling** — The application sends inference requests. Your plugin handles them via `llmProvider.onCompletionRequest()` (non-streaming) and `llmProvider.onStreamRequest()` (streaming).
3. **Response** — Your plugin sends responses back via `llmProvider.sendReply()`, `llmProvider.sendChunk()`, or `llmProvider.sendError()`.
4. **Shutdown** — `plugin.onStop()` fires. Your plugin calls `llmProvider.unregister()`.

### Plugin package.json

```json
{
  "name": "my-llm-provider",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "llmProvider",
      "triggers": [{ "type": "startup" }]
    }
  }
}
```

The key fields:
- `type: "llmProvider"` — tells Codebolt this plugin provides models.
- `triggers: [{ "type": "startup" }]` — auto-starts when the application launches.

## Provider SDK API

The Plugin SDK exposes the `llmProvider` module for registration and request handling.

### Registration

```typescript
await llmProvider.register({
  providerId: 'my-provider',
  name: 'My LLM Provider',
  description: 'Custom model provider',
  capabilities: ['chat', 'tools', 'streaming'],
  requiresKey: false,
  configFields: [
    { key: 'apiKey', label: 'API Key', type: 'password', required: false },
    { key: 'apiUrl', label: 'API URL', type: 'url', required: false },
  ],
  models: [
    { id: 'my-model-v1', name: 'My Model v1' },
    { id: 'my-model-v2', name: 'My Model v2' },
  ],
});
```

| Field | Description |
|---|---|
| `providerId` | Unique identifier for the provider |
| `name` | Display name in the model picker |
| `capabilities` | What the provider supports: `chat`, `tools`, `streaming` |
| `requiresKey` | Whether an API key is mandatory |
| `configFields` | Additional configuration field definitions in the provider manifest |
| `models` | List of models this provider offers |

### Request Handlers

```typescript
// Non-streaming requests
llmProvider.onCompletionRequest(async (req) => {
  // req.requestId — unique request ID
  // req.options — model, messages, temperature, tools, etc.
});

// Streaming requests
llmProvider.onStreamRequest(async (req) => {
  // req.requestId — unique request ID
  // req.options — same as above, but expects chunked response
});
```

### Response Methods

| Method | When to use |
|---|---|
| `llmProvider.sendReply(requestId, response, success)` | Send a complete response (non-streaming or final aggregated response) |
| `llmProvider.sendChunk(requestId, chunk)` | Send a streaming chunk |
| `llmProvider.sendError(requestId, errorMessage)` | Send an error |

### Cleanup

```typescript
await llmProvider.unregister('my-provider');
```

## Request Options

The `req.options` object contains everything your provider needs to make an inference call:

| Field | Type | Description |
|---|---|---|
| `model` | `string` | Model ID (from your registered models list) |
| `messages` | `array` | Chat messages in OpenAI format |
| `temperature` | `number?` | Sampling temperature |
| `top_p` | `number?` | Nucleus sampling |
| `max_tokens` | `number?` | Maximum tokens to generate |
| `tools` | `array?` | Tool/function definitions |
| `tool_choice` | `any?` | Tool selection strategy |
| `response_format` | `any?` | Response format constraint |
| `stop` | `any?` | Stop sequences |
| `stream` | `boolean` | Whether streaming was requested |

## See Also

- [Build Your First LLM Provider](./03_build-your-first-llm-provider.md) — step-by-step tutorial
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
