---
sidebar_position: 5
title: Level 4 — Flow Visual Agent Builder
description: The Agent Flow editor is a drag-and-drop canvas for building agents without writing a main loop
---

# Flow — Visual Agent Builder

The **Agent Flow** editor is a drag-and-drop canvas for building agents without writing a main loop. You connect pre-built nodes — LLM calls, file operations, git commands, memory reads, conditional branches, and more — into a visual graph. Codebolt executes that graph at runtime as a fully functional agent.

## When to use the visual builder

| Use the flow builder when… | Use code levels when… |
|---|---|
| You want to prototype quickly without TypeScript boilerplate | You need custom processor logic |
| Your agent is a linear or branching pipeline | Your agent has a complex, dynamic loop |
| You want to compose Codebolt API nodes visually | You're integrating non-Codebolt systems |
| You need to hand the agent to a non-engineer to modify | You need a testable, version-controlled class |

Flow agents and code agents are fully interchangeable from the server's perspective — both receive tasks, execute, and return results through the same WebSocket protocol.

---

## Creating a flow agent

### From the desktop app

1. Open **Agent Creator** panel (sidebar or `⌘ K` → "Create Agent").
2. Select **Visual Flow Agent**.
3. Codebolt scaffolds an `.agentflow` file at:
   ```
   agentflows/agentflow_{timestamp}_{random}.agentflow
   ```
4. The **Agent Flow Editor** opens automatically.

### From the CLI

Create and edit visual flows in the desktop AgentFlow editor.

## The editor

```
┌─────────────────────────────────────────────────────────────────┐
│  [ Create ]  [ Save ]  [ Properties ]    my-flow-agent.agentflow│
├───────────────┬─────────────────────────────────┬───────────────┤
│               │                                 │               │
│  Node Palette │         Canvas                  │  Properties   │
│               │                                 │  Panel        │
│  ▸ Chat       │   ┌──────────┐    ┌──────────┐  │               │
│  ▸ File Sys   │   │OnMessage │───▶│Inference │  │  Node type    │
│  ▸ Git        │   └──────────┘    └──────────┘  │  name: value  │
│  ▸ LLM        │         │              │         │  ...          │
│  ▸ Memory     │         ▼              ▼         │               │
│  ▸ Tasks      │   ┌──────────┐    ┌──────────┐  │               │
│  ▸ Logic      │   │  Branch  │    │SendMsgNd │  │               │
│  ▸ Plugins    │   └──────────┘    └──────────┘  │               │
│               │                                 │               │
├───────────────┴─────────────────────────────────┴───────────────┤
│  Search nodes...                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Left panel — Node Palette:** Expandable categories of available nodes. Click a node to add it to the canvas; or drag it to a specific position.

**Center — Canvas:** The LiteGraph-powered graph editor. Drag nodes to reposition. Click and drag from an output slot to an input slot to create a connection. Right-click the canvas for a context menu.

**Right panel — Properties Panel:** Appears when you select a node. Shows that node's configurable fields (prompt, file path, key name, etc.) as editable inputs.

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Delete` / `Backspace` | Delete selected node or link |
| `Ctrl Z` / `⌘ Z` | Undo |
| `Ctrl Y` / `⌘ Y` | Redo |
| `Ctrl A` / `⌘ A` | Select all |
| Mouse wheel | Zoom canvas |
| Middle-drag | Pan canvas |
| `F` | Frame selected nodes |

---

## Node categories

Nodes are grouped into categories in the palette.

### Chat

| Node | What it does |
|---|---|
| `OnMessage` | Entry point — fires when the user sends a message |
| `SendMessage` | Sends a reply to the user in the chat panel |
| `GetChatHistory` | Retrieves the full conversation history |
| `WaitForReply` | Pauses execution until the user replies |
| `AskQuestion` | Sends a message and waits for a response |
| `SendNotificationEvent` | Emits a UI notification event |

### LLM / Inference

| Node | What it does |
|---|---|
| `Inference` | Calls the LLM with a prompt; returns the response |
| `GetModelConfig` | Reads the current model configuration |

### File System

| Node | What it does |
|---|---|
| `ReadFile` | Reads a file from disk |
| `WriteToFile` | Writes content to a file |
| `CreateFile` | Creates a new file |
| `UpdateFile` | Appends or replaces file content |
| `DeleteFile` | Deletes a file |
| `ListFile` | Lists files in a directory |
| `SearchFiles` | Searches for files matching a pattern |
| `GrepSearch` | Full-text grep across files |
| `FileSearch` | Fuzzy file name search |
| `EditFileWithDiff` | Applies a diff-style edit to a file |
| `ReadManyFiles` | Reads multiple files and concatenates |
| `ListDirectory` | Lists directory contents |

### Git

| Node | What it does |
|---|---|
| `GitStatus` | Runs `git status` |
| `GitAdd` | Stages files |
| `GitCommit` | Creates a commit |
| `GitPush` | Pushes to remote |
| `GitPull` | Pulls from remote |
| `GitCheckout` | Checks out a branch |
| `GitBranch` | Lists or creates branches |
| `GitLogs` | Retrieves commit history |
| `GitDiff` | Shows diff output |
| `GitInit` | Initialises a git repository |

### Memory

| Node | What it does |
|---|---|
| `MemoryAdd` | Writes a key-value entry |
| `MemoryGet` | Reads a key-value entry |
| `MemoryMarkdownSave` | Saves a markdown note |
| `MemoryMarkdownUpdate` | Updates a markdown note |
| `MemoryMarkdownList` | Lists markdown notes |
| `MemoryJsonSave` | Saves a JSON record |
| `MemoryJsonUpdate` | Updates a JSON record |
| `MemoryJsonList` | Lists JSON records |

### Tasks

| Node | What it does |
|---|---|
| `CreateTask` | Creates a task |
| `GetTaskList` | Lists all tasks |
| `StartTask` | Marks a task as started |
| `CompleteTask` | Marks a task as completed |
| `UpdateTask` | Updates task fields |
| `CreateTaskGroup` | Creates a task group |
| `GetTaskDetail` | Gets full task detail |
| `AddStepToTask` | Adds a sub-step to a task |
| `GetAllSteps` | Lists all steps for a task |

### Terminal

| Node | What it does |
|---|---|
| `ExecuteCommand` | Runs a shell command; returns output |
| `ExecuteCommandRunUntilError` | Retries a command until it errors |
| `ExecuteCommandWithStream` | Streams command output line by line |
| `SendManualInterrupt` | Sends SIGINT to the current command |

### MCP (Model Context Protocol)

| Node | What it does |
|---|---|
| `MCPGetEnabled` | Lists enabled MCP servers |
| `MCPListTools` | Lists tools from a server |
| `MCPExecuteTool` | Executes a named tool on an MCP server |
| `MCPConfigure` | Configures an MCP server connection |

### Agent Management

| Node | What it does |
|---|---|
| `StartAgent` | Spawns a child agent with a task |
| `FindAgent` | Finds an agent by name or ID |
| `ListAgents` | Lists all available agents |
| `AgentsDetail` | Gets metadata for an agent |

### Logic & Flow Control

| Node | What it does |
|---|---|
| `Branch` | If/else conditional — routes data based on a condition |
| `Sequence` | Executes connected nodes in strict order |
| `And` / `Or` / `Not` | Boolean operators |
| `Selector` | Picks one of N outputs based on an index |
| `Delay` | Pauses execution for a set duration |

### Data & Constants

| Node | What it does |
|---|---|
| `ConstantString` | String literal value |
| `ConstantNumber` | Numeric literal value |
| `ConstantBoolean` | Boolean literal value |
| `ConstantObject` | JSON object literal |
| `JSONParse` | Parses a JSON string into an object |
| `ToString` | Coerces any value to a string |
| `Compare` | Returns boolean result of a comparison |
| `Contains` | Checks if a string contains a substring |

### Output Parsing

| Node | What it does |
|---|---|
| `ParseJSON` | Extracts structured JSON from LLM output |
| `ParseCSV` | Parses CSV-formatted output |
| `ParseXML` | Parses XML-formatted output |
| `ParseText` | Extracts text blocks by pattern |
| `ParseErrors` | Extracts error messages from output |

### Web

| Node | What it does |
|---|---|
| `Search` | Performs a web search |
| `GetFirstLink` | Returns the first URL from search results |
| `CrawlerStart` | Opens a headless browser session |
| `CrawlerGoToPage` | Navigates to a URL |
| `CrawlerClick` | Clicks an element |
| `CrawlerScroll` | Scrolls the page |
| `CrawlerScreenshot` | Takes a screenshot |

### State

| Node | What it does |
|---|---|
| `GetAgentState` | Reads the current agent's state object |
| `AddToAgentState` | Adds or updates a key in agent state |
| `GetProjectState` | Reads project-level shared state |
| `UpdateProjectState` | Writes project-level state |

### Action Planning

| Node | What it does |
|---|---|
| `GetAllPlans` | Lists all action plans |
| `CreateActionPlan` | Creates a new action plan |
| `AddTaskToActionPlan` | Adds a task to a plan |
| `StartTaskStep` | Starts a step in an action plan |

---

## Connecting nodes

Nodes have **input slots** (left side, triangular) and **output slots** (right side, triangular). Drag from an output slot to an input slot to connect them. The connection type must match (e.g., a `string` output cannot connect directly to an `object` input without a converter node).

Data flows from left to right through connections. Execution triggers flow from event outputs — `OnMessage` fires first and pushes data downstream.

---

## Configuring a node

Select a node on the canvas to open the Properties Panel. Each field corresponds to a property of that node type:

- **String fields** — type directly into the text input
- **Number fields** — type a number; the field enforces the type
- **Boolean fields** — checkbox toggle
- **Template fields** — support `{{variable}}` interpolation from upstream node outputs

To wire an upstream output into a field, connect the output slot of the upstream node to the corresponding input slot on the target node.

---

## Agent Properties

Click **Properties** in the editor toolbar to open the Agent Properties dialog. These settings are saved to `codeboltagent.yaml`:

| Field | Description |
|---|---|
| `title` | Display name shown in the agent picker |
| `description` | Short description shown in the marketplace/picker |
| `version` | Semantic version string (e.g., `1.0.0`) |
| `type` | Must be `flowAgent` for visual flows |
| `agentId` | Unique ID — auto-generated from title if left empty |

---

## How flow agents run

When the server starts a `flowAgent`:

1. **Runtime initialization** — Codebolt extracts the bundled LiteGraph runtime to `{userData}/agentflow-runtime/` on first use and installs dependencies.
2. **Graph deserialization** — the `.agentflow` JSON is loaded and the LiteGraph graph object is reconstructed in memory.
3. **Execution** — the `OnMessage` node fires when a user message arrives, pushing the message content through connected nodes.
4. **Node execution** — each node's `onExecute()` method runs when upstream data is available. Codebolt API nodes make real SDK calls (file reads, LLM inference, git commands, etc.).
5. **Output** — a `SendMessage` node at the end of the graph sends the reply to the user.

The runtime is isolated: one LiteGraph instance per agent run. Crashes in the graph do not affect the server.

---

## Extending with custom nodes (plugins)

The palette is extensible via **Agent Node plugins** — npm packages placed in `.codebolt/AgentNodes/`. Each plugin contributes one or more new node types.

**Plugin discovery:**
The server scans `.codebolt/AgentNodes/` at startup for `package.json` files with a `codebolt.plugin` key. The UI loads each plugin's JavaScript bundle and registers the node types with LiteGraph.

**Minimal plugin structure:**

```
.codebolt/AgentNodes/my-nodes/
├── package.json
├── dist/
│   ├── index.cjs    ← server-side node logic
│   └── ui.js        ← browser bundle (registers nodes in LiteGraph)
```

**`package.json`:**

```json
{
  "name": "my-agentflow-nodes",
  "version": "1.0.0",
  "description": "Custom nodes",
  "codebolt": {
    "plugin": {
      "displayName": "My Nodes",
      "description": "Custom processing nodes",
      "category": "Custom",
      "nodes": [
        {
          "type": "my-nodes/SentimentNode",
          "title": "Sentiment Analysis",
          "description": "Scores text sentiment 0-1",
          "icon": "S",
          "color": "#6366f1"
        }
      ]
    }
  },
  "main": "dist/index.cjs",
  "browser": "dist/ui.js"
}
```

**UI bundle (`dist/ui.js`) — must export `registerNodes`:**

```typescript
import { LiteGraph } from 'litegraph.js';

class SentimentNode {
  static title = 'Sentiment Analysis';
  static metadata = {
    title: 'Sentiment Analysis',
    description: 'Scores text 0-1',
    icon: 'S',
    color: '#6366f1',
    category: 'Custom'
  };

  constructor() {
    this.addInput('text', 'string');
    this.addOutput('score', 'number');
    this.addOutput('label', 'string');
  }

  onExecute() {
    const text = this.getInputData(0);
    // Call backend or compute locally
    this.setOutputData(0, 0.85);
    this.setOutputData(1, 'positive');
  }
}

export function registerNodes(LiteGraph) {
  LiteGraph.registerNodeType('my-nodes/SentimentNode', SentimentNode);
}
```

After adding the plugin folder, restart the dev server and the new node appears in the palette under the plugin's category.

---

## The `.agentflow` file format

Flows are stored as plain JSON in LiteGraph's serialization format. They are version-controlled alongside your project. Example structure:

```json
{
  "version": 1,
  "type": "litegraph",
  "last_node_id": 4,
  "last_link_id": 3,
  "nodes": [
    {
      "id": 1,
      "type": "Chat/OnMessageNode",
      "title": "On Message",
      "pos": [100, 200],
      "outputs": [{ "name": "message", "type": "string", "links": [1] }]
    },
    {
      "id": 2,
      "type": "LLM/InferenceNode",
      "title": "LLM Call",
      "pos": [320, 200],
      "properties": { "systemPrompt": "You are a helpful assistant." },
      "inputs": [{ "name": "prompt", "type": "string", "link": 1 }],
      "outputs": [{ "name": "response", "type": "string", "links": [2] }]
    },
    {
      "id": 3,
      "type": "Chat/SendMessageNode",
      "title": "Send Reply",
      "pos": [560, 200],
      "inputs": [{ "name": "message", "type": "string", "link": 2 }]
    }
  ],
  "links": [
    [1, 1, 0, 2, 0, "string"],
    [2, 2, 0, 3, 0, "string"]
  ],
  "groups": [],
  "config": {},
  "metadata": { "createdAt": "2026-04-22T10:00:00.000Z" }
}
```

Each link entry is `[linkId, sourceNodeId, sourceSlot, targetNodeId, targetSlot, type]`.

---

## API reference

The Agent Flow system exposes a REST API at `/agentflow`:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/agentflow/create` | Create a new empty `.agentflow` file |
| `GET` | `/agentflow/get?filePath=` | Load flow data from disk |
| `PUT` | `/agentflow/update` | Save the current graph state to disk |
| `GET` | `/agentflow/plugins` | List all installed agent node plugins |
| `GET` | `/agentflow/plugins/:name/ui` | Serve a plugin's UI JavaScript bundle |

**Create:**
```http
POST /agentflow/create
→ { success: true, filePath: "agentflows/agentflow_1714000000_abc.agentflow" }
```

**Load:**
```http
GET /agentflow/get?filePath=agentflows/agentflow_1714000000_abc.agentflow
→ { success: true, data: { ...LiteGraphData }, filePath: "..." }
```

**Save:**
```http
PUT /agentflow/update
Body: { filePath: "...", graphData: { ...LiteGraphData }, name: "my-flow" }
→ { success: true, message: "Flow updated successfully", filePath: "..." }
```

---

## See also

- [Level 0 — Remix](./level-0-remix.md) — simplest custom agent (prompt only)
- [Level 1 — Framework](./level-1-framework.md) — code-based agent with full loop
- [Memory Management & Optimization](../../07a_memory-management/01_overview.md) — using memory nodes effectively in flows
