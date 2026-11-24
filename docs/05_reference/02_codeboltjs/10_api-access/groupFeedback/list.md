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

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.list(params?: IListFeedbacksParams): Promise<IListFeedbacksResponse>
```

Lists all feedback sessions with optional filtering by status and participants.

## Intended use

Populate a feedback queue and narrow it by status, participant, or search text.

## Request examples for a compatible server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.groupFeedback.list();
  console.log(result);
});
```
