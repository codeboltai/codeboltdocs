# Orchestrator

The SDK has no `codebolt.orchestrator` API. Use [Thread](../thread/index.md) to start child threads, [Swarm](../swarm/index.md) to coordinate teams, and [Execution Plan](../executionPlan/index.md) to coordinate planned work.

## Delegate a review with `codebolt.thread`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const result = await codebolt.thread.createAndStartThreadAndWait({
    title: 'Review README setup steps',
    agentId: 'reviewer-agent-id',
    userMessage: 'Review README.md and list any missing installation steps.',
  });
  return result.success ? result.output : result.error;
});
```
