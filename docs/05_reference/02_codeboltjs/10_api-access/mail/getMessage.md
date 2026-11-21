---
name: getMessage
description: Retrieves a specific message by its ID.
cbbaseinfo:
  description: Retrieves a specific message by its ID.
data:
  name: getMessage
  category: mail
  link: getMessage.md
---

# getMessage

```text
codebolt.mail.getMessage(params: IGetMessageParams): Promise<IGetMessageResponse>
```

Retrieves a specific message by its ID.

## When to use it

Load a specific message before replying or following up on a handoff.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.getMessage({
    messageId: 'msg-123'
  });
  console.log(result);
});
```
