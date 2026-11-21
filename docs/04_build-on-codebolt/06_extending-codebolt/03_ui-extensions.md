---
sidebar_position: 4
title: UI Extensions
description: A UI extension is a plugin that renders an interactive panel inside the Codebolt app
---

# UI Extensions

A UI extension is a plugin that renders an interactive panel inside the Codebolt app. The panel is a plain HTML file — you can use any markup, styles, and JavaScript. Codebolt renders it in a sandboxed iframe and provides a messaging bridge for bidirectional communication with your plugin backend.

## When to Write a UI Extension

- You need a settings or configuration panel for your plugin.
- You want a dashboard showing agent metrics, task progress, or system status.
- You're building a domain-specific view (DB browser, design token viewer, channel configuration).
- You need a human-in-the-loop workflow (approval dialogs, review panels).

## How It Works

1. Your plugin declares a UI path in `package.json`.
2. The Codebolt app discovers plugins with UIs and shows an "Open" button.
3. When the user clicks "Open", the server fetches the HTML, injects a messaging bridge, and serves it.
4. The app renders the HTML in a sandboxed iframe.
5. Your plugin backend and the panel communicate via bidirectional messaging.
6. If the plugin isn't running, the server auto-starts it when the UI is opened.

## Plugin Configuration

Declare the HTML file path in your plugin's `package.json`:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "ui": {
        "path": "./ui/default/index.html"
      },
      "triggers": [{ "type": "manual" }]
    }
  }
}
```

- `codebolt.plugin.ui.path` — path to the HTML file, relative to the plugin directory.
- The panel ID is automatically derived: `plugin-ui-my-plugin`.

## Panel-Side API (codeboltPlugin)

Codebolt injects a global `codeboltPlugin` object into your HTML — no imports needed.

| Method | Direction | Description |
|---|---|---|
| `codeboltPlugin.sendMessage(data)` | Panel to Plugin | Send a JSON message to the plugin backend |
| `codeboltPlugin.onMessage(handler)` | Plugin to Panel | Register a handler for incoming messages |
| `codeboltPlugin.offMessage(handler)` | — | Remove a previously registered handler |
| `codeboltPlugin.pluginId` | — | The plugin's ID (read-only) |

## Plugin Backend API

The Plugin SDK provides methods for the backend to communicate with the panel:

| Method | Direction | Description |
|---|---|---|
| `plugin.dynamicPanel.send(panelId, data)` | Plugin to Panel | Send a JSON message to the panel |
| `plugin.dynamicPanel.onMessage(panelId, handler)` | Panel to Plugin | Listen for messages from the panel |
| `plugin.dynamicPanel.offMessage(panelId)` | — | Remove the message handler |

## Asset Serving

The server injects a `<base>` tag into your HTML so relative paths resolve correctly. CSS, JS, and images within your plugin directory are served automatically.

You can use any frontend framework — just build it to static HTML, CSS, and JS files.

## Under the Hood

### Discovery

The server scans three locations for plugins:

1. Built-in plugins shipped with Codebolt.
2. Global plugins at `~/.codebolt/plugins/`.
3. Per-project plugins at `.codebolt/plugins/`.

Plugins with `codebolt.plugin.ui.path` in their `package.json` are marked as having a UI.

### Serving

When the user opens a plugin UI:

1. The app requests `GET /pluginui/:pluginId`.
2. The server resolves the HTML file path from the plugin manifest.
3. If the plugin isn't running, the server starts it as a child process.
4. The server registers a panel subscription so messages route to the plugin.
5. The server injects the `codeboltPlugin` bridge script and a `<base>` tag.
6. The HTML is returned to the app.

### Rendering

The app renders the HTML in a sandboxed iframe:

```
sandbox="allow-scripts allow-forms allow-same-origin"
```

### Message Routing

```
Panel HTML (iframe)
  │ codeboltPlugin.sendMessage(data)
  ▼
DynamicPanelComponent → WebSocket → Server → Plugin Process
  │ plugin.dynamicPanel.onMessage(panelId, handler)
```

The return path is the reverse: `plugin.dynamicPanel.send()` → server → WebSocket → iframe → `codeboltPlugin.onMessage()`.

### Security

- **Path traversal prevention** — resolved file paths must stay within the plugin directory.
- **Iframe sandboxing** — scripts, forms, and same-origin only; no navigation, popups, or modals.
- **Plugin isolation** — each plugin runs as a separate child process with its own token.

## See Also

- [Build Your First UI Extension](./04_build-your-first-ui-extension.md) — step-by-step tutorial
- [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md) — the panel system overview
- [Plugins Overview](../05_plugins/01_overview.md) — plugin development overview
