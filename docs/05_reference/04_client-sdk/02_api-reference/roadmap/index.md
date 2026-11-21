---
title: Roadmap API
---

# Roadmap API

Roadmap API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createFeature`](./createFeature) | Creates a new feature within a specific phase. |
| [`createIdea`](./createIdea) | Creates a new idea in the roadmap idea pool. |
| [`createPhase`](./createPhase) | Creates a new roadmap phase. |
| [`createTaskFromFeature`](./createTaskFromFeature) | Creates a task from a roadmap feature. |
| [`deleteFeature`](./deleteFeature) | Deletes a feature from the roadmap. |
| [`deleteIdea`](./deleteIdea) | Deletes an idea from the roadmap idea pool. |
| [`deletePhase`](./deletePhase) | Deletes a roadmap phase. |
| [`get`](./get) | Retrieves the full roadmap with all phases. |
| [`getFeature`](./getFeature) | Retrieves a specific feature by its ID. |
| [`getFeatures`](./getFeatures) | Retrieves all features across all roadmap phases. |
| [`getIdea`](./getIdea) | Retrieves a specific idea by its ID. |
| [`getIdeas`](./getIdeas) | Retrieves all ideas in the roadmap idea pool. |
| [`getPhase`](./getPhase) | Retrieves a specific roadmap phase by its ID. |
| [`moveFeature`](./moveFeature) | Moves a feature to a different phase or reorders it within its current phase. |
| [`moveIdeaToRoadmap`](./moveIdeaToRoadmap) | Promotes an idea to the roadmap as a feature. |
| [`reviewIdea`](./reviewIdea) | Submits an idea for review. |
| [`sendFeatureToChat`](./sendFeatureToChat) | Sends a feature to the chat for discussion. |
| [`updateFeature`](./updateFeature) | Updates an existing feature. |
| [`updateIdea`](./updateIdea) | Updates an existing idea. |
| [`updatePhase`](./updatePhase) | Updates an existing roadmap phase. |

## Methods

---

### `createFeature`

```typescript
client.roadmap.createFeature(phaseId: string, data: CreateFeatureRequest): Promise<RoadmapFeature>
```

Creates a new feature within a specific phase.

Adds a feature to the roadmap under the specified phase. Features represent
discrete pieces of functionality planned for delivery.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to add the feature to |
| `data` | `CreateFeatureRequest` | Yes | The feature creation payload including title and description |

**Returns:** `Promise<RoadmapFeature>` — A promise that resolves to the newly created RoadmapFeature

[Full reference →](./createFeature)

---

### `createIdea`

```typescript
client.roadmap.createIdea(data: CreateIdeaRequest): Promise<RoadmapIdea>
```

Creates a new idea in the roadmap idea pool.

Adds an idea that can later be reviewed, refined, and potentially promoted
to a full feature on the roadmap.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateIdeaRequest` | Yes | The idea creation payload including title and description |

**Returns:** `Promise<RoadmapIdea>` — A promise that resolves to the newly created RoadmapIdea

[Full reference →](./createIdea)

---

### `createPhase`

```typescript
client.roadmap.createPhase(data: CreatePhaseRequest): Promise<RoadmapPhase>
```

Creates a new roadmap phase.

Adds a high-level phase to the roadmap for organizing features. Phases typically
represent milestones, sprints, or release versions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePhaseRequest` | Yes | The phase creation payload including name and optional description |

**Returns:** `Promise<RoadmapPhase>` — A promise that resolves to the newly created RoadmapPhase

[Full reference →](./createPhase)

---

### `createTaskFromFeature`

```typescript
client.roadmap.createTaskFromFeature(featureId: string, data?: CreateTaskFromFeatureRequest): Promise<unknown>
```

Creates a task from a roadmap feature.

Converts a feature into an actionable task in the task management system. This
bridges the gap between roadmap planning and task execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to create a task from |
| `data` | `CreateTaskFromFeatureRequest` | No | Optional task creation parameters to override defaults |

**Returns:** `Promise<unknown>` — A promise that resolves when the task has been created

[Full reference →](./createTaskFromFeature)

---

### `deleteFeature`

```typescript
client.roadmap.deleteFeature(featureId: string): Promise<unknown>
```

Deletes a feature from the roadmap.

Permanently removes a feature. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the feature has been deleted

[Full reference →](./deleteFeature)

---

### `deleteIdea`

```typescript
client.roadmap.deleteIdea(ideaId: string): Promise<unknown>
```

Deletes an idea from the roadmap idea pool.

Permanently removes an idea. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the idea has been deleted

[Full reference →](./deleteIdea)

---

### `deletePhase`

```typescript
client.roadmap.deletePhase(phaseId: string): Promise<unknown>
```

Deletes a roadmap phase.

Permanently removes a phase and potentially its associated features. This action
cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the phase has been deleted

[Full reference →](./deletePhase)

---

### `get`

```typescript
client.roadmap.get(params?: Record<string, unknown>): Promise<RoadmapPhase[]>
```

Retrieves the full roadmap with all phases.

Returns the complete roadmap structure including all phases and their nested features.
Use optional query parameters to filter or paginate results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering the roadmap |

**Returns:** `Promise<RoadmapPhase[]>` — A promise that resolves to an array of RoadmapPhase objects

[Full reference →](./get)

---

### `getFeature`

```typescript
client.roadmap.getFeature(featureId: string): Promise<RoadmapFeature>
```

Retrieves a specific feature by its ID.

Fetches the full details of a single feature including its status, description,
and associated metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature |

**Returns:** `Promise<RoadmapFeature>` — A promise that resolves to the RoadmapFeature object

[Full reference →](./getFeature)

---

### `getFeatures`

```typescript
client.roadmap.getFeatures(params?: Record<string, unknown>): Promise<RoadmapFeature[]>
```

Retrieves all features across all roadmap phases.

Returns a flat list of all features regardless of which phase they belong to.
Use optional query parameters to filter by status, priority, or other criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering features |

**Returns:** `Promise<RoadmapFeature[]>` — A promise that resolves to an array of RoadmapFeature objects

[Full reference →](./getFeatures)

---

### `getIdea`

```typescript
client.roadmap.getIdea(ideaId: string): Promise<RoadmapIdea>
```

Retrieves a specific idea by its ID.

Fetches the full details of a single idea including its status and review history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea |

**Returns:** `Promise<RoadmapIdea>` — A promise that resolves to the RoadmapIdea object

[Full reference →](./getIdea)

---

### `getIdeas`

```typescript
client.roadmap.getIdeas(params?: Record<string, unknown>): Promise<RoadmapIdea[]>
```

Retrieves all ideas in the roadmap idea pool.

Ideas are proposals that have not yet been promoted to features. Use optional
query parameters to filter by status or other criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering ideas |

**Returns:** `Promise<RoadmapIdea[]>` — A promise that resolves to an array of RoadmapIdea objects

[Full reference →](./getIdeas)

---

### `getPhase`

```typescript
client.roadmap.getPhase(phaseId: string): Promise<RoadmapPhase>
```

Retrieves a specific roadmap phase by its ID.

Fetches the full details of a single phase including its metadata and associated features.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase |

**Returns:** `Promise<RoadmapPhase>` — A promise that resolves to the RoadmapPhase object

[Full reference →](./getPhase)

---

### `moveFeature`

```typescript
client.roadmap.moveFeature(featureId: string, data: MoveFeatureRequest): Promise<unknown>
```

Moves a feature to a different phase or reorders it within its current phase.

Use this to reorganize the roadmap by relocating features between phases or
changing the display order of features within a phase.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to move |
| `data` | `MoveFeatureRequest` | Yes | The move parameters including target phase and/or position |

**Returns:** `Promise<unknown>` — A promise that resolves when the feature has been moved

[Full reference →](./moveFeature)

---

### `moveIdeaToRoadmap`

```typescript
client.roadmap.moveIdeaToRoadmap(ideaId: string, data?: MoveIdeaToRoadmapRequest): Promise<unknown>
```

Promotes an idea to the roadmap as a feature.

Converts a reviewed and approved idea into a feature within a specified roadmap phase.
This is the final step in the idea-to-feature pipeline.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to promote |
| `data` | `MoveIdeaToRoadmapRequest` | No | Optional parameters including target phase for the new feature |

**Returns:** `Promise<unknown>` — A promise that resolves when the idea has been promoted to a feature

[Full reference →](./moveIdeaToRoadmap)

---

### `reviewIdea`

```typescript
client.roadmap.reviewIdea(ideaId: string, data?: ReviewIdeaRequest): Promise<unknown>
```

Submits an idea for review.

Moves an idea into the review process where it can be evaluated for potential
promotion to a roadmap feature.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to review |
| `data` | `ReviewIdeaRequest` | No | Optional review parameters such as reviewer assignment |

**Returns:** `Promise<unknown>` — A promise that resolves when the idea has been submitted for review

[Full reference →](./reviewIdea)

---

### `sendFeatureToChat`

```typescript
client.roadmap.sendFeatureToChat(featureId: string, data?: SendFeatureToChatRequest): Promise<unknown>
```

Sends a feature to the chat for discussion.

Shares the feature details in a chat context so that team members or agents can
discuss and collaborate on the feature requirements.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to send to chat |
| `data` | `SendFeatureToChatRequest` | No | Optional parameters controlling how the feature is shared |

**Returns:** `Promise<unknown>` — A promise that resolves when the feature has been sent to chat

[Full reference →](./sendFeatureToChat)

---

### `updateFeature`

```typescript
client.roadmap.updateFeature(featureId: string, data: UpdateFeatureRequest): Promise<RoadmapFeature>
```

Updates an existing feature.

Modifies the properties of a feature such as its title, description, status, or priority.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to update |
| `data` | `UpdateFeatureRequest` | Yes | The fields to update on the feature |

**Returns:** `Promise<RoadmapFeature>` — A promise that resolves to the updated RoadmapFeature

[Full reference →](./updateFeature)

---

### `updateIdea`

```typescript
client.roadmap.updateIdea(ideaId: string, data: UpdateIdeaRequest): Promise<RoadmapIdea>
```

Updates an existing idea.

Modifies the properties of an idea such as its title, description, or status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to update |
| `data` | `UpdateIdeaRequest` | Yes | The fields to update on the idea |

**Returns:** `Promise<RoadmapIdea>` — A promise that resolves to the updated RoadmapIdea

[Full reference →](./updateIdea)

---

### `updatePhase`

```typescript
client.roadmap.updatePhase(phaseId: string, data: UpdatePhaseRequest): Promise<RoadmapPhase>
```

Updates an existing roadmap phase.

Modifies the properties of a phase such as its name, description, or ordering.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to update |
| `data` | `UpdatePhaseRequest` | Yes | The fields to update on the phase |

**Returns:** `Promise<RoadmapPhase>` — A promise that resolves to the updated RoadmapPhase

[Full reference →](./updatePhase)

