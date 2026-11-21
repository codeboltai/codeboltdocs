---
name: debug
description: Sends a log message to the debug websocket and waits for a response.
cbbaseinfo:
  description: Sends a log message to the debug websocket and waits for a response.
data:
  name: debug
  category: debug
  link: debugLog.md
---

# debug

```text
codebolt.debug.debug(log: string, type: logType): Promise<DebugAddLogResponse>
```

Sends a log message to the debug websocket and waits for a response.

## Parameters

- `log` — The log message to send.
- `type` — The type of the log message (info, error, warning).

## Returns

A promise that resolves with the response from the debug event.

## Example

### Send an informational log to CodeBolt

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const level = 'info' as Parameters<typeof codebolt.debug.debug>[1];
  const response = await codebolt.debug.debug('Project scan finished.', level);
  console.log(response);
});
```
