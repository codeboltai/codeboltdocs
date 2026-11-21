---
name: findAgent
description: Looks up an agent for a task.
cbbaseinfo:
  description: Looks up an agent for a task.
data:
  name: findAgent
  category: agent
  link: findAgent.md
---

# findAgent

```text
codebolt.agent.findAgent(task: string, maxResult: number | undefined, agents: never[] | undefined, agentLocation: AgentLocation | undefined, getFrom: FilterUsing.USE_VECTOR_DB): Promise<FindAgentByTaskResponse>
```

The current server ranks agent metadata by keywords from the task. Use `AgentLocation.LOCAL_ONLY` for project agents. `AgentLocation.ALL` (the default) and `AgentLocation.REMOTE_ONLY` both search the locally stored catalog. Pass `undefined` for the third argument and `FilterUsing.USE_VECTOR_DB` for the fifth to satisfy the SDK signature. The current server reads the task, result limit, and location.

## When to use it

Use task-based discovery when you know the work to delegate and need candidate agents. Search with a few terms likely to appear in an agent's name, tags, or description. The server can return entries from the requested location when no keywords match, so review candidates before dispatching work. Use [getAgentsList](./getAgentsList.md) to browse a complete list for a scope.

## Find candidates in the catalog

```ts
import codebolt from '@codebolt/codeboltjs';
import { FilterUsing } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const response = await codebolt.agent.findAgent(
    'accessibility testing',
    3,
    undefined,
    undefined,
    FilterUsing.USE_VECTOR_DB,
  );
  if (!response.success) throw new Error(response.message ?? 'Agent search failed.');
  for (const agent of response.agents ?? []) {
    console.log(agent.id, agent.name, agent.description);
  }
});
```

## Prefer candidates from the current project

```ts
import codebolt from '@codebolt/codeboltjs';
import { FilterUsing, AgentLocation } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  for (const location of [AgentLocation.LOCAL_ONLY, AgentLocation.ALL]) {
    const response = await codebolt.agent.findAgent(
      'TypeScript code review',
      3,
      undefined,
      location,
      FilterUsing.USE_VECTOR_DB,
    );
    if (!response.success) throw new Error(response.message ?? 'Agent search failed.');

    const candidates = (response.agents ?? []).filter(agent =>
      [agent.name, agent.description ?? ''].some(value => /review/i.test(value)),
    );
    if (candidates.length > 0) {
      console.log(candidates.map(agent => ({ id: agent.id, name: agent.name })));
      return;
    }
  }
  console.log('No review candidates found.');
});
```
