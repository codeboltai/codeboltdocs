# Agent Deliberation

Create and manage collaborative agent deliberations.

## When to use it

Use deliberation when several agents need to evaluate the same decision. Gather responses before voting or requesting a winner.

## Examples

### Quick Start Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initialize connection

  // Create a new deliberation
  const deliberation = await codebolt.agentDeliberation.create({
    deliberationType: 'voting',
    title: 'Best approach for data migration',
    requestMessage: 'What is the best strategy for migrating our customer database?',
    creatorId: 'agent-1',
    creatorName: 'System Admin',
    participants: ['agent-2', 'agent-3', 'agent-4'],
    status: 'collecting-responses'
  });

  console.log('Deliberation created:', deliberation.payload.deliberation.id);

  // Agents respond
  await codebolt.agentDeliberation.respond({
    deliberationId: deliberation.payload.deliberation.id,
    responderId: 'agent-2',
    responderName: 'Database Expert',
    body: 'Use a phased migration approach with rollback capabilities.'
  });

  // Move to voting
  await codebolt.agentDeliberation.update({
    deliberationId: deliberation.payload.deliberation.id,
    status: 'voting'
  });

  // Cast votes
  await codebolt.agentDeliberation.vote({
    deliberationId: deliberation.payload.deliberation.id,
    responseId: 'response-123',
    voterId: 'agent-1',
    voterName: 'System Admin'
  });

  // Get the winner
  const winner = await codebolt.agentDeliberation.getWinner({
    deliberationId: deliberation.payload.deliberation.id
  });

  console.log('Winning response:', winner.payload.winner);
});
```

### Decision Making

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a deliberation for architectural decision
  const decision = await codebolt.agentDeliberation.create({
    deliberationType: 'voting',
    title: 'Database technology choice',
    requestMessage: 'Should we use PostgreSQL or MongoDB for the new project?',
    creatorId: 'tech-lead',
    creatorName: 'Tech Lead',
    status: 'collecting-responses'
  });
});
```

### Feature Planning

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Collect feedback on feature priorities
  const feedback = await codebolt.agentDeliberation.create({
    deliberationType: 'feedback',
    title: 'Q1 Feature Priorities',
    requestMessage: 'What features should we prioritize for Q1?',
    creatorId: 'product-manager',
    creatorName: 'Product Manager',
    participants: ['dev-lead', 'design-lead', 'sales-lead']
  });
});
```

### Knowledge Sharing

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Q&A session for technical questions
  const qa = await codebolt.agentDeliberation.create({
    deliberationType: 'qa',
    title: 'Microservices Architecture Q&A',
    requestMessage: 'Ask questions about our microservices architecture',
    creatorId: 'architect',
    creatorName: 'System Architect',
    status: 'collecting-responses'
  });
});
```

### Collaborative Brainstorming

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Shared list for brainstorming
  const brainstorm = await codebolt.agentDeliberation.create({
    deliberationType: 'shared-list',
    title: 'Product Name Ideas',
    requestMessage: 'Add your name ideas for the new product',
    creatorId: 'marketing',
    creatorName: 'Marketing Team',
    status: 'collecting-responses'
  });
});
```

## SDK methods

### create

[`create`](create.md)

### get

[`get`](get.md)

### list

[`list`](list.md)

### update

[`update`](update.md)

### respond

[`respond`](respond.md)

### vote

[`vote`](vote.md)

### getWinner

[`getWinner`](getWinner.md)

### summary

[`summary`](summary.md)
