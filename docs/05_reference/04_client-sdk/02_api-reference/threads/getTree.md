---
title: getTree
---

# `getTree`

```typescript
client.threads.getTree(threadId: string): Promise<ThreadGraphNode>
```

Retrieves the hierarchical tree structure for a thread.

Returns the complete tree representation starting from the specified thread,
including all descendant threads and their relationships. This is useful for
visualizing thread hierarchies and understanding nested thread structures.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the root thread |

## Returns

`Promise<ThreadGraphNode>` — A promise that resolves to a ThreadGraphNode representing the tree

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getTree('threadId');
console.log(result);
```
