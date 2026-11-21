---
title: getOpenAiFunctions
---

# `getOpenAiFunctions`

```typescript
client.codeboltTools.getOpenAiFunctions(): Promise<OpenAiFunction[]>
```

Retrieves all tools formatted as OpenAI functions.

Returns the entire tool catalog in OpenAI's functions schema format,
compatible with the legacy function calling API. Each function includes
its name, description, and parameter schema.

## Parameters

_No parameters._

## Returns

`Promise<OpenAiFunction[]>` — A promise that resolves to an array of OpenAiFunction objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getOpenAiFunctions();
console.log(result);
```
