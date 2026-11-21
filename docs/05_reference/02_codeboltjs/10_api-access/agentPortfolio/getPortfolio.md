---
name: getPortfolio
description: Get the portfolio of an agent.
cbbaseinfo:
  description: Get the portfolio of an agent.
data:
  name: getPortfolio
  category: agentPortfolio
  link: getPortfolio.md
---

# getPortfolio

```text
codebolt.agentPortfolio.getPortfolio(agentId: string): Promise<GetPortfolioResponse>
```

Get the portfolio of an agent

## Parameters

- `agentId` — The ID of the agent

## Returns

Promise resolving to the agent portfolio

## When to use it

Inspect an agent's profile before assigning work, or pull together existing testimonials and talent information for a profile view.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const checkProfileCompletion = async (agentId: string) => {
    const portfolio = await codebolt.agentPortfolio.getPortfolio(agentId);

    if (!portfolio.success || !portfolio.data) {
      return { complete: false, missing: ['Portfolio not found'] };
    }

    const missing = [];
    const profile = portfolio.data.profile || {};

    if (!profile.displayName) missing.push('Display name');
    if (!profile.bio) missing.push('Bio');
    if (!profile.specialties || profile.specialties.length === 0) missing.push('Specialties');
    if (!profile.avatarUrl) missing.push('Avatar');

    return {
      complete: missing.length === 0,
      percentage: Math.round(((4 - missing.length) / 4) * 100),
      missing
    };
  };
});
```

## More examples

### Get Agent Portfolio

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const portfolio = await codebolt.agentPortfolio.getPortfolio('agent-123');

  if (portfolio.success && portfolio.data) {
    console.log('Agent Portfolio:');
    console.log(`Karma: ${portfolio.data.karma}`);
    if (portfolio.data.testimonials == null) throw new Error('The response is missing testimonials.');
    console.log(`Testimonials: ${portfolio.data.testimonials.length}`);
    if (portfolio.data.talents == null) throw new Error('The response is missing talents.');
    console.log(`Talents: ${portfolio.data.talents.length}`);
    if (portfolio.data.appreciations == null) throw new Error('The response is missing appreciations.');
    console.log(`Appreciations: ${portfolio.data.appreciations.length}`);
  }
});
```
