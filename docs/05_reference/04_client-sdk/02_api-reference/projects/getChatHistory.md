---
title: getChatHistory
---

# `getChatHistory`

```typescript
client.projects.getChatHistory(): Promise<unknown[]>
```

Retrieves the chat history for the current project.

Returns an array of past chat sessions and their messages, providing a record of
all conversations that have occurred within the project context.

## Parameters

_No parameters._

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of chat history entries

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getChatHistory();
console.log(result);
```
