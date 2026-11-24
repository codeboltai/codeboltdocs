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

Pass the task ID and an action of `wait`, `detach`, or `stop`. The default server supports `stop` for command and thread tasks. For other task types it returns an unsuccessful response. Check `success` before reporting that the task stopped.

```text
codebolt.asyncTask.controlTask(options: AsyncTaskControlOptions): Promise<any>
```
