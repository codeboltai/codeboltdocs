---
name: get
description: Retrieves details of a specific feedback session including all responses.
cbbaseinfo:
  description: Retrieves details of a specific feedback session including all responses.
data:
  name: get
  category: groupFeedback
  link: get.md
---

# get

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.get(params: IGetFeedbackParams): Promise<IGetFeedbackResponse>
```

Retrieves details of a specific feedback session including all responses.

## Intended use

Load the request or use a response-oriented view when reviewing what participants said.

## Request examples for a compatible server

### Retrieve a request with its responses

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const feedback = await codebolt.groupFeedback.get({
    id: 'feedback-id',
    view: 'full',
  });
  console.log(feedback);
});
```
