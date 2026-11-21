---
title: ReviewMerge API
---

# ReviewMerge API

Review Merge API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addLinkedJob`](./addLinkedJob) | Links an existing job to a review-merge request. |
| [`addPheromone`](./addPheromone) | Adds a pheromone tag to a review-merge request. |
| [`addProposedJob`](./addProposedJob) | Adds a proposed job to a review-merge request. |
| [`addReview`](./addReview) | Adds a review or feedback to a review-merge request. |
| [`approveProposedJob`](./approveProposedJob) | Approves a proposed job on a review-merge request. |
| [`approveUnlockRequest`](./approveUnlockRequest) | Approves an unlock request, releasing the lock on a review-merge request. |
| [`convertProposedJob`](./convertProposedJob) | Converts an approved proposed job into an actual job. |
| [`create`](./create) | Creates a new review-merge request. |
| [`createUnlockRequest`](./createUnlockRequest) | Creates an unlock request for a locked review-merge request. |
| [`delete`](./delete) | Deletes a review-merge request. |
| [`get`](./get) | Retrieves a specific review-merge request by its ID. |
| [`getAll`](./getAll) | Retrieves all review-merge requests, optionally filtered by query parameters. |
| [`getByAgent`](./getByAgent) | Retrieves all review-merge requests associated with a specific agent. |
| [`getBySwarm`](./getBySwarm) | Retrieves all review-merge requests associated with a specific swarm. |
| [`getPending`](./getPending) | Retrieves all pending review-merge requests. |
| [`getPheromoneTypes`](./getPheromoneTypes) | Retrieves the list of available pheromone types. |
| [`getReadyToMerge`](./getReadyToMerge) | Retrieves all review-merge requests that are approved and ready to merge. |
| [`getStatistics`](./getStatistics) | Retrieves aggregate statistics about review-merge requests. |
| [`lock`](./lock) | Locks a review-merge request to prevent concurrent modifications. |
| [`merge`](./merge) | Merges an approved review-merge request. |
| [`rejectProposedJob`](./rejectProposedJob) | Rejects a proposed job on a review-merge request. |
| [`rejectUnlockRequest`](./rejectUnlockRequest) | Rejects an unlock request, keeping the review-merge request locked. |
| [`removeLinkedJob`](./removeLinkedJob) | Removes a linked job from a review-merge request. |
| [`removePheromone`](./removePheromone) | Removes a pheromone tag from a review-merge request. |
| [`unlock`](./unlock) | Unlocks a previously locked review-merge request. |
| [`update`](./update) | Updates an existing review-merge request. |
| [`updateStatus`](./updateStatus) | Updates the status of a review-merge request. |

## Methods

---

### `addLinkedJob`

```typescript
client.reviewMerge.addLinkedJob(id: string, data: AddLinkedJobRequest): Promise<unknown>
```

Links an existing job to a review-merge request.

Associates a job with this review so that changes from the job are tracked as part
of the review workflow.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddLinkedJobRequest` | Yes | The linked job details including the job ID to associate |

**Returns:** `Promise<unknown>` — A promise that resolves when the job has been linked

[Full reference →](./addLinkedJob)

---

### `addPheromone`

```typescript
client.reviewMerge.addPheromone(id: string, data: AddPheromoneRequest): Promise<unknown>
```

Adds a pheromone tag to a review-merge request.

Pheromones are metadata signals used for inter-agent communication. Adding a pheromone
allows agents to tag reviews with contextual information that other agents can detect.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddPheromoneRequest` | Yes | The pheromone data to attach |

**Returns:** `Promise<unknown>` — A promise that resolves when the pheromone has been added

[Full reference →](./addPheromone)

---

### `addProposedJob`

```typescript
client.reviewMerge.addProposedJob(id: string, data: AddProposedJobRequest): Promise<unknown>
```

Adds a proposed job to a review-merge request.

Proposed jobs are suggested work items that arise from the review process. They must
be approved before being converted into actual jobs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddProposedJobRequest` | Yes | The proposed job details |

**Returns:** `Promise<unknown>` — A promise that resolves when the proposed job has been added

[Full reference →](./addProposedJob)

---

### `addReview`

```typescript
client.reviewMerge.addReview(id: string, data: AddReviewFeedbackRequest): Promise<unknown>
```

Adds a review or feedback to a review-merge request.

Submits review feedback (approval, rejection, or comments) from a reviewer.
Multiple reviews can be added from different reviewers.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddReviewFeedbackRequest` | Yes | The review feedback payload containing the reviewer's assessment |

**Returns:** `Promise<unknown>` — A promise that resolves when the review has been added

[Full reference →](./addReview)

---

### `approveProposedJob`

```typescript
client.reviewMerge.approveProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Approves a proposed job on a review-merge request.

Marks the proposed job as approved, making it eligible for conversion into an actual job.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the proposed job to approve |
| `data` | `Record<string, unknown>` | No | Optional additional data for the approval |

**Returns:** `Promise<unknown>` — A promise that resolves when the proposed job has been approved

[Full reference →](./approveProposedJob)

---

### `approveUnlockRequest`

```typescript
client.reviewMerge.approveUnlockRequest(id: string, unlockRequestId: string, data?: Record<string, unknown>): Promise<unknown>
```

Approves an unlock request, releasing the lock on a review-merge request.

The lock holder calls this to grant an unlock request from another agent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `unlockRequestId` | `string` | Yes | The unique identifier of the unlock request to approve |
| `data` | `Record<string, unknown>` | No | Optional additional data for the approval |

**Returns:** `Promise<unknown>` — A promise that resolves when the unlock request has been approved

[Full reference →](./approveUnlockRequest)

---

### `convertProposedJob`

```typescript
client.reviewMerge.convertProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Converts an approved proposed job into an actual job.

Takes a previously approved proposed job and creates a real job from it. The proposed
job must have been approved before conversion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the approved proposed job to convert |
| `data` | `Record<string, unknown>` | No | Optional additional data for the conversion |

**Returns:** `Promise<unknown>` — A promise that resolves when the proposed job has been converted

[Full reference →](./convertProposedJob)

---

### `create`

```typescript
client.reviewMerge.create(data: CreateReviewMergeRequest): Promise<ReviewMergeRequest>
```

Creates a new review-merge request.

Initiates a review workflow for a set of changes. The request will enter the pending
state and can be reviewed, locked, and eventually merged.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateReviewMergeRequest` | Yes | The review-merge request creation payload |

**Returns:** `Promise<ReviewMergeRequest>` — A promise that resolves to the newly created ReviewMergeRequest

[Full reference →](./create)

---

### `createUnlockRequest`

```typescript
client.reviewMerge.createUnlockRequest(id: string, data: CreateUnlockRequest): Promise<unknown>
```

Creates an unlock request for a locked review-merge request.

When a review is locked by another agent, this creates a formal request to unlock it.
The lock holder can then approve or reject the unlock request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the locked review-merge request |
| `data` | `CreateUnlockRequest` | Yes | The unlock request payload with reason and requester information |

**Returns:** `Promise<unknown>` — A promise that resolves when the unlock request has been created

[Full reference →](./createUnlockRequest)

---

### `delete`

```typescript
client.reviewMerge.delete(id: string): Promise<unknown>
```

Deletes a review-merge request.

Permanently removes a review-merge request and all associated data. This action
cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the deletion is complete

[Full reference →](./delete)

---

### `get`

```typescript
client.reviewMerge.get(id: string): Promise<ReviewMergeRequest>
```

Retrieves a specific review-merge request by its ID.

Fetches the full details of a single review-merge request including its current
status, reviews, pheromones, and linked jobs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |

**Returns:** `Promise<ReviewMergeRequest>` — A promise that resolves to the ReviewMergeRequest object

[Full reference →](./get)

---

### `getAll`

```typescript
client.reviewMerge.getAll(params?: Record<string, unknown>): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests, optionally filtered by query parameters.

Returns the complete list of review-merge requests. Use the optional params to filter
by status, date range, or other criteria supported by the server.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering the results |

**Returns:** `Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects

[Full reference →](./getAll)

---

### `getByAgent`

```typescript
client.reviewMerge.getByAgent(agentId: string): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests associated with a specific agent.

Filters requests by the agent that created or is assigned to them. Useful for
building agent-specific review dashboards or tracking an agent's review workload.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent to filter by |

**Returns:** `Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects for the agent

[Full reference →](./getByAgent)

---

### `getBySwarm`

```typescript
client.reviewMerge.getBySwarm(swarmId: string): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests associated with a specific swarm.

Filters requests by the swarm that generated them. Useful for monitoring review
activity within a particular swarm context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to filter by |

**Returns:** `Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects for the swarm

[Full reference →](./getBySwarm)

---

### `getPending`

```typescript
client.reviewMerge.getPending(): Promise<ReviewMergeRequest[]>
```

Retrieves all pending review-merge requests.

Returns requests that are awaiting review and have not yet been approved or rejected.
Use this to build a review queue or dashboard showing outstanding work.

_No parameters._

**Returns:** `Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of pending ReviewMergeRequest objects

[Full reference →](./getPending)

---

### `getPheromoneTypes`

```typescript
client.reviewMerge.getPheromoneTypes(): Promise<string[]>
```

Retrieves the list of available pheromone types.

Pheromones are tags or signals that can be attached to review requests to communicate
metadata to other agents. This returns the set of recognized pheromone type strings.

_No parameters._

**Returns:** `Promise<string[]>` — A promise that resolves to an array of pheromone type name strings

[Full reference →](./getPheromoneTypes)

---

### `getReadyToMerge`

```typescript
client.reviewMerge.getReadyToMerge(): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests that are approved and ready to merge.

Filters for requests that have passed all review criteria and can be merged immediately.
Useful for automated merge pipelines or merge-ready dashboards.

_No parameters._

**Returns:** `Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of merge-ready ReviewMergeRequest objects

[Full reference →](./getReadyToMerge)

---

### `getStatistics`

```typescript
client.reviewMerge.getStatistics(): Promise<ReviewMergeStatistics>
```

Retrieves aggregate statistics about review-merge requests.

Returns counts and metrics across all review states, useful for monitoring review
throughput and identifying bottlenecks in the review process.

_No parameters._

**Returns:** `Promise<ReviewMergeStatistics>` — A promise that resolves to a ReviewMergeStatistics object with aggregate data

[Full reference →](./getStatistics)

---

### `lock`

```typescript
client.reviewMerge.lock(id: string, data?: LockReviewRequest): Promise<unknown>
```

Locks a review-merge request to prevent concurrent modifications.

Acquiring a lock ensures exclusive access while performing operations on the request.
Other agents attempting to modify a locked request will be blocked.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to lock |
| `data` | `LockReviewRequest` | No | Optional lock configuration parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the lock has been acquired

[Full reference →](./lock)

---

### `merge`

```typescript
client.reviewMerge.merge(id: string, data?: MergeReviewRequest): Promise<unknown>
```

Merges an approved review-merge request.

Executes the final merge operation on a review that has been approved and is ready
to merge. This applies the associated changes to the target branch or codebase.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to merge |
| `data` | `MergeReviewRequest` | No | Optional merge configuration parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the merge is complete

[Full reference →](./merge)

---

### `rejectProposedJob`

```typescript
client.reviewMerge.rejectProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Rejects a proposed job on a review-merge request.

Marks the proposed job as rejected, preventing it from being converted into an actual job.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the proposed job to reject |
| `data` | `Record<string, unknown>` | No | Optional additional data such as rejection reason |

**Returns:** `Promise<unknown>` — A promise that resolves when the proposed job has been rejected

[Full reference →](./rejectProposedJob)

---

### `rejectUnlockRequest`

```typescript
client.reviewMerge.rejectUnlockRequest(id: string, unlockRequestId: string, data?: Record<string, unknown>): Promise<unknown>
```

Rejects an unlock request, keeping the review-merge request locked.

The lock holder calls this to deny an unlock request from another agent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `unlockRequestId` | `string` | Yes | The unique identifier of the unlock request to reject |
| `data` | `Record<string, unknown>` | No | Optional additional data such as rejection reason |

**Returns:** `Promise<unknown>` — A promise that resolves when the unlock request has been rejected

[Full reference →](./rejectUnlockRequest)

---

### `removeLinkedJob`

```typescript
client.reviewMerge.removeLinkedJob(id: string, jobId: string): Promise<unknown>
```

Removes a linked job from a review-merge request.

Disassociates a previously linked job from the review request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `jobId` | `string` | Yes | The unique identifier of the job to unlink |

**Returns:** `Promise<unknown>` — A promise that resolves when the job has been unlinked

[Full reference →](./removeLinkedJob)

---

### `removePheromone`

```typescript
client.reviewMerge.removePheromone(id: string, type: string): Promise<unknown>
```

Removes a pheromone tag from a review-merge request.

Detaches a previously added pheromone by its type string from the review request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `type` | `string` | Yes | The pheromone type string to remove |

**Returns:** `Promise<unknown>` — A promise that resolves when the pheromone has been removed

[Full reference →](./removePheromone)

---

### `unlock`

```typescript
client.reviewMerge.unlock(id: string, data?: UnlockReviewRequest): Promise<unknown>
```

Unlocks a previously locked review-merge request.

Releases the lock on a review request, allowing other agents to modify it again.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to unlock |
| `data` | `UnlockReviewRequest` | No | Optional unlock parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the lock has been released

[Full reference →](./unlock)

---

### `update`

```typescript
client.reviewMerge.update(id: string, data: UpdateReviewMergeRequest): Promise<ReviewMergeRequest>
```

Updates an existing review-merge request.

Modifies the mutable fields of a review-merge request such as title, description,
or other metadata. Does not change the review status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to update |
| `data` | `UpdateReviewMergeRequest` | Yes | The fields to update |

**Returns:** `Promise<ReviewMergeRequest>` — A promise that resolves to the updated ReviewMergeRequest

[Full reference →](./update)

---

### `updateStatus`

```typescript
client.reviewMerge.updateStatus(id: string, data: UpdateReviewStatusRequest): Promise<unknown>
```

Updates the status of a review-merge request.

Transitions the request to a new review status (e.g., approved, rejected, needs-changes).
This is the primary mechanism for progressing a request through the review workflow.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `UpdateReviewStatusRequest` | Yes | The status update payload containing the new status |

**Returns:** `Promise<unknown>` — A promise that resolves when the status has been updated

[Full reference →](./updateStatus)

