---
name: listTalents
description: List all available talents.
cbbaseinfo:
  description: List all available talents.
data:
  name: listTalents
  category: capability
  link: listTalents.md
---

# listTalents

```text
codebolt.capability.listTalents(): Promise<ListCapabilitiesResponse>
```

List all available talents

## Returns

Promise resolving to list of talents

Requirements: 9.1

## When to use it

Discover installed talents before choosing one for a specialized task.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const talents = await codebolt.capability.listTalents();
  console.log('Available talents:', talents.capabilities);
});
```
