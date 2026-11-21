---
title: getTypes
---

# `getTypes`

```typescript
client.capability.getTypes(): Promise<string[]>
```

Retrieves the list of available capability types.

Returns the distinct type identifiers that capabilities can belong to,
useful for categorizing or filtering capabilities.

## Parameters

_No parameters._

## Returns

`Promise<string[]>` — A promise that resolves to an array of type name strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.getTypes();
console.log(result);
```
