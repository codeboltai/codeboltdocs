---
title: getTreeView
---

# `getTreeView`

```typescript
client.application.getTreeView(): Promise<TreeViewState>
```

Retrieves the saved tree view state.

Returns the previously persisted tree view configuration so the UI
can restore the user's preferred view.

## Parameters

_No parameters._

## Returns

`Promise<TreeViewState>` — A promise that resolves to the TreeViewState object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getTreeView();
console.log(result);
```
