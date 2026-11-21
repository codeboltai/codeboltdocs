---
sidebar_position: 8
title: Build Your First Dynamic Panel
description: Dynamic panels let a plugin render an interactive UI inside the Codebolt app
---

# Build Your First Dynamic Panel

Dynamic panels let a plugin render an interactive UI inside the Codebolt app. The panel is a plain HTML file that communicates with your plugin backend through a simple message-passing API.

This guide walks through every step — from project setup to bidirectional communication.

**Prerequisites:** Codebolt installed and running, Node.js 18+, npm.

---

## Step 1: Create the plugin project

```bash
mkdir my-panel-plugin && cd my-panel-plugin
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
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

## Step 2: Declare the panel in package.json

The `codebolt.plugin.ui.path` field tells Codebolt which HTML file to render as the panel. The panel ID is automatically derived from your plugin name: `plugin-ui-<name>`.

```json
{
  "name": "my-panel-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "channel",
      "triggers": [{ "type": "manual" }],
      "ui": {
        "path": "./ui/default/index.html"
      }
    }
  },
  "scripts": {
    "build": "tsc"
  }
}
```

---

## Step 3: Create the panel HTML

Create the file at `ui/default/index.html`. This is a standard HTML page — you can use any markup, styles, and vanilla JS. Codebolt renders it inside an iframe and injects a `codeboltPlugin` global for messaging.

```bash
mkdir -p ui/default
```

### Sending messages to the plugin

Use `codeboltPlugin.sendMessage(data)` to send any JSON object to the plugin backend:

```html
<script>
  // Send a message when the user clicks a button
  document.getElementById('myButton').addEventListener('click', () => {
    codeboltPlugin.sendMessage({
      type: 'save-settings',
      payload: {
        apiKey: document.getElementById('apiKey').value,
        region: document.getElementById('region').value,
      },
    });
  });
</script>
```

### Receiving messages from the plugin

Use `codeboltPlugin.onMessage(handler)` to listen for messages sent by the plugin backend:

```html
<script>
  codeboltPlugin.onMessage((message) => {
    if (message.type === 'status') {
      document.getElementById('statusBar').textContent = message.status;
    }

    if (message.type === 'data') {
      // Populate form fields from saved data
      document.getElementById('apiKey').value = message.apiKey || '';
      document.getElementById('region').value = message.region || '';
    }
  });
</script>
```

### Requesting initial state on load

When the panel first opens, the plugin may already have state (e.g., saved config from a previous session). Request it immediately:

```html
<script>
  // Ask the backend for current state as soon as the panel loads
  codeboltPlugin.sendMessage({ type: 'getStatus' });
</script>
```

The `codeboltPlugin` global is injected automatically — no imports, no script tags, no setup required.

---

## Step 4: Create the plugin backend

Create `src/index.ts`. The plugin backend handles three things:

1. **Listening** for messages from the panel.
2. **Sending** data back to the panel.
3. **Lifecycle** — startup and shutdown.

### Listening for panel messages

Register a handler with `plugin.dynamicPanel.onMessage(panelId, handler)`:

```typescript
import plugin from '@codebolt/plugin-sdk';

const PANEL_ID = 'plugin-ui-my-panel-plugin';

plugin.dynamicPanel.onMessage(PANEL_ID, async (message: any) => {
  switch (message.type) {
    case 'save-settings':
      // Process the settings from the panel
      await handleSaveSettings(message.payload);
      break;
    case 'getStatus':
      // Panel just loaded, send current state
      sendCurrentState();
      break;
  }
});
```

The `PANEL_ID` must match `plugin-ui-` followed by the `name` field in your `package.json`.

### Sending data to the panel

Use `plugin.dynamicPanel.send(panelId, data)` to push any JSON object to the panel:

```typescript
function sendCurrentState() {
  plugin.dynamicPanel.send(PANEL_ID, {
    type: 'status',
    status: isConnected ? 'connected' : 'disconnected',
  });
}

function sendData(data: any) {
  plugin.dynamicPanel.send(PANEL_ID, {
    type: 'data',
    ...data,
  });
}
```

### Plugin lifecycle

Use `plugin.onStart()` to initialize when the plugin loads, and `plugin.onStop()` to clean up:

```typescript
plugin.onStart(async (ctx: any) => {
  console.log('Plugin started');
  // Load saved state, connect to external services, etc.
  sendCurrentState();
});

plugin.onStop(async () => {
  console.log('Plugin stopping');
  // Disconnect, release resources, etc.
});
```

---

## Step 5: Persist state across restarts

Use `plugin.kvStore` to save and load data so the plugin can restore its state after a restart:

```typescript
const KV_INSTANCE = 'my-panel-plugin';
const KV_NAMESPACE = 'config';
const KV_KEY = 'settings';

// Save
async function saveSettings(settings: any) {
  await plugin.kvStore.set(KV_INSTANCE, KV_NAMESPACE, KV_KEY, settings, true);
}

// Load
async function loadSettings() {
  const result = await plugin.kvStore.get(KV_INSTANCE, KV_NAMESPACE, KV_KEY);
  return result?.data?.value ?? null;
}
```

A common pattern is to load saved settings in `onStart` and send them to the panel so form fields are pre-populated:

```typescript
plugin.onStart(async (ctx: any) => {
  const saved = await loadSettings();
  if (saved) {
    plugin.dynamicPanel.send(PANEL_ID, { type: 'data', ...saved });
  }
});
```

---

## Step 6: Build, install, and test

### Build

```bash
npm run build
```

### Install locally

Copy the plugin to one of the directories Codebolt scans:

```bash
# Option 1: Global plugins (available in all projects)
cp -r my-panel-plugin ~/.codebolt/plugins/my-panel-plugin

# Option 2: Per-project plugins (only this project, overrides global)
cp -r my-panel-plugin <your-project>/.codebolt/plugins/my-panel-plugin
```

### Load and start

1. Open the **Plugins panel** in Codebolt.
2. Click **Reload** to rescan plugin directories.
3. Your plugin appears in the list (state: "Loaded").
4. Click **Start** to launch the plugin process.
5. Click the **Open** button to see your panel.

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

```bash
# Reload all plugins from disk
curl -X POST http://localhost:2719/plugins/load

# Start your plugin
curl -X POST http://localhost:2719/plugins/my-panel-plugin/start

# Stop your plugin
curl -X POST http://localhost:2719/plugins/my-panel-plugin/stop
```

### Where plugins are discovered

| Directory | Scope |
|---|---|
| Built-in plugins (shipped with Codebolt) | All projects |
| `~/.codebolt/plugins/` | All projects (global) |
| `<project>/.codebolt/plugins/` | Current project only (overrides global) |

Per-project plugins override global plugins with the same name.

---

## Communication summary

| Direction | API | Where |
|---|---|---|
| Panel → Plugin | `codeboltPlugin.sendMessage(data)` | In the HTML file |
| Plugin → Panel | `plugin.dynamicPanel.send(panelId, data)` | In the TypeScript backend |
| Panel listens | `codeboltPlugin.onMessage(handler)` | In the HTML file |
| Plugin listens | `plugin.dynamicPanel.onMessage(panelId, handler)` | In the TypeScript backend |
| Remove listener | `plugin.dynamicPanel.offMessage(panelId)` | In the TypeScript backend |
| List panels | `plugin.dynamicPanel.list()` | In the TypeScript backend |

All messages are JSON objects. Use a `type` field to distinguish different kinds of messages.

---

## Project structure

```
my-panel-plugin/
├── package.json          # codebolt.plugin.ui.path points to the HTML
├── tsconfig.json
├── src/
│   └── index.ts          # Plugin backend — messaging, lifecycle, persistence
├── ui/
│   └── default/
│       └── index.html    # Panel UI — rendered inside Codebolt
└── dist/
    └── index.js          # Compiled output
```

---

## See Also

- [Dynamic Panels Overview](./05_dynamic-panels.md) — concepts, agent API, use cases
- [Custom UI](./06_custom-ui.md) — standalone app outside the Codebolt app
- [Client SDK](./02_client-sdk.md) — full API reference
- [Plugins](../05_plugins/01_overview.md) — plugin development overview
