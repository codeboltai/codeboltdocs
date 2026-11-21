---
name: sendMessage
description: Sends a message and optional payload to the Codebolt chat UI.
cbbaseinfo:
  description: Sends a message and optional payload to the Codebolt chat UI.
data:
  name: sendMessage
  category: chat
  link: sendMessage.md
---

# sendMessage

```text
codebolt.chat.sendMessage(message: string, payload?: object): void
```

Sends a message and optional payload to the Codebolt chat UI. The method returns immediately.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  codebolt.chat.sendMessage('Looking at the project files now.');
});
```

## More examples

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Example 1: Send a simple text message
  codebolt.chat.sendMessage("Hello, CodeBolt!");

  // Example 3: Send a message with payload data
  codebolt.chat.sendMessage("File processing complete", {
      timestamp: new Date().toISOString(),
      source: 'codeboltjs-script',
      fileCount: 5,
      status: 'success'
  });
});
```
