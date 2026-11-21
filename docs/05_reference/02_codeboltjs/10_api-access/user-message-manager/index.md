# User Message Manager API

Use [`codebolt.userMessage`](../user-message-utilities/index.md) to read the active message and session data.

## Example

### Read the current user message and its file mentions

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const text = codebolt.userMessage.getText();
  const files = codebolt.userMessage.getMentionedFiles();
  console.log(text, files);
});
```
