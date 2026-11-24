---
sidebar_position: 5
title: Custom UI
description: A custom UI is a standalone application that connects to the Codebolt server over HTTP and WebSocket
---

import CustomUIArchitecture from '@site/src/components/diagrams/CustomUIArchitecture';

# Custom UI

A custom UI is a standalone application that connects to the Codebolt server over HTTP and WebSocket. You own the entire user experience — layout, branding, routing, and device. It runs *outside* the existing Codebolt app.

This is different from a [Dynamic Panel](./05_dynamic-panels.md), which injects a UI surface *inside* the existing app and is driven by a plugin or agent.

## Architecture

<CustomUIArchitecture />

1. Start the Codebolt server with `codebolt --server` (by default the CLI listens on `localhost:2719`).
2. Your app connects via the [Client SDK](./02_client-sdk.md).
3. The SDK provides **HTTP API modules** for request/response calls and **WebSocket modules** for real-time events.
4. All modules are lazily initialized — unused modules cost nothing.

## Client SDK

The `@codebolt/client-sdk` package is the primary way to build a custom UI. Install it with:

```bash
npm install @codebolt/client-sdk
```

Create a client instance:

```typescript
import { CodeBoltClient, ConnectionPreset } from '@codebolt/client-sdk';

const codebolt = new CodeBoltClient({
  host: 'localhost',
  port: 2719,
  defaultPreset: ConnectionPreset.STANDARD,
});
```

### HTTP API

Access typed modules via `codebolt.<module>`:

```typescript
// Tasks
const result = await codebolt.tasks.search({ limit: 50 });

// Git
const projectPath = '/absolute/path/to/your/project';
const status = await fetch('http://localhost:2719/git/status', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ projectPath }),
});
if (!status.ok) throw new Error(await status.text());
console.log(await status.json());

// Files
const content = await codebolt.fileRead.read({ path: 'src/index.ts' });

// Agents
const agents = await codebolt.agents.getInstalled();

// Projects
const project = await codebolt.projects.getRoot();
```

Use the path of an open Git project and check the status response for changed files. When your interface offers a commit action, pass the selected files and the user’s message:

```ts
const response = await fetch('http://localhost:2719/git/commit', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ projectPath, filePaths: selectedFiles, message: commitMessage }),
});
if (!response.ok) throw new Error(await response.text());
```

See the full module list in the [API Reference](../../05_reference/04_client-sdk/02_api-reference/index.md).

### WebSocket Events

Access real-time modules via `codebolt.sockets.<module>`:

```typescript
// Task updates
codebolt.sockets.tasks.on('taskAdded', (data) => {
  console.log('New task:', data);
});

codebolt.sockets.tasks.on('taskUpdated', (data) => {
  console.log('Task changed:', data);
});

// Agent coordination
codebolt.sockets.swarm.on('agent:status-changed', (data) => {
  console.log('Agent status changed:', data);
});

// System alerts
codebolt.sockets.systemAlert.on('system-alert:created', (data) => {
  console.log('Alert:', data);
});

// Debug: log all events
const unsub = codebolt.onAllEvents((event) => {
  console.log(`[${event.socketName}] ${event.eventName}`, event.data);
});
```

See the full event list in the [Event Reference](../../05_reference/04_client-sdk/03_event-reference/index.md).

### Connection Presets

Control which WebSockets connect automatically:

| Preset | Sockets connected | Use case |
|---|---|---|
| `MINIMAL` | `main`, `systemAlert` | Lightweight scripts, HTTP-only clients |
| `STANDARD` | Low-speed + medium-speed sockets | Most custom UIs |
| `FULL` | All sockets except high-speed | Full-featured applications |

### Error Handling

The SDK provides typed error classes:

| Error | When |
|---|---|
| `CodeBoltConnectionError` | Cannot reach the server |
| `CodeBoltTimeoutError` | Request timed out |
| `CodeBoltApiError` | HTTP error with status code |

```typescript
import { CodeBoltApiError, CodeBoltConnectionError } from '@codebolt/client-sdk';

try {
  await codebolt.tasks.search({ status: 'pending' });
} catch (err) {
  if (err instanceof CodeBoltConnectionError) {
    console.error('Server not reachable');
  } else if (err instanceof CodeBoltApiError) {
    console.error(`API error ${err.status}: ${err.message}`);
  }
}
```

### Cleanup

Always disconnect when your app shuts down:

```typescript
await codebolt.disconnectAll();
```

## When to Build a Custom UI

- You want to own the whole application shell — branding, layout, routing.
- Your UI runs outside the existing Codebolt desktop/web app.
- You're building a "Codebolt for X" vertical product.
- You need a device-specific interface (mobile, CLI, IDE extension).
- You want to embed Codebolt in a larger application (internal portal, custom editor).

## Custom UI vs Dynamic Panel

| Custom UI | Dynamic Panel |
|---|---|
| Standalone app, you own the entire UX | Embedded inside the existing Codebolt app |
| Connects via Client SDK | Driven by a plugin or agent |
| Any framework (React, Vue, CLI, mobile) | HTML rendered in an iframe |
| Full access to the HTTP and WebSocket modules | Bidirectional messaging with the owning plugin/agent |
| For products, dashboards, custom workflows | For settings panels, confirmation dialogs, monitoring views |

## See Also

- [Build Your First Custom UI](./06_build-your-first-custom-ui.md) — step-by-step tutorial
- [API Reference](../../05_reference/04_client-sdk/02_api-reference/index.md) — all HTTP API modules
- [Event Reference](../../05_reference/04_client-sdk/03_event-reference/index.md) — all WebSocket event modules
- [Client SDK Overview](../../05_reference/04_client-sdk/01_overview.md) — SDK overview
- [Existing UIs](./03_existing-uis.md) — reference implementations to study or fork
- [Chat Widget](./04_chat-widget.md) — drop-in React chat components
- [Dynamic Panels](./05_dynamic-panels.md) — UI inside the existing app
