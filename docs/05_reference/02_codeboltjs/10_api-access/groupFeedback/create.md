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

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.create(params: ICreateFeedbackParams): Promise<ICreateFeedbackResponse>
```

Creates a new feedback session for collecting structured feedback from multiple participants.

## Intended use

Open a feedback request for a code review, design decision, or retrospective. Provide the content reviewers should respond to.

## Request examples for a compatible server

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
