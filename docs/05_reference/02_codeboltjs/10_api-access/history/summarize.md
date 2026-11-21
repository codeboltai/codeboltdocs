---
name: summarize
description: Summarizes a specific part of the chat history.
cbbaseinfo:
  description: Summarizes a specific part of the chat history.
---

# summarize

```text
codebolt.chatSummary.summarize(messages: { role: string; content: string; }[], depth: number): Promise<GetSummarizeResponse>
```

Summarizes a specific part of the chat history.

## Parameters

- `messages` — Array of message objects to summarize
- `depth` — How far back in history to consider

## Returns

Promise with an array of summarized message objects

## When to use it

Summarize a selected message sequence when only part of a conversation is relevant to the next task.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const messages = [
      { role: "user", content: "How do I implement user authentication in my React app?" },
      { role: "assistant", content: "For React authentication, you can use several approaches. The most common is JWT tokens with a library like react-router for protected routes. Here's a basic implementation..." },
      { role: "user", content: "What about password hashing?" },
      { role: "assistant", content: "For password hashing, never store plain text passwords. Use bcrypt on the backend. Here's how to implement it with Node.js..." },
      { role: "user", content: "Can you show me the complete login flow?" },
      { role: "assistant", content: "Here's a complete login flow: 1. User submits credentials, 2. Backend validates and hashes password, 3. Generate JWT token, 4. Store token in localStorage/cookies..." }
    ];
  const result = await codebolt.chatSummary.summarize(messages, 3);
  console.log(result);
});
```
