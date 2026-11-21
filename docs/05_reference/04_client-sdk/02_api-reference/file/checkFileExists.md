---
title: checkFileExists
---

# `checkFileExists`

```typescript
client.file.checkFileExists(data: CheckFileExistsRequest): Promise<CheckFileExistsResponse>
```

Checks whether a file exists at the specified path.

Verifies file existence without reading its contents. Useful for
conditional logic that depends on whether a file is already present.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckFileExistsRequest` | Yes | Request specifying the file path to check |

## Returns

`Promise<CheckFileExistsResponse>` — A promise that resolves to a  indicating existence

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.file.checkFileExists(/* CheckFileExistsRequest */);
console.log(result);
```
