---
sidebar_position: 99
title: Packaging and Publishing Plugins
description: When your plugin is ready to share, follow this checklist and publish it to the CodeBolt registry.
---

# Packaging and Publishing Plugins

When your plugin is ready to share, follow this checklist and publish it to the CodeBolt registry.

## Pre-publish Checklist

- [ ] `package.json` includes a valid `codebolt.plugin` block
- [ ] `main` field points to the compiled entry file (`dist/index.js`)
- [ ] Plugin builds successfully (`npm run build`)
- [ ] Plugin starts cleanly and handles `onStart()` without crashing
- [ ] `onStop()` performs proper cleanup (unregister providers, close connections)
- [ ] Required credentials or environment setup is documented
- [ ] If using UI panels, the HTML file exists at the declared `ui.path`

### By plugin type

**LLM Provider plugins:**
- Document `providerId` and supported models
- Document config fields users need to fill in (API key, base URL, etc.)
- Handle both `onCompletionRequest` and `onStreamRequest`

**Chat gateway plugins (`"type": "channel"`):**
- Document the external platform setup (bot tokens, webhook URLs)
- Document where the plugin saves its connection settings
- Provide a UI panel for connection configuration
- Document supported thread strategies

**Execution plugins:**
- Document what types of requests are intercepted
- Document the response shape returned via `sendReply`
- Explain the remote environment setup

## Local Development Loop

1. **Build** — `npm run build`
2. **Install** to a plugin directory:
   ```bash
   # Per-project (for testing)
   cp -r my-plugin/ <project>/.codebolt/plugins/my-plugin/

   # Or global
   cp -r my-plugin/ ~/.codebolt/plugins/my-plugin/
   ```
3. **Reload** in Plugins panel (click Reload), then Start
4. **Iterate** — run `npx tsc --watch`, stop/restart from Plugins panel after each rebuild

## Publish

```bash
codebolt action plugin publish --path ./my-plugin
```

List published plugins:

```bash
codebolt action plugin list
```

## Common Mistakes

| Mistake | Fix |
|---|---|
| Missing `codebolt.plugin` in package.json | Server won't recognize as a plugin |
| Forgetting to build `dist/index.js` | Always `npm run build` before loading |
| Settings disappear on restart | Load saved settings on startup using the same location or key used when saving |
| Not handling `onStop()` cleanup | Leads to dangling connections, leaked subscriptions |
| Using `startup` trigger for chat gateway plugins that need config | Use `manual` — auto-load saved config in `onStart` |
| Using `@codebolt/client-sdk` instead of `@codebolt/plugin-sdk` | Client SDK is for standalone UIs, plugin SDK is for server extensions |

## See Also

- [Plugins Overview](./01_overview.md)
- [Plugin SDK and Lifecycle](./02_sdk-and-lifecycle.md)
- [Chat Gateway](./04_chat-gateway/01_overview.md)
- [Dynamic Panel Plugins](./05_dynamic-panel-plugins.md)
- [Custom AI Providers](./06_custom-ai-providers/01_overview.md)
