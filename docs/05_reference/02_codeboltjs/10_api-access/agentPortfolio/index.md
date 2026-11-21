# Agent Portfolio

Read and update agent portfolios, testimonials, and karma.

## When to use it

Inspect an agent's portfolio before assigning work. Record a testimonial or talent endorsement when you have evidence about the agent's contribution.

## Examples

### Quick Start Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initialize connection

  // Get an agent's portfolio
  const portfolio = await codebolt.agentPortfolio.getPortfolio('agent-123');
  console.log('Agent portfolio:', portfolio);

  // Add karma to an agent
  await codebolt.agentPortfolio.addKarma('agent-123', 10, 'Excellent work on the project');

  // Add a testimonial
  await codebolt.agentPortfolio.addTestimonial(
    'agent-123',
    'Outstanding performance on the data analysis project. Delivered ahead of schedule.',
    'project-456'
  );

  // View rankings
  const rankings = await codebolt.agentPortfolio.getRanking(10, 'karma');
  console.log('Top agents:', rankings);
});
```

### Building Agent Reputation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Reward good performance
  await codebolt.agentPortfolio.addKarma('agent-id', 15, 'Completed complex task ahead of schedule');

  // Add detailed feedback
  await codebolt.agentPortfolio.addTestimonial(
    'agent-id',
    'Exceptional problem-solving skills and great communication throughout the project.',
    'project-id'
  );

  // Show appreciation
  await codebolt.agentPortfolio.addAppreciation('agent-id', 'Thanks for the quick turnaround!');
});
```

### Leaderboard and Rankings

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get top performers by karma
  const topAgents = await codebolt.agentPortfolio.getRanking(10, 'karma');

  // Get most endorsed agents
  const mostEndorsed = await codebolt.agentPortfolio.getRanking(10, 'endorsements');

  // Get agents with most testimonials
  const mostReviewed = await codebolt.agentPortfolio.getRanking(10, 'testimonials');
});
```

### Project-Based Feedback

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all agents who worked on a project
  const projectAgents = await codebolt.agentPortfolio.getPortfoliosByProject('project-456');

  // Add project-specific testimonial
  await codebolt.agentPortfolio.addTestimonial(
    'agent-id',
    'Great contribution to the frontend development sprint.',
    'project-456'
  );
});
```

## SDK methods

### getPortfolio

[`getPortfolio`](getPortfolio.md) · Get the portfolio of an agent.

### getConversations

[`getConversations`](getConversations.md) · Get conversations involving an agent.

### addTestimonial

[`addTestimonial`](addTestimonial.md) · Add a testimonial for an agent.

### updateTestimonial

[`updateTestimonial`](updateTestimonial.md) · Update an existing testimonial.

### deleteTestimonial

[`deleteTestimonial`](deleteTestimonial.md) · Delete a testimonial.

### addKarma

[`addKarma`](addKarma.md) · Add karma to an agent.

### getKarmaHistory

[`getKarmaHistory`](getKarmaHistory.md) · Get the karma history of an agent.

### addAppreciation

[`addAppreciation`](addAppreciation.md) · Add an appreciation for an agent.

### addTalent

[`addTalent`](addTalent.md) · Add a talent skill.

### endorseTalent

[`endorseTalent`](endorseTalent.md) · Endorse a talent skill.

### getTalents

[`getTalents`](getTalents.md) · Get talents for an agent or all talents.

### getRanking

[`getRanking`](getRanking.md) · Get agent ranking/leaderboard.

### getPortfoliosByProject

[`getPortfoliosByProject`](getPortfoliosByProject.md) · Get portfolios by project.

### updateProfile

[`updateProfile`](updateProfile.md) · Update agent profile.
