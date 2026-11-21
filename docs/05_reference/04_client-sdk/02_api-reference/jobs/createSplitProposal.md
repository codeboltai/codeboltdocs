---
title: createSplitProposal
---

# `createSplitProposal`

```typescript
client.jobs.createSplitProposal(id: string, data: CreateSplitProposalRequest): Promise<JobSplitProposal>
```

Creates a split proposal for a job.

Proposes breaking a large job into smaller sub-jobs. The proposal
must be accepted before the split is executed. This enables
collaborative task decomposition.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to split |
| `data` | `CreateSplitProposalRequest` | Yes | Split proposal details including the proposed sub-jobs |

## Returns

`Promise<JobSplitProposal>` — A promise that resolves to the created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.createSplitProposal('id', /* CreateSplitProposalRequest */);
console.log(result);
```
