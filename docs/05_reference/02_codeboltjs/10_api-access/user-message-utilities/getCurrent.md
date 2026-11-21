---
name: getCurrent
description: Get the current user message object.
cbbaseinfo:
  description: Get the current user message object.
data:
  name: getCurrent
  category: user-message-utilities
  link: getCurrent.md
---

# getCurrent

```text
codebolt.userMessage.getCurrent(): FlatUserMessage | undefined
```

Get the current user message object

## Returns

Current UserMessage or undefined

## When to use it

Read the full normalized message when a handler needs file mentions or other turn metadata. Use a narrower getter when you only need the text.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  const text = codebolt.userMessage.getCurrent();
  console.log(text);
});
```

## More examples

### Get Current Message

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(() => {
  // Retrieve the current message
  const message = codebolt.userMessage.getCurrent();

  if (message) {
    console.log('Message ID:', message.messageId);
    console.log('Thread ID:', message.threadId);
    console.log('User said:', message.userMessage);
    console.log('Mentioned files:', message.mentionedFiles);
    console.log('Mentioned MCPs:', message.mentionedMCPs);
  } else {
    console.log('No current message available');
  }
});
```

```js
import codebolt from '@codebolt/codeboltjs';

function inspectMessage() {
  const message = codebolt.userMessage.getCurrent();
  console.log('Complete message:', JSON.stringify(message, null, 2));
}
```

```js
import codebolt from '@codebolt/codeboltjs';

function routeMessage() {
  const message = codebolt.userMessage.getCurrent();

  if (!message) return 'no-message';

  if (message.mentionedMCPs == null) throw new Error('The response is missing mentionedMCPs.');
  if (message.mentionedMCPs.length > 0) return 'mcp-request';
  if (message.mentionedFiles == null) throw new Error('The response is missing mentionedFiles.');
  if (message.mentionedFiles.length > 0) return 'file-operation';
  if (message.remixPrompt) return 'code-remix';
  return 'general-query';
}
```

```js
import codebolt from '@codebolt/codeboltjs';

function buildOperationContext() {
  const message = codebolt.userMessage.getCurrent();

  if (message == null) throw new Error('The response is missing message.');
  return {
    userIntent: message.userMessage,
    resources: {
      files: message.mentionedFiles,
      tools: message.mentionedMCPs
    },
    editor: message.currentFile,
    selection: message.selection
  };
}
```
