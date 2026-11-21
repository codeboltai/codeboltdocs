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

```text
codebolt.groupFeedback.get(params: IGetFeedbackParams): Promise<IGetFeedbackResponse>
```

Retrieves details of a specific feedback session including all responses.

## When to use it

Load the request or use a response-oriented view when reviewing what participants said.

## Example

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
