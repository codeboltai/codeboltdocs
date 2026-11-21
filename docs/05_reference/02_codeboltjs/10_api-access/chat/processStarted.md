---
name: processStarted
description: Notifies the server that a process has started and sets up a listener for stopProcessClicked events.
cbbaseinfo:
  description: Notifies the server that a process has started and sets up a listener for stopProcessClicked events.
data:
  name: processStarted
  category: chat
  link: processStarted.md
---

# processStarted

```text
codebolt.chat.processStarted(onStopClicked?: (message: StopProcessMessage) => void): ProcessControl | ProcessControlWithCleanup
```

Notifies the server that a process has started and sets up a listener for stopProcessClicked events.

## Parameters

- `onStopClicked` — Callback function to handle stop process events.

## Returns

An object containing a stopProcess method.

## When to use it

Show that an agent operation has started. If you supply a stop callback, handle cancellation within your operation.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Notify that a process has started
  const processControl = codebolt.chat.processStarted();

  // Do some work...
  console.log('Process running...');

  // Stop the process when done
  processControl.stopProcess();
});
```
