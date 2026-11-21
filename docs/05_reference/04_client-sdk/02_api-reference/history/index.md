---
title: History API
---

# History API

History API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getByAgentId`](./getByAgentId) | Retrieves the execution history for a specific agent. |

## Methods

---

### `getByAgentId`

```typescript
client.history.getByAgentId(agentId: string): Promise<HistoryEntry[]>
```

Retrieves the execution history for a specific agent.

Returns an ordered list of history entries documenting every action
the agent performed, including timestamps and payloads. Useful for
reviewing what an agent did during a session.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent whose history to retrieve |

**Returns:** `Promise<HistoryEntry[]>` — A promise that resolves to an array of  objects in chronological order

[Full reference →](./getByAgentId)

