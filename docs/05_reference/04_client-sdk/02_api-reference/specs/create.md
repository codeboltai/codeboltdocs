---
title: create
---

# `create`

```typescript
client.specs.create(data: CreateSpecRequest): Promise<Spec>
```

Creates a new specification document.

Registers a new spec with the system using the provided content.
The spec can include technical details, API definitions, architecture
descriptions, and other structured specification information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateSpecRequest` | Yes | Request containing the spec details |

## Returns

`Promise<Spec>` — A promise that resolves to the created Spec object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.specs.create(/* CreateSpecRequest */);
console.log(result);
```
