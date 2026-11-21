---
name: getProjectState
description: Retrieves the current project state from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current project state from the server via WebSocket.
data:
  name: getProjectState
  category: state
  link: getProjectState.md
---

# getProjectState

```text
codebolt.cbstate.getProjectState(): Promise<GetProjectStateResponse>
```

Retrieves the current project state from the server via WebSocket.

## Returns

A promise that resolves with the project's state.

## Example

### Basic Project State Retrieval

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get the current project state
  const projectState = await codebolt.cbstate.getProjectState();
  console.log('Project state:', projectState);

  // }
});
```
