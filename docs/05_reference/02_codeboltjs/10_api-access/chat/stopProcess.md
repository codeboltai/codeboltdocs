---
name: stopProcess
description: Stops the ongoing process.
cbbaseinfo:
  description: Stops the ongoing process.
data:
  name: stopProcess
  category: chat
  link: stopProcess.md
---

# stopProcess

```text
codebolt.chat.stopProcess(): void
```

Stops the ongoing process.
Sends a specific message to the server to stop the process.

## When to use it

Send the stop signal for the current process. Use the terminal or side-execution API for a separate managed run.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Start a process
  codebolt.chat.processStarted();

  // Do some work...

  // Stop the process
  codebolt.chat.stopProcess();
});
```
