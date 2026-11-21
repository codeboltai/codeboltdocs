---
title: Jobs API
---

# Jobs API

Jobs API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`acceptSplitProposal`](./acceptSplitProposal) | Accepts a split proposal, executing the job decomposition. |
| [`addDependency`](./addDependency) | Adds a dependency between two jobs. |
| [`addPheromone`](./addPheromone) | Deposits a pheromone signal on a job. |
| [`bulkDelete`](./bulkDelete) | Deletes multiple jobs in a single batch operation. |
| [`create`](./create) | Creates a new job. |
| [`createGroup`](./createGroup) | Creates a new job group. |
| [`createLabel`](./createLabel) | Creates a new job label. |
| [`createPheromoneType`](./createPheromoneType) | Creates a new pheromone type definition. |
| [`createSplitProposal`](./createSplitProposal) | Creates a split proposal for a job. |
| [`delete`](./delete) | Deletes a job. |
| [`deleteGroup`](./deleteGroup) | Deletes a job group. |
| [`deleteLabel`](./deleteLabel) | Deletes a job label by its name. |
| [`deletePheromoneType`](./deletePheromoneType) | Deletes a pheromone type by its name. |
| [`deleteSplitProposal`](./deleteSplitProposal) | Deletes a split proposal. |
| [`get`](./get) | Retrieves a specific job by its ID. |
| [`getAggregatedPheromones`](./getAggregatedPheromones) | Retrieves aggregated pheromone data for a job. |
| [`getAll`](./getAll) | Lists all jobs, optionally filtered. |
| [`getBlocked`](./getBlocked) | Retrieves all currently blocked jobs. |
| [`getGroups`](./getGroups) | Lists all job groups. |
| [`getJobsByPheromone`](./getJobsByPheromone) | Retrieves all jobs that have a specific pheromone type attached. |
| [`getLabels`](./getLabels) | Lists all available job labels. |
| [`getPheromones`](./getPheromones) | Retrieves all pheromones attached to a specific job. |
| [`getPheromoneTypes`](./getPheromoneTypes) | Retrieves all registered pheromone types. |
| [`getReady`](./getReady) | Retrieves all jobs that are ready to execute. |
| [`getStatistics`](./getStatistics) | Retrieves aggregate statistics about the job system. |
| [`removeDependency`](./removeDependency) | Removes a dependency from a job. |
| [`removePheromone`](./removePheromone) | Removes a pheromone of a specific type from a job. |
| [`update`](./update) | Updates an existing job. |
| [`updateGroup`](./updateGroup) | Updates an existing job group. |

## Methods

---

### `acceptSplitProposal`

```typescript
client.jobs.acceptSplitProposal(id: string, proposalId: string, data?: AcceptSplitProposalRequest): Promise<Job[]>
```

Accepts a split proposal, executing the job decomposition.

Approves the proposal and splits the original job into the proposed
sub-jobs. The original job's status may be updated to reflect the split.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the parent job |
| `proposalId` | `string` | Yes | The unique identifier of the split proposal to accept |
| `data` | `AcceptSplitProposalRequest` | No | Optional acceptance parameters for additional context |

**Returns:** `Promise<Job[]>` — A promise that resolves to an array of the newly created sub- objects

[Full reference →](./acceptSplitProposal)

---

### `addDependency`

```typescript
client.jobs.addDependency(id: string, data: AddDependencyRequest): Promise<void>
```

Adds a dependency between two jobs.

Declares that the specified job depends on another job, meaning it
cannot start until the dependency is resolved. This builds the
job dependency graph used for scheduling.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the dependent job |
| `data` | `AddDependencyRequest` | Yes | Dependency payload specifying the target job that must complete first |

**Returns:** `Promise<void>` — A promise that resolves when the dependency has been added

[Full reference →](./addDependency)

---

### `addPheromone`

```typescript
client.jobs.addPheromone(id: string, data: PheromoneDepositRequest): Promise<Pheromone>
```

Deposits a pheromone signal on a job.

Attaches a pheromone of the specified type to the job, which other
agents can detect and use for coordination decisions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |
| `data` | `PheromoneDepositRequest` | Yes | Pheromone deposit payload including type and value |

**Returns:** `Promise<Pheromone>` — A promise that resolves to the created

[Full reference →](./addPheromone)

---

### `bulkDelete`

```typescript
client.jobs.bulkDelete(data: BulkDeleteJobsRequest): Promise<void>
```

Deletes multiple jobs in a single batch operation.

More efficient than deleting jobs one at a time when you need to
remove several jobs simultaneously.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkDeleteJobsRequest` | Yes | Payload containing the array of job IDs to delete |

**Returns:** `Promise<void>` — A promise that resolves when all specified jobs have been deleted

[Full reference →](./bulkDelete)

---

### `create`

```typescript
client.jobs.create(data: CreateJobRequest): Promise<Job>
```

Creates a new job.

Registers a work item that can be assigned to agents, tracked through
its lifecycle, and coordinated with other jobs via dependencies.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJobRequest` | Yes | Job creation payload including title, description, and configuration |

**Returns:** `Promise<Job>` — A promise that resolves to the newly created

[Full reference →](./create)

---

### `createGroup`

```typescript
client.jobs.createGroup(data: CreateJobGroupRequest): Promise<JobGroup>
```

Creates a new job group.

Groups provide an organizational layer for jobs, allowing you to
categorize and manage them as a collection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJobGroupRequest` | Yes | Group creation payload including name and description |

**Returns:** `Promise<JobGroup>` — A promise that resolves to the newly created

[Full reference →](./createGroup)

---

### `createLabel`

```typescript
client.jobs.createLabel(data: CreateLabelRequest): Promise<JobLabel>
```

Creates a new job label.

Registers a label that can be attached to jobs for categorization.
Labels are system-wide and reusable across all jobs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateLabelRequest` | Yes | Label creation payload including name and optional color |

**Returns:** `Promise<JobLabel>` — A promise that resolves to the newly created

[Full reference →](./createLabel)

---

### `createPheromoneType`

```typescript
client.jobs.createPheromoneType(data: CreatePheromoneTypeRequest): Promise<PheromoneType>
```

Creates a new pheromone type definition.

Registers a new category of pheromone that can subsequently be
deposited on jobs. Pheromone types are system-wide and shared
across all jobs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePheromoneTypeRequest` | Yes | Pheromone type creation payload including name and configuration |

**Returns:** `Promise<PheromoneType>` — A promise that resolves to the newly created

[Full reference →](./createPheromoneType)

---

### `createSplitProposal`

```typescript
client.jobs.createSplitProposal(id: string, data: CreateSplitProposalRequest): Promise<JobSplitProposal>
```

Creates a split proposal for a job.

Proposes breaking a large job into smaller sub-jobs. The proposal
must be accepted before the split is executed. This enables
collaborative task decomposition.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to split |
| `data` | `CreateSplitProposalRequest` | Yes | Split proposal details including the proposed sub-jobs |

**Returns:** `Promise<JobSplitProposal>` — A promise that resolves to the created

[Full reference →](./createSplitProposal)

---

### `delete`

```typescript
client.jobs.delete(id: string): Promise<void>
```

Deletes a job.

Permanently removes a job and its associated data. Dependencies
pointing to this job are also cleaned up.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to delete |

**Returns:** `Promise<void>` — A promise that resolves when deletion is complete

[Full reference →](./delete)

---

### `deleteGroup`

```typescript
client.jobs.deleteGroup(id: string): Promise<void>
```

Deletes a job group.

Removes the group. Jobs previously assigned to this group are not
deleted but lose their group association.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the group to delete |

**Returns:** `Promise<void>` — A promise that resolves when deletion is complete

[Full reference →](./deleteGroup)

---

### `deleteLabel`

```typescript
client.jobs.deleteLabel(name: string): Promise<void>
```

Deletes a job label by its name.

Removes the label definition. Jobs that previously had this label
will lose the association.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the label to delete |

**Returns:** `Promise<void>` — A promise that resolves when deletion is complete

[Full reference →](./deleteLabel)

---

### `deletePheromoneType`

```typescript
client.jobs.deletePheromoneType(name: string): Promise<void>
```

Deletes a pheromone type by its name.

Removes the pheromone type definition from the system. Existing
pheromones of this type on jobs may also be affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the pheromone type to delete |

**Returns:** `Promise<void>` — A promise that resolves when deletion is complete

[Full reference →](./deletePheromoneType)

---

### `deleteSplitProposal`

```typescript
client.jobs.deleteSplitProposal(id: string, proposalId: string): Promise<void>
```

Deletes a split proposal.

Removes a pending split proposal without executing the split.
Use this to reject or cancel a proposed job decomposition.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the parent job |
| `proposalId` | `string` | Yes | The unique identifier of the split proposal to delete |

**Returns:** `Promise<void>` — A promise that resolves when the proposal has been deleted

[Full reference →](./deleteSplitProposal)

---

### `get`

```typescript
client.jobs.get(id: string): Promise<Job>
```

Retrieves a specific job by its ID.

Returns the full details of a single job including its status,
dependencies, labels, and pheromones.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

**Returns:** `Promise<Job>` — A promise that resolves to the

[Full reference →](./get)

---

### `getAggregatedPheromones`

```typescript
client.jobs.getAggregatedPheromones(id: string): Promise<Record<string, unknown>>
```

Retrieves aggregated pheromone data for a job.

Returns a summary of all pheromone signals on the job, grouped and
aggregated by type. Useful for dashboards and high-level status views.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

**Returns:** `Promise<Record<string, unknown>>` — A promise that resolves to a record of aggregated pheromone data keyed by type

[Full reference →](./getAggregatedPheromones)

---

### `getAll`

```typescript
client.jobs.getAll(params?: JobListFilters): Promise<Job[]>
```

Lists all jobs, optionally filtered.

Returns every job in the system unless filter parameters are provided
to narrow the results by status, group, label, or other criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `JobListFilters` | No | Optional filter and pagination parameters |

**Returns:** `Promise<Job[]>` — A promise that resolves to an array of  objects

[Full reference →](./getAll)

---

### `getBlocked`

```typescript
client.jobs.getBlocked(): Promise<Job[]>
```

Retrieves all currently blocked jobs.

Returns jobs that have unresolved dependencies preventing them from
being executed. Useful for identifying bottlenecks in the job graph.

_No parameters._

**Returns:** `Promise<Job[]>` — A promise that resolves to an array of blocked  objects

[Full reference →](./getBlocked)

---

### `getGroups`

```typescript
client.jobs.getGroups(): Promise<JobGroup[]>
```

Lists all job groups.

Job groups organize related jobs into logical collections, making
it easier to manage large numbers of jobs.

_No parameters._

**Returns:** `Promise<JobGroup[]>` — A promise that resolves to an array of  objects

[Full reference →](./getGroups)

---

### `getJobsByPheromone`

```typescript
client.jobs.getJobsByPheromone(type: string): Promise<Job[]>
```

Retrieves all jobs that have a specific pheromone type attached.

Useful for finding jobs that share a common signal, enabling
swarm-style discovery of related work items.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | The pheromone type name to filter by |

**Returns:** `Promise<Job[]>` — A promise that resolves to an array of  objects carrying the specified pheromone

[Full reference →](./getJobsByPheromone)

---

### `getLabels`

```typescript
client.jobs.getLabels(): Promise<JobLabel[]>
```

Lists all available job labels.

Labels are tags that can be attached to jobs for categorization
and filtering purposes.

_No parameters._

**Returns:** `Promise<JobLabel[]>` — A promise that resolves to an array of  objects

[Full reference →](./getLabels)

---

### `getPheromones`

```typescript
client.jobs.getPheromones(id: string): Promise<Pheromone[]>
```

Retrieves all pheromones attached to a specific job.

Returns the list of pheromone signals that have been deposited on the
job by agents, useful for understanding the job's coordination state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

**Returns:** `Promise<Pheromone[]>` — A promise that resolves to an array of  objects

[Full reference →](./getPheromones)

---

### `getPheromoneTypes`

```typescript
client.jobs.getPheromoneTypes(): Promise<PheromoneType[]>
```

Retrieves all registered pheromone types.

Pheromone types define the categories of signals that can be attached
to jobs for swarm-style coordination between agents.

_No parameters._

**Returns:** `Promise<PheromoneType[]>` — A promise that resolves to an array of  definitions

[Full reference →](./getPheromoneTypes)

---

### `getReady`

```typescript
client.jobs.getReady(): Promise<Job[]>
```

Retrieves all jobs that are ready to execute.

Returns jobs whose dependencies have all been satisfied, meaning
they can be picked up by agents immediately.

_No parameters._

**Returns:** `Promise<Job[]>` — A promise that resolves to an array of ready  objects

[Full reference →](./getReady)

---

### `getStatistics`

```typescript
client.jobs.getStatistics(): Promise<JobStatistics>
```

Retrieves aggregate statistics about the job system.

Returns counts and metrics such as total jobs, jobs by status,
average completion time, and other summary data. Useful for
dashboards and progress reporting.

_No parameters._

**Returns:** `Promise<JobStatistics>` — A promise that resolves to a  summary

[Full reference →](./getStatistics)

---

### `removeDependency`

```typescript
client.jobs.removeDependency(id: string, targetId: string): Promise<void>
```

Removes a dependency from a job.

Detaches the dependency link between the job and its target, which
may unblock the job if this was its only remaining dependency.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the dependent job |
| `targetId` | `string` | Yes | The unique identifier of the dependency target to remove |

**Returns:** `Promise<void>` — A promise that resolves when the dependency has been removed

[Full reference →](./removeDependency)

---

### `removePheromone`

```typescript
client.jobs.removePheromone(id: string, type: string): Promise<void>
```

Removes a pheromone of a specific type from a job.

Clears the pheromone signal, which may affect coordination behavior
of agents that rely on its presence.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |
| `type` | `string` | Yes | The pheromone type name to remove |

**Returns:** `Promise<void>` — A promise that resolves when the pheromone has been removed

[Full reference →](./removePheromone)

---

### `update`

```typescript
client.jobs.update(id: string, data: UpdateJobRequest): Promise<Job>
```

Updates an existing job.

Modifies job properties such as title, description, status, or
assignee. Only the fields provided in the request body are updated.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to update |
| `data` | `UpdateJobRequest` | Yes | The fields to update |

**Returns:** `Promise<Job>` — A promise that resolves to the updated

[Full reference →](./update)

---

### `updateGroup`

```typescript
client.jobs.updateGroup(id: string, data: UpdateJobGroupRequest): Promise<JobGroup>
```

Updates an existing job group.

Modifies group properties such as name, description, or metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the group to update |
| `data` | `UpdateJobGroupRequest` | Yes | The fields to update on the group |

**Returns:** `Promise<JobGroup>` — A promise that resolves to the updated

[Full reference →](./updateGroup)

