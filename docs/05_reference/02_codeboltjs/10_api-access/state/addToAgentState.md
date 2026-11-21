---
name: addToAgentState
description: Adds a key-value pair to the agent's state on the server via WebSocket.
cbbaseinfo:
  description: Adds a key-value pair to the agent's state on the server via WebSocket.
data:
  name: addToAgentState
  category: state
  link: addToAgentState.md
---

# addToAgentState

```text
codebolt.cbstate.addToAgentState(key: string, value: string): Promise<AddToAgentStateResponse>
```

Adds a key-value pair to the agent's state on the server via WebSocket.

## Parameters

- `key` — The key to add to the agent's state.
- `value` — The value associated with the key.

## Returns

A promise that resolves with the response to the addition request.

## Examples

### Add Simple Value to Agent State

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a key-value pair to agent state
  const result = await codebolt.cbstate.addToAgentState('lastAction', 'file-read');
  console.log('Added to agent state:', result);

  // }
});
```

### Explanation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.cbstate.addToAgentState('status', 'active');
  await codebolt.cbstate.addToAgentState('count', '42');
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const data = { processed: 10, failed: 2 };
  await codebolt.cbstate.addToAgentState('stats', JSON.stringify(data));
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const timestamp = new Date().toISOString();
  await codebolt.cbstate.addToAgentState('lastUpdate', timestamp);
});
```
