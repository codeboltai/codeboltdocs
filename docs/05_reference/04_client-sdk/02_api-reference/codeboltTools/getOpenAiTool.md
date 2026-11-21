---
title: getOpenAiTool
---

# `getOpenAiTool`

```typescript
client.codeboltTools.getOpenAiTool(toolName: string): Promise<OpenAiTool>
```

Retrieves a specific tool formatted as an OpenAI tool.

Returns a single tool in OpenAI's tools schema format for targeted
integration when only specific tools are needed for function calling.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to retrieve |

## Returns

`Promise<OpenAiTool>` — A promise that resolves to the OpenAiTool object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getOpenAiTool('toolName');
console.log(result);
```
