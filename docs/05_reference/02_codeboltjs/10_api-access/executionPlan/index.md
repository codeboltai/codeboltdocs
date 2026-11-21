# Execution Plan

Create structured execution plans and coordinate work through readiness checks and leases.

An execution plan stores the task tree and schedules which tasks can be claimed. Agent code performs the work and reports the outcome with `completeTask`, `failTask`, or `releaseTask`. Use `getReadiness` to inspect blockers and `acquireNextTask` to lease eligible tasks.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const plans = await codebolt.executionPlan.getAllPlans();
  console.log(plans);
});
```

## SDK methods

### readme

Get execution plan structure and usage guidance.

```text
codebolt.executionPlan.readme(): { success: boolean; content: string; }
```

### getAllPlans

Get all execution plans.

```text
codebolt.executionPlan.getAllPlans(): Promise<any>
```

### getPlanDetail

Get execution plan detail by ID.

```text
codebolt.executionPlan.getPlanDetail(planId: string): Promise<any>
```

### getExecutionPlanDetail

Get execution plan detail by ID (alternative method).

```text
codebolt.executionPlan.getExecutionPlanDetail(planId: string): Promise<any>
```

### createExecutionPlan

Create a new execution plan.

```text
codebolt.executionPlan.createExecutionPlan(payload: { name: string; description?: string; agentId?: string; agentName?: string; status?: string; planId?: string; }): Promise<any>
```

### updateExecutionPlan

Update an existing execution plan.

```text
codebolt.executionPlan.updateExecutionPlan(planId: string, updateData: ExecutionPlanUpdateData): Promise<any>
```

### addTaskToExecutionPlan

Add a task to an execution plan.

```text
codebolt.executionPlan.addTaskToExecutionPlan(planId: string, task: ExecutionPlanTask): Promise<any>
```

### addGroupToExecutionPlan

Add a group to an execution plan.

```text
codebolt.executionPlan.addGroupToExecutionPlan(planId: string, group: ExecutionPlanGroup): Promise<any>
```

### deleteExecutionPlan

Delete an execution plan.

```text
codebolt.executionPlan.deleteExecutionPlan(planId: string): Promise<any>
```

### startTaskStep

Start/execute a task step in an execution plan.

```text
codebolt.executionPlan.startTaskStep(planId: string, taskId: string): Promise<any>
```

### getReadiness

```text
codebolt.executionPlan.getReadiness(planId: string): Promise<any>
```

### getReadyTasks

```text
codebolt.executionPlan.getReadyTasks(planId: string, context?: ExecutionPlanAgentContext): Promise<any>
```

### acquireNextTask

```text
codebolt.executionPlan.acquireNextTask(planId: string, options?: AcquireNextTaskOptions): Promise<any>
```

### startTask

```text
codebolt.executionPlan.startTask(planId: string, taskId: string, options?: { leaseId?: string; agentId?: string; }): Promise<any>
```

### completeTask

```text
codebolt.executionPlan.completeTask(planId: string, taskId: string, result?: any): Promise<any>
```

### failTask

```text
codebolt.executionPlan.failTask(planId: string, taskId: string, error?: any): Promise<any>
```

### releaseTask

```text
codebolt.executionPlan.releaseTask(planId: string, taskId: string, leaseId?: string): Promise<any>
```

### approveGate

```text
codebolt.executionPlan.approveGate(planId: string, groupId: string): Promise<any>
```

### rejectGate

```text
codebolt.executionPlan.rejectGate(planId: string, groupId: string): Promise<any>
```

### validate

```text
codebolt.executionPlan.validate(planId: string): Promise<any>
```

### startTaskStepWithListener

Start/execute a task step in an execution plan with event listener.

```text
codebolt.executionPlan.startTaskStepWithListener(planId: string, taskId: string, onResponse: (response: TaskStepResponse) => void): (() => void)
```

### getAll

```text
codebolt.executionPlan.getAll(): any
```

### get

```text
codebolt.executionPlan.get(planId: string): any
```

### getDetail

```text
codebolt.executionPlan.getDetail(planId: string): any
```

### create

```text
codebolt.executionPlan.create(payload: Parameters<typeof codeboltExecutionPlan.createExecutionPlan>[0]): any
```

### update

```text
codebolt.executionPlan.update(planId: string, updateData: ExecutionPlanUpdateData): any
```

### addTask

```text
codebolt.executionPlan.addTask(planId: string, task: ExecutionPlanTask): any
```

### addGroup

```text
codebolt.executionPlan.addGroup(planId: string, group: ExecutionPlanGroup): any
```

### delete

```text
codebolt.executionPlan.delete(planId: string): any
```

### guide

```text
codebolt.executionPlan.guide(): any
```

### startTaskWithListener

```text
codebolt.executionPlan.startTaskWithListener(planId: string, taskId: string, onResponse: (response: TaskStepResponse) => void): any
```
