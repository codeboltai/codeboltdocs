---
title: Llm API
---

# Llm API

LLM API - language model operations

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`cancelDownload`](./cancelDownload) | Cancels an in-progress model download. |
| [`deleteLocalModel`](./deleteLocalModel) | Deletes a locally downloaded model from disk. |
| [`downloadModel`](./downloadModel) | Initiates the download of a model for local use. |
| [`getAllModels`](./getAllModels) | Retrieves all models across all configured providers. |
| [`getDownloadedLocalModels`](./getDownloadedLocalModels) | Retrieves the list of models that have been downloaded for local execution. |
| [`getDownloadStatus`](./getDownloadStatus) | Checks the current download status of a model. |
| [`getEmbeddingSupportedLLMs`](./getEmbeddingSupportedLLMs) | Retrieves LLM providers that support text embedding capabilities. |
| [`getLocalAgent`](./getLocalAgent) | Retrieves the LLM configuration for a specific local agent. |
| [`getModels`](./getModels) | Retrieves the available models for a specific LLM provider. |
| [`getPricing`](./getPricing) | Fetches the current pricing information for all LLM models. |
| [`getProviders`](./getProviders) | Retrieves all configured LLM providers with their current status and available models. |
| [`setDefault`](./setDefault) | Sets the default LLM model and provider for the workspace. |
| [`setLocalAgent`](./setLocalAgent) | Configures the LLM settings for a specific local agent. |
| [`updateKey`](./updateKey) | Updates the API key for a specific LLM provider. |
| [`updatePricingToLocal`](./updatePricingToLocal) | Syncs the latest LLM pricing information to local storage. |

## Methods

---

### `cancelDownload`

```typescript
client.llm.cancelDownload(data: LLMCancelDownloadRequest): Promise<unknown>
```

Cancels an in-progress model download.

Stops the download of a model that was previously initiated with .
Any partially downloaded data may be cleaned up.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMCancelDownloadRequest` | Yes | The cancellation request identifying the download to stop |

**Returns:** `Promise<unknown>` — A promise that resolves when the cancellation has been processed

[Full reference →](./cancelDownload)

---

### `deleteLocalModel`

```typescript
client.llm.deleteLocalModel(modelId: string): Promise<unknown>
```

Deletes a locally downloaded model from disk.

Permanently removes a model that was previously downloaded for local execution,
freeing up disk space. The model can be re-downloaded later if needed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The identifier of the local model to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the model has been deleted

[Full reference →](./deleteLocalModel)

---

### `downloadModel`

```typescript
client.llm.downloadModel(data: LLMDownloadModelRequest): Promise<unknown>
```

Initiates the download of a model for local use.

Starts an asynchronous download of a model that can be run locally (e.g., via Ollama).
Use  to monitor progress.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMDownloadModelRequest` | Yes | The download request specifying which model to download |

**Returns:** `Promise<unknown>` — A promise that resolves when the download has been initiated

[Full reference →](./downloadModel)

---

### `getAllModels`

```typescript
client.llm.getAllModels(data?: Record<string, unknown>): Promise<LLMModel[]>
```

Retrieves all models across all configured providers.

Returns a flat list of every available model from all providers. Optionally accepts
filter criteria to narrow results by capability, provider, or other attributes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional filter criteria for narrowing the model list |

**Returns:** `Promise<LLMModel[]>` — A promise that resolves to an array of all available LLM models

[Full reference →](./getAllModels)

---

### `getDownloadedLocalModels`

```typescript
client.llm.getDownloadedLocalModels(): Promise<LLMModel[]>
```

Retrieves the list of models that have been downloaded for local execution.

Returns all models currently available on disk for local inference, as opposed to
cloud-hosted models that require API calls.

_No parameters._

**Returns:** `Promise<LLMModel[]>` — A promise that resolves to an array of locally downloaded models

[Full reference →](./getDownloadedLocalModels)

---

### `getDownloadStatus`

```typescript
client.llm.getDownloadStatus(modelId: string): Promise<LLMDownloadStatus>
```

Checks the current download status of a model.

Returns progress information for an active or completed model download, including
percentage complete, bytes downloaded, and any error state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The identifier of the model to check |

**Returns:** `Promise<LLMDownloadStatus>` — A promise that resolves to the current download status

[Full reference →](./getDownloadStatus)

---

### `getEmbeddingSupportedLLMs`

```typescript
client.llm.getEmbeddingSupportedLLMs(): Promise<LLMProvider[]>
```

Retrieves LLM providers that support text embedding capabilities.

Filters providers to only those offering embedding models, which convert text into
numerical vectors for semantic search, similarity matching, and RAG workflows.

_No parameters._

**Returns:** `Promise<LLMProvider[]>` — A promise that resolves to an array of embedding-capable LLM providers

[Full reference →](./getEmbeddingSupportedLLMs)

---

### `getLocalAgent`

```typescript
client.llm.getLocalAgent(agentName: string): Promise<LLMLocalAgentConfig>
```

Retrieves the LLM configuration for a specific local agent.

Returns the provider and model settings that have been configured for the given agent,
or the default configuration if no agent-specific override exists.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentName` | `string` | Yes | The name of the agent whose LLM configuration to retrieve |

**Returns:** `Promise<LLMLocalAgentConfig>` — A promise that resolves to the agent's LLM configuration

[Full reference →](./getLocalAgent)

---

### `getModels`

```typescript
client.llm.getModels(data: LLMGetModelsRequest): Promise<LLMModel[]>
```

Retrieves the available models for a specific LLM provider.

Queries the models catalog for a given provider, returning all models that can be
used with that provider's current configuration and API key.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMGetModelsRequest` | Yes | The request specifying which provider's models to retrieve |

**Returns:** `Promise<LLMModel[]>` — A promise that resolves to an array of models available for the provider

[Full reference →](./getModels)

---

### `getPricing`

```typescript
client.llm.getPricing(): Promise<unknown>
```

Fetches the current pricing information for all LLM models.

Returns token pricing data (input/output cost per token) for each model across all
providers. Useful for cost estimation and budget tracking of LLM usage.

_No parameters._

**Returns:** `Promise<unknown>` — A promise that resolves to the pricing data for all available models

[Full reference →](./getPricing)

---

### `getProviders`

```typescript
client.llm.getProviders(): Promise<LLMProvider[]>
```

Retrieves all configured LLM providers with their current status and available models.

Returns the complete list of LLM providers (e.g., OpenAI, Anthropic, Ollama) that have
been configured in the system, including whether they have valid API keys set.

_No parameters._

**Returns:** `Promise<LLMProvider[]>` — A promise that resolves to an array of LLM provider configurations

[Full reference →](./getProviders)

---

### `setDefault`

```typescript
client.llm.setDefault(data: LLMSetDefaultRequest): Promise<unknown>
```

Sets the default LLM model and provider for the workspace.

Configures which model is used by default when no specific model is requested.
This affects all operations that rely on LLM inference without explicit model selection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMSetDefaultRequest` | Yes | The default LLM configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the default has been updated

[Full reference →](./setDefault)

---

### `setLocalAgent`

```typescript
client.llm.setLocalAgent(data: LLMLocalAgentConfig): Promise<unknown>
```

Configures the LLM settings for a specific local agent.

Allows overriding the default LLM configuration on a per-agent basis, so different
agents can use different models or provider settings tailored to their tasks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMLocalAgentConfig` | Yes | The agent-specific LLM configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the agent configuration has been saved

[Full reference →](./setLocalAgent)

---

### `updateKey`

```typescript
client.llm.updateKey(data: LLMUpdateKeyRequest): Promise<unknown>
```

Updates the API key for a specific LLM provider.

Sets or rotates the authentication key used to communicate with an LLM provider's API.
The key is stored securely and used for all subsequent requests to that provider.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMUpdateKeyRequest` | Yes | The key update request |

**Returns:** `Promise<unknown>` — A promise that resolves when the key has been updated

[Full reference →](./updateKey)

---

### `updatePricingToLocal`

```typescript
client.llm.updatePricingToLocal(): Promise<unknown>
```

Syncs the latest LLM pricing information to local storage.

Downloads the most up-to-date pricing catalog from the remote source and persists it
locally. Call this periodically to ensure cost calculations reflect current rates.

_No parameters._

**Returns:** `Promise<unknown>` — A promise that resolves when the local pricing data has been updated

[Full reference →](./updatePricingToLocal)

