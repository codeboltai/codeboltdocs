---
name: addKarma
description: Add karma to an agent.
cbbaseinfo:
  description: Add karma to an agent.
data:
  name: addKarma
  category: agentPortfolio
  link: addKarma.md
---

# addKarma

```text
codebolt.agentPortfolio.addKarma(toAgentId: string, amount: number, reason?: string): Promise<AddKarmaResponse>
```

Add karma to an agent

## Parameters

- `toAgentId` — The ID of the agent receiving karma
- `amount` — The amount of karma to add (can be negative)
- `reason` — Optional reason for the karma change

## Returns

Promise resolving to the karma addition result

## When to use it

Record a score change after a completed review or milestone. Include a reason when the score should be traceable to a particular contribution.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const awardTeamKarma = async (teamMembers: string[], projectSuccess: any) => {
    const baseAmount = projectSuccess.score > 0.8 ? 10 : 5;
    const results = await Promise.all(
      teamMembers.map(memberId =>
        codebolt.agentPortfolio.addKarma(
          memberId,
          baseAmount,
          `Team contribution to ${projectSuccess.projectName}`
        )
      )
    );

    const successful = results.filter(r => r.success).length;
    console.log(`Awarded karma to ${successful}/${teamMembers.length} team members`);
  };
});
```
