---
title: list
---

# `list`

```typescript
client.contextRuleEngine.list(params?: Record<string, unknown>): Promise<ContextRuleDefinition[]>
```

Lists all available context rules in the system.

Returns every context rule regardless of status or category. Use this
for comprehensive rule browsing or to populate rule management UIs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering rules |

## Returns

`Promise<ContextRuleDefinition[]>` — A promise that resolves to an array of ContextRuleDefinition objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.list();
console.log(result);
```
