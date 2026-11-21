---
title: getOpenAiTools
---

# `getOpenAiTools`

```typescript
client.codeboltTools.getOpenAiTools(): Promise<OpenAiTool[]>
```

Retrieves all tools formatted as OpenAI tools.

Returns the entire tool catalog in OpenAI's tools schema format, suitable
for direct use with OpenAI's API function calling feature. Each tool
includes its type, function definition, and parameters.

## Parameters

_No parameters._

## Returns

`Promise<OpenAiTool[]>` — A promise that resolves to an array of OpenAiTool objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getOpenAiTools();
console.log(result);
```
