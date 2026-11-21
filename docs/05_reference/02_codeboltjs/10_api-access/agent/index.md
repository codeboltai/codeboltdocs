# Agent

Find, inspect, start, and message agents.

## When to use it

List agents to populate a picker. Use task-based discovery to narrow candidates, then pass the chosen identifier to a start or send operation.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';
import { FilterUsing, AgentLocation } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const result = await codebolt.agent.findAgent(
    'TypeScript testing',
    3,
    undefined,
    AgentLocation.LOCAL_ONLY,
    FilterUsing.USE_VECTOR_DB,
  );
  if (result.success) console.log(result.agents ?? []);
});
```

## List project agents and choose a candidate

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const response = await codebolt.agent.getAgentsList(Agents.LOCAL);
  if (!response.success) throw new Error(response.message ?? 'Could not list project agents.');

  const agents = (response.agents ?? []).filter(agent =>
    (agent.description ?? '').toLowerCase().includes('testing'),
  );
  console.log(agents.map(agent => agent.name));
});
```

## SDK methods

### findAgent

[`findAgent`](findAgent.md) · Retrieves an agent based on the specified task.

### startAgent

[`startAgent`](startAgent.md) · Starts an agent for the specified task.

### getAgentsList

[`getAgentsList`](getAgentsList.md) · Lists installed agents by default. Accepts a project or catalog scope.

### getAgentsDetail

[`getAgentsDetail`](getAgentsDetail.md) · Fetches metadata for known agent identifiers.

### sendMessage

Sends a message to an agent.

```text
codebolt.agent.sendMessage(params: AgentSendMessageOptions): Promise<AgentSendMessageResponse>
```
