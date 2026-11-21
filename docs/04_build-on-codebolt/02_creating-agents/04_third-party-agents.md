---
sidebar_position: 4
title: Third-Party Agents
description: Run an external CLI agent (Claude Code, Codex, Gemini, Cursor, etc.) inside Codebolt. The vendor CLI does the reasoning
---

# Third-Party Agents

Run an external CLI agent (Claude Code, Codex, Gemini, Cursor, etc.) inside Codebolt. The vendor CLI does the reasoning. Your Codebolt agent wraps it using the three-part pattern: **Executor → Formatter → Dispatcher**.

## Architecture

Every third-party agent follows the same pipeline:

```
User message
     │
     ▼
┌─ Executor ──────────────────────┐
│  Spawns CLI process             │
│  Yields raw stdout lines        │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│  Formatter                      │
│  Parses lines → CodeboltMessage │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│  Dispatcher                     │
│  Routes to codebolt.notify.*    │
└─────────────────────────────────┘
```

`createMessageStream()` wires the three together and yields messages to your code.

## Using an existing adapter

If the vendor is already supported, the wrapper is minimal:

```ts
import codebolt from '@codebolt/codeboltjs';
import { ThirdPartyAgents } from '@codebolt/thirdpartyagents';

codebolt.onMessage(async (reqMessage) => {
  const prompt =
    typeof reqMessage === 'string'
      ? reqMessage
      : reqMessage.userMessage ?? reqMessage.content ?? '';

  if (!prompt.trim()) return;

  const { projectPath } = await codebolt.project.getProjectPath();

  const handle = ThirdPartyAgents.claude(prompt, {
    codebolt: codebolt as any,
    cwd: projectPath || process.cwd(),
    permissionMode: 'bypassPermissions',
  });

  for await (const _message of handle.execute()) {
    // Messages are already auto-dispatched to codebolt.notify.*.
  }
});
```

Supported adapters: `claude`, `codex`, `gemini`, `cursor`, `opencode`, `pi`, `openclaw`.

## Creating a new third-party agent

When the vendor is not yet supported, you build three classes.

### Project structure

```text
my-vendor-agent/
├── codeboltagent.yaml
├── package.json
├── tsconfig.json
├── webpack.config.js
├── src/
│   ├── index.ts              # Entry point — codebolt.onMessage handler
│   ├── MyVendorExecutor.ts
│   ├── MyVendorFormatter.ts
│   └── MyVendorDispatcher.ts
└── dist/
    └── index.js
```

### Step 1: Create the Executor

The executor spawns the CLI and yields raw output lines.

```ts
import { BaseExecutor, ExecutorOptions } from '@codebolt/thirdpartyagents';

export interface MyVendorExecutorOptions extends ExecutorOptions {
  model?: string;
  // Add vendor-specific options here
}

export class MyVendorExecutor extends BaseExecutor {
  private vendorOptions: MyVendorExecutorOptions;

  constructor(options: MyVendorExecutorOptions) {
    super(options);
    this.vendorOptions = options;
  }

  // Return the CLI command path
  protected resolveCommand(): string {
    return this.resolveCommandPath('myvendor', [
      '/usr/local/bin/myvendor',
      // Add fallback paths
    ]);
  }

  // Build the CLI arguments array
  protected buildArgs(prompt: string): string[] {
    const args: string[] = [
      '--output-format', 'json',
      '--non-interactive',
    ];

    if (this.vendorOptions.model) {
      args.push('--model', this.vendorOptions.model);
    }

    args.push(prompt);
    return args;
  }

  // Optional: send prompt via stdin instead of CLI args
  protected getStdinInput(prompt: string): string | null {
    return null; // Return prompt string to use stdin
  }
}
```

`BaseExecutor` handles: process spawning, stdout/stderr streaming, lifecycle states (`idle` → `running` → `completed`/`stopped`/`error`), `stop()`, and `sendInput()`.

### Step 2: Create the Formatter

The formatter parses raw CLI output into `CodeboltMessage` objects.

```ts
import { BaseFormatter, CodeboltMessage } from '@codebolt/thirdpartyagents';

export class MyVendorFormatter extends BaseFormatter {
  parseLine(line: string, timestamp: string): CodeboltMessage[] {
    if (!line.trim()) return [];

    let parsed: any;
    try {
      parsed = JSON.parse(line);
    } catch {
      // Not JSON — treat as raw text
      return [{ type: 'raw', timestamp, text: line }];
    }

    switch (parsed.type) {
      case 'start':
        return [{
          type: 'init',
          timestamp,
          sessionId: parsed.session_id,
          model: parsed.model,
        }];

      case 'text':
        return [{
          type: 'assistant_text',
          timestamp,
          text: parsed.content,
        }];

      case 'tool_call':
        return [{
          type: 'tool_use',
          timestamp,
          toolName: parsed.tool,
          toolUseId: parsed.id,
          toolInput: parsed.input,
        }];

      case 'done':
        return [{
          type: 'result',
          timestamp,
          text: parsed.summary ?? '',
          usage: {
            inputTokens: parsed.usage?.input_tokens,
            outputTokens: parsed.usage?.output_tokens,
          },
        }];

      case 'error':
        return [{
          type: 'error',
          timestamp,
          text: parsed.message,
        }];

      default:
        return [];
    }
  }
}
```

### CodeboltMessage types

| Type | When to emit |
|---|---|
| `init` | Agent session started |
| `assistant_text` | LLM generated text |
| `thinking` | LLM reasoning/chain-of-thought |
| `tool_use` | LLM requested a tool call |
| `tool_result` | Tool returned a result |
| `result` | Agent run completed |
| `error` | Agent error |
| `system` | System-level info |
| `raw` | Unparsed output |

### Step 3: Create the Dispatcher

The dispatcher routes parsed messages to Codebolt's notification system.

```ts
import { BaseDispatcher, CodeboltMessage, CodeboltInstance } from '@codebolt/thirdpartyagents';

export class MyVendorDispatcher extends BaseDispatcher {
  dispatch(message: CodeboltMessage, codebolt: CodeboltInstance): void {
    switch (message.type) {
      case 'init':
        codebolt.notify.system.AgentInitNotify();
        break;

      case 'assistant_text':
        codebolt.notify.chat.AgentTextResponseNotify(message.text ?? '');
        break;

      case 'tool_use':
        this.dispatchToolUse(message, codebolt);
        break;

      case 'result':
        codebolt.notify.system.AgentCompletionNotify({
          usage: message.usage,
        });
        break;

      case 'error':
        codebolt.notify.chat.AgentTextResponseNotify(message.text ?? '', true);
        codebolt.notify.system.AgentCompletionNotify({ error: true });
        break;
    }
  }

  private dispatchToolUse(message: CodeboltMessage, codebolt: CodeboltInstance): void {
    const input = message.toolInput ?? {};

    switch (message.toolName) {
      case 'read_file':
        codebolt.notify.fs.FileReadRequestNotify(input.path);
        break;
      case 'write_file':
        codebolt.notify.fs.WriteToFileRequestNotify(input.path, input.content);
        break;
      case 'run_command':
        codebolt.notify.terminal.CommandExecutionRequestNotify(input.command);
        break;
      case 'search':
        codebolt.notify.codeutils.GrepSearchRequestNotify(input.query);
        break;
      default:
        // Unknown tool — show as text
        codebolt.notify.chat.AgentTextResponseNotify(
          `Tool: ${message.toolName}\n${JSON.stringify(input, null, 2)}`
        );
    }
  }
}
```

### Step 4: Wire it together

```ts
import codebolt from '@codebolt/codeboltjs';
import { createMessageStream } from '@codebolt/thirdpartyagents';
import { MyVendorExecutor } from './MyVendorExecutor';
import { MyVendorFormatter } from './MyVendorFormatter';
import { MyVendorDispatcher } from './MyVendorDispatcher';

codebolt.onMessage(async (reqMessage) => {
  const prompt =
    typeof reqMessage === 'string'
      ? reqMessage
      : reqMessage.userMessage ?? reqMessage.content ?? '';

  if (!prompt.trim()) return;

  const { projectPath } = await codebolt.project.getProjectPath();

  const executor = new MyVendorExecutor({
    cwd: projectPath || process.cwd(),
    model: 'vendor-model-name',
  });
  const formatter = new MyVendorFormatter();
  const dispatcher = new MyVendorDispatcher();

  const stream = createMessageStream(
    executor,
    formatter,
    dispatcher,
    codebolt as any,
    prompt,
  );

  for await (const message of stream) {
    // Auto-dispatched to codebolt.notify.* already.
    // Add extra logic here if needed.
  }
});
```

## Extending an existing adapter

To customize an existing adapter (e.g. add MCP support to Claude), extend just the part you need:

```ts
import { ClaudeExecutor } from '@codebolt/thirdpartyagents';

class ClaudeWithMcpExecutor extends ClaudeExecutor {
  constructor(options: any, private readonly mcpConfigPath: string) {
    super(options);
  }

  protected override buildArgs(prompt: string): string[] {
    const args = super.buildArgs(prompt);
    const promptArg = args.pop()!;
    args.push('--mcp-config', this.mcpConfigPath);
    args.push('-p', promptArg);
    return args;
  }
}
```

Then use it with `createMessageStream` alongside the existing `ClaudeFormatter` and `ClaudeDispatcher`. See `codeboltjs/agents/claude-thirdpartywithmcp` for the full working example with MCP server setup, session persistence, and steering.

## Adding MCP bridging

To expose Codebolt tools to the vendor CLI via MCP:

```ts
import { startCodeboltMcpServer } from '@codebolt/mcp-server';

const toolsModule = require('@codebolt/codeboltjs/tools').default;

const mcpHandle = await startCodeboltMcpServer({
  codebolt: codebolt as any,
  tools: toolsModule,
  transport: 'sse',
});

// mcpHandle.url → "http://127.0.0.1:<port>/sse"
// Pass this URL to your vendor CLI via its MCP config mechanism
// Call mcpHandle.close() on cleanup
```

## Session persistence

Store the vendor's session ID so conversations resume across messages:

```ts
// Save after each run
await codebolt.cbstate.addToAgentState('vendor_session_id', handle.sessionId);

// Load on next message
const state = await codebolt.cbstate.getAgentState();
const savedSessionId = state?.vendor_session_id;

// Pass to executor (vendor-specific — e.g. --resume for Claude)
```

## Steering

Forward external events to the running vendor CLI:

```ts
const pollTimer = setInterval(async () => {
  const events = await codebolt.agentEventQueue.getPendingEvents();
  for (const event of events) {
    if (event.type === 'steering' && event.instruction) {
      handle.sendInput(event.instruction);
    }
  }
}, 500);

// Clear on cleanup
clearInterval(pollTimer);
```

## Manifest

Third-party agents use the standard `codeboltagent.yaml` — no special fields needed:

```yaml
title: My Vendor Agent
version: 1.0.0
unique_id: my-vendor-agent
description: Run My Vendor CLI inside Codebolt.
tags: [thirdparty, vendor]
metadata:
  agent_routing:
    worksonblankcode: true
    worksonexistingcode: true
```

## See also

- [Level 0 — Remix](./03_agent-types/level-3-remix.md)
- [Level 1 — Framework](./03_agent-types/level-2-framework.md)
- [Level 2 — codeboltjs](./03_agent-types/level-1-codeboltjs.md)
