---
title: generate
---

# `generate`

```typescript
client.codemap.generate(data: GenerateCodemapRequest): Promise<Codemap>
```

Generates a new codemap for specified files.

Parses the target files and produces a structural representation
capturing symbols, dependencies, and relationships.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GenerateCodemapRequest` | Yes | The generation request specifying target files or directories |

## Returns

`Promise<Codemap>` — A promise that resolves to the newly generated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codemap.generate(/* GenerateCodemapRequest */);
console.log(result);
```
