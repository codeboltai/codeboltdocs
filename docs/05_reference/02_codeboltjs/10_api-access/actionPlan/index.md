# Action Plan

The current API is [Execution Plan](../executionPlan/index.md). Use `codebolt.executionPlan` for plan records, readiness, and task coordination.

## When to use it

For a workflow with parallel or sequential dependencies, create an execution plan and use its readiness methods to decide what agents can claim next.

## Examples

### Basic Action Plan Workflow

```javascript
import codebolt from '@codebolt/codeboltjs';

async function quickStart() {
  try {
    // Step 1: Create a new action plan
    const plan = await codebolt.executionPlan.createExecutionPlan({
      name: 'API Development Plan',
      description: 'Build a complete REST API with authentication',
      agentId: 'my-agent-id',
      status: 'active'
    });

    console.log('Created plan:', plan.planId);

    // Step 2: Add tasks to the plan
    await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
      name: 'Setup Express Server',
      description: 'Initialize Express.js application',
      priority: 'high',
      taskType: 'setup'
    });

    await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
      name: 'Create Authentication Routes',
      description: 'Implement login and registration endpoints',
      priority: 'high',
      taskType: 'development'
    });

    // Step 3: Execute tasks
    const planDetails = await codebolt.executionPlan.getPlanDetail(plan.planId);
    for (const task of planDetails.tasks) {
      const result = await codebolt.executionPlan.startTaskStep(
        plan.planId,
        task.id
      );
      console.log(`Task ${task.name} completed:`, result.success);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Minimal Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create and execute a simple action plan
  const plan = await codebolt.executionPlan.createExecutionPlan({
    name: 'Quick Task',
    description: 'Simple one-task plan'
  });

  await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
    name: 'Generate README',
    description: 'Create project documentation'
  });

  const details = await codebolt.executionPlan.getPlanDetail(plan.planId);
  await codebolt.executionPlan.startTaskStep(plan.planId, details.tasks[0].id);
});
```

### Workflow 1: Sequential Task Execution

```javascript
import codebolt from '@codebolt/codeboltjs';

async function sequentialWorkflow() {
  // Create plan
  const plan = await codebolt.executionPlan.createExecutionPlan({
    name: 'Database Migration',
    description: 'Step-by-step database setup'
  });

  // Add sequential tasks
  const tasks = [
    { name: 'Backup Database', description: 'Create backup before migration' },
    { name: 'Run Migrations', description: 'Execute migration scripts' },
    { name: 'Verify Data', description: 'Check data integrity' },
    { name: 'Update Indexes', description: 'Rebuild database indexes' }
  ];

  for (const task of tasks) {
    await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, task);
  }

  // Execute tasks in sequence
  const planDetails = await codebolt.executionPlan.getPlanDetail(plan.planId);

  for (const task of planDetails.tasks) {
    console.log(`Starting: ${task.name}`);
    const result = await codebolt.executionPlan.startTaskStep(plan.planId, task.id);

    if (!result.success) {
      console.error(`Task failed: ${task.name}`);
      break; // Stop on first failure
    }

    console.log(`Completed: ${task.name}`);
  }
}
```

### Workflow 5: Wait Until Condition

```javascript
import codebolt from '@codebolt/codeboltjs';

async function waitWorkflow() {
  const plan = await codebolt.executionPlan.createExecutionPlan({
    name: 'Deployment with Health Check',
    description: 'Deploy and wait for service to be healthy'
  });

  // Add deployment task
  await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
    name: 'Deploy Service',
    description: 'Deploy the application'
  });

  // Add wait group
  await codebolt.executionPlan.addGroupToExecutionPlan(plan.planId, {
    type: 'waitUntilGroup',
    name: 'Wait for Health Check',
    waitTasks: [
      {
        name: 'Check Service Health',
        description: 'Wait until service responds with 200 OK',
        condition: 'serviceHealthy === true',
        timeout: 300000, // 5 minutes
        checkInterval: 5000 // Check every 5 seconds
      }
    ]
  });

  // Execute plan
  const details = await codebolt.executionPlan.getPlanDetail(plan.planId);
  for (const task of details.tasks) {
    await codebolt.executionPlan.startTaskStep(plan.planId, task.id);
  }
}
```

### Plan Organization

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Good: Well-structured plan with clear task hierarchy
  const plan = await codebolt.executionPlan.createExecutionPlan({
    name: 'Feature Development',
    description: 'Implement user authentication feature',
    agentId: 'dev-agent',
    metadata: {
      feature: 'authentication',
      sprint: 'sprint-23',
      priority: 'high'
    }
  });

  // Add tasks in logical order
  await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
    name: 'Design Database Schema',
    description: 'Create user and session tables',
    priority: 'high',
    taskType: 'design'
  });

  await codebolt.executionPlan.addTaskToExecutionPlan(plan.planId, {
    name: 'Implement Authentication Logic',
    description: 'Create login/signup functions',
    priority: 'high',
    taskType: 'development'
  });
});
```
