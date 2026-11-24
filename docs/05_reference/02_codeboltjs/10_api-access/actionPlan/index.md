# Action Plan

The current API is [Execution Plan](../executionPlan/index.md). Use `codebolt.executionPlan` for plan records, readiness, and task coordination.

## When to use it

For a workflow with parallel or sequential dependencies, create an execution plan and use its readiness methods to decide what agents can claim next.

## Create a plan and read its tasks

This example creates a plan with a single top-level task. The create and detail responses both contain an `executionPlan` record. Its `planId` identifies the plan and its `items` array contains the tasks and groups.

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const created = await codebolt.executionPlan.createExecutionPlan({
    name: 'README review',
    description: 'Check the project setup instructions.',
  });
  if (!created.success) throw new Error(created.error);

  const { planId } = created.executionPlan;
  const added = await codebolt.executionPlan.addTaskToExecutionPlan(planId, {
    name: 'Review setup steps',
    description: 'Check that the README explains how to open the project.',
  });
  if (!added.success) throw new Error(added.error);

  const details = await codebolt.executionPlan.getPlanDetail(planId);
  if (!details.success) throw new Error(details.error);
  return details.executionPlan.items.map(item => item.name).join(', ');
});
```

## Organize sequential work

For a migration plan, add the tasks in the order the agent should perform them. In this example, `planId` comes from the create response above.

```javascript
for (const name of ['Back up the database', 'Run migrations', 'Verify data integrity']) {
  const added = await codebolt.executionPlan.addTaskToExecutionPlan(planId, { name });
  if (!added.success) throw new Error(added.error);
}
```

## Add a health-check group

Use a wait group to record the checks required after deployment. The agent performing the work must run the checks and report their outcomes.

```javascript
const added = await codebolt.executionPlan.addGroupToExecutionPlan(planId, {
  type: 'waitUntilGroup',
  name: 'Deployment health',
  waitSteps: ['Service responds to its health endpoint'],
  waitTasks: [{
    type: 'task',
    task: { name: 'Check service health', description: 'Query the health endpoint.' },
  }],
});
if (!added.success) throw new Error(added.error);
```

## Find the next task

`getReadyTasks` lists eligible work. To take ownership of a task, use `acquireNextTask`. Use the returned lease to start the task and call `completeTask` or `failTask` after the agent has performed the work. See [Execution Plan](../executionPlan/index.md) for the method signatures.

```javascript
const ready = await codebolt.executionPlan.getReadyTasks(planId);
if (!ready.success) throw new Error(ready.error);
for (const task of ready.tasks) console.log(task.taskId, task.name);
```
