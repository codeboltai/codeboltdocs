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

### Delegate a plan task and record the outcome

This example uses an existing plan with ready work. Pass its ID and the ID of an installed reviewer agent. A lease identifies the task, and the child thread reports the result of the review.

```javascript
import codebolt from '@codebolt/codeboltjs';

async function reviewNextTask(planId, reviewerAgentId) {
  const acquired = await codebolt.executionPlan.acquireNextTask(planId, { maxTasks: 1 });
  if (!acquired.success) throw new Error(acquired.error);
  const lease = acquired.leases[0];
  if (!lease) return 'No task is ready.';

  const { taskId, leaseId } = lease;
  const started = await codebolt.executionPlan.startTask(planId, taskId, { leaseId });
  if (!started.success) {
    await codebolt.executionPlan.releaseTask(planId, taskId, leaseId);
    throw new Error(started.error);
  }

  let output;
  try {
    const task = acquired.tasks.find(item => item.taskId === taskId);
    const review = await codebolt.thread.createAndStartThreadAndWait({
      agentId: reviewerAgentId,
      title: task.name,
      userMessage: task.description || task.name,
    });
    if (!review.success) throw new Error(review.error || 'Review failed');
    output = review.output;
  } catch (error) {
    const failed = await codebolt.executionPlan.failTask(planId, taskId, String(error));
    if (!failed.success) throw new Error(failed.error);
    throw error;
  }

  const completed = await codebolt.executionPlan.completeTask(planId, taskId, output);
  if (!completed.success) throw new Error(completed.error);
  return output;
}
```
