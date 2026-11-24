---
sidebar_position: 6
title: Build Your First Custom UI
description: Build a standalone web interface that connects to Codebolt using the Client SDK. Everything runs outside the existing Codebolt app — you own the entire UX.
---

# Build Your First Custom UI

Build a standalone web interface that connects to Codebolt using the Client SDK. Everything runs outside the existing Codebolt app — you own the entire UX.

**Prerequisites:** Codebolt installed and running, Node.js 18+, npm.

---

## Step 1: Start the Codebolt backend

```bash
codebolt --server
```

By default this listens on `localhost:2719`. Keep it running in a separate terminal.

---

## Step 2: Scaffold the project

```bash
npm create vite@latest my-codebolt-ui -- --template react-ts
cd my-codebolt-ui
npm install @codebolt/client-sdk
```

---

## Step 3: Create the Codebolt client

Create a single shared client instance for your entire app.

```typescript
// src/services/codebolt.ts
import { CodeBoltClient, ConnectionPreset } from '@codebolt/client-sdk';

export const codebolt = new CodeBoltClient({
  host: 'localhost',
  port: 2719,
  defaultPreset: ConnectionPreset.STANDARD,
});
```

The SDK automatically:

- Creates an HTTP client for REST API calls.
- Opens a multiplexed WebSocket connection for real-time events.
- Lazily initializes modules on first access (unused modules cost nothing).
- Reconnects automatically if the connection drops.

### Connection presets

| Preset | Sockets connected | Use case |
|---|---|---|
| `MINIMAL` | `main`, `systemAlert` | Lightweight scripts, HTTP-only clients |
| `STANDARD` | Low-speed + medium-speed sockets | Most custom UIs |
| `FULL` | All sockets except high-speed | Full-featured applications |

---

## Step 4: Make HTTP API calls

The SDK exposes typed HTTP modules. Access them via `codebolt.<module>.<method>()`:

```typescript
import { codebolt } from './services/codebolt';

// Tasks
const result = await codebolt.tasks.search({ limit: 50 });
console.log(result);

// Projects
const project = await codebolt.projects.getRoot();

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

// Knowledge
const collectionResponse: unknown = await codebolt.knowledge.listCollections();
if (collectionResponse && typeof collectionResponse === 'object' && 'data' in collectionResponse
    && Array.isArray(collectionResponse.data)) {
  console.log(collectionResponse.data);
}
```

Use the path of an open Git project and check the status response for changed files. When your interface offers a commit action, pass the selected files and the user’s message:

```ts
const response = await fetch('http://localhost:2719/git/commit', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ projectPath, filePaths: selectedFiles, message: commitMessage }),
});
if (!response.ok) throw new Error(await response.text());
```

Every module is lazily initialized — `codebolt.git` only allocates resources when you first access it.

---

## Step 5: Listen for real-time events

The SDK exposes WebSocket modules via `codebolt.sockets.<module>`:

```typescript
import { codebolt } from './services/codebolt';

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

// Debug: log every event from every connected socket
const unsub = codebolt.onAllEvents((event) => {
  console.log(`[${event.socketName}] ${event.eventName}`, event.data);
});

// Filter specific events
codebolt.onEvents(
  { socket: 'tasks', event: 'taskUpdated' },
  (event) => console.log('Task updated:', event.data),
);

// Unsubscribe when done
unsub();
```

---

## Step 6: Handle errors

The SDK provides typed error classes:

```typescript
import {
  CodeBoltApiError,
  CodeBoltConnectionError,
  CodeBoltTimeoutError,
} from '@codebolt/client-sdk';
import { codebolt } from './services/codebolt';

try {
  const tasks = await codebolt.tasks.search({ status: 'pending' });
} catch (err) {
  if (err instanceof CodeBoltConnectionError) {
    console.error('Cannot reach Codebolt server — is it running?');
  } else if (err instanceof CodeBoltTimeoutError) {
    console.error(`Request timed out after ${err.timeout}ms`);
  } else if (err instanceof CodeBoltApiError) {
    console.error(`API error ${err.status}: ${err.message}`);
  } else {
    throw err;
  }
}
```

---

## Step 7: Use in React components

Wrap the client in a hook and use it in components:

```typescript
// src/hooks/useCodebolt.ts
import { useEffect } from 'react';
import { codebolt } from '../services/codebolt';

export function useCodebolt() {
  useEffect(() => {
    return () => {
      codebolt.disconnectAll();
    };
  }, []);

  return codebolt;
}
```

```tsx
// src/components/TaskList.tsx
import { useEffect, useState } from 'react';
import { useCodebolt } from '../hooks/useCodebolt';

export function TaskList() {
  const client = useCodebolt();
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    // Load tasks via HTTP
    client.tasks.search({ limit: 50 }).then((result: unknown) => {
      if (result && typeof result === 'object' && 'data' in result && Array.isArray(result.data)) {
        setTasks(result.data);
      }
    });

    // Live updates via WebSocket
    client.sockets.tasks.on('taskAdded', (task) => {
      setTasks((prev) => [...prev, task]);
    });

    client.sockets.tasks.on('taskUpdated', (task) => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
    });

    client.sockets.tasks.on('taskDeleted', (data) => {
      setTasks((prev) => prev.filter((t) => t.id !== (data.id ?? data.taskId)));
    });
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} — <em>{task.status}</em>
        </li>
      ))}
    </ul>
  );
}
```

### Run it

```bash
npm run dev
```

---

## Step 8: Cleanup

Always disconnect when the app unmounts:

```tsx
// src/App.tsx
import { useEffect } from 'react';
import { codebolt } from './services/codebolt';
import { TaskList } from './components/TaskList';

export default function App() {
  useEffect(() => {
    return () => {
      codebolt.disconnectAll();
    };
  }, []);

  return (
    <div>
      <h1>My Codebolt UI</h1>
      <TaskList />
    </div>
  );
}
```

---

## Project structure

```
my-codebolt-ui/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   └── TaskList.tsx
│   ├── hooks/
│   │   └── useCodebolt.ts
│   └── services/
│       └── codebolt.ts
├── vite.config.ts
└── package.json
```

One service file, one hook, and your components. The SDK handles everything else.

---

## Available APIs

The Client SDK gives you access to **HTTP API modules** and **WebSocket modules**. See the [Client SDK Reference](./02_client-sdk.md) for the full list.

- **HTTP modules** (`codebolt.<module>`) — [Core](./02_client-sdk.md#core-modules), [Agent & Orchestration](./02_client-sdk.md#agent--orchestration), [Knowledge & Memory](./02_client-sdk.md#knowledge--memory), [Code & Editor](./02_client-sdk.md#code--editor), [Context & Planning](./02_client-sdk.md#context--planning), [Browser & Terminal](./02_client-sdk.md#browser--terminal), [Infrastructure & System](./02_client-sdk.md#infrastructure--system), [Productivity](./02_client-sdk.md#productivity), [UI & Misc](./02_client-sdk.md#ui--misc)
- **WebSocket modules** (`codebolt.sockets.<module>`) — [Full list](./02_client-sdk.md#websocket-modules)

---

## What you learned

- **One client, two layers**: `codebolt.tasks.search()` is an HTTP call; `codebolt.sockets.tasks.on(...)` is a WebSocket listener. Both go through the same `CodeBoltClient`.
- **Lazy initialization**: Modules are only created when you first access them.
- **Connection presets** control which WebSockets connect: `MINIMAL` for scripts, `STANDARD` for UIs, `FULL` for everything.
- **Typed errors** give you structured error handling.
- **Custom UIs are standalone apps.** They are different from [Dynamic Panels](./05_dynamic-panels.md), which inject UI surfaces *inside* the existing Codebolt app via agents or plugins.

---

## Where to next

- **Full SDK reference** — see [Client SDK](./02_client-sdk.md) for all HTTP modules and WebSocket modules.
- **Drop-in chat components** — see [Chat Widget](./04_chat-widget.md) for ready-made React chat components from `@codebolt/chat-widget`.
- **Embed UI inside the existing app** — see [Dynamic Panels](./05_dynamic-panels.md) for a different pattern where agents or plugins open panels inside Codebolt.
- **Study existing UIs** — see [Existing UIs](./03_existing-uis.md) to understand how the desktop, web, and terminal clients are built.

## See also

- [Custom Interfaces Overview](./01_overview.md)
- [Client SDK Reference](./02_client-sdk.md)
- [Existing UIs](./03_existing-uis.md)
- [Chat Widget](./04_chat-widget.md)
- [Dynamic Panels](./05_dynamic-panels.md)
