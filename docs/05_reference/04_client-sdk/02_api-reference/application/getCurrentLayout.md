---
title: getCurrentLayout
---

# `getCurrentLayout`

```typescript
client.application.getCurrentLayout(): Promise<CurrentLayout>
```

Retrieves the current active layout.

Returns the layout configuration that is currently being displayed
in the application UI.

## Parameters

_No parameters._

## Returns

`Promise<CurrentLayout>` — A promise that resolves to the CurrentLayout object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getCurrentLayout();
console.log(result);
```
