---
name: list
description: Lists all feedback sessions with optional filtering by status and participants.
cbbaseinfo:
  description: Lists all feedback sessions with optional filtering by status and participants.
data:
  name: list
  category: groupFeedback
  link: list.md
---

# list

```text
codebolt.groupFeedback.list(params?: IListFeedbacksParams): Promise<IListFeedbacksResponse>
```

Lists all feedback sessions with optional filtering by status and participants.

## When to use it

Populate a feedback queue and narrow it by status, participant, or search text.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.groupFeedback.list();
  console.log(result);
});
```
