# Codebolt Event

Use [Background Child Threads](../backgroundChildThreads/index.md) for completion tracking and [Agent Event Queue](../agentEventQueue/index.md) to receive events. Send new events through [Agent Events](../agentEvents/index.md).

## Examples

### Delegate a review to a child thread and wait for it

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

### Minimal Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Check for completed agents without blocking
  const completed = codebolt.backgroundChildThreads.checkForBackgroundAgentCompletion();
  if (completed) {
    console.log('Agents completed:', completed);
  }
});
```

### Workflow 4: Polling vs Waiting

```javascript
import codebolt from '@codebolt/codeboltjs';

async function pollingVsWaiting() {
  // Approach 1: Polling (non-blocking checks)
  async function pollingApproach() {
    const interval = setInterval(() => {
      const completed = codebolt.backgroundChildThreads.checkForBackgroundAgentCompletion();

      if (completed) {
        console.log('Agents completed:', completed);
        clearInterval(interval);
      } else {
        console.log('Still running:', codebolt.backgroundChildThreads.getRunningAgentCount());
      }
    }, 1000);
  }

  // Approach 2: Waiting (blocking until completion)
  async function waitingApproach() {
    console.log('Waiting for completion...');
    const completed = await codebolt.backgroundChildThreads.onBackgroundAgentCompletion();
    console.log('Agents completed:', completed);
  }

  // Choose based on your needs
  // Use polling if you need to do other work while waiting
  // Use waiting if you want to block until completion
}
```

### Monitor Running Agent Count

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Good: Regularly check running agent count
  setInterval(() => {
    const count = codebolt.backgroundChildThreads.getRunningAgentCount();
    console.log(`Running agents: ${count}`);

    if (count > 10) {
      console.warn('High number of background agents running');
    }
  }, 5000);

  // Bad: Never checking agent count
  // Could lead to resource exhaustion
});
```

### With Action Plan Module

```javascript
import codebolt from '@codebolt/codeboltjs';

async function actionPlanWithEvents() {
  const plan = await codebolt.executionPlan.createExecutionPlan({
    name: 'Event-Driven Plan'
  });

  // Add tasks
  await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
    name: 'Background Task',
    description: 'Run in background'
  });

  // Execute with event monitoring
  const details = await codebolt.executionPlan.getPlanDetail(plan.planId);

  for (const task of details.tasks) {
    const result = await codebolt.executionPlan.startTaskStep(plan.planId, task.id);

    if (result.background) {
      codebolt.backgroundChildThreads.addRunningAgent(result.threadId, {
        planId: plan.planId,
        taskId: task.id
      });
    }
  }

  // Wait for background tasks
  while (codebolt.backgroundChildThreads.getRunningAgentCount() > 0) {
    await codebolt.backgroundChildThreads.onBackgroundAgentCompletion();
  }
}
```
