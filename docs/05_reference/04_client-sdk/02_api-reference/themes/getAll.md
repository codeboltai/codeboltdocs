---
title: getAll
---

# `getAll`

```typescript
client.themes.getAll(): Promise<Theme[]>
```

Retrieves all available themes in the system.

Returns every theme regardless of whether it's active or inactive.
Use this for comprehensive theme browsing or to populate theme selection UIs.

## Parameters

_No parameters._

## Returns

`Promise<Theme[]>` — A promise that resolves to an array of Theme objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.getAll();
console.log(result);
```
