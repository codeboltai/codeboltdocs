---
title: validate
---

# `validate`

```typescript
client.codeboltTools.validate(data: ValidateToolRequest): Promise<unknown>
```

Validates tool input before execution.

Checks whether the provided parameters conform to the tool's schema
requirements. Returns validation results highlighting any errors or
warnings without actually executing the tool.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateToolRequest` | Yes | Request containing validation data |

## Returns

`Promise<unknown>` — A promise that resolves to validation results

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.validate(/* ValidateToolRequest */);
console.log(result);
```
