---
name: sendConfirmationRequest
description: 'Sends a confirmation request to the server with two options: Yes or No.'
cbbaseinfo:
  description: 'Sends a confirmation request to the server with two options: Yes or No.'
data:
  name: sendConfirmationRequest
  category: chat
  link: sendConfirmationRequest.md
---

# sendConfirmationRequest

```text
codebolt.chat.sendConfirmationRequest(confirmationMessage: string, buttons?: string[], withFeedback?: boolean): Promise<string>
```

Sends a confirmation request to the server with two options: Yes or No.

## Returns

A promise that resolves with the server's response.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Processing confirmation response
  const deployResponse = await codebolt.chat.sendConfirmationRequest(
      "Ready to deploy to production?",
      ["Deploy Now", "Schedule Later", "Cancel"],
      false
  );
});
```
