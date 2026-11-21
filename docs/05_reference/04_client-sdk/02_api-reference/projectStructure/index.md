---
title: ProjectStructure API
---

# ProjectStructure API

Project Structure API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addItem`](./addItem) | Adds an item to a specific section within a package. |
| [`createPackage`](./createPackage) | Creates a new package definition in the project structure. |
| [`deleteItem`](./deleteItem) | Removes an item from a package section. |
| [`deletePackage`](./deletePackage) | Deletes a package and all its sections and items from the project structure. |
| [`getMetadata`](./getMetadata) | Retrieves the full workspace metadata including package definitions and structure. |
| [`getPackage`](./getPackage) | Retrieves a single package by its unique identifier. |
| [`getPackages`](./getPackages) | Retrieves all package definitions in the workspace. |
| [`saveMetadata`](./saveMetadata) | Saves the complete workspace metadata, replacing any existing structure. |
| [`updatePackage`](./updatePackage) | Updates an existing package definition. |

## Methods

---

### `addItem`

```typescript
client.projectStructure.addItem(packageId: string, section: string, data: AddSectionItemRequest): Promise<void>
```

Adds an item to a specific section within a package.

Registers a new item (e.g., a file, class, or endpoint reference) under the specified
section of a package, enriching the structural metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package |
| `section` | `string` | Yes | The name of the section to add the item to (e.g., 'routes', 'models') |
| `data` | `AddSectionItemRequest` | Yes | The item definition to add |

**Returns:** `Promise<void>` — A promise that resolves when the item has been added

[Full reference →](./addItem)

---

### `createPackage`

```typescript
client.projectStructure.createPackage(data: CreatePackageRequest): Promise<PackageDefinition>
```

Creates a new package definition in the project structure.

Adds a logical package to the workspace structure with the given name and configuration.
Packages group related code sections and items together.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePackageRequest` | Yes | The package creation payload |

**Returns:** `Promise<PackageDefinition>` — A promise that resolves to the newly created package definition

[Full reference →](./createPackage)

---

### `deleteItem`

```typescript
client.projectStructure.deleteItem(packageId: string, section: string, itemId: string): Promise<void>
```

Removes an item from a package section.

Deletes the structural reference to an item within a package section. This only removes
the metadata entry, not the actual underlying file or resource.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package |
| `section` | `string` | Yes | The name of the section containing the item |
| `itemId` | `string` | Yes | The unique identifier of the item to remove |

**Returns:** `Promise<void>` — A promise that resolves when the item has been removed

[Full reference →](./deleteItem)

---

### `deletePackage`

```typescript
client.projectStructure.deletePackage(packageId: string): Promise<void>
```

Deletes a package and all its sections and items from the project structure.

Permanently removes the package definition. This does not delete actual source files,
only the structural metadata describing the package.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to delete |

**Returns:** `Promise<void>` — A promise that resolves when the package has been deleted

[Full reference →](./deletePackage)

---

### `getMetadata`

```typescript
client.projectStructure.getMetadata(): Promise<WorkspaceMetadata>
```

Retrieves the full workspace metadata including package definitions and structure.

Returns the complete structural representation of the workspace, which describes how
the project is organized into packages, modules, and sections.

_No parameters._

**Returns:** `Promise<WorkspaceMetadata>` — A promise that resolves to the workspace metadata

[Full reference →](./getMetadata)

---

### `getPackage`

```typescript
client.projectStructure.getPackage(packageId: string): Promise<PackageDefinition>
```

Retrieves a single package by its unique identifier.

Returns the full package definition including all its sections and items.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to retrieve |

**Returns:** `Promise<PackageDefinition>` — A promise that resolves to the package definition

[Full reference →](./getPackage)

---

### `getPackages`

```typescript
client.projectStructure.getPackages(): Promise<PackageDefinition[]>
```

Retrieves all package definitions in the workspace.

Returns the list of logical packages that make up the project, each containing
its sections, items, and metadata.

_No parameters._

**Returns:** `Promise<PackageDefinition[]>` — A promise that resolves to an array of package definitions

[Full reference →](./getPackages)

---

### `saveMetadata`

```typescript
client.projectStructure.saveMetadata(data: SaveWorkspaceMetadataRequest): Promise<void>
```

Saves the complete workspace metadata, replacing any existing structure.

Persists a full workspace metadata object. This is a wholesale replacement operation;
use the individual package endpoints for targeted updates.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveWorkspaceMetadataRequest` | Yes | The complete workspace metadata to save |

**Returns:** `Promise<void>` — A promise that resolves when the metadata has been saved

[Full reference →](./saveMetadata)

---

### `updatePackage`

```typescript
client.projectStructure.updatePackage(packageId: string, data: UpdatePackageRequest): Promise<PackageDefinition>
```

Updates an existing package definition.

Modifies the metadata and configuration of a package. Does not affect the package's
sections or items; use  and  for those operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to update |
| `data` | `UpdatePackageRequest` | Yes | The fields to update on the package |

**Returns:** `Promise<PackageDefinition>` — A promise that resolves to the updated package definition

[Full reference →](./updatePackage)

