---
name: getAgentState
description: Retrieves the current state of the agent from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current state of the agent from the server via WebSocket.
data:
  name: getAgentState
  category: state
  link: getAgentState.md
---

# getAgentState

```text
codebolt.cbstate.getAgentState(): Promise<GetAgentStateResponse>
```

Retrieves the current state of the agent from the server via WebSocket.

## Returns

A promise that resolves with the agent's state.

## Example

### Basic Agent State Retrieval

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get the current agent state
  const agentState = await codebolt.cbstate.getAgentState();
  console.log('Agent state:', agentState);

  // }
});
```
