---
sidebar_position: 5
title: Dynamic Panel Plugins
description: Dynamic panel plugins give a plugin its own in-app UI.
---

# Dynamic Panel Plugins

Dynamic panel plugins give a plugin its own in-app UI.

Use this pattern when a plugin needs:

- configuration UI
- dashboards
- status views
- workflows that need richer interaction than chat alone

This is not a separate plugin `type`. It is a UI pattern any plugin can use.

## Basic Pattern

Set `ui.path` in the plugin manifest:

```json
{
  "codebolt": {
    "plugin": {
      "ui": { "path": "src/ui/index.html" }
    }
  }
}
```

Then communicate between the iframe UI and the plugin process.

## Browser-Side API

```html
<script>
  window.codeboltPlugin.sendMessage({ type: 'save', config: { key: 'value' } });

  window.codeboltPlugin.onMessage((data) => {
    console.log('From plugin:', data);
  });
</script>
```

## Plugin-Side API

```ts
// Send data to the panel
await plugin.dynamicPanel.send('panel-id', { status: 'connected' });

// Receive messages from the panel
plugin.dynamicPanel.onMessage('panel-id', async (data) => {
  if (data.type === 'save') {
    // handle
  }
});

// Open a panel programmatically
await plugin.dynamicPanel.open('my-panel', 'Panel Title', '<h1>Hello</h1>');

// Open and wait for response
const response = await plugin.dynamicPanel.open('config-panel', 'Configure', html, {
  waitForResponse: true,
  timeout: 300000
});
```

## Real Use Case: Plugin Settings UI

```ts
plugin.onStart(async (ctx) => {
  plugin.dynamicPanel.onMessage('plugin-ui-my-plugin', async (data) => {
    switch (data.type) {
      case 'save':
        await plugin.kvStore.set(ctx.pluginId, 'settings', 'config', data.config, true);
        await plugin.dynamicPanel.send('plugin-ui-my-plugin', {
          type: 'saved',
          success: true
        });
        break;

      case 'load':
        const config = await plugin.kvStore.get(ctx.pluginId, 'settings', 'config');
        await plugin.dynamicPanel.send('plugin-ui-my-plugin', {
          type: 'config',
          data: config.data?.value ?? null
        });
        break;
    }
  });
});
```

## Good Fit For Dynamic Panels

Dynamic panels work especially well for:

- chat gateway plugin configuration
- OAuth/account connection state
- provider setup
- plugin dashboards and job status
- operator controls

## Relationship To Custom UI Docs

Dynamic panels are plugin-scoped UI surfaces inside Codebolt.

For the broader application-side concept, see [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md).
For application patterns where the plugin acts as the backend for a larger UI, see [Custom Agentic Applications](../04b_custom-agentic-applications/01_overview.md).

## See Also

- [Plugins Overview](./01_overview.md)
- [Chat Gateway](./04_chat-gateway/01_overview.md)
- [Plugin SDK and Lifecycle](./02_sdk-and-lifecycle.md)
- [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md)
- [Custom Agentic Applications](../04b_custom-agentic-applications/01_overview.md)
- [Packaging and Publishing](./99_packaging-and-publishing.md)
