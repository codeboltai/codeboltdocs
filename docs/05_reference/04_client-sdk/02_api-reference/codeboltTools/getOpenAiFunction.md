---
title: getOpenAiFunction
---

# `getOpenAiFunction`

```typescript
client.codeboltTools.getOpenAiFunction(toolName: string): Promise<OpenAiFunction>
```

Retrieves a specific tool formatted as an OpenAI function.

Returns a single tool in OpenAI's functions schema format for targeted
integration with the legacy function calling API.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `toolName` | `string` | Yes | The name of the tool to retrieve |

## Returns

`Promise<OpenAiFunction>` — A promise that resolves to the OpenAiFunction object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getOpenAiFunction('toolName');
console.log(result);
```
