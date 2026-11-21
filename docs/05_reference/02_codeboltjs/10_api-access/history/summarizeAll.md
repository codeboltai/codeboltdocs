---
name: summarizeAll
description: Summarizes the entire chat history.
cbbaseinfo:
  description: Summarizes the entire chat history.
---

# summarizeAll

```text
codebolt.chatSummary.summarizeAll(): Promise<GetSummarizeAllResponse>
```

Summarizes the entire chat history.

## Returns

Promise with an array of message objects containing role and content

## When to use it

Request a summary for the history associated with the current session.

## Example

### Context Preservation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Save conversation context before starting new session
  const conversationContext = await codebolt.chatSummary.summarizeAll();
  localStorage.setItem('chatContext', JSON.stringify(conversationContext));
});
```
