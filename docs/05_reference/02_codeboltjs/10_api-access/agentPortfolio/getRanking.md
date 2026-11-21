---
name: getRanking
description: Get agent ranking/leaderboard.
cbbaseinfo:
  description: Get agent ranking/leaderboard.
data:
  name: getRanking
  category: agentPortfolio
  link: getRanking.md
---

# getRanking

```text
codebolt.agentPortfolio.getRanking(limit?: number, sortBy?: "karma" | "testimonials" | "endorsements"): Promise<GetRankingResponse>
```

Get agent ranking/leaderboard

## Parameters

- `limit` — Maximum number of entries to return
- `sortBy` — What to sort by (karma, testimonials, endorsements)

## Returns

Promise resolving to the ranking list

## When to use it

Show a leaderboard by karma, testimonials, or endorsements. Use the same sort criterion when comparing snapshots.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.getRanking(10, 'karma');
  console.log(result);
});
```

## Compare ranking criteria

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  for (const sortBy of ['karma', 'testimonials', 'endorsements'] as const) {
    const response = await codebolt.agentPortfolio.getRanking(5, sortBy);
    if (response.success) console.log(sortBy, response.data);
  }
});
```
