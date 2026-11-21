---
title: get
---

# `get`

```typescript
client.contextRuleEngine.get(id: string): Promise<ContextRuleDefinition>
```

Retrieves a specific context rule by its unique identifier.

Returns detailed information about a single rule including its
conditions, actions, metadata, and evaluation configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the context rule |

## Returns

`Promise<ContextRuleDefinition>` — A promise that resolves to the ContextRuleDefinition object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.get('id');
console.log(result);
```
