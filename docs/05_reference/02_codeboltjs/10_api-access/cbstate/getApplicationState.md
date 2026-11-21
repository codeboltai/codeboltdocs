---
name: getApplicationState
description: Retrieves the current application state from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current application state from the server via WebSocket.
data:
  name: getApplicationState
  category: cbstate
  link: getApplicationState.md
---

# getApplicationState

```text
codebolt.cbstate.getApplicationState(): Promise<ApplicationState>
```

Retrieves the current application state from the server via WebSocket.

## Returns

A promise that resolves with the application state.

## When to use it

Read available application state for the current session. Use the project module when you specifically need the path or project settings.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.cbstate.getApplicationState();
  console.log(result);
});
```
