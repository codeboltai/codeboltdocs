---
title: addSteeringStep
---

# `addSteeringStep`

```typescript
client.chat.addSteeringStep(data: AddSteeringStepRequest): Promise<SteeringStep>
```

Adds a steering step to a thread.

Creates a steering step that guides the agent's behavior during
execution, providing directional instructions or constraints.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddSteeringStepRequest` | Yes | The steering step creation payload |

## Returns

`Promise<SteeringStep>` — A promise that resolves to the created SteeringStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.addSteeringStep(/* AddSteeringStepRequest */);
console.log(result);
```
