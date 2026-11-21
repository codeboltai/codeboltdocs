---
title: deleteLabel
---

# `deleteLabel`

```typescript
client.jobs.deleteLabel(name: string): Promise<void>
```

Deletes a job label by its name.

Removes the label definition. Jobs that previously had this label
will lose the association.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the label to delete |

## Returns

`Promise<void>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.deleteLabel('name');
console.log(result);
```
