---
title: acceptSplitProposal
---

# `acceptSplitProposal`

```typescript
client.jobs.acceptSplitProposal(id: string, proposalId: string, data?: AcceptSplitProposalRequest): Promise<Job[]>
```

Accepts a split proposal, executing the job decomposition.

Approves the proposal and splits the original job into the proposed
sub-jobs. The original job's status may be updated to reflect the split.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the parent job |
| `proposalId` | `string` | Yes | The unique identifier of the split proposal to accept |
| `data` | `AcceptSplitProposalRequest` | No | Optional acceptance parameters for additional context |

## Returns

`Promise<Job[]>` — A promise that resolves to an array of the newly created sub- objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.acceptSplitProposal('id', 'proposalId');
console.log(result);
```
