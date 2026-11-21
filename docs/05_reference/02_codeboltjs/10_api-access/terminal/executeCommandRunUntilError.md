---
name: executeCommandRunUntilError
description: Executes a given command and keeps running until an error occurs.
cbbaseinfo:
  description: Executes a given command and keeps running until an error occurs.
data:
  name: executeCommandRunUntilError
  category: terminal
  link: executeCommandRunUntilError.md
---

# executeCommandRunUntilError

```text
codebolt.terminal.executeCommandRunUntilError(command: string, executeInMain?: boolean): Promise<CommandError>
```

Executes a given command and keeps running until an error occurs.
Listens for messages from the WebSocket and resolves the promise when an error is encountered.

## Parameters

- `command` — The command to be executed.

## Returns

A promise that resolves when an error occurs during command execution.

## When to use it

Watch a command that is expected to keep running until it reports an error.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.terminal.executeCommandRunUntilError('npm run dev');
  console.log(result);
});
```
