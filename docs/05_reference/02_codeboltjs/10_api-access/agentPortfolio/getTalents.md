---
name: getTalents
description: Get talents for an agent or all talents.
cbbaseinfo:
  description: Get talents for an agent or all talents.
data:
  name: getTalents
  category: agentPortfolio
  link: getTalents.md
---

# getTalents

```text
codebolt.agentPortfolio.getTalents(agentId?: string): Promise<GetTalentsResponse>
```

Get talents for an agent or all talents

## Parameters

- `agentId` — Optional agent ID to get talents for

## Returns

Promise resolving to the list of talents

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.getTalents();
  console.log(result);
});
```
