---
name: getConversations
description: Get conversations involving an agent.
cbbaseinfo:
  description: Get conversations involving an agent.
data:
  name: getConversations
  category: agentPortfolio
  link: getConversations.md
---

# getConversations

```text
codebolt.agentPortfolio.getConversations(agentId: string, limit?: number, offset?: number): Promise<GetConversationsResponse>
```

Get conversations involving an agent

## Parameters

- `agentId` — The ID of the agent
- `limit` — Maximum number of conversations to return
- `offset` — Offset for pagination

## Returns

Promise resolving to the list of conversations

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get recent conversations
  const conversations = await codebolt.agentPortfolio.getConversations('agent-123', 10);

  // Paginate through history
  const page1 = await codebolt.agentPortfolio.getConversations('agent-123', 20, 0);
  const page2 = await codebolt.agentPortfolio.getConversations('agent-123', 20, 20);
});
```
