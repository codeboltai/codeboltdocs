# Debug

Send debug messages to the application.

## When to use it

Send a diagnostic message to the CodeBolt debug view or open a debug browser for an application you are inspecting.

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

## SDK methods

### debug

[`debug`](debugLog.md) · Sends a log message to the debug websocket and waits for a response.

### openDebugBrowser

[`openDebugBrowser`](openDebugBrowser.md) · Requests to open a debug browser at the specified URL and port.
