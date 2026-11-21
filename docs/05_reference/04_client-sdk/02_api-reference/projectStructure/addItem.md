---
title: addItem
---

# `addItem`

```typescript
client.projectStructure.addItem(packageId: string, section: string, data: AddSectionItemRequest): Promise<void>
```

Adds an item to a specific section within a package.

Registers a new item (e.g., a file, class, or endpoint reference) under the specified
section of a package, enriching the structural metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package |
| `section` | `string` | Yes | The name of the section to add the item to (e.g., 'routes', 'models') |
| `data` | `AddSectionItemRequest` | Yes | The item definition to add |

## Returns

`Promise<void>` — A promise that resolves when the item has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.addItem('packageId', 'section', /* AddSectionItemRequest */);
console.log(result);
```
