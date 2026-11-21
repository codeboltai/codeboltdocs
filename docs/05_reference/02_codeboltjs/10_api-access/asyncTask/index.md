# Async Tasks

List asynchronous tasks and send task control commands.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const tasks = await codebolt.asyncTask.listTasks();
  console.log(tasks);
});
```

## SDK methods

### listTasks

```text
codebolt.asyncTask.listTasks(options?: AsyncTaskListOptions): Promise<any>
```

### controlTask

```text
codebolt.asyncTask.controlTask(options: AsyncTaskControlOptions): Promise<any>
```
