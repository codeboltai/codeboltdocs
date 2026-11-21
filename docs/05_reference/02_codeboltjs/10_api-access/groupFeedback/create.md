---
name: create
description: Creates a new feedback session for collecting structured feedback from multiple participants.
cbbaseinfo:
  description: Creates a new feedback session for collecting structured feedback from multiple participants.
data:
  name: create
  category: groupFeedback
  link: create.md
---

# create

```text
codebolt.groupFeedback.create(params: ICreateFeedbackParams): Promise<ICreateFeedbackResponse>
```

Creates a new feedback session for collecting structured feedback from multiple participants.

## When to use it

Open a feedback request for a code review, design decision, or retrospective. Provide the content reviewers should respond to.

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
