---
name: assignRole
description: Assign a role to an agent.
cbbaseinfo:
  description: Assign a role to an agent.
data:
  name: assignRole
  category: swarm
  link: assignRole.md
---

# assignRole

```text
codebolt.swarm.assignRole(swarmId: string, roleId: string, agentId: string): Promise<AssignRoleResponse>
```

Assign a role to an agent

## Parameters

- `swarmId` — ID of the swarm
- `roleId` — ID of the role
- `agentId` — ID of the agent

## Returns

Promise resolving to success confirmation

## When to use it

Associate an agent with an existing role when it takes on a responsibility.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Assign a role to an agent
  const result = await codebolt.swarm.assignRole(
      'swarm-123',
      'role-456',
      'agent-789'
  );

  if (result.success) {
      console.log('✅ Role assigned successfully');
  } else {
      console.error('❌ Role assignment failed:', result.error);
  }
});
```

## More examples

### Assign Multiple Roles to Agent

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Assign multiple roles to a single agent
  const swarmId = 'swarm-123';
  const agentId = 'agent-789';
  const roleIds = ['role-dev', 'role-reviewer', 'role-deployer'];

  for (const roleId of roleIds) {
      const result = await codebolt.swarm.assignRole(swarmId, roleId, agentId);

      if (result.success) {
          console.log(`✅ Assigned role ${roleId} to agent`);
      } else {
          console.error(`❌ Failed to assign ${roleId}:`, result.error);
      }
  }
});
```

### Assign Role to Multiple Agents

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Assign one role to multiple agents (e.g., team lead role)
  const swarmId = 'swarm-123';
  const roleId = 'role-senior-dev';
  const agentIds = ['agent-001', 'agent-002', 'agent-003'];

  const assignments = [];

  for (const agentId of agentIds) {
      const result = await codebolt.swarm.assignRole(swarmId, roleId, agentId);
      assignments.push({
          agentId,
          success: result.success
      });

      if (result.success) {
          console.log(`✅ Assigned role to agent ${agentId}`);
      }
  }

  const successful = assignments.filter(a => a.success).length;
  console.log(`Successfully assigned role to ${successful}/${assignments.length} agents`);
});
```
