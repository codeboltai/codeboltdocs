---
title: LocalModels API
---

# LocalModels API

Local Models API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`delete`](./delete) | Deletes a downloaded model from local storage. |
| [`download`](./download) | Initiates the download of a model for local execution. |
| [`get`](./get) | Retrieves detailed information about a specific local model. |
| [`getAvailable`](./getAvailable) | Retrieves the catalog of models available for local download and execution. |
| [`list`](./list) | Lists all models that have been downloaded to the local machine. |
| [`load`](./load) | Loads a downloaded model into system memory for inference. |
| [`unload`](./unload) | Unloads a model from system memory. |

## Methods

---

### `delete`

```typescript
client.localModels.delete(modelId: string): Promise<unknown>
```

Deletes a downloaded model from local storage.

Permanently removes the model files from disk, freeing storage space. The model must
be unloaded from memory before deletion. It can be re-downloaded later if needed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The unique identifier of the model to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the model has been removed from disk

[Full reference →](./delete)

---

### `download`

```typescript
client.localModels.download(data: DownloadLocalModelRequest): Promise<unknown>
```

Initiates the download of a model for local execution.

Starts an asynchronous download of the specified model. Large models may take
significant time and disk space. Monitor download progress through status endpoints.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `DownloadLocalModelRequest` | Yes | The download request configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the download has been initiated

[Full reference →](./download)

---

### `get`

```typescript
client.localModels.get(modelId: string): Promise<LocalModel>
```

Retrieves detailed information about a specific local model.

Returns comprehensive metadata for a model including its size, quantization level,
architecture, and current status (downloaded, loaded, etc.).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The unique identifier of the model to retrieve |

**Returns:** `Promise<LocalModel>` — A promise that resolves to the model's detailed information

[Full reference →](./get)

---

### `getAvailable`

```typescript
client.localModels.getAvailable(): Promise<LocalModel[]>
```

Retrieves the catalog of models available for local download and execution.

Returns all models that can be downloaded from supported registries (e.g., Ollama, GGUF)
for local inference. Use this to browse what models are available before downloading.

_No parameters._

**Returns:** `Promise<LocalModel[]>` — A promise that resolves to an array of available local models

[Full reference →](./getAvailable)

---

### `list`

```typescript
client.localModels.list(): Promise<LocalModel[]>
```

Lists all models that have been downloaded to the local machine.

Returns metadata for models currently stored on disk, regardless of whether they are
currently loaded into memory for inference.

_No parameters._

**Returns:** `Promise<LocalModel[]>` — A promise that resolves to an array of downloaded local models

[Full reference →](./list)

---

### `load`

```typescript
client.localModels.load(data: LoadLocalModelRequest): Promise<unknown>
```

Loads a downloaded model into system memory for inference.

Prepares a local model for use by loading its weights into RAM or VRAM. The model
must be downloaded first. Once loaded, it can serve inference requests without
additional startup latency.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LoadLocalModelRequest` | Yes | The load request configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the model has been loaded into memory

[Full reference →](./load)

---

### `unload`

```typescript
client.localModels.unload(data: UnloadLocalModelRequest): Promise<unknown>
```

Unloads a model from system memory.

Releases the memory (RAM/VRAM) occupied by a loaded model. The model remains on disk
and can be loaded again later. Use this to free resources when a model is no longer needed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UnloadLocalModelRequest` | Yes | The unload request configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the model has been unloaded from memory

[Full reference →](./unload)

