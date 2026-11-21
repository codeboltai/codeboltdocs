---
title: autocompleteFolders
---

# `autocompleteFolders`

```typescript
client.fileRead.autocompleteFolders(params?: FileAutocompleteParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions for folder paths only.

Like  but restricted to directories, excluding
individual files from the results. Useful for folder picker UIs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileAutocompleteParams` | No | Optional parameters including the partial folder path to complete |

## Returns

`Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  folder suggestions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.autocompleteFolders();
console.log(result);
```
