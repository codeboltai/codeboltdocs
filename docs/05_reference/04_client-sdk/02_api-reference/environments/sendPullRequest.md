---
title: sendPullRequest
---

# `sendPullRequest`

```typescript
client.environments.sendPullRequest(id: string, data: SendPullRequestRequest): Promise<unknown>
```

Sends a pull request from the environment's current state.

Creates a pull request on the remote repository using the changes
present in the environment. The PR details are specified in the request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `SendPullRequestRequest` | Yes | Pull request details including title, description, and target branch |

## Returns

`Promise<unknown>` — A promise that resolves when the pull request has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.sendPullRequest('id', /* SendPullRequestRequest */);
console.log(result);
```
