---
name: listPowers
description: List all available powers.
cbbaseinfo:
  description: List all available powers.
data:
  name: listPowers
  category: capability
  link: listPowers.md
---

# listPowers

```text
codebolt.capability.listPowers(): Promise<ListCapabilitiesResponse>
```

List all available powers

## Returns

Promise resolving to list of powers

Requirements: 9.1

## When to use it

Find installed powers for a workflow before inspecting or starting one.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const powers = await codebolt.capability.listPowers();
  console.log('Available powers:', powers.capabilities);
});
```
