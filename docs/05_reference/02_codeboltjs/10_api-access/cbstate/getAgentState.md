---
name: getAgentState
description: Retrieves the current state of the agent from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current state of the agent from the server via WebSocket.
data:
  name: getAgentState
  category: cbstate
  link: getAgentState.md
---

# getAgentState

```text
codebolt.cbstate.getAgentState(): Promise<GetAgentStateResponse>
```

Retrieves the current state of the agent from the server via WebSocket.

## Returns

A promise that resolves with the agent's state.

## When to use it

Read previously stored progress markers or preferences for the current agent.

## Example

### Access Specific Values

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve the agent state
  const agentState = await codebolt.cbstate.getAgentState();

  // Access specific values you've stored
  if (agentState.payload == null) throw new Error('The response is missing payload.');
  const userPreference = agentState.payload.user_preference;
  if (agentState.payload == null) throw new Error('The response is missing payload.');
  const sessionId = agentState.payload.session_id;
  if (agentState.payload == null) throw new Error('The response is missing payload.');
  const userLanguage = agentState.payload.user_language;
  if (agentState.payload == null) throw new Error('The response is missing payload.');
  const debugMode = agentState.payload.debug_mode;

  console.log(`User Preference: ${userPreference}`);
  console.log(`Session ID: ${sessionId}`);
  console.log(`User Language: ${userLanguage}`);
  console.log(`Debug Mode: ${debugMode}`);
});
```

## Read a value saved by the current agent

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  await codebolt.cbstate.addToAgentState('review-phase', 'ready');
  const result = await codebolt.cbstate.getAgentState();
  if (result.success) console.log(result.payload?.['review-phase']);
});
```
