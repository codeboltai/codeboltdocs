---
title: addStep
---

# `addStep`

```typescript
client.chat.addStep(data: AddStepRequest): Promise<ChatThreadStep>
```

Adds a step to a thread via the add-step endpoint.

An alternative method for adding steps that accepts the thread ID
as part of the request body rather than the URL path.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddStepRequest` | Yes | The step addition request including thread ID and step data |

## Returns

`Promise<ChatThreadStep>` — A promise that resolves to the created ChatThreadStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.addStep(/* AddStepRequest */);
console.log(result);
```
