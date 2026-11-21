---
sidebar_position: 5
title: Build Your First UI Extension
description: Create a plugin that renders an interactive panel inside the Codebolt app. The panel communicates bidirectionally with your plugin backend.
---

# Build Your First UI Extension

Create a plugin that renders an interactive panel inside the Codebolt app. The panel communicates bidirectionally with your plugin backend.

**Prerequisites:** Codebolt installed and running, Node.js 18+, npm.

---

## Step 1: Create the plugin project

```bash
mkdir my-ui-plugin && cd my-ui-plugin
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

## Step 2: Configure package.json

Set the `codebolt.plugin.ui.path` to point to your panel HTML file:

```json
{
  "name": "my-ui-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "ui": {
        "path": "./ui/default/index.html"
      },
      "triggers": [{ "type": "manual" }]
    }
  },
  "scripts": {
    "build": "tsc"
  }
}
```

The panel ID is derived from the plugin name: `plugin-ui-my-ui-plugin`.

---

## Step 3: Create the panel HTML

Create the file at `ui/default/index.html`:

```bash
mkdir -p ui/default
```

This is a standard HTML page. Codebolt injects a global `codeboltPlugin` object automatically — no imports needed.

### Send messages to the backend

Use `codeboltPlugin.sendMessage(data)`:

```html
<script>
  document.getElementById('saveBtn').addEventListener('click', () => {
    codeboltPlugin.sendMessage({
      type: 'save-settings',
      apiKey: document.getElementById('apiKey').value,
    });
  });
</script>
```

### Receive messages from the backend

Use `codeboltPlugin.onMessage(handler)`:

```html
<script>
  codeboltPlugin.onMessage((message) => {
    if (message.type === 'status') {
      document.getElementById('status').textContent = message.status;
    }
    if (message.type === 'data') {
      // Populate form from saved state
      document.getElementById('apiKey').value = message.apiKey || '';
    }
  });
</script>
```

### Request initial state on load

When the panel opens, the plugin may already have saved state. Request it immediately:

```html
<script>
  codeboltPlugin.sendMessage({ type: 'getStatus' });
</script>
```

### Use relative asset paths

CSS, JS, and images within your plugin directory are served automatically. Use relative paths:

```html
<link rel="stylesheet" href="./styles.css" />
<script src="./app.js"></script>
```

---

## Step 4: Create the plugin backend

Create `src/index.ts`. The backend does three things: listens for panel messages, sends data to the panel, and manages the plugin lifecycle.

### Listen for panel messages

```typescript
import plugin from '@codebolt/plugin-sdk';

const PANEL_ID = 'plugin-ui-my-ui-plugin';

plugin.dynamicPanel.onMessage(PANEL_ID, async (message: any) => {
  switch (message.type) {
    case 'save-settings':
      // Save the settings
      await plugin.kvStore.set('my-ui-plugin', 'config', 'settings', message, true);
      plugin.dynamicPanel.send(PANEL_ID, { type: 'status', status: 'saved' });
      break;

    case 'getStatus':
      // Load saved settings and send to panel
      const result = await plugin.kvStore.get('my-ui-plugin', 'config', 'settings');
      const saved = result?.data?.value;
      if (saved) {
        plugin.dynamicPanel.send(PANEL_ID, { type: 'data', ...saved });
        plugin.dynamicPanel.send(PANEL_ID, { type: 'status', status: 'loaded' });
      } else {
        plugin.dynamicPanel.send(PANEL_ID, { type: 'status', status: 'no config' });
      }
      break;
  }
});
```

### Send data to the panel

```typescript
plugin.dynamicPanel.send(PANEL_ID, {
  type: 'status',
  status: 'ready',
});
```

### Plugin lifecycle

```typescript
plugin.onStart(async (ctx: any) => {
  console.log('[MyUIPlugin] Started');
  plugin.dynamicPanel.send(PANEL_ID, { type: 'status', status: 'ready' });
});

plugin.onStop(async () => {
  console.log('[MyUIPlugin] Stopped');
});
```

---

## Step 5: Persist state across restarts

Use `plugin.kvStore` so the panel shows saved data after the plugin restarts:

```typescript
// Save
await plugin.kvStore.set('my-ui-plugin', 'config', 'settings', data, true);

// Load
const result = await plugin.kvStore.get('my-ui-plugin', 'config', 'settings');
const saved = result?.data?.value;
```

Send saved data to the panel in `onStart` or when the panel sends `getStatus`.

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
cp -r my-ui-plugin ~/.codebolt/plugins/my-ui-plugin

# Option 2: Per-project plugins (only this project, overrides global)
cp -r my-ui-plugin <your-project>/.codebolt/plugins/my-ui-plugin
```

### Load and start

1. Open the **Plugins panel** in Codebolt.
2. Click **Reload** to rescan plugin directories.
3. Your plugin appears in the list (state: "Loaded").
4. Click **Start** to launch the plugin process.
5. Click the **Open** button (appears for plugins with a UI) to see your panel.

### Development loop

There is no hot-reload. After making code changes:

```bash
# 1. Rebuild
npm run build

# 2. In the Codebolt Plugins panel:
#    Click Stop → Click Reload → Click Start
```

For faster iteration, run `tsc --watch` in one terminal so the build updates automatically whenever you save a file. Then just Stop → Reload → Start in the UI.

### REST API (alternative to UI)

You can also manage plugins via HTTP:

```bash
# Reload all plugins from disk
curl -X POST http://localhost:2719/plugins/load

# Start your plugin
curl -X POST http://localhost:2719/plugins/my-ui-plugin/start

# Stop your plugin
curl -X POST http://localhost:2719/plugins/my-ui-plugin/stop

# Check plugin status
curl http://localhost:2719/plugins/my-ui-plugin
```

### Where plugins are discovered

Codebolt scans these directories in order:

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
| Panel to Plugin | `codeboltPlugin.sendMessage(data)` | HTML file |
| Plugin to Panel | `plugin.dynamicPanel.send(panelId, data)` | TypeScript backend |
| Panel listens | `codeboltPlugin.onMessage(handler)` | HTML file |
| Plugin listens | `plugin.dynamicPanel.onMessage(panelId, handler)` | TypeScript backend |

All messages are JSON objects. Use a `type` field to distinguish message kinds.

---

## Project structure

```
my-ui-plugin/
├── package.json          # codebolt.plugin.ui.path points to the HTML
├── tsconfig.json
├── src/
│   └── index.ts          # Backend — messaging, persistence, lifecycle
├── ui/
│   └── default/
│       └── index.html    # Panel UI — rendered inside Codebolt
└── dist/
    └── index.js
```

---

## See Also

- [UI Extensions Overview](./03_ui-extensions.md) — concepts, API tables, architecture
- [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md) — the panel system overview
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
