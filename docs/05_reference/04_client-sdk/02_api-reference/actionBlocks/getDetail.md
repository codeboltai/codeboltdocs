---
title: getDetail
---

# `getDetail`

```typescript
client.actionBlocks.getDetail(identifier: string): Promise<ActionBlockDetail>
```

Retrieves detailed information for a specific action block.

Returns the full configuration, metadata, and current state of the
action block identified by the given identifier string.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `identifier` | `string` | Yes | The unique identifier or name of the action block |

## Returns

`Promise<ActionBlockDetail>` — A promise that resolves to the detailed ActionBlockDetail object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionBlocks.getDetail('identifier');
console.log(result);
```
