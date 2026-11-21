---
title: assemble
---

# `assemble`

```typescript
client.contextAssembly.assemble(data: ContextAssembleRequest): Promise<ContextAssembleResult>
```

Assembles context from multiple sources.

Gathers and merges data from configured context sources (memory types,
rules, files) into a single unified context object for agent consumption.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ContextAssembleRequest` | Yes | The assembly request specifying sources and parameters |

## Returns

`Promise<ContextAssembleResult>` — A promise that resolves to the assembled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextAssembly.assemble(/* ContextAssembleRequest */);
console.log(result);
```
