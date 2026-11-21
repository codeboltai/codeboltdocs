---
name: updateAgentStatus
description: Update an agent's status.
cbbaseinfo:
  description: Update an agent's status.
data:
  name: updateAgentStatus
  category: swarm
  link: updateAgentStatus.md
---

# updateAgentStatus

```text
codebolt.swarm.updateAgentStatus(swarmId: string, agentId: string, data: AgentStatusUpdate): Promise<UpdateStatusResponse>
```

Update an agent's status

## Parameters

- `swarmId` — ID of the swarm
- `agentId` — ID of the agent
- `data` — Status update data

## Returns

Promise resolving to success confirmation

## When to use it

Report agent availability or current work so other members can make coordination decisions.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update agent status to active
  const result = await codebolt.swarm.updateAgentStatus(
      'swarm-123',
      'agent-789',
      { status: 'active' }
  );

  if (result.success) {
      console.log('✅ Agent status updated to active');
  } else {
      console.error('❌ Status update failed:', result.error);
  }
});
```

## More examples

### Status Update with Task Description

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update status with current task information
  const result = await codebolt.swarm.updateAgentStatus(
      'swarm-123',
      'agent-789',
      {
          status: 'busy',
          currentTask: 'Code review for PR #1234'
      }
  );

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('✅ Agent is now busy with:', result.data.message);
  }
});
```
