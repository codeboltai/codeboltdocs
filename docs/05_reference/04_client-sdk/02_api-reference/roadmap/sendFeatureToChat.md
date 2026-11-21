---
title: sendFeatureToChat
---

# `sendFeatureToChat`

```typescript
client.roadmap.sendFeatureToChat(featureId: string, data?: SendFeatureToChatRequest): Promise<unknown>
```

Sends a feature to the chat for discussion.

Shares the feature details in a chat context so that team members or agents can
discuss and collaborate on the feature requirements.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to send to chat |
| `data` | `SendFeatureToChatRequest` | No | Optional parameters controlling how the feature is shared |

## Returns

`Promise<unknown>` — A promise that resolves when the feature has been sent to chat

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.sendFeatureToChat('featureId');
console.log(result);
```
