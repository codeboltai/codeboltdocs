---
sidebar_position: 4
title: Custom Tools
description: Build custom tools using the CodeboltJS tool framework and make them available to agents
---

# Creating Custom Tools

Build custom tools using the CodeboltJS tool framework and make them available to agents. This guide covers defining a tool, registering it, and wiring it into an agent's reasoning loop.

## Tool architecture

Every Codebolt tool has three layers:

1. **Tool class** (`BaseDeclarativeTool`) — declares name, description, schema, and validation
2. **Invocation class** (`BaseToolInvocation`) — holds validated params and runs the logic
3. **Registry** — stores tools and makes them discoverable by agents

```
Tool class (schema + validation)
  └── creates → Invocation (params + execute)
                  └── returns → ToolResult (llmContent + returnDisplay)
```

---

## Step 1 — Define the tool

Create a new file for your tool. This example builds a `word_count` tool that counts words in a given text.

### Define the parameters

```ts
// tools/word-count.ts

export interface WordCountParams {
  text: string;
  exclude_stopwords?: boolean;
}
```

### Create the invocation class

The invocation holds validated parameters and contains the execution logic:

```ts
import { BaseToolInvocation } from '@codebolt/codeboltjs/tools';
import type { ToolResult, ToolLocation } from '@codebolt/codeboltjs/tools';
import { ToolErrorType } from '@codebolt/codeboltjs/tools';

class WordCountInvocation extends BaseToolInvocation<WordCountParams, ToolResult> {
  constructor(params: WordCountParams) {
    super(params);
  }

  // Optional: return file paths this tool affects (for UI indicators)
  override toolLocations(): ToolLocation[] {
    return [];
  }

  async execute(): Promise<ToolResult> {
    try {
      let words = this.params.text.split(/\s+/).filter(w => w.length > 0);

      if (this.params.exclude_stopwords) {
        const stopwords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at']);
        words = words.filter(w => !stopwords.has(w.toLowerCase()));
      }

      const count = words.length;
      return {
        llmContent: JSON.stringify({ count, exclude_stopwords: !!this.params.exclude_stopwords }),
        returnDisplay: `Word count: ${count}`,
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return {
        llmContent: `Error: ${msg}`,
        returnDisplay: `Error: ${msg}`,
        error: {
          message: msg,
          type: ToolErrorType.EXECUTION_FAILED,
        },
      };
    }
  }
}
```

### Create the tool class

The tool class declares the schema the LLM sees and creates invocations:

```ts
import { BaseDeclarativeTool, Kind } from '@codebolt/codeboltjs/tools';
import type { ToolInvocation, ToolResult } from '@codebolt/codeboltjs/tools';

export class WordCountTool extends BaseDeclarativeTool<WordCountParams, ToolResult> {
  static readonly Name = 'word_count';

  constructor() {
    super(
      WordCountTool.Name,           // name — what the LLM calls
      'WordCount',                  // displayName — for UI
      'Count the number of words in a text string. Use when the user asks for word counts or text statistics. Do not use for character counts.',
      Kind.Read,                    // kind — read-only tool
      {                             // parameterSchema — JSON Schema
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text to count words in.',
          },
          exclude_stopwords: {
            type: 'boolean',
            description: 'Exclude common stopwords (the, a, an, etc.) from the count. Default false.',
            default: false,
          },
        },
        required: ['text'],
      },
    );
  }

  // Optional: custom validation beyond JSON schema
  protected override validateToolParamValues(params: WordCountParams): string | null {
    if (params.text.trim() === '') {
      return 'Text must not be empty.';
    }
    return null;
  }

  protected createInvocation(params: WordCountParams): ToolInvocation<WordCountParams, ToolResult> {
    return new WordCountInvocation(params);
  }
}
```

### Key properties

| Property | Purpose |
|---|---|
| `name` | The LLM calls the tool by this string. Use `snake_case`. |
| `displayName` | Shown in the UI. Use `PascalCase`. |
| `description` | The LLM reads this to decide when to call the tool. Be specific. |
| `kind` | Category for permissions and concurrency: `Read`, `Edit`, `Execute`, etc. |
| `parameterSchema` | JSON Schema describing the tool's inputs. |

### Kind values

| Kind | Meaning | Concurrency |
|---|---|---|
| `Read` | Read-only operations | Runs in parallel with other reads |
| `Edit` | Modifies files or content | Runs sequentially |
| `Delete` | Deletion operations | Runs sequentially |
| `Execute` | Runs commands or processes | Runs sequentially |
| `Search` | Search operations | Runs in parallel |
| `Fetch` | External network requests | Runs in parallel |
| `Other` | Miscellaneous | Runs sequentially |

---

## Step 2 — Register the tool

### Option A: Register in the global tool registry

```ts
import { defaultRegistry } from '@codebolt/codeboltjs/tools';
import { WordCountTool } from './tools/word-count';

defaultRegistry.registerTool(new WordCountTool());
```

Once registered, the tool is available to all agents via `codebolt.tools.executeTool('word_count', params)`.

### Option B: Register as a local project tool

Place the tool in `.codebolt/tools/` with a `codebolttool.yaml` for automatic discovery:

```
.codebolt/tools/
└── word-count/
    ├── codebolttool.yaml
    ├── index.js
    └── package.json
```

```yaml
# codebolttool.yaml
name: Word Count Tool
uniqueName: word_count
version: 1.0.0
description: Count words in text, with optional stopword exclusion
```

Codebolt scans this directory on startup and registers the tool automatically. See [Quickstart](./02_quickstart-local-mcp.md) for the full local tool setup.

---

## Step 3 — Use the tool from an agent

### Direct execution via SDK

```ts
import codebolt from '@codebolt/codeboltjs';

const { data } = await codebolt.tools.listRuntimeTools();
const tool = data.tools.find(item => item.toolName === 'word_count');
if (!tool) throw new Error('The word_count tool is not available.');

const result = await codebolt.tools.execute(tool.name, {
  text: 'Hello world this is a test',
  exclude_stopwords: true,
}, { sourceId: tool.sourceId });
console.log(result);
```

### Restrict tools available to an agent

Use `allowedTools` to control which tools an agent can access:

```ts
import { CodeboltAgent } from '@codebolt/agent';

const agent = new CodeboltAgent({
  instructions: 'You are a text analysis assistant.',
  allowedTools: [
    'codebolt--word_count',
    'codebolt--read_file',
    'codebolt--search',
  ],
});
```

When `allowedTools` is set, the `ToolInjectionModifier` filters out all other tools before sending them to the LLM. The agent only sees and can call the listed tools.

### How the agent discovers tools

On each turn, the agent framework:

1. **Tool injection** selects available tools for the model request. Use `codebolt.tools.listRuntimeTools()` to inspect the runtime catalog
2. Filters tools against the `allowedTools` list (if provided)
3. Injects tool schemas into the LLM request as function definitions
4. The LLM decides which tool to call based on the tool's `description`

### How the agent calls tools

When the LLM responds with a tool call:

1. **ResponseExecutor** parses the tool name (format: `toolbox--toolName`, e.g. `codebolt--word_count`)
2. Calls the tool execution API with the catalog name and arguments
3. Returns the result to the LLM as a tool response message
4. The LLM continues reasoning with the tool result

Read-only tools (`Kind.Read`, `Kind.Search`, `Kind.Fetch`) run in parallel when multiple are called at once. Mutating tools (`Kind.Edit`, `Kind.Execute`, `Kind.Delete`) run sequentially.

---

## Step 4 — Add user confirmation (optional)

For tools that modify state, implement `shouldConfirmExecute()` on the invocation class to prompt the user before execution:

```ts
class DangerousToolInvocation extends BaseToolInvocation<MyParams, ToolResult> {
  override async shouldConfirmExecute(): Promise<ToolCallConfirmationDetails | false> {
    return {
      type: 'exec',
      title: 'Confirm execution',
      message: `This will delete ${this.params.targetPath}. Continue?`,
    };
  }

  async execute(): Promise<ToolResult> {
    // runs only after user confirms
  }
}
```

The execution result includes a `[didUserReject, result]` tuple — if the user rejects, the agent handles it gracefully without retrying.

---

## Step 5 — Add custom validation

Beyond JSON Schema validation (which `BaseDeclarativeTool` handles automatically), add business logic validation by overriding `validateToolParamValues`:

```ts
protected override validateToolParamValues(params: MyParams): string | null {
  if (!path.isAbsolute(params.filePath)) {
    return `Path must be absolute, got: ${params.filePath}`;
  }
  if (params.limit !== undefined && params.limit < 1) {
    return 'Limit must be at least 1.';
  }
  return null; // valid
}
```

Return `null` for valid params, or an error message string. The error is returned to the LLM so it can correct its tool call.

---

## Step 6 — Expose tools via MCP server

Use [MCP Server Commands](../../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/03_tool-commands.md) to connect an MCP client to your running CodeBolt server.

## ToolResult format

Every tool returns a `ToolResult` object:

```ts
interface ToolResult {
  llmContent: string;           // Factual content sent back to the LLM
  returnDisplay: string;        // Markdown shown to the user in the UI
  error?: {
    message: string;
    type?: ToolErrorType;       // e.g. FILE_NOT_FOUND, INVALID_TOOL_PARAMS
  };
}
```

- **`llmContent`** — what the LLM reads. Keep it structured (JSON) for data, plain text for messages.
- **`returnDisplay`** — what the user sees. Can be markdown.
- **`error`** — present only on failure. Include a descriptive `message` so the LLM can recover. See [Error handling](./06_error-handling.md).

---

## Processor hooks

Agents can intercept tool calls before and after execution using processors:

### Pre-tool-call processor

Runs before each tool executes. Use for validation, logging, or tool interception:

```ts
import { BasePreToolCallProcessor } from '@codebolt/agent';

class MyToolValidator extends BasePreToolCallProcessor {
  async modify(input) {
    // Inspect or modify the prompt before tool execution
    return {
      nextPrompt: input.nextPrompt,
      shouldExit: false,
    };
  }
}
```

### Post-tool-call processor

Runs after tool results are collected. Use for result transformation or conversation compaction:

```ts
import { BasePostToolCallProcessor } from '@codebolt/agent';

class MyResultLogger extends BasePostToolCallProcessor {
  async modify(input) {
    console.log('Tool results:', input.toolResults);
    return {
      nextPrompt: input.nextPrompt,
      shouldExit: false,
    };
  }
}
```

### Wire processors into the agent

```ts
const agent = new CodeboltAgent({
  instructions: 'You are a helpful assistant.',
  processors: {
    preToolCallProcessors: [new MyToolValidator()],
    postToolCallProcessors: [new MyResultLogger()],
  },
});
```

---

## Complete example

A full custom tool from definition to agent usage:

```ts
// 1. Define and register the tool
import { BaseDeclarativeTool, BaseToolInvocation, Kind, defaultRegistry } from '@codebolt/codeboltjs/tools';
import type { ToolInvocation, ToolResult } from '@codebolt/codeboltjs/tools';

interface TimestampParams {
  format?: 'iso' | 'unix' | 'human';
}

class TimestampInvocation extends BaseToolInvocation<TimestampParams, ToolResult> {
  constructor(params: TimestampParams) { super(params); }

  async execute(): Promise<ToolResult> {
    const now = new Date();
    let formatted: string;
    switch (this.params.format ?? 'iso') {
      case 'unix':  formatted = String(Math.floor(now.getTime() / 1000)); break;
      case 'human': formatted = now.toLocaleString(); break;
      default:      formatted = now.toISOString(); break;
    }
    return {
      llmContent: JSON.stringify({ timestamp: formatted, format: this.params.format ?? 'iso' }),
      returnDisplay: formatted,
    };
  }
}

class TimestampTool extends BaseDeclarativeTool<TimestampParams, ToolResult> {
  static readonly Name = 'current_timestamp';
  constructor() {
    super(
      TimestampTool.Name,
      'CurrentTimestamp',
      'Get the current date and time. Use when the user asks what time it is or needs a timestamp.',
      Kind.Read,
      {
        type: 'object',
        properties: {
          format: {
            type: 'string',
            enum: ['iso', 'unix', 'human'],
            description: 'Output format. Default: iso.',
            default: 'iso',
          },
        },
        required: [],
      },
    );
  }
  protected createInvocation(params: TimestampParams): ToolInvocation<TimestampParams, ToolResult> {
    return new TimestampInvocation(params);
  }
}

defaultRegistry.registerTool(new TimestampTool());

// 2. Use from an agent
import { CodeboltAgent } from '@codebolt/agent';

const agent = new CodeboltAgent({
  instructions: 'You are a helpful assistant with access to a timestamp tool.',
  allowedTools: ['codebolt--current_timestamp', 'codebolt--read_file'],
});
```

## See also

- [MCP Tools Overview](./01_overview.md)
- [Tool schema](./03_tool-schema.md) — designing good tool schemas
- [Error handling](./06_error-handling.md) — making tools recoverable
- [Quickstart: Local MCP Server](./02_quickstart-local-mcp.md)
