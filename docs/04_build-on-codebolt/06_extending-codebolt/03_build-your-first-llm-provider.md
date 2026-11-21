---
sidebar_position: 3
title: Build Your First LLM Provider
description: Create a plugin that registers a custom LLM provider in Codebolt
---

# Build Your First LLM Provider

Create a plugin that registers a custom LLM provider in Codebolt. Once registered, your models appear in the model picker and can be used by agents, chat, and any part of the application.

**Prerequisites:** Codebolt installed and running, Node.js 18+, npm.

---

## Step 1: Create the plugin project

```bash
mkdir my-llm-provider && cd my-llm-provider
npm init -y
npm install @codebolt/plugin-sdk
npm install -D typescript
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

  await llmProvider.register({
    providerId: PROVIDER_ID,
    name: 'My LLM Provider',
    description: 'Custom model provider for my API',
    capabilities: ['chat', 'streaming'],
    requiresKey: true,
    configFields: [
      { key: 'apiKey', label: 'API Key', type: 'password', required: true },
      { key: 'apiUrl', label: 'API URL', type: 'text', required: false },
    ],
    models: [
      { id: 'my-model-v1', name: 'My Model v1' },
      { id: 'my-model-fast', name: 'My Model (Fast)' },
    ],
  });

  console.log('[MyProvider] Registered');
});
```

After registration, your models appear in the Codebolt model picker. The `configFields` are shown in the provider settings UI — users fill in their API key there.

---

## Step 4: Handle non-streaming requests

Register a handler for standard (non-streaming) completion requests:

```typescript
llmProvider.onCompletionRequest(async (req: any) => {
  try {
    const { requestId, options } = req;
    const apiKey = options.apiKey || process.env.MY_API_KEY;
    const baseUrl = options.apiUrl || 'https://api.example.com/v1';

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

    const data = await response.json();
    llmProvider.sendReply(requestId, data, true);
  } catch (error: any) {
    llmProvider.sendError(req.requestId, error.message);
  }
});
```

`sendReply(requestId, response, success)` sends the complete response back to the application.

---

## Step 5: Handle streaming requests

For streaming, you read the response as an SSE stream and send each chunk back as it arrives:

```typescript
llmProvider.onStreamRequest(async (req: any) => {
  try {
    const { requestId, options } = req;
    const apiKey = options.apiKey || process.env.MY_API_KEY;
    const baseUrl = options.apiUrl || 'https://api.example.com/v1';

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

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let finalResponse: any = null;

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
          finalResponse = chunk;
        } catch {
          // Skip malformed chunks
        }
      }
    }

    // Send the final aggregated response
    if (finalResponse) {
      llmProvider.sendReply(requestId, finalResponse, true);
    }
  } catch (error: any) {
    llmProvider.sendError(req.requestId, error.message);
  }
});
```

`sendChunk(requestId, chunk)` sends each streaming chunk to the application in real time. After the stream ends, `sendReply()` sends the final response.

---

## Step 6: Add authentication

Most providers need an API key or OAuth token. The `configFields` you registered in Step 3 are available in `req.options.providerConfig` inside your request handlers.

### API key authentication

The simplest approach — the user enters an API key in the provider settings:

```typescript
function resolveAuth(options: any) {
  const config = options?.providerConfig || {};
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error('API key is required. Set it in provider settings.');
  }

  return {
    bearer: apiKey,
    baseUrl: (config.apiUrl || 'https://api.example.com/v1').replace(/\/+$/, ''),
  };
}
```

Use it in your request handlers:

```typescript
llmProvider.onCompletionRequest(async (req: any) => {
  try {
    const auth = resolveAuth(req.options);

    const response = await fetch(`${auth.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.bearer}`,
      },
      body: JSON.stringify(buildRequestBody(req.options)),
    });

    const data = await response.json();
    llmProvider.sendReply(req.requestId, data, true);
  } catch (error: any) {
    llmProvider.sendError(req.requestId, error.message);
  }
});
```

### OAuth authentication

For providers that use OAuth (e.g., ChatGPT), you can implement a PKCE flow:

1. **Start a local callback server** on a fixed port (e.g., `localhost:1455/auth/callback`).
2. **Open the browser** to the provider's authorization URL with a PKCE challenge.
3. **Wait for the callback** with the authorization code.
4. **Exchange the code** for access and refresh tokens.
5. **Store tokens** persistently (e.g., `~/.codebolt/plugins/your-plugin/auth.json`).
6. **Auto-refresh** before expiry on subsequent requests.

```typescript
// Simplified OAuth flow
async function getAccessToken(): Promise<string> {
  // 1. Check for stored credentials
  const stored = loadCredentials();
  if (stored && stored.expires_at > Date.now() + 60000) {
    return stored.access_token;
  }

  // 2. If expired, refresh
  if (stored?.refresh_token) {
    const refreshed = await refreshToken(stored.refresh_token);
    saveCredentials(refreshed);
    return refreshed.access_token;
  }

  // 3. No credentials — run full login flow
  const creds = await runLoginFlow();
  saveCredentials(creds);
  return creds.access_token;
}
```

### Handling 401 errors

Wrap your API calls with a retry that re-authenticates on 401:

```typescript
async function withAuthRetry(options: any, run: (auth: any) => Promise<any>) {
  let auth = resolveAuth(options);
  try {
    return await run(auth);
  } catch (err: any) {
    if (!/401/.test(String(err?.message))) throw err;
    // Clear credentials and re-authenticate
    clearCredentials();
    auth = resolveAuth(options);
    return await run(auth);
  }
}
```

### Dual mode (API key + OAuth fallback)

Support both modes — use API key when provided, fall back to OAuth when not:

```typescript
async function resolveAuth(options: any) {
  const config = options?.providerConfig || {};
  const apiKey = config.apiKey?.trim();

  // API key mode (takes precedence)
  if (apiKey) {
    return {
      bearer: apiKey,
      baseUrl: config.apiUrl || 'https://api.openai.com/v1',
      mode: 'api-key',
    };
  }

  // OAuth mode (fallback)
  const token = await getAccessToken();
  return {
    bearer: token,
    baseUrl: config.apiUrl || 'https://chatgpt.com/backend-api',
    mode: 'oauth',
  };
}
```

---

## Step 7: Clean up on shutdown

Unregister the provider when the plugin stops:

```typescript
plugin.onStop(async () => {
  await llmProvider.unregister(PROVIDER_ID);
  console.log('[MyProvider] Unregistered');
});
```

---

## Step 8: Build, install, and test

### Build

```bash
npm run build
```

### Install locally

Copy the plugin to one of the directories Codebolt scans:

```bash
# Option 1: Global plugins (available in all projects)
cp -r my-llm-provider ~/.codebolt/plugins/my-llm-provider

# Option 2: Per-project plugins (only this project, overrides global)
cp -r my-llm-provider <your-project>/.codebolt/plugins/my-llm-provider
```

### Load and start

1. Open the **Plugins panel** in Codebolt.
2. Click **Reload** to rescan plugin directories.
3. Your plugin appears in the list (state: "Loaded").
4. Click **Start** to launch the plugin process.
5. Your models now appear in the **model picker** across the application.

If your plugin uses `triggers: [{ "type": "startup" }]`, it starts automatically on the next app launch.

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

After starting the plugin, check the model picker in:
- The **Chat panel** — your models should appear in the model dropdown.
- **Agent manifests** — you can reference your model ID in the `model` field.

### Where plugins are discovered

| Directory | Scope |
|---|---|
| Built-in plugins (shipped with Codebolt) | All projects |
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

Plus any values from your `configFields` (e.g., `apiKey`, `apiUrl`).

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
