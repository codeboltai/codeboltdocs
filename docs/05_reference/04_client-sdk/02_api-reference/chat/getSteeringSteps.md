---
title: getSteeringSteps
---

# `getSteeringSteps`

```typescript
client.chat.getSteeringSteps(threadId: string): Promise<SteeringStep[]>
```

Retrieves all steering steps for a thread.

Returns the list of steering instructions that have been added
to guide agent behavior in the thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<SteeringStep[]>` — A promise that resolves to an array of SteeringStep objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getSteeringSteps('threadId');
console.log(result);
```
