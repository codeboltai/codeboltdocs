---
title: RequirementPlan API
---

# RequirementPlan API

Requirement Plan API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new requirement plan. |
| [`ensureFolder`](./ensureFolder) | Ensures the requirement plan folder exists in the workspace. |
| [`get`](./get) | Retrieves a requirement plan based on query parameters. |
| [`update`](./update) | Updates an existing requirement plan. |

## Methods

---

### `create`

```typescript
client.requirementPlan.create(data: CreateRequirementPlanRequest): Promise<RequirementPlan>
```

Creates a new requirement plan.

Registers a new requirement plan with the system using the provided
specification. The plan can include project goals, feature lists,
acceptance criteria, and other requirement documentation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRequirementPlanRequest` | Yes | Request containing the plan details |

**Returns:** `Promise<RequirementPlan>` — A promise that resolves to the created RequirementPlan object

[Full reference →](./create)

---

### `ensureFolder`

```typescript
client.requirementPlan.ensureFolder(data?: EnsureRequirementPlanFolderRequest): Promise<unknown>
```

Ensures the requirement plan folder exists in the workspace.

Creates the requirement plan directory if it doesn't already exist,
establishing a location for storing plan files and related documents.
This operation is idempotent and safe to call multiple times.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EnsureRequirementPlanFolderRequest` | No | Optional parameters for folder creation |

**Returns:** `Promise<unknown>` — A promise that resolves when the folder is ensured

[Full reference →](./ensureFolder)

---

### `get`

```typescript
client.requirementPlan.get(params?: GetRequirementPlanParams): Promise<RequirementPlan>
```

Retrieves a requirement plan based on query parameters.

Returns the plan matching the specified criteria, typically by project
ID or plan name. If multiple plans match, the most relevant one is returned.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetRequirementPlanParams` | No | Query parameters to identify the plan |

**Returns:** `Promise<RequirementPlan>` — A promise that resolves to the RequirementPlan object

[Full reference →](./get)

---

### `update`

```typescript
client.requirementPlan.update(data: UpdateRequirementPlanRequest): Promise<RequirementPlan>
```

Updates an existing requirement plan.

Modifies the content, status, or structure of a requirement plan.
Use this to add new requirements, update priorities, change status,
or make other modifications as the project evolves.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateRequirementPlanRequest` | Yes | Request containing the plan updates |

**Returns:** `Promise<RequirementPlan>` — A promise that resolves to the updated RequirementPlan object

[Full reference →](./update)

