# Group Feedback

Manage feedback groups and their responses.

## When to use it

Collect feedback on a shared document or change, then keep follow-up replies attached to the original response.

## Example

### Open a text feedback request

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.groupFeedback.create({
    title: 'Review the setup instructions',
    content: 'Please check the setup section for missing steps.',
    contentType: 'text',
    creatorId: 'review-coordinator-id',
    creatorName: 'Review coordinator',
    participants: ['docs-reviewer-id'],
  });
  console.log(response);
});
```

## SDK methods

### create

[`create`](create.md)

### get

[`get`](get.md)

### list

[`list`](list.md)

### respond

[`respond`](respond.md)

### reply

[`reply`](reply.md)

### updateSummary

[`updateSummary`](updateSummary.md)

### updateStatus

[`updateStatus`](updateStatus.md)
