---
name: getAgentsDetail
description: Retrieves metadata for catalog and project agents.
cbbaseinfo:
  description: Retrieves metadata for catalog and project agents.
data:
  name: getAgentsDetail
  category: agent
  link: getAgentsDetail.md
---

# getAgentsDetail

```text
codebolt.agent.getAgentsDetail(agentList?: string[]): Promise<AgentsDetailResponse>
```

Inspect an agent's version, capabilities, or configured model roles before choosing it for a task.

## Parameters and response

Pass one or more catalog or project agent `unique_id` values. The SDK sends an empty filter when you omit `agentList` or pass `[]`, and the current server returns zero entries for that filter. Use [getAgentsList](./getAgentsList.md) for discovery first.

The current server sends the agent array at the top level as `agents`. The SDK declaration describes a `payload.agents` shape. The examples handle both shapes.

## Compare metadata for known agents

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.agent.getAgentsDetail([
    'your-reviewer-unique-id',
    'your-tester-unique-id',
  ]);
  if (!response.success) throw new Error(response.message ?? 'Could not load agent details.');

  type AgentDetails = NonNullable<typeof response.payload>['agents'];
  const envelope = response as typeof response & { agents?: AgentDetails };
  for (const agent of envelope.agents ?? response.payload?.agents ?? []) {
    const detail = agent as typeof agent & { version?: string; llm_role?: string };
    console.log(detail.name, detail.version, detail.llm_role, detail.capabilities ?? []);
  }
});
```

## Inspect one known agent

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.agent.getAgentsDetail(['your-agent-unique-id']);
  if (!response.success) throw new Error(response.message ?? 'Could not load agent details.');

  type AgentDetails = NonNullable<typeof response.payload>['agents'];
  const envelope = response as typeof response & { agents?: AgentDetails };
  const [agent] = envelope.agents ?? response.payload?.agents ?? [];
  if (agent) console.log(agent.name, agent.capabilities);
});
```
