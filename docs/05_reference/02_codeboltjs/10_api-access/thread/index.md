# Thread

Create and start threads, send messages, and retrieve context and file changes.

## When to use it

Use threads to track separate work. Create and start a new thread when delegating to another agent and use its ID to read progress or changes.

## Example

### Create a thread and retrieve its details

```ts
import { randomUUID } from 'node:crypto';
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = randomUUID();
  const options = {
    threadId,
    name: 'README review',
    title: 'README review',
    description: 'Track feedback on the project overview.',
  };
  const created = await codebolt.thread.createThread(options);
  if (!created.success) throw new Error(created.error ?? 'Thread creation failed.');

  const lookup = { taskId: threadId, id: threadId };
  const response = await codebolt.thread.getThreadDetail(lookup);
  console.log(response.thread);
});
```

## SDK methods

### createThread

[`createThread`](createThread.md) · Creates a new thread with comprehensive options.

### createAndStartThread

[`createAndStartThread`](createAndStartThread.md) · Creates and immediately starts a new thread.

### createAndStartThreadAndWait

Creates and starts a thread, then waits for completion.

```text
codebolt.thread.createAndStartThreadAndWait(options: CreateAndStartThreadOptions): Promise<StartThreadResponse>
```

### waitForThreadCompletion

Waits for a previously started thread to complete.

```text
codebolt.thread.waitForThreadCompletion(options: { threadId: string; timeoutMs?: number; }): Promise<WaitForThreadCompletionResponse>
```

### sendMessage

Sends a message to an existing thread.

```text
codebolt.thread.sendMessage(options: SendThreadMessageOptions): Promise<SendMessageResponse>
```

### sendToParent

Sends a message from the current agent thread to its parent thread.

```text
codebolt.thread.sendToParent(options: SendThreadMessageToParentOptions): Promise<SendMessageResponse>
```

### createThreadInBackground

Creates a thread in the background and resolves when the agent starts or fails.

```text
codebolt.thread.createThreadInBackground(options: CreateAndStartThreadOptions): Promise<ThreadAgentStartedResponse | ThreadAgentStartFailedResponse>
```

### getThreadList

[`getThreadList`](getThreadList.md) · Retrieves a list of threads with optional filtering.

### getThreadDetail

[`getThreadDetail`](getThreadDetail.md) · Retrieves detailed information about a specific thread.

### getThreadCoordination

Retrieves the recursive child-thread and agent-execution coordination tree for a thread.

```text
codebolt.thread.getThreadCoordination(options: GetThreadCoordinationOptions): Promise<GetThreadCoordinationResponse>
```

### startThread

[`startThread`](startThread.md) · The default server expects a different request field. To launch an agent, use `createAndStartThread`.

### updateThread

[`updateThread`](updateThread.md) · Updates an existing thread.

### deleteThread

[`deleteThread`](deleteThread.md) · Deletes a thread.

### updateThreadStatus

[`updateThreadStatus`](updateThreadStatus.md) · Updates the status of a thread.

### getThreadMessages

[`getThreadMessages`](getThreadMessages.md) · Retrieves messages for a specific thread.

### getThreadRawConversations

```text
codebolt.thread.getThreadRawConversations(options: GetThreadRawConversationsOptions): Promise<GetThreadRawConversationsResponse>
```

### getThreadContext

```text
codebolt.thread.getThreadContext(options: GetThreadContextOptions): Promise<GetThreadContextResponse>
```

### getThreadContextCompacted

Reads the stored compacted context. When none is available, the server returns `{ status: "placeholder" }` for `compactedContext`. The separate `compaction` field currently contains a placeholder status and a null result.

```text
codebolt.thread.getThreadContextCompacted(options: GetThreadContextCompactedOptions): Promise<GetThreadContextCompactedResponse>
```

### getThreadContextSummary

```text
codebolt.thread.getThreadContextSummary(options: GetThreadContextSummaryOptions): Promise<GetThreadContextSummaryResponse>
```

### addThreadContext

```text
codebolt.thread.addThreadContext(options: AddThreadContextOptions): Promise<AddThreadContextResponse>
```

### saveThreadContext

```text
codebolt.thread.saveThreadContext(options?: SaveThreadContextOptions): Promise<SaveThreadContextResponse>
```

### forkContext

```text
codebolt.thread.forkContext(): Promise<ForkContextResponse>
```

### getSavedThreadContext

```text
codebolt.thread.getSavedThreadContext(options: GetSavedThreadContextOptions): Promise<GetSavedThreadContextResponse>
```

### getThreadFileChanges

[`getThreadFileChanges`](getThreadFileChanges.md) · Retrieves file changes associated with a specific thread.

### getThreadFileChangesSummary

[`getThreadFileChangesSummary`](getThreadFileChangesSummary.md) · Retrieves file changes summary for ChangesSummaryPanel.
