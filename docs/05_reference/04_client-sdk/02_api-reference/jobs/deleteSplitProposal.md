---
title: deleteSplitProposal
---

# `deleteSplitProposal`

```typescript
client.jobs.deleteSplitProposal(id: string, proposalId: string): Promise<void>
```

Deletes a split proposal.

Removes a pending split proposal without executing the split.
Use this to reject or cancel a proposed job decomposition.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the parent job |
| `proposalId` | `string` | Yes | The unique identifier of the split proposal to delete |

## Returns

`Promise<void>` — A promise that resolves when the proposal has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.deleteSplitProposal('id', 'proposalId');
console.log(result);
```
