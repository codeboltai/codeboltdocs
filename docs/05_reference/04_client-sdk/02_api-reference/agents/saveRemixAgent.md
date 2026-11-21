---
title: saveRemixAgent
---

# `saveRemixAgent`

```typescript
client.agents.saveRemixAgent(data: RemixAgent): Promise<RemixAgent>
```

Saves a remix agent.

Creates or saves a remix agent, which is a customized variant of an
existing agent with modified prompts, settings, or capabilities.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RemixAgent` | Yes | The remix agent definition to save |

## Returns

`Promise<RemixAgent>` — A promise that resolves to the saved RemixAgent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.saveRemixAgent(/* RemixAgent */);
console.log(result);
```
