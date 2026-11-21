# Mail

Send and manage messages within Codebolt’s agent mail service.

## When to use it

Use mail threads for agent handoffs. Use reservations and conflict checks before editing shared files.

## Examples

### Register an agent with mail

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.registerAgent({
    id: 'docs-reviewer-id',
    name: 'Docs reviewer',
    capabilities: ['documentation-review'],
  });
  console.log(result);
});
```

### Message Search and Retrieval

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for specific messages
  const results = await codebolt.mail.search({
    query: 'authentication bug',
    threadId: 'thread-123',
    limit: 20
  });

  // Get thread summary
  const summary = await codebolt.mail.summarizeThread({
    threadId: 'thread-123'
  });

  console.log('Thread summary:', summary.summary);
});
```

## SDK methods

### registerAgent

[`registerAgent`](registerAgent.md)

### listAgents

[`listAgents`](listAgents.md)

### getAgent

[`getAgent`](getAgent.md)

### createThread

[`createThread`](createThread.md)

### findOrCreateThread

[`findOrCreateThread`](findOrCreateThread.md)

### listThreads

[`listThreads`](listThreads.md)

### getThread

[`getThread`](getThread.md)

### updateThreadStatus

[`updateThreadStatus`](updateThreadStatus.md)

### archiveThread

[`archiveThread`](archiveThread.md)

### fetchInbox

[`fetchInbox`](fetchInbox.md)

### sendMessage

[`sendMessage`](sendMessage.md)

### replyMessage

[`replyMessage`](replyMessage.md)

### getMessage

[`getMessage`](getMessage.md)

### getMessages

[`getMessages`](getMessages.md)

### markRead

[`markRead`](markRead.md)

### acknowledge

[`acknowledge`](acknowledge.md)

### search

[`search`](search.md)

### summarizeThread

[`summarizeThread`](summarizeThread.md)

### reserveFiles

[`reserveFiles`](reserveFiles.md)

### releaseFiles

[`releaseFiles`](releaseFiles.md)

### forceReserveFiles

[`forceReserveFiles`](forceReserveFiles.md)

### listReservations

[`listReservations`](listReservations.md)

### checkConflicts

[`checkConflicts`](checkConflicts.md)
