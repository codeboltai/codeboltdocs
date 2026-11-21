# Get the current user message

Call [`codebolt.userMessage.getCurrent()`](../user-message-utilities/getCurrent.md) to read the message associated with the active agent turn.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  const text = codebolt.userMessage.getCurrent();
  console.log(text);
});
```
