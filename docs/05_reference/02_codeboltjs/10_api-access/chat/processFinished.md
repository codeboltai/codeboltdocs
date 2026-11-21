---
name: processFinished
description: Sends the process-finished event to the application.
cbbaseinfo:
  description: Sends the process-finished event to the application.
data:
  name: processFinished
  category: chat
  link: processFinished.md
---

# processFinished

```text
codebolt.chat.processFinished(): void
```

Sends the process-finished event to the application.

## When to use it

Send the finished signal when an agent operation has ended. Keep your own cleanup in the code that owns the work.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  codebolt.chat.processFinished();
});
```
