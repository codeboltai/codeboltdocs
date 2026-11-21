---
title: delete
---

# `delete`

```typescript
client.contextRuleEngine.delete(id: string): Promise<unknown>
```

Deletes a context rule from the system.

Permanently removes the specified rule. Any behavior or logic dependent
on this rule will no longer be executed. This operation cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the rule has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.delete('id');
console.log(result);
```
