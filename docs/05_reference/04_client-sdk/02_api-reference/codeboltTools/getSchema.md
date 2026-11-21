---
title: getSchema
---

# `getSchema`

```typescript
client.codeboltTools.getSchema(toolName: string): Promise<CodeboltToolSchema>
```

Retrieves the JSON schema for a specific tool.

Returns the schema definition that describes the tool's input structure,
required parameters, and validation rules. Useful for building dynamic
UI forms or validating tool inputs before execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to get schema for |

## Returns

`Promise<CodeboltToolSchema>` — A promise that resolves to the CodeboltToolSchema object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getSchema('toolName');
console.log(result);
```
