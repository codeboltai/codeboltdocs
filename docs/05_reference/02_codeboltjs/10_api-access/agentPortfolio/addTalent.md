---
name: addTalent
description: Add a talent skill.
cbbaseinfo:
  description: Add a talent skill.
data:
  name: addTalent
  category: agentPortfolio
  link: addTalent.md
---

# addTalent

```text
codebolt.agentPortfolio.addTalent(name: string, description?: string): Promise<AddTalentResponse>
```

Add a talent skill

## Parameters

- `name` — The name of the talent
- `description` — Optional description of the talent

## Returns

Promise resolving to the talent creation result

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add new talent
  await codebolt.agentPortfolio.addTalent('React Development', 'Expert in React ecosystem');

  // Add talent without description
  await codebolt.agentPortfolio.addTalent('TypeScript');
});
```
