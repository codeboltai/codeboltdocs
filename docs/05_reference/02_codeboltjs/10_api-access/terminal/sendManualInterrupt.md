---
name: sendManualInterrupt
description: Sends a manual interrupt signal to the terminal.
cbbaseinfo:
  description: Sends a manual interrupt signal to the terminal.
data:
  name: sendManualInterrupt
  category: terminal
  link: sendManualInterrupt.md
---

# sendManualInterrupt

```text
codebolt.terminal.sendManualInterrupt(): Promise<TerminalInterruptResponse>
```

Sends a manual interrupt signal to the terminal.

## When to use it

Send an interrupt to the running terminal command when the user wants to stop it.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.terminal.sendManualInterrupt();
  console.log(result);
});
```
