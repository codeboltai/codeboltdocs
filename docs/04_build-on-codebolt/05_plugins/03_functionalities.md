---
sidebar_position: 3
title: Major Plugin Functionalities
description: Plugins have access to a large part of the CodeBolt runtime through PluginClient. This page groups the major areas a plugin can work with.
---

# Major Plugin Functionalities

Plugins have access to a large part of the CodeBolt runtime through `PluginClient`. This page groups the major areas a plugin can work with.

## Files, Terminal, Git, and Project Context

Plugins can work with the local workspace and execution environment:

```ts
// File operations
const content = await plugin.fs.readFile('/path/to/file');
await plugin.fs.writeToFile('notes.txt', 'Updated by the plugin');
const files = await plugin.fs.listFile('.');

// Terminal execution
const result = await plugin.terminal.executeCommand('npm test');

// Git operations
const status = await plugin.git.status();
const log = await plugin.git.logs('.');

// Project info
const structure = await plugin.projectStructure.getMetadata();
const searchResults = await plugin.codebaseSearch.search('functionName');
```

**Modules:** `plugin.fs`, `plugin.terminal`, `plugin.git`, `plugin.project`, `plugin.projectStructure`, `plugin.codebaseSearch`, `plugin.codemap`, `plugin.environment`

## Chat, Tasks, Threads, and Jobs

Plugins can participate in the live application flow:

```ts
// Send a chat message
plugin.chat.sendMessage('Hello from the plugin');

// Create and manage tasks
await plugin.tasksApi.create({ title: 'Process data', priority: 'medium' });

// Work with threads
const threads = await plugin.threadsApi.list();

// Monitor jobs
plugin.sockets.jobs.on('message', (message) => {
  console.log('Jobs socket:', message);
});
```

**Modules:** `plugin.chat`, `plugin.task`, `plugin.thread`, `plugin.todo`, `plugin.job`, `plugin.chatApi`, `plugin.tasksApi`, `plugin.threadsApi`, `plugin.jobsApi`

## Knowledge, Memory, and State

Plugins can read and write application state for persistence and retrieval:

```ts
// Create the instance on the first write, then read the same key.
await plugin.kvStore.set(plugin.pluginId, 'settings', 'enabled', true, true);
const config = await plugin.kvStore.get(plugin.pluginId, 'settings', 'enabled');

const collections = await plugin.knowledgeApi.listCollections();
const state = await plugin.cbstate.getProjectState();
```

**Modules:** `plugin.knowledge`, `plugin.vectordb`, `plugin.kvStore`, `plugin.memory`, `plugin.cbstate`, `plugin.knowledgeApi`, `plugin.kvStoreApi`, `plugin.vectordbApi`

## Dynamic UI Inside the App

Plugins can render custom panels inside the existing CodeBolt UI:

```ts
// Open a panel with HTML content
const html = '<div id="app"><h1>My Plugin UI</h1><button id="btn">Click</button></div>';
await plugin.dynamicPanel.open('my-panel', 'Plugin Dashboard', html);

// Send data to the panel
await plugin.dynamicPanel.send('my-panel', { status: 'connected' });

// Receive messages from the panel
plugin.dynamicPanel.onMessage('my-panel', (data) => {
  if (data.type === 'buttonClicked') {
    // handle UI action
  }
});

// Update panel content
await plugin.dynamicPanel.update('my-panel', '<p>Connected</p>');

// Close panel
await plugin.dynamicPanel.close('my-panel');
```

**Real-world example:** The Telegram channel plugin uses a dynamic panel for connection configuration — users enter their bot token, select thread strategy, and connect/disconnect via the UI.

For the UI side of this model, see [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md).

## Browser, Calendar, Mail, and Notifications

Application-level service integrations:

```ts
// Read calendar events, registered mail agents, and event log instances.
const events = await plugin.calendarApi.listEvents();
const mailAgents = await plugin.mailApi.getAgents();
const logs = await plugin.eventLog.listInstances();

// Report completion of agent work.
plugin.notify.system.AgentCompletionNotify('Analysis complete');
```

**Modules:** `plugin.browser`, `plugin.calendar`, `plugin.mail`, `plugin.eventLog`, `plugin.notify`

## MCP and Hook Management

Plugins can work with extension infrastructure:

```ts
// Use the toolbox and tool identifiers from your MCP server.
async function runTool(toolbox: string, toolName: string, params: Record<string, unknown>) {
  const tools = await plugin.mcp.getTools([{ toolbox, toolName }]);
  if (!tools.success) throw new Error('Could not load the tool');
  return plugin.mcp.executeTool(toolbox, toolName, params);
}

const hooks = await plugin.hooks.list();
```

## Real-time Subscriptions

Under `plugin.sockets`, plugins subscribe to push-based channels for live event streams:

```ts
// Chat events
plugin.sockets.chat.on('message', (msg) => { /* ... */ });

// Task updates
plugin.sockets.tasks.on('taskUpdated', (task) => console.log(task));

// System alerts
plugin.sockets.systemAlert.on('system-alert:created', (alert) => console.log(alert));
```

Use socket subscriptions when your plugin needs to stay attached to a live stream of app events.

## Practical Examples from Built-in Plugins

| Plugin | What it uses |
|--------|-------------|
| `telegram-channel` | `gateway`, `dynamicPanel`, `kvStore` (config), `onReply` |
| `slack-channel` | `gateway`, `dynamicPanel`, `kvStore` (config), `onReply` |
| `codex-plugin` | `llmProvider` (register, completion, streaming, login) |
| `anthropic-plugin` | `llmProvider` (register, completion, streaming, login) |
| `remote-execution-plugin` | `executionGateway` (claim, onRequest) |
| `cloud-plugin` | `gateway`, `executionGateway` (subscribe, notifications) |

## Choosing the Right Surface

| Need | Use |
|------|-----|
| Runtime operations tied to server message bus | WebSocket modules (`plugin.fs`, `plugin.git`, etc.) |
| CRUD-style app operations | HTTP APIs (`plugin.tasksApi`, `plugin.projectsApi`, etc.) |
| Live event subscriptions | Sockets (`plugin.sockets.chat`, etc.) |
| Custom UI inside the app | Dynamic panels (`plugin.dynamicPanel`) |
| Extend core behavior | Gateway / Execution / LLM Provider modules |
| Persistent configuration | `plugin.kvStore` |

## See Also

- [Plugin SDK and Lifecycle](./02_sdk-and-lifecycle.md)
- [Chat Gateway](./04_chat-gateway/01_overview.md)
- [Custom AI Providers](./06_custom-ai-providers/01_overview.md)
- [Proxy Execution Gateway](./08_proxy-execution-gateway/01_overview.md)
