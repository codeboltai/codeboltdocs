---
title: autocomplete
---

# `autocomplete`

```typescript
client.fileRead.autocomplete(params?: FileAutocompleteParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions for file paths.

Returns file path completions matching a partial input string. Useful
for building file picker UIs with type-ahead functionality.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileAutocompleteParams` | No | Optional parameters including the partial path to complete |

## Returns

`Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  suggestions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.autocomplete();
console.log(result);
```
