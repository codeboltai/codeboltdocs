---
title: createMarkdownThread
---

# `createMarkdownThread`

```typescript
client.memory.createMarkdownThread(data: CreateMarkdownThreadRequest): Promise<MemoryThread>
```

Creates a new markdown-formatted memory thread.

Initializes a thread optimized for storing and rendering markdown content. Markdown
threads are ideal for notes, documentation, and free-form text with formatting.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMarkdownThreadRequest` | Yes | The markdown thread creation payload |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the newly created markdown thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.createMarkdownThread(/* CreateMarkdownThreadRequest */);
console.log(result);
```
