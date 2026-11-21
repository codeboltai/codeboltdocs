---
title: FileRead API
---

# FileRead API

File Read API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`allFiles`](./allFiles) | Retrieves a listing of all files in the project. |
| [`autocomplete`](./autocomplete) | Gets autocomplete suggestions for file paths. |
| [`autocompleteFolders`](./autocompleteFolders) | Gets autocomplete suggestions for folder paths only. |
| [`autocompleteForSearch`](./autocompleteForSearch) | Gets autocomplete suggestions optimized for search input. |
| [`read`](./read) | Reads the content of a file. |
| [`search`](./search) | Searches for files matching a query string. |

## Methods

---

### `allFiles`

```typescript
client.fileRead.allFiles(params?: FileSearchParams): Promise<FileSearchResult[]>
```

Retrieves a listing of all files in the project.

Returns the complete set of files, optionally filtered by the provided
search parameters. Useful for building file indexes or bulk operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional parameters for filtering the file list |

**Returns:** `Promise<FileSearchResult[]>` — A promise that resolves to an array of  entries

[Full reference →](./allFiles)

---

### `autocomplete`

```typescript
client.fileRead.autocomplete(params?: FileAutocompleteParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions for file paths.

Returns file path completions matching a partial input string. Useful
for building file picker UIs with type-ahead functionality.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileAutocompleteParams` | No | Optional parameters including the partial path to complete |

**Returns:** `Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  suggestions

[Full reference →](./autocomplete)

---

### `autocompleteFolders`

```typescript
client.fileRead.autocompleteFolders(params?: FileAutocompleteParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions for folder paths only.

Like  but restricted to directories, excluding
individual files from the results. Useful for folder picker UIs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileAutocompleteParams` | No | Optional parameters including the partial folder path to complete |

**Returns:** `Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  folder suggestions

[Full reference →](./autocompleteFolders)

---

### `autocompleteForSearch`

```typescript
client.fileRead.autocompleteForSearch(params?: FileSearchParams): Promise<FileAutocompleteResult[]>
```

Gets autocomplete suggestions optimized for search input.

Similar to  but tailored for search-box contexts
where the user is typing a search query rather than a file path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional search parameters including the partial query |

**Returns:** `Promise<FileAutocompleteResult[]>` — A promise that resolves to an array of  suggestions

[Full reference →](./autocompleteForSearch)

---

### `read`

```typescript
client.fileRead.read(params?: FileReadParams): Promise<unknown>
```

Reads the content of a file.

Retrieves the full content of a file at the specified path. Returns
the raw file data suitable for display or further processing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileReadParams` | No | Optional parameters specifying which file to read |

**Returns:** `Promise<unknown>` — A promise that resolves to the file content

[Full reference →](./read)

---

### `search`

```typescript
client.fileRead.search(params?: FileSearchParams): Promise<FileSearchResult[]>
```

Searches for files matching a query string.

Performs a text-based search across file names and paths in the project.
Returns matching files with their paths and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional search parameters including the query string |

**Returns:** `Promise<FileSearchResult[]>` — A promise that resolves to an array of  matches

[Full reference →](./search)

