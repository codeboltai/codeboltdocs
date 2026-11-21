---
name: getAgentsList
description: Lists available agents.
cbbaseinfo:
  description: Lists available agents.
data:
  name: getAgentsList
  category: agent
  link: getAgentsList.md
---

# getAgentsList

```text
codebolt.agent.getAgentsList(type?: Agents): Promise<ListAgentsResponse>
```

List agents before presenting an agent picker, choosing a worker for a task, or exporting a project catalog.

## Choose a list

| `type` | What it returns |
| --- | --- |
| `Agents.DOWNLOADED` (default) | Agents installed in Codebolt. |
| `Agents.LOCAL` | Agents defined in the current project's `.codebolt/agents` directory. |
| `Agents.ALL` | Agents from the server's locally stored catalog. |

Import `Agents` from `@codebolt/types/enum`. The three lists can overlap, so use IDs to compare them. A successful request can return an empty `agents` array.

## Response

Check `success` before reading `agents`. The SDK declaration describes entries with `id`, `name`, and an optional `description`. The current server returns the identifier as `agentId` and also includes a tool definition with that identifier in `function.name`. The examples use a small adapter where a stable ID is needed.

## Compare available lists

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const lists = [
    ['Installed', await codebolt.agent.getAgentsList()],
    ['Current project', await codebolt.agent.getAgentsList(Agents.LOCAL)],
    ['Catalog', await codebolt.agent.getAgentsList(Agents.ALL)],
  ] as const;

  for (const [label, response] of lists) {
    if (!response.success) {
      console.error(label, response.error ?? response.message);
      continue;
    }
    console.log(label, (response.agents ?? []).length);
  }
});
```

## Find candidates by keyword

Use the name and description to narrow a list for a picker. A match is a candidate for review before you dispatch work.

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const response = await codebolt.agent.getAgentsList(Agents.ALL);
  if (!response.success) throw new Error(response.message ?? 'Could not list agents.');

  const keyword = 'testing';
  const candidates = (response.agents ?? []).filter(agent =>
    [agent.name, agent.description ?? ''].some(value => value.toLowerCase().includes(keyword)),
  );
  console.log(candidates.map(agent => ({ name: agent.name, description: agent.description })));
});
```

## Export an agent catalog

Write a snapshot to `agent-catalog.json` in the current project. The file is overwritten if it already exists.

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  const response = await codebolt.agent.getAgentsList(Agents.ALL);
  if (!response.success) throw new Error(response.message ?? 'Could not list agents.');

  const catalog = (response.agents ?? []).map(agent => {
    const entry = agent as typeof agent & { agentId?: string; function?: { name?: string } };
    return {
      id: entry.agentId ?? entry.id ?? entry.function?.name,
      name: entry.name,
      description: entry.description ?? '',
    };
  });
  const written = await codebolt.fs.writeToFile('agent-catalog.json', JSON.stringify(catalog, null, 2));
  if (!written.success) throw new Error(written.message ?? 'Could not write the catalog.');
});
```

## Fall back when the project list is empty

An empty project list can be expected. Treat a failed request as an error so the caller can distinguish it from zero matches.

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

codebolt.onReady(async () => {
  for (const type of [Agents.LOCAL, Agents.DOWNLOADED, Agents.ALL]) {
    const response = await codebolt.agent.getAgentsList(type);
    if (!response.success) throw new Error(response.message ?? 'Could not list agents.');

    const agents = response.agents ?? [];
    if (agents.length > 0) {
      console.log(type, agents.map(agent => agent.name));
      return;
    }
  }
  console.log('No agents found.');
});
```

If a picker requests this list repeatedly, cache successful responses by list type and refresh after installing or changing agents. For monitoring, compare identifiers between successful snapshots so a failed request does not look like agents were removed.

## Cache a successful list for a picker

```ts
import codebolt from '@codebolt/codeboltjs';
import { Agents } from '@codebolt/types/enum';

type AgentList = Awaited<ReturnType<typeof codebolt.agent.getAgentsList>>;
const cache = new Map<Agents, { agents: NonNullable<AgentList['agents']>; expiresAt: number }>();

codebolt.onMessage(async () => {
  const type = Agents.LOCAL;
  let entry = cache.get(type);
  if (!entry || entry.expiresAt <= Date.now()) {
    const response = await codebolt.agent.getAgentsList(type);
    if (!response.success) throw new Error(response.message ?? 'Could not list agents.');
    entry = { agents: response.agents ?? [], expiresAt: Date.now() + 60_000 };
    cache.set(type, entry);
  }
  return entry.agents.map(agent => agent.name).join(', ') || 'No project agents found.';
});
```
