---
sidebar_position: 3
title: Build Your First LLM Provider
description: Create a plugin that registers a custom LLM provider in Codebolt
---

# Build Your First LLM Provider

Create a plugin that registers a custom LLM provider in Codebolt. The plugin declares the model IDs it serves and handles completion requests for those models.

You’ll need Codebolt, Node.js 18 or later, and an endpoint that accepts OpenAI-style chat completions. Replace `my-model-v1` with the model ID your endpoint serves.

---

## Step 1: Create the plugin project

```bash
# From the root of the project open in Codebolt:
mkdir -p .codebolt/plugins/my-llm-provider
cd .codebolt/plugins/my-llm-provider
npm init -y
npm install @codebolt/plugin-sdk
npm install -D typescript @types/node
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

---

## Step 2: Configure package.json

Set the plugin type to `llmProvider` and trigger it on startup:

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
  },
  "scripts": {
    "build": "tsc"
  }
}
```

- `type: "llmProvider"` tells Codebolt this plugin provides models.
- `triggers: [{ "type": "startup" }]` makes it auto-start when the application launches.

---

## Step 3: Register the provider

Create `src/index.ts`. The first thing your plugin does on startup is register itself with Codebolt, declaring what models it offers and what configuration it needs from the user.

```typescript
import plugin, { llmProvider } from '@codebolt/plugin-sdk';

const PROVIDER_ID = 'my-provider';

plugin.onStart(async (ctx: any) => {
  console.log('[MyProvider] Starting...');

  const registration = await llmProvider.register({
    providerId: PROVIDER_ID,
    name: 'My LLM Provider',
    description: 'Custom model provider for my API',
    capabilities: ['chat'],
    requiresKey: true,
    configFields: [
      { key: 'apiKey', label: 'API Key', type: 'password', required: true },
      { key: 'apiUrl', label: 'API URL', type: 'url', required: true },
    ],
    models: [
      { id: 'my-model-v1', name: 'My Model v1' },
    ],
  });

  if (!registration.success) throw new Error(registration.error || 'Model registration failed');
  console.log('[MyProvider] Registered');
});
```

Set the provider’s API key and API base URL in Codebolt. The base URL should include the API version path when your endpoint requires one.

---

## Step 4: Handle non-streaming requests

Register a handler for standard (non-streaming) completion requests:

```typescript
function resolveAuth(options: any) {
  const config = options?.providerConfig || {};
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error('API key is required. Set it in provider settings.');
  }

  if (!config.apiUrl?.trim()) throw new Error('Set the API base URL in provider settings.');
  return {
    bearer: apiKey,
    baseUrl: config.apiUrl.trim().replace(/\/+$/, ''),
  };
}

llmProvider.onCompletionRequest(async (req) => {
  try {
    const { requestId, options } = req;
    const { bearer: apiKey, baseUrl } = resolveAuth(options);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: options.model || 'my-model-v1',
        messages: options.messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
        tools: options.tools,
        tool_choice: options.tool_choice,
      }),
    });

    if (!response.ok) throw new Error(`Provider returned HTTP ${response.status}`);
    const data = await response.json();
    llmProvider.sendReply(requestId, data, true);
  } catch (error: any) {
    llmProvider.sendError(req.requestId, error.message);
  }
});
```

`sendReply(requestId, response, success)` sends the complete response back to the application.

---

## Step 5: Build and try the provider

1. Run `npm run build` in `.codebolt/plugins/my-llm-provider/`.
2. In the Desktop **Plugins** panel, click **Reload**, find your plugin, and click **Start**.
3. In provider settings, enter the API key and base URL for your endpoint. Select your registered model for a non-streaming completion request and ask it to reply with “Hello from my provider”.
4. Check that the reply contains the requested greeting. A missing model points to plugin startup or registration. An HTTP error in the handler points to the upstream endpoint, model ID, or credentials.

For Chat configurations that request a streamed reply, add the handler below, rebuild, and repeat the test in Chat.

## Optional: Handle streaming requests

Add `streaming` to the registered `capabilities` array. For streaming, you read the response as an SSE stream and send each chunk back as it arrives:

```typescript
llmProvider.onStreamRequest(async (req: any) => {
  try {
    const { requestId, options } = req;
    const { bearer: apiKey, baseUrl } = resolveAuth(options);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: options.model || 'my-model-v1',
        messages: options.messages,
        stream: true,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
        tools: options.tools,
        tool_choice: options.tool_choice,
      }),
    });

    if (!response.ok || !response.body) throw new Error(`Stream failed (HTTP ${response.status})`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let lastChunk: any;
    let content = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') continue;

        try {
          const chunk = JSON.parse(data);
          llmProvider.sendChunk(requestId, chunk);
          lastChunk = chunk;
          content += chunk.choices?.[0]?.delta?.content ?? '';
        } catch {
          // Skip malformed chunks
        }
      }
    }

    if (!lastChunk) throw new Error('Provider returned an empty stream');
    llmProvider.sendReply(requestId, {
      id: lastChunk.id,
      model: lastChunk.model,
      choices: [{ index: 0, message: { role: 'assistant', content }, finish_reason: 'stop' }],
    }, true);
  } catch (error: any) {
    llmProvider.sendError(req.requestId, error.message);
  }
});
```

`sendChunk(requestId, chunk)` sends each streaming chunk to the application in real time. This example combines text deltas into the final assistant message. A provider that offers streamed tool calls must also assemble their arguments before sending the final reply.

---

## Optional: Support OAuth

For an API-key provider, use the saved key and base URL in `req.options.providerConfig` as shown above. For an OAuth provider, register a login handler. The plugin implements the vendor-specific sign-in, credential storage, and refresh steps.

The Anthropic plugin handles a login request by obtaining valid credentials and registering its models. The two functions in this excerpt belong to that plugin.

```typescript
llmProvider.onLoginRequest(async (req) => {
  try {
    await getValidCredentials(notifyChat);
    await registerProviderWithModels();
    llmProvider.sendReply(req.requestId, { authenticated: true }, true);
  } catch (error) {
    llmProvider.sendError(req.requestId, error instanceof Error ? error.message : 'Login failed');
  }
});
```

The Codex plugin also supports returning a sign-in URL. When the caller requests a URL and there are no saved credentials, it starts its login flow and replies with `authenticated: false`, `pending: true`, and the authorization URL in `authUrl`. After sign-in completes, the plugin registers its models.

---

## Clean up on shutdown

Unregister the provider when the plugin stops:

```typescript
plugin.onStop(async () => {
  await llmProvider.unregister(PROVIDER_ID);
  console.log('[MyProvider] Unregistered');
});
```

---

## Rebuild and troubleshoot

### Development loop

There is no hot-reload. After making code changes:

```bash
# 1. Rebuild
npm run build

# 2. In the Codebolt Plugins panel:
#    Click Stop → Click Reload → Click Start
```

For faster iteration, run `tsc --watch` in one terminal so the build updates whenever you save. Then just Stop → Reload → Start in the UI.

### REST API (alternative to UI)

You can also manage plugins via HTTP:

```bash
# Reload all plugins from disk
curl -X POST http://localhost:2719/plugins/load

# Start your plugin
curl -X POST http://localhost:2719/plugins/my-llm-provider/start

# Stop your plugin
curl -X POST http://localhost:2719/plugins/my-llm-provider/stop

# Check status
curl http://localhost:2719/plugins/my-llm-provider
```

### Verify your models are registered

After starting the plugin, check the registration result. Select a registered model in Chat, send a short message, and verify that your handler receives the request and returns a reply.

### Where plugins are discovered

| Directory | Scope |
|---|---|
| `~/.codebolt/plugins/` | All projects (global) |
| `<project>/.codebolt/plugins/` | Current project only (overrides global) |

Per-project plugins override global plugins with the same name.

---

## Response API summary

| Method | When to use |
|---|---|
| `llmProvider.sendReply(requestId, response, success)` | Complete response (non-streaming) or final aggregated response (after streaming) |
| `llmProvider.sendChunk(requestId, chunk)` | Each streaming chunk as it arrives |
| `llmProvider.sendError(requestId, message)` | When the request fails |

---

## Request options

The `req.options` object your handlers receive contains:

| Field | Type | Description |
|---|---|---|
| `model` | `string` | Model ID from your registered list |
| `messages` | `array` | Chat messages (OpenAI format) |
| `temperature` | `number?` | Sampling temperature |
| `top_p` | `number?` | Nucleus sampling |
| `max_tokens` | `number?` | Max tokens to generate |
| `tools` | `array?` | Tool/function definitions |
| `tool_choice` | `any?` | Tool selection strategy |
| `response_format` | `any?` | Response format constraint |
| `stop` | `any?` | Stop sequences |

Read saved credentials and the base URL from `req.options.providerConfig`. Additional saved configuration fields are under `providerConfig.custom`.

---

## Project structure

```
my-llm-provider/
├── package.json          # type: "llmProvider", triggers: startup
├── tsconfig.json
├── src/
│   ├── index.ts          # register, request handlers, unregister
│   └── auth.ts           # (optional) OAuth flow, token storage, refresh
└── dist/
    └── index.js
```

---

## See Also

- [Custom LLM Providers Overview](./02_custom-llm-providers.md) — concepts, API reference
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
