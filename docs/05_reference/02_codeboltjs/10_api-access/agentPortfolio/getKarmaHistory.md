---
name: getKarmaHistory
description: Get the karma history of an agent.
cbbaseinfo:
  description: Get the karma history of an agent.
data:
  name: getKarmaHistory
  category: agentPortfolio
  link: getKarmaHistory.md
---

# getKarmaHistory

```text
codebolt.agentPortfolio.getKarmaHistory(agentId: string, limit?: number): Promise<GetKarmaHistoryResponse>
```

Get the karma history of an agent

## Parameters

- `agentId` — The ID of the agent
- `limit` — Maximum number of entries to return

## Returns

Promise resolving to the karma history

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.getKarmaHistory('agent-123', 50);
  console.log(result);
});
```
