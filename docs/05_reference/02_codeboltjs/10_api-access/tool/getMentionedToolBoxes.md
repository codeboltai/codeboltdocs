# getMentionedToolBoxes

Read MCP names mentioned in the active user message with [`codebolt.userMessage.getMentionedMCPs()`](../user-message-utilities/index.md#getmentionedmcps).

## Example

### Read MCP mentions from the active message

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  for (const name of codebolt.userMessage.getMentionedMCPs()) {
    console.log(name);
  }
});
```
