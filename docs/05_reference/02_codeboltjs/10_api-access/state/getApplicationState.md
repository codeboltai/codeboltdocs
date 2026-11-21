---
name: getApplicationState
description: Retrieves the current application state from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current application state from the server via WebSocket.
data:
  name: getApplicationState
  category: state
  link: getApplicationState.md
---

# getApplicationState

```text
codebolt.cbstate.getApplicationState(): Promise<ApplicationState>
```

Retrieves the current application state from the server via WebSocket.

## Returns

A promise that resolves with the application state.

## Example

### Basic Application State

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get the current application state
  const appState = await codebolt.cbstate.getApplicationState();
  console.log('Application state:', appState);

  // May include: version, configuration, settings, etc.
});
```
