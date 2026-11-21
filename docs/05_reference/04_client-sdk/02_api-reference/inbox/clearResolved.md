---
title: clearResolved
---

# `clearResolved`

```typescript
client.inbox.clearResolved(): Promise<void>
```

Clears all resolved inbox messages.

Removes messages that have been marked as resolved, cleaning up the
inbox. Unresolved and acknowledged messages are not affected.

## Parameters

_No parameters._

## Returns

`Promise<void>` — A promise that resolves when the resolved messages have been cleared

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.inbox.clearResolved();
console.log(result);
```
