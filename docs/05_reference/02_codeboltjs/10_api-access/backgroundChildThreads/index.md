# Background Child Threads

Track background child threads and wait for their completion.

This module tracks child threads in the current SDK process. Use [Thread](../thread/index.md) to start them and [Agent Event Queue](../agentEventQueue/index.md) for incoming agent events.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  const completed = codebolt.backgroundChildThreads.checkForBackgroundAgentCompletion();
  for (const result of completed ?? []) {
    console.log(result.threadId);
  }
});
```

## SDK methods

### addRunningAgent

Adds a running background agent to tracking.

```text
codebolt.backgroundChildThreads.addRunningAgent(threadId: string, data: BackgroundAgentData, groupId?: string): void
```

### getRunningAgentCount

Gets the number of currently running background agents.

```text
codebolt.backgroundChildThreads.getRunningAgentCount(): number
```

### checkForBackgroundAgentCompletion

Checks if any background agent has completed.

```text
codebolt.backgroundChildThreads.checkForBackgroundAgentCompletion(): BackgroundAgentCompletion[] | null
```

### onBackgroundAgentCompletion

Waits for background agent completion.

```text
codebolt.backgroundChildThreads.onBackgroundAgentCompletion(): Promise<BackgroundAgentCompletion[] | null>
```

### checkForBackgroundGroupedAgentCompletion

Checks if any grouped background agent has completed.

```text
codebolt.backgroundChildThreads.checkForBackgroundGroupedAgentCompletion(): BackgroundAgentCompletion | null
```

### onBackgroundGroupedAgentCompletion

Waits for grouped background agent completion.

```text
codebolt.backgroundChildThreads.onBackgroundGroupedAgentCompletion(): Promise<BackgroundAgentCompletion | null>
```

### waitForAnyExternalEvent

Waits for any external event (background agent completion, grouped agent completion, or agent event).

```text
codebolt.backgroundChildThreads.waitForAnyExternalEvent(): Promise<BackgroundExternalEvent>
```
