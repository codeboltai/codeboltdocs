# Incoming user messages

Register an agent handler with `codebolt.onMessage(handler)`. Inside the handler, [User Message](../user-message-utilities/index.md) exposes the active message and its context.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage((message) => {
  console.log(message);
});
```
