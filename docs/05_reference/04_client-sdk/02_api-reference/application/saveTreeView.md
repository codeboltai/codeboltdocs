---
title: saveTreeView
---

# `saveTreeView`

```typescript
client.application.saveTreeView(data: SaveTreeViewRequest): Promise<void>
```

Saves the tree view state.

Persists the current state of the file/project tree view, including
expanded nodes, scroll position, and selection.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveTreeViewRequest` | Yes | The tree view state to save |

## Returns

`Promise<void>` — A promise that resolves when the state has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.saveTreeView(/* SaveTreeViewRequest */);
console.log(result);
```
