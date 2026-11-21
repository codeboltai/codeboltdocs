---
name: list
description: Lists deliberations with optional filtering by type, status, participant, or search terms.
cbbaseinfo:
  description: Lists deliberations with optional filtering by type, status, participant, or search terms.
data:
  name: list
  category: agentDeliberation
  link: list.md
---

# list

```text
codebolt.agentDeliberation.list(params?: IListDeliberationsParams): Promise<IListDeliberationsResponse>
```

Lists deliberations with optional filtering by type, status, participant, or search terms.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List all deliberations
  const all = await codebolt.agentDeliberation.list();

  // Filter by type
  const voting = await codebolt.agentDeliberation.list({
    deliberationType: 'voting'
  });

  // Filter by status
  const active = await codebolt.agentDeliberation.list({
    status: 'collecting-responses'
  });

  // Search
  const results = await codebolt.agentDeliberation.list({
    search: 'database'
  });
});
```
