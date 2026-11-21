---
title: get
---

# `get`

```typescript
client.codemap.get(codemapId: string): Promise<Codemap>
```

Retrieves a specific codemap by its ID.

Returns the full structural representation including all symbols,
relationships, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `codemapId` | `string` | Yes | The unique identifier of the codemap |

## Returns

`Promise<Codemap>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codemap.get('codemapId');
console.log(result);
```
