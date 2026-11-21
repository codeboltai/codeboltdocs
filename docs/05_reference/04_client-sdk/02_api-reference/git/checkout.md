---
title: checkout
---

# `checkout`

```typescript
client.git.checkout(data: GitCheckoutRequest): Promise<unknown>
```

Checks out an existing branch or commit.

Switches the working directory to the specified branch, tag, or
commit hash.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCheckoutRequest` | Yes | Checkout parameters specifying the target branch or commit |

## Returns

`Promise<unknown>` — A promise that resolves when the checkout is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.checkout(/* GitCheckoutRequest */);
console.log(result);
```
