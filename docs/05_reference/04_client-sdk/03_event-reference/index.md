---
title: Sockets API
---

# Sockets API

Socket modules provide real-time WebSocket communication with the Codebolt server. Access via `client.sockets.<module>`.

All socket modules extend `TypedEventEmitter` and provide:

- `.on(event, handler)` — listen for an event
- `.off(event, handler)` — remove a listener
- `.once(event, handler)` — listen once

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for task updates
client.sockets.tasks.on('taskAdded', (data) => {
  console.log('New task:', data);
});

// Listen for chat messages
client.sockets.chat.on('message', (data) => {
  console.log('Message:', data);
});

// Listen across all sockets
client.onAllEvents((event) => {
  console.log(`[${event.socketName}] ${event.eventName}`, event.data);
});
```

## Available Sockets

| Socket | Description |
|---|---|
| [`agentDebug`](./agentDebug) | Agent debugging events |
| [`agentPortfolio`](./agentPortfolio) | Agent portfolio updates |
| [`aiTerminal`](./aiTerminal) | AI terminal interaction |
| [`backgroundAgent`](./backgroundAgent) | Background agent events |
| [`browser`](./browser) | Browser automation events |
| [`calendar`](./calendar) | Calendar events |
| [`capability`](./capability) | Capability updates |
| [`chat`](./chat) | Chat message streaming |
| [`codebolt`](./codebolt) | Codebolt core events |
| [`contextAssembly`](./contextAssembly) | Context assembly events |
| [`debug`](./debug) | Debug session events |
| [`editor`](./editor) | Editor synchronization |
| [`environmentDebug`](./environmentDebug) | Environment debug events |
| [`episodicMemory`](./episodicMemory) | Memory events |
| [`eventLog`](./eventLog) | Event log entries |
| [`fileUpdateIntent`](./fileUpdateIntent) | File update events |
| [`iconView`](./iconView) | Icon view updates |
| [`jobs`](./jobs) | Job monitoring events |
| [`knowledge`](./knowledge) | Knowledge base events |
| [`kvStore`](./kvStore) | Key-value store events |
| [`localModel`](./localModel) | Local model events |
| [`lsp`](./lsp) | Language Server Protocol |
| [`main`](./main) | Main connection events |
| [`orchestrator`](./orchestrator) | Orchestration events |
| [`persistentMemory`](./persistentMemory) | Persistent memory events |
| [`projectStructure`](./projectStructure) | Project structure changes |
| [`reviewMerge`](./reviewMerge) | Code review/merge events |
| [`roadmap`](./roadmap) | Roadmap updates |
| [`shell`](./shell) | PTY terminal — send commands, resize, receive output |
| [`swarm`](./swarm) | Swarm coordination events |
| [`systemAlert`](./systemAlert) | System alerts |
| [`tasks`](./tasks) | Task update events |
| [`updateRequest`](./updateRequest) | Update notifications |
