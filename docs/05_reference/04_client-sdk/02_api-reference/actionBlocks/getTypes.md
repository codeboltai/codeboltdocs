---
title: getTypes
---

# `getTypes`

```typescript
client.actionBlocks.getTypes(): Promise<string[]>
```

Retrieves the list of available action block types.

Returns the distinct type identifiers that can be used when creating
or filtering action blocks.

## Parameters

_No parameters._

## Returns

`Promise<string[]>` — A promise that resolves to an array of type name strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionBlocks.getTypes();
console.log(result);
```
