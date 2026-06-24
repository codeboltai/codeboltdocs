---
sidebar_position: 2
title: Client SDK
description: "@codebolt/client-sdk is a typed TypeScript client for all Codebolt HTTP routes and WebSocket channels"
---

# Client SDK

`@codebolt/client-sdk` is a typed TypeScript client for all Codebolt HTTP routes and WebSocket channels. It lives in `packages/clientsdk` and is the primary entry point for building custom UIs on top of Codebolt.

## Backend Setup

1. Run the CLI in server-only mode.
2. The CLI hosts the backend from `packages/server`.
3. Connect your UI through the SDK.

```bash
codebolt --server
```

## Installation

```bash
npm install @codebolt/client-sdk
```

## Quick Start

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

// Create a client (connects automatically by default)
const client = new CodeBoltClient({
  host: 'localhost',
  port: 12345,
});

// HTTP API usage
const threads = await client.chat.getThreadsInfo();
await client.git.commit({ message: 'fix bug' });
const tasks = await client.tasks.search({ status: 'pending' });

// WebSocket usage
client.sockets.shell.on('output', (data) => console.log(data));
client.sockets.shell.send('ls -la');

// Listen to all socket events
const unsub = client.onAllEvents((event) => {
  console.log(event);
});

// Cleanup
await client.disconnectAll();
```

## Configuration

Pass a partial `CodeBoltConfig` to the constructor. Missing fields use defaults.

```typescript
interface CodeBoltConfig {
  host: string;                    // default: 'localhost'
  port: number;                    // default: 12345 (or SOCKET_PORT env var)
  basePath: string;                // default: '/'
  httpTimeout: number;             // default: 30000 (ms)
  wsReconnect: boolean;            // default: true
  wsReconnectInterval: number;     // default: 1000 (ms)
  wsMaxReconnectAttempts: number;  // default: 10
  debug: boolean;                  // default: false
  autoConnect?: boolean;           // default: true
  defaultPreset?: ConnectionPreset; // default: MINIMAL
  defaultSockets?: string[];
  excludeHighSpeed?: boolean;      // default: true
}
```

### Connection Presets

Control which WebSockets connect automatically:

| Preset | Sockets | Use case |
|---|---|---|
| `MINIMAL` | `main`, `systemAlert` | Lightweight clients that only need HTTP APIs |
| `STANDARD` | Low-speed + medium-speed sockets | Most custom UIs |
| `FULL` | All sockets except high-speed | Full-featured applications |

```typescript
import { CodeBoltClient, ConnectionPreset } from '@codebolt/client-sdk';

const client = new CodeBoltClient({
  defaultPreset: ConnectionPreset.STANDARD,
});
```

## Architecture

The SDK has two communication layers:

- **HTTP API modules** (72 modules) — request/response calls over REST
- **WebSocket modules** (34 modules) — real-time bidirectional channels

All modules are **lazily initialized** on first access, so unused modules don't allocate resources.

## HTTP API Modules

Access via `client.<module>`. Every module is a class with typed methods wrapping Codebolt REST endpoints.

### Core Modules

| Property | Class | Description |
|---|---|---|
| `chat` | `ChatApi` | Thread management, messaging, steps, steering |
| `threads` | `ThreadsApi` | Thread CRUD |
| `threadSteps` | `ThreadStepsApi` | Thread step management |
| `agents` | `AgentsApi` | Agent lifecycle — start, install, configure |
| `tasks` | `TasksApi` | Task search, create, update, delete, statistics |
| `taskActivity` | `TaskActivityApi` | Task activity tracking |
| `projects` | `ProjectsApi` | Project lifecycle, file trees, workspace |
| `git` | `GitApi` | Git operations — commit, push, pull, branch, diff, graph |
| `file` | `FileApi` | File CRUD, existence checks, zip |
| `fileRead` | `FileReadApi` | File reading |
| `llm` | `LlmApi` | LLM providers, models, pricing |

### Agent & Orchestration

| Property | Class | Description |
|---|---|---|
| `agentFlow` | `AgentFlowApi` | Agent workflow orchestration |
| `agentExecution` | `AgentExecutionApi` | Execution tracking |
| `agentExecutionPhases` | `AgentExecutionPhasesApi` | Execution phase management |
| `agentDeliberation` | `AgentDeliberationApi` | Deliberation processes |
| `agentPortfolioApi` | `AgentPortfolioApi` | Agent portfolio management |
| `agentDebugApi` | `AgentDebugApi` | Agent debugging |
| `backgroundAgents` | `BackgroundAgentsApi` | Background agent management |
| `swarm` | `SwarmApi` | Multi-agent swarm coordination |
| `orchestrator` | `OrchestratorApi` | Orchestration control |
| `reviewMerge` | `ReviewMergeApi` | Code review and merge |

### Knowledge & Memory

| Property | Class | Description |
|---|---|---|
| `knowledge` | `KnowledgeApi` | Knowledge collections, documents, retrieval |
| `knowledgeGraph` | `KnowledgeGraphApi` | Knowledge graph operations |
| `memory` | `MemoryApi` | Memory management |
| `memoryIngestion` | `MemoryIngestionApi` | Memory ingestion |
| `persistentMemory` | `PersistentMemoryApi` | Persistent memory storage |
| `vectorDb` | `VectorDbApi` | Vector database operations |
| `kvStore` | `KvStoreApi` | Key-value store |

### Code & Editor

| Property | Class | Description |
|---|---|---|
| `editorApi` | `EditorApi` | Editor operations |
| `codebaseIndex` | `CodebaseIndexApi` | Codebase indexing |
| `codemap` | `CodemapApi` | Code mapping |
| `languageServer` | `LanguageServerApi` | LSP integration |
| `shadowGit` | `ShadowGitApi` | Shadow git operations |
| `fileUpdateIntents` | `FileUpdateIntentsApi` | File update intent tracking |

### Context & Planning

| Property | Class | Description |
|---|---|---|
| `contextAssembly` | `ContextAssemblyApi` | Context assembly |
| `contextRuleEngine` | `ContextRuleEngineApi` | Context rules |
| `planner` | `PlannerApi` | Planning operations |
| `actionPlans` | `ActionPlansApi` | Action plan management |
| `actionBlocks` | `ActionBlocksApi` | Action block management |
| `requirementPlan` | `RequirementPlanApi` | Requirement planning |
| `specs` | `SpecsApi` | Specification management |

### Browser & Terminal

| Property | Class | Description |
|---|---|---|
| `browser` | `BrowserApi` | Browser automation — navigate, click, fill, screenshot |
| `terminalProcesses` | `TerminalProcessesApi` | Terminal process management |

### Infrastructure & System

| Property | Class | Description |
|---|---|---|
| `system` | `SystemApi` | System operations |
| `application` | `ApplicationApi` | Application management |
| `apps` | `AppsApi` | Apps management |
| `environments` | `EnvironmentsApi` | Environment management |
| `environmentDebugApi` | `EnvironmentDebugApi` | Environment debugging |
| `mcp` | `McpApi` | MCP server management |
| `codeboltTools` | `CodeboltToolsApi` | Codebolt tools |
| `hooks` | `HooksApi` | Hooks management |
| `localModels` | `LocalModelsApi` | Local model management |
| `autoTesting` | `AutoTestingApi` | Automated testing |

### Productivity

| Property | Class | Description |
|---|---|---|
| `calendar` | `CalendarApi` | Calendar and scheduling |
| `mail` | `MailApi` | Email operations |
| `inbox` | `InboxApi` | Inbox operations |
| `todos` | `TodosApi` | Todo management |
| `roadmap` | `RoadmapApi` | Roadmap management |
| `jobs` | `JobsApi` | Job management |

### UI & Misc

| Property | Class | Description |
|---|---|---|
| `canvas` | `CanvasApi` | Canvas operations |
| `capability` | `CapabilityApi` | Capability management |
| `controllk` | `ControllkApi` | Ctrl+K command palette |
| `eventLog` | `EventLogApi` | Event logging |
| `history` | `HistoryApi` | History tracking |
| `iconView` | `IconViewApi` | Icon view |
| `profile` | `ProfileApi` | User profile |
| `projectStructure` | `ProjectStructureApi` | Project structure |
| `templates` | `TemplatesApi` | Template management |
| `themes` | `ThemesApi` | Theme management |
| `updateRequests` | `UpdateRequestsApi` | Update request tracking |
| `users` | `UsersApi` | User management |
| `workspace` | `WorkspaceApi` | Workspace management |

## WebSocket Modules

Access via `client.sockets.<module>`. Each socket extends `TypedEventEmitter` and manages its own connection through the `SocketConnectionManager`.

| Property | Class | Description |
|---|---|---|
| `shell` | `ShellSocket` | PTY terminal — send commands, resize, receive output |
| `chat` | `ChatSocket` | Chat message streaming |
| `debug` | `DebugSocket` | Debug session events |
| `codebolt` | `CodeboltSocket` | Codebolt core events |
| `browser` | `BrowserSocket` | Browser automation events |
| `tasks` | `TasksSocket` | Task update events |
| `jobs` | `JobsSocket` | Job monitoring events |
| `aiTerminal` | `AiTerminalSocket` | AI terminal interaction |
| `editor` | `EditorSocket` | Editor synchronization |
| `main` | `MainSocket` | Main connection events |
| `lsp` | `LspSocket` | Language Server Protocol |
| `capability` | `CapabilitySocket` | Capability updates |
| `swarm` | `SwarmSocket` | Swarm coordination events |
| `reviewMerge` | `ReviewMergeSocket` | Code review/merge events |
| `agentPortfolio` | `AgentPortfolioSocket` | Agent portfolio updates |
| `calendar` | `CalendarSocket` | Calendar events |
| `episodicMemory` | `EpisodicMemorySocket` | Memory events |
| `roadmap` | `RoadmapSocket` | Roadmap updates |
| `projectStructure` | `ProjectStructureSocket` | Project structure changes |
| `updateRequest` | `UpdateRequestSocket` | Update notifications |
| `backgroundAgent` | `BackgroundAgentSocket` | Background agent events |
| `knowledge` | `KnowledgeSocket` | Knowledge base events |
| `fileUpdateIntent` | `FileUpdateIntentSocket` | File update events |
| `persistentMemory` | `PersistentMemorySocket` | Persistent memory events |
| `contextAssembly` | `ContextAssemblySocket` | Context assembly events |
| `kvStore` | `KvStoreSocket` | Key-value store events |
| `eventLog` | `EventLogSocket` | Event log entries |
| `iconView` | `IconViewSocket` | Icon view updates |
| `localModel` | `LocalModelSocket` | Local model events |
| `systemAlert` | `SystemAlertSocket` | System alerts |
| `orchestrator` | `OrchestratorSocket` | Orchestration events |
| `agentDebug` | `AgentDebugSocket` | Agent debug events |
| `environmentDebug` | `EnvironmentDebugSocket` | Environment debug events |

## Connection Management

```typescript
// Add specific socket connections at runtime
await client.addConnections(['shell', 'chat']);

// Check active connections
const active = client.getActiveConnections();

// Remove connections
await client.removeConnections(['shell']);

// Subscribe to filtered events
const unsub = client.onEvents(
  { socketName: 'chat', eventType: 'message' },
  (event) => console.log(event),
);

// Unsubscribe
unsub();

// Disconnect everything
await client.disconnectAll();
```

## Error Handling

The SDK provides typed error classes:

| Error | Code | Description |
|---|---|---|
| `CodeBoltError` | `CODEBOLT_ERROR` | Base error |
| `CodeBoltApiError` | `API_ERROR` | HTTP errors with `status`, `statusText`, `data` |
| `CodeBoltSocketError` | `SOCKET_ERROR` | WebSocket errors with `socketUrl` |
| `CodeBoltConnectionError` | `CONNECTION_ERROR` | Connection failures with `url` |
| `CodeBoltTimeoutError` | `TIMEOUT_ERROR` | Timeout errors with `timeout` value |

```typescript
import { CodeBoltApiError } from '@codebolt/client-sdk';

try {
  await client.tasks.search();
} catch (err) {
  if (err instanceof CodeBoltApiError) {
    console.error(`API error ${err.status}: ${err.message}`);
  }
}
```

## Exports

The package re-exports everything from a single entry point:

```typescript
import {
  // Primary client
  CodeBoltClient,
  CodeBoltSockets,

  // Configuration
  CodeBoltConfig,
  DEFAULT_CONFIG,
  mergeConfig,

  // Core utilities
  HttpClient,
  SocketConnectionManager,
  ConnectionPreset,
  EventFilter,

  // Errors
  CodeBoltError,
  CodeBoltApiError,
  CodeBoltSocketError,
  CodeBoltConnectionError,
  CodeBoltTimeoutError,

  // All type definitions
  // All API module classes
  // All Socket module classes
} from '@codebolt/client-sdk';
```

## Getting Started

For a step-by-step tutorial that walks through scaffolding a project, making API calls, and subscribing to real-time WebSocket events, see [Build your first custom UI](../../03_guides/02_first-steps/build-your-first-custom-ui.md).

## When to Use

- You want to own the whole application shell
- Your UI runs outside the built-in app
- You need custom branding, routing, layout, or device-specific UX
- You're building a "Codebolt for X" vertical product

## See Also

- [Existing UIs](./03_existing-uis.md)
- [Chat Widget](./04_chat-widget.md)
- [Internals → Communication](../07b_subsystems/11_communication.md)
