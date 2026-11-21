---
title: getAll
---

# `getAll`

```typescript
client.apps.getAll(): Promise<App[]>
```

Retrieves all registered applications.

Returns the complete list of apps available in the system, both
installed and available for installation.

## Parameters

_No parameters._

## Returns

`Promise<App[]>` — A promise that resolves to an array of App objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.getAll();
console.log(result);
```
