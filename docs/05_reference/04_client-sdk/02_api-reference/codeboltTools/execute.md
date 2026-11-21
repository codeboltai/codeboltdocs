---
title: execute
---

# `execute`

```typescript
client.codeboltTools.execute(data: ExecuteToolRequest): Promise<unknown>
```

Executes a CodeBolt tool with the provided input.

Runs the specified tool with the given parameters and returns the
execution result. Tool execution may involve file operations, API calls,
or other platform-specific actions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ExecuteToolRequest` | Yes | Request containing tool execution details |

## Returns

`Promise<unknown>` — A promise that resolves to the tool execution result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.execute(/* ExecuteToolRequest */);
console.log(result);
```
