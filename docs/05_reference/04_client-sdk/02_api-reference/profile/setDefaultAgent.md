---
title: setDefaultAgent
---

# `setDefaultAgent`

```typescript
client.profile.setDefaultAgent(data: SetDefaultAgentRequest): Promise<void>
```

Sets the default agent for the user's profile.

Configures which agent is automatically selected when the user starts a new
conversation or task. This persists across sessions until changed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetDefaultAgentRequest` | Yes | The request containing the agent to set as default |

## Returns

`Promise<void>` — A promise that resolves when the default agent has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.profile.setDefaultAgent(/* SetDefaultAgentRequest */);
console.log(result);
```
