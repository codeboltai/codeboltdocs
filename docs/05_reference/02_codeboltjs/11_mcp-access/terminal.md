---
title: Terminal MCP
sidebar_label: codebolt.terminal
sidebar_position: 16
---

# codebolt.terminal

Terminal command execution operations.

## Available Tools

- `execute_command` - Execute a terminal command

## Tool Parameters

### `execute_command`

Execute a CLI command on the system. Use this when you need to perform system operations or run specific commands to accomplish any step in the user's task. You must tailor your command to the user's system and provide a clear explanation of what the command does. Prefer to execute complex CLI commands over creating executable scripts, as they are more flexible and easier to run. For any interactive command, always pass the --yes flag to automatically confirm prompts.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| command | string | Yes | The CLI command to execute. This should be valid for the current operating system. Ensure the command is properly formatted and does not contain any harmful instructions. |
| explanation | string | No | One sentence explanation as to why this tool is being used, and how it contributes to the goal. Use correct tenses: I'll or Let me for future actions, past tense for past actions, present tense for current actions. |
| execution_mode | `auto` \| `foreground` \| `background` | No | Execution mode. `auto` waits briefly and yields long-running commands to background; `foreground` waits for completion; `background` returns a process id quickly for known persistent commands. |
| yield_ms | number | No | Milliseconds to wait before yielding in auto mode. Defaults to 3000ms. |
| timeout_ms | number | No | Hard timeout in milliseconds. |
| background_on_yield | boolean | No | Whether auto mode should return a background process response after the yield window. Defaults to true. |

## Sample Usage

```javascript
// Execute a terminal command
const execResult = await codebolt.tools.executeTool(
  "codebolt.terminal",
  "terminal_execute_command",
  { command: "npm run dev", execution_mode: "background" }
);
```

:::info
Short commands normally return final command output. Long-running commands can return `commandRunning` with a `processId`; use terminal command management APIs to inspect or stop the background process.
::: 
