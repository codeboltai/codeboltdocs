---
sidebar_position: 1
title: Plugins Overview
description: Plugins extend the CodeBolt application. They run as separate Node
---

# Plugins

Plugins extend the CodeBolt application. They run as separate Node.js processes, connect to the server via WebSocket, and can add custom LLM providers, connect messaging platforms, proxy code execution, or show custom UI panels.

## What is a Plugin?

A plugin is a Node.js package with a `codebolt.plugin` field in `package.json`. When CodeBolt starts, it discovers plugins from specific directories, spawns them as child processes, and they connect back to the server via WebSocket using `@codebolt/plugin-sdk`.

Plugins are different from agent extensions:
- **Agent extensions** (skills, tools, action blocks) add capabilities to agents
- **Plugins** add capabilities to the application itself

## Plugin Directories

| Directory | Scope |
|---|---|
| `~/.codebolt/plugins/` | Global — available in all projects |
| `<project>/.codeboltPlugins/` | Per-project — overrides global |

## Types of Plugins

| Type | `package.json` type field | Purpose | Key SDK Module |
|---|---|---|---|
| **LLM Provider** | `"llmProvider"` | Add a custom AI model provider | `plugin.llmProvider` |
| **Chat Gateway** | `"channel"` | Connect external messaging platforms and persistent message surfaces | `plugin.gateway` |
| **Execution** | `"execution"` | Proxy code execution to remote environments | `plugin.executionGateway` |
| **Generic** | (none) | Any custom extension | Any modules |

## Quick Start: Minimal Plugin

### 1. Project structure

```text
my-plugin/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── dist/
    └── index.js
```

### 2. package.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "dependencies": {
    "@codebolt/plugin-sdk": "*"
  },
  "devDependencies": {
    "typescript": "^5.4.5"
  },
  "codebolt": {
    "plugin": {
      "type": "llmProvider",
      "triggers": [{ "type": "startup" }]
    }
  }
}
```

### 3. src/index.ts

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async (ctx) => {
  console.log(`Plugin started: ${ctx.pluginId}`);
  console.log(`Plugin dir: ${ctx.pluginDir}`);
  // Register capabilities, set up listeners
});

plugin.onStop(async () => {
  // Cleanup
});
```

### 4. Build and install

```bash
npm install && npx tsc
cp -r my-plugin/ ~/.codebolt/plugins/my-plugin/
# Reload from Plugins panel in CodeBolt UI, then click Start
```

## Plugin Lifecycle

### Start triggers

| Trigger | When it starts |
|---|---|
| `startup` | Automatically when CodeBolt launches |
| `manual` | When user clicks Start in the Plugins panel |
| `event` | When a specific application event fires |

### Lifecycle hooks

```ts
import plugin from '@codebolt/plugin-sdk';

// Called when plugin process starts and WebSocket is connected
plugin.onStart(async (ctx) => {
  // ctx.pluginId — unique plugin identifier
  // ctx.pluginDir — absolute path to plugin directory
  // ctx.manifest — the codebolt.plugin config from package.json
});

// Called when plugin is being stopped
plugin.onStop(async () => {
  // Clean up connections, timers, etc.
});

// Listen for any raw WebSocket message (advanced)
plugin.onRawMessage((message) => {
  // Handle custom message types
});
```

### Listening to dynamic agent events

Plugins can subscribe to named events emitted by agents. Use this for application-level observers, external notifications, dashboards, or integrations that need to react when an agent reaches a domain-specific point.

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async () => {
  await plugin.agentEvents.onAgentEvent('test.failed', async (event) => {
    console.log('Agent event:', event.payload?.name, event.payload?.data);
  });
});
```

Agents emit these events with `codebolt.agentEvents.emit(...)`. See [Dynamic Agent Events](../02_creating-agents/08_dynamic-agent-events.md).

### Environment variables

When CodeBolt spawns a plugin process, these env vars are set:

| Variable | Value |
|---|---|
| `SOCKET_PORT` | Server port for WebSocket connection |
| `pluginId` | Plugin identifier |
| `pluginToken` | Auth token for this plugin session |
| `PLUGIN_DIR` | Absolute path to plugin directory |
| `IS_PLUGIN` | `"true"` |

You don't need to use these directly — `@codebolt/plugin-sdk` reads them automatically.

---

## Creating an LLM Provider Plugin

Makes a custom AI provider available in CodeBolt's model selector.

### package.json

```json
{
  "name": "my-llm-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "llmProvider",
      "triggers": [{ "type": "startup" }]
    }
  },
  "dependencies": {
    "@codebolt/plugin-sdk": "*"
  }
}
```

### src/index.ts

```ts
import plugin from '@codebolt/plugin-sdk';

const PROVIDER_ID = 'my-llm';

plugin.onStart(async () => {
  // 1. Register the provider — appears in CodeBolt's model selector
  await plugin.llmProvider.register({
    providerId: PROVIDER_ID,
    name: 'My LLM',
    models: [
      { id: 'my-model-fast', name: 'My Model (Fast)' },
      { id: 'my-model-pro', name: 'My Model (Pro)' },
    ],
    requiresKey: true,
    configFields: [
      { key: 'apiKey', label: 'API Key', type: 'password', required: true },
      { key: 'apiUrl', label: 'Base URL', type: 'url', placeholder: 'https://api.example.com' },
    ],
  });

  // 2. Handle non-streaming completion requests
  plugin.llmProvider.onCompletionRequest(async (req) => {
    try {
      const apiKey = req.options.providerConfig?.apiKey;
      const response = await fetch('https://api.example.com/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: req.options.model,
          messages: req.options.messages,
        }),
      });
      const result = await response.json();
      plugin.llmProvider.sendReply(req.requestId, result, true);
    } catch (error) {
      plugin.llmProvider.sendError(req.requestId, error.message);
    }
  });

  // 3. Handle streaming requests
  plugin.llmProvider.onStreamRequest(async (req) => {
    try {
      const apiKey = req.options.providerConfig?.apiKey;
      const response = await fetch('https://api.example.com/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: req.options.model,
          messages: req.options.messages,
          stream: true,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        plugin.llmProvider.sendChunk(req.requestId, {
          choices: [{ delta: { content: chunk } }],
        });
        fullContent += chunk;
      }

      plugin.llmProvider.sendReply(req.requestId, {
        choices: [{ message: { content: fullContent, role: 'assistant' } }],
      }, true);
    } catch (error) {
      plugin.llmProvider.sendError(req.requestId, error.message);
    }
  });
});

plugin.onStop(async () => {
  await plugin.llmProvider.unregister(PROVIDER_ID);
});
```

### LLM Provider API

| Method | Description |
|---|---|
| `plugin.llmProvider.register(manifest)` | Register provider with models and config fields |
| `plugin.llmProvider.unregister(providerId)` | Remove provider |
| `plugin.llmProvider.onCompletionRequest(cb)` | Handle non-streaming requests |
| `plugin.llmProvider.onStreamRequest(cb)` | Handle streaming requests |
| `plugin.llmProvider.sendReply(requestId, data, success)` | Send final response |
| `plugin.llmProvider.sendChunk(requestId, chunk)` | Send a stream chunk |
| `plugin.llmProvider.sendError(requestId, error)` | Send error response |

### Provider config injection

When a user configures your provider in Settings (enters API key, base URL, etc.), the server automatically includes their config in every request as `req.options.providerConfig`:

```ts
req.options.providerConfig = {
  apiKey: 'user-entered-key',
  apiUrl: 'user-entered-url',
  custom: { /* any other configFields values */ },
};
```

---

## Creating a Chat Gateway Plugin

Connects an external messaging platform or persistent message surface to CodeBolt agents. The manifest type is still `"channel"`, but the routing model is documented as the Chat Gateway.

### package.json

```json
{
  "name": "my-channel-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "channel",
      "triggers": [{ "type": "manual" }],
      "ui": { "path": "src/ui/index.html" }
    }
  },
  "dependencies": {
    "@codebolt/plugin-sdk": "*"
  }
}
```

### src/index.ts

```ts
import plugin from '@codebolt/plugin-sdk';

let botConnection: any = null;

plugin.onStart(async (ctx) => {
  // Load saved config
  const configRaw = await plugin.kvStore.get(ctx.pluginId, 'config', 'settings');
  const config = configRaw?.value ? JSON.parse(configRaw.value) : null;

  if (config?.botToken) {
    await connect(config);
  }

  // Handle UI panel messages (for configuration)
  plugin.dynamicPanel.onMessage(`plugin-ui-${ctx.pluginId}`, async (data) => {
    if (data.type === 'connect') {
      await connect(data.config);
      await plugin.kvStore.set(ctx.pluginId, 'config', 'settings', JSON.stringify(data.config), true);
    }
    if (data.type === 'disconnect') {
      await disconnect();
    }
  });

  // Handle agent replies → send back to external platform
  plugin.gateway.onReply(async (reply) => {
    await sendToExternalPlatform(reply.externalThreadId, reply.text);
  });
});

async function connect(config: any) {
  botConnection = await createBotConnection(config.botToken);

  await plugin.gateway.registerChannel({
    name: 'My Channel',
    platform: 'my-platform',
    agentId: config.agentId || 'default',
    threadStrategy: config.threadStrategy || 'per-user',
  });

  botConnection.onMessage(async (msg: any) => {
    await plugin.gateway.routeMessage({
      source: 'channel',
      sourceId: 'my-channel-plugin',
      threadStrategy: config.threadStrategy || 'per-user',
      text: msg.text,
      userId: msg.userId,
      externalThreadId: msg.chatId,
      replyTo: {
        channelId: 'my-channel-plugin',
        externalThreadId: msg.chatId,
        userId: msg.userId,
      },
    });
  });
}

async function disconnect() {
  if (botConnection) {
    await botConnection.close();
    botConnection = null;
  }
}

plugin.onStop(async () => {
  await disconnect();
});
```

### Thread strategies

| Strategy | Behavior |
|---|---|
| `single` | All messages go to one thread |
| `per-user` | Each platform user gets their own thread |
| `per-conversation` | Each chat/group gets a thread |
| `per-message` | Every message creates a new thread |

### Channel API

| Method | Description |
|---|---|
| `plugin.gateway.registerChannel(config)` | Register as a message channel |
| `plugin.gateway.routeMessage(message)` | Route external message to an agent |
| `plugin.gateway.onReply(cb)` | Receive agent replies to send back to platform |
| `plugin.gateway.onMessageToChannel(cb)` | Receive proactive messages from the app |

---

## Creating an Execution Plugin

Intercepts all code execution and routes it to a remote environment.

### package.json

```json
{
  "name": "my-execution-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "execution",
      "gateway": { "claimsExecutionGateway": true },
      "triggers": [{ "type": "startup" }]
    }
  },
  "dependencies": {
    "@codebolt/plugin-sdk": "*"
  }
}
```

### src/index.ts

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async () => {
  // Claim exclusive control of execution — only ONE plugin can do this
  const result = await plugin.executionGateway.claim();
  if (!result.success) {
    console.error('Failed to claim gateway:', result.error);
    return;
  }

  // All execution requests now come here instead of running locally
  plugin.executionGateway.onRequest(async (request) => {
    try {
      const result = await fetch('https://my-remote-server.com/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: request.originalType,
          action: request.originalAction,
          payload: request.originalMessage,
        }),
      });
      const data = await result.json();
      plugin.executionGateway.sendReply(request.requestId, data, true);
    } catch (err: any) {
      plugin.executionGateway.sendReply(request.requestId, { error: err.message }, false);
    }
  });
});

plugin.onStop(async () => {
  await plugin.executionGateway.relinquish();
});
```

### Execution Gateway API

| Method | Description |
|---|---|
| `plugin.executionGateway.claim()` | Take exclusive control of execution |
| `plugin.executionGateway.relinquish()` | Release control (local execution resumes) |
| `plugin.executionGateway.onRequest(cb)` | Handle execution requests |
| `plugin.executionGateway.sendReply(id, result, success)` | Send response |
| `plugin.executionGateway.subscribe()` | Subscribe to notifications (non-exclusive, read-only) |
| `plugin.executionGateway.onNotification(cb)` | Observe execution without intercepting |

Only **one** plugin can claim the gateway at a time. Use `subscribe()` if you just want to monitor execution.

---

## Plugin UI Panels

Any plugin can show a custom UI panel by setting `ui.path` in the manifest:

```json
"codebolt": {
  "plugin": {
    "ui": { "path": "src/ui/index.html" }
  }
}
```

### Panel HTML (iframe)

```html
<script>
  // Send message to plugin process
  window.codeboltPlugin.sendMessage({ type: 'myAction', data: { key: 'value' } });

  // Receive messages from plugin process
  window.codeboltPlugin.onMessage((data) => {
    console.log('From plugin:', data);
  });
</script>
```

### Plugin side

```ts
// Send data to UI panel
await plugin.dynamicPanel.send('panel-id', { status: 'connected' });

// Receive messages from UI panel
plugin.dynamicPanel.onMessage('panel-id', (data) => {
  if (data.type === 'myAction') {
    // handle
  }
});

// Open a new panel programmatically
await plugin.dynamicPanel.open('my-panel', 'Panel Title', '<h1>Hello</h1>');

// Open and wait for user response (blocks until panel submits)
const response = await plugin.dynamicPanel.open('my-panel', 'Configure', html, {
  waitForResponse: true,
  timeout: 300000,
});
```

---

## Persistent Storage (KV Store)

Plugins should use `kvStore` (not the filesystem) for configuration and state:

```ts
// Create a named instance (once)
await plugin.kvStore.createInstance('my-plugin-config', 'Plugin configuration');

// Save data
await plugin.kvStore.set('my-plugin-config', 'settings', 'apiKey', 'sk-...', true);
// Parameters: instanceId, namespace, key, value, autoCreateInstance

// Load data
const result = await plugin.kvStore.get('my-plugin-config', 'settings', 'apiKey');
const apiKey = result?.value;

// Delete
await plugin.kvStore.delete('my-plugin-config', 'settings', 'apiKey');

// List all keys in a namespace
const namespaces = await plugin.kvStore.getNamespaces('my-plugin-config');
```

---

## All SDK Modules

Every plugin (regardless of type) has access to these modules:

| Module | What it does |
|---|---|
| **Core** | |
| `plugin.fs` | Read, write, search, list files and directories |
| `plugin.terminal` | Execute shell commands (sync, streaming, interruptible) |
| `plugin.git` | Git operations |
| `plugin.chat` | Send messages, ask questions, confirmations |
| `plugin.llm` | Make LLM calls through CodeBolt's provider system |
| `plugin.mcp` | Use MCP tools |
| **Storage** | |
| `plugin.kvStore` | Persistent key-value storage with namespaces |
| `plugin.vectordb` | Vector database operations |
| `plugin.dbmemory` | Memory operations |
| `plugin.knowledge` | Knowledge base operations |
| **UI** | |
| `plugin.dynamicPanel` | Open, update, close UI panels |
| **Project** | |
| `plugin.project` | Project info and paths |
| `plugin.environment` | Environment variables |
| `plugin.state` | State management |
| `plugin.codebaseSearch` | Semantic code search |
| `plugin.codemap` | Code structure map |
| **Tasks & Threads** | |
| `plugin.thread` | Thread management |
| `plugin.task` | Task management |
| `plugin.todo` | Todo list operations |
| `plugin.job` | Job management |
| **Communication** | |
| `plugin.mail` | Mail operations |
| `plugin.calendar` | Calendar operations |
| `plugin.browser` | Browser automation |
| **System** | |
| `plugin.hook` | Hook into application events |
| `plugin.agentEvents` | Listen for dynamic events emitted by agents |
| `plugin.narrative` | Narrative context |
| `plugin.eventLog` | Event logging |
| `plugin.debug` | Debug utilities |

---

## package.json Reference

```json
{
  "codebolt": {
    "plugin": {
      "type": "llmProvider | channel | execution",
      "triggers": [
        { "type": "startup" },
        { "type": "manual" },
        { "type": "event", "eventTypes": ["CHAT_MESSAGE_SENT"] }
      ],
      "gateway": {
        "claimsExecutionGateway": true
      },
      "ui": {
        "path": "src/ui/index.html"
      },
      "entryPoint": "index.js"
    }
  }
}
```

| Field | Description |
|---|---|
| `type` | Plugin type — determines which SDK modules are primary |
| `triggers` | When the plugin starts |
| `triggers[].type` | `"startup"`, `"manual"`, or `"event"` |
| `triggers[].eventTypes` | For event triggers — which events to listen for |
| `gateway.claimsExecutionGateway` | For execution plugins — claim exclusive control |
| `ui.path` | Path to HTML file for the plugin's UI panel |
| `entryPoint` | Override the `main` field for plugin process entry |

---

## See Also

- [Plugin SDK and Lifecycle](./02_sdk-and-lifecycle.md)
- [Major Functionalities](./03_functionalities.md)
- [Chat Gateway](./04_chat-gateway/01_overview.md)
- [Dynamic Panel Plugins](./05_dynamic-panel-plugins.md)
- [Custom AI Providers](./06_custom-ai-providers/01_overview.md)
- [Proxy Execution Gateway](./08_proxy-execution-gateway/01_overview.md)
- [Packaging and Publishing](./99_packaging-and-publishing.md)
