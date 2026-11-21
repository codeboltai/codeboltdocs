---
title: deleteItem
---

# `deleteItem`

```typescript
client.projectStructure.deleteItem(packageId: string, section: string, itemId: string): Promise<void>
```

Removes an item from a package section.

Deletes the structural reference to an item within a package section. This only removes
the metadata entry, not the actual underlying file or resource.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package |
| `section` | `string` | Yes | The name of the section containing the item |
| `itemId` | `string` | Yes | The unique identifier of the item to remove |

## Returns

`Promise<void>` — A promise that resolves when the item has been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.deleteItem('packageId', 'section', 'itemId');
console.log(result);
```
