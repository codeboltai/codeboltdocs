---
title: autocompleteForSearch
---

# `autocompleteForSearch`

```typescript
client.fileRead.autocompleteForSearch(params?: FileSearchParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions optimized for search input.

Similar to  but tailored for search-box contexts
where the user is typing a search query rather than a file path.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional search parameters including the partial query |

## Returns

`Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  suggestions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.autocompleteForSearch();
console.log(result);
```
