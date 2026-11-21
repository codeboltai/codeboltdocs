---
name: listSkills
description: List all available skills.
cbbaseinfo:
  description: List all available skills.
data:
  name: listSkills
  category: capability
  link: listSkills.md
---

# listSkills

```text
codebolt.capability.listSkills(): Promise<ListCapabilitiesResponse>
```

List all available skills

## Returns

Promise resolving to list of skills

Requirements: 9.1

## When to use it

Find available skills before choosing one for a task.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const skills = await codebolt.capability.listSkills();
  console.log('Available skills:', skills.capabilities);
});
```

## More examples

### Find Specific Skills

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const allSkills = await codebolt.capability.listSkills();
  const dataSkills = allSkills.capabilities.filter(s =>
    s.name.includes('data')
  );
});
```
