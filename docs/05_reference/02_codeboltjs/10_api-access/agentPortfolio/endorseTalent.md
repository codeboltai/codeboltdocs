---
name: endorseTalent
description: Endorse a talent skill.
cbbaseinfo:
  description: Endorse a talent skill.
data:
  name: endorseTalent
  category: agentPortfolio
  link: endorseTalent.md
---

# endorseTalent

```text
codebolt.agentPortfolio.endorseTalent(talentId: string): Promise<EndorseTalentResponse>
```

Endorse a talent skill

## Parameters

- `talentId` — The ID of the talent to endorse

## Returns

Promise resolving to the endorsement result

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.endorseTalent('talent-456');
  console.log(result);
});
```
