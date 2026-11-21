---
title: Environments API
---

# Environments API

Environments API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createEnvironment`](./createEnvironment) | Creates a new development environment. |
| [`createInstalledProvider`](./createInstalledProvider) | Registers a new installed environment provider. |
| [`deleteEnvironment`](./deleteEnvironment) | Deletes an environment. |
| [`deleteInstalledProvider`](./deleteInstalledProvider) | Deletes an installed environment provider. |
| [`getDiffFiles`](./getDiffFiles) | Retrieves diff files for an environment. |
| [`getEnvironment`](./getEnvironment) | Retrieves a specific environment by its ID. |
| [`getFullProject`](./getFullProject) | Retrieves the complete project file structure from an environment. |
| [`getInstalledProvider`](./getInstalledProvider) | Retrieves a specific installed provider by its ID. |
| [`getLocalProviders`](./getLocalProviders) | Retrieves the list of available local environment providers. |
| [`getProviderStatus`](./getProviderStatus) | Retrieves the current provider status for an environment. |
| [`getRunningProviders`](./getRunningProviders) | Retrieves all currently running environment providers. |
| [`installProvider`](./installProvider) | Installs a new environment provider from a remote source. |
| [`listEnvironments`](./listEnvironments) | Lists all environments. |
| [`listInstalledProviders`](./listInstalledProviders) | Lists all installed environment providers. |
| [`mergePatch`](./mergePatch) | Merges a patch into the environment's project files. |
| [`readFile`](./readFile) | Reads a file from within an environment. |
| [`restartEnvironment`](./restartEnvironment) | Restarts an environment. |
| [`sendPullRequest`](./sendPullRequest) | Sends a pull request from the environment's current state. |
| [`setDefaultProvider`](./setDefaultProvider) | Sets an installed provider as the system default. |
| [`startEnvironment`](./startEnvironment) | Starts an environment. |
| [`startProvider`](./startProvider) | Starts the underlying provider for an environment. |
| [`stopEnvironment`](./stopEnvironment) | Stops a running environment. |
| [`stopProvider`](./stopProvider) | Stops the underlying provider for an environment. |
| [`updateEnvironment`](./updateEnvironment) | Updates an existing environment's configuration. |
| [`updateInstalledProvider`](./updateInstalledProvider) | Updates the configuration of an installed provider. |
| [`writeFile`](./writeFile) | Writes a file to an environment's filesystem. |

## Methods

---

### `createEnvironment`

```typescript
client.environments.createEnvironment(data: CreateEnvironmentRequest): Promise<Environment>
```

Creates a new development environment.

Provisions a new environment using the specified provider and configuration.
The environment can then be started, stopped, and managed through other methods.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEnvironmentRequest` | Yes | Environment creation parameters including name, provider, and settings |

**Returns:** `Promise<Environment>` — A promise that resolves to the newly created

[Full reference →](./createEnvironment)

---

### `createInstalledProvider`

```typescript
client.environments.createInstalledProvider(data: CreateInstalledProviderRequest): Promise<InstalledProvider>
```

Registers a new installed environment provider.

Creates a provider record from an already-installed provider on the system.
This makes the provider available for environment creation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateInstalledProviderRequest` | Yes | The provider registration details |

**Returns:** `Promise<InstalledProvider>` — A promise that resolves to the newly created

[Full reference →](./createInstalledProvider)

---

### `deleteEnvironment`

```typescript
client.environments.deleteEnvironment(id: string): Promise<unknown>
```

Deletes an environment.

Permanently removes the environment and releases its resources. The
environment should be stopped before deletion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteEnvironment)

---

### `deleteInstalledProvider`

```typescript
client.environments.deleteInstalledProvider(id: string): Promise<unknown>
```

Deletes an installed environment provider.

Removes the provider registration. Environments already created by this
provider are not automatically deleted.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteInstalledProvider)

---

### `getDiffFiles`

```typescript
client.environments.getDiffFiles(id: string, data: GetDiffFilesRequest): Promise<unknown>
```

Retrieves diff files for an environment.

Compares the environment's current file state against a baseline to
identify modified, added, or deleted files.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `GetDiffFilesRequest` | Yes | Parameters specifying the diff comparison (e.g., base commit or branch) |

**Returns:** `Promise<unknown>` — A promise that resolves to the diff file information

[Full reference →](./getDiffFiles)

---

### `getEnvironment`

```typescript
client.environments.getEnvironment(id: string): Promise<Environment>
```

Retrieves a specific environment by its ID.

Returns the full details of a single environment including its current
state, provider, and configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

**Returns:** `Promise<Environment>` — A promise that resolves to the

[Full reference →](./getEnvironment)

---

### `getFullProject`

```typescript
client.environments.getFullProject(id: string): Promise<unknown>
```

Retrieves the complete project file structure from an environment.

Returns the full directory tree and file listing for the project
contained within the environment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

**Returns:** `Promise<unknown>` — A promise that resolves to the project structure data

[Full reference →](./getFullProject)

---

### `getInstalledProvider`

```typescript
client.environments.getInstalledProvider(id: string): Promise<InstalledProvider>
```

Retrieves a specific installed provider by its ID.

Returns the full details of a single provider including its configuration
and current state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider |

**Returns:** `Promise<InstalledProvider>` — A promise that resolves to the

[Full reference →](./getInstalledProvider)

---

### `getLocalProviders`

```typescript
client.environments.getLocalProviders(): Promise<ProviderData[]>
```

Retrieves the list of available local environment providers.

Discovers providers installed on the local machine that can be used
to create new environments. Useful for populating provider selection UIs.

_No parameters._

**Returns:** `Promise<ProviderData[]>` — A promise that resolves to an array of  descriptors

[Full reference →](./getLocalProviders)

---

### `getProviderStatus`

```typescript
client.environments.getProviderStatus(id: string): Promise<EnvironmentProviderStatus>
```

Retrieves the current provider status for an environment.

Returns whether the backing provider is running, stopped, or in an
error state. Useful for health checks and monitoring.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

**Returns:** `Promise<EnvironmentProviderStatus>` — A promise that resolves to the

[Full reference →](./getProviderStatus)

---

### `getRunningProviders`

```typescript
client.environments.getRunningProviders(): Promise<InstalledProvider[]>
```

Retrieves all currently running environment providers.

Returns only providers that are actively running and available to serve
environment requests.

_No parameters._

**Returns:** `Promise<InstalledProvider[]>` — A promise that resolves to an array of running  objects

[Full reference →](./getRunningProviders)

---

### `installProvider`

```typescript
client.environments.installProvider(data: InstallProviderRequest): Promise<InstalledProvider>
```

Installs a new environment provider from a remote source.

Downloads and registers a provider, making it available for creating
environments. Use this when the provider is not yet present locally.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallProviderRequest` | Yes | Installation parameters including provider source and configuration |

**Returns:** `Promise<InstalledProvider>` — A promise that resolves to the newly installed

[Full reference →](./installProvider)

---

### `listEnvironments`

```typescript
client.environments.listEnvironments(params?: Record<string, unknown>): Promise<Environment[]>
```

Lists all environments.

Returns every environment regardless of state. Use optional parameters
to filter or paginate the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<Environment[]>` — A promise that resolves to an array of  objects

[Full reference →](./listEnvironments)

---

### `listInstalledProviders`

```typescript
client.environments.listInstalledProviders(params?: Record<string, unknown>): Promise<InstalledProvider[]>
```

Lists all installed environment providers.

Returns every provider that has been registered or installed in the system.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<InstalledProvider[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstalledProviders)

---

### `mergePatch`

```typescript
client.environments.mergePatch(id: string, data: MergePatchRequest): Promise<unknown>
```

Merges a patch into the environment's project files.

Applies a set of file changes (additions, modifications, deletions) to
the environment in a single atomic operation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `MergePatchRequest` | Yes | The patch payload describing file changes to apply |

**Returns:** `Promise<unknown>` — A promise that resolves when the patch has been applied

[Full reference →](./mergePatch)

---

### `readFile`

```typescript
client.environments.readFile(id: string, data: ReadEnvironmentFileRequest): Promise<unknown>
```

Reads a file from within an environment.

Retrieves the contents of a specific file from the environment's
filesystem. Useful for inspecting files without SSH access.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `ReadEnvironmentFileRequest` | Yes | The file read request specifying the file path |

**Returns:** `Promise<unknown>` — A promise that resolves to the file contents

[Full reference →](./readFile)

---

### `restartEnvironment`

```typescript
client.environments.restartEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Restarts an environment.

Performs a stop followed by a start on the environment. Useful for
applying configuration changes that require a fresh boot.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to restart |
| `data` | `Record<string, unknown>` | No | Optional restart configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the environment has restarted

[Full reference →](./restartEnvironment)

---

### `sendPullRequest`

```typescript
client.environments.sendPullRequest(id: string, data: SendPullRequestRequest): Promise<unknown>
```

Sends a pull request from the environment's current state.

Creates a pull request on the remote repository using the changes
present in the environment. The PR details are specified in the request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `SendPullRequestRequest` | Yes | Pull request details including title, description, and target branch |

**Returns:** `Promise<unknown>` — A promise that resolves when the pull request has been created

[Full reference →](./sendPullRequest)

---

### `setDefaultProvider`

```typescript
client.environments.setDefaultProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Sets an installed provider as the system default.

New environments will use this provider unless another is explicitly
specified during creation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the provider to set as default |
| `data` | `Record<string, unknown>` | No | Optional additional configuration for the default setting |

**Returns:** `Promise<unknown>` — A promise that resolves when the default is updated

[Full reference →](./setDefaultProvider)

---

### `startEnvironment`

```typescript
client.environments.startEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Starts an environment.

Boots up the environment so it becomes active and ready for use.
The environment's provider must be running first.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to start |
| `data` | `Record<string, unknown>` | No | Optional start configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the environment has started

[Full reference →](./startEnvironment)

---

### `startProvider`

```typescript
client.environments.startProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Starts the underlying provider for an environment.

Boots up the provider process that backs the environment, making it
ready to accept operations. This is distinct from starting the
environment itself.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `Record<string, unknown>` | No | Optional start configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the provider has started

[Full reference →](./startProvider)

---

### `stopEnvironment`

```typescript
client.environments.stopEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Stops a running environment.

Gracefully shuts down the environment, preserving its state for later
restart. Resources may be released depending on the provider.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to stop |
| `data` | `Record<string, unknown>` | No | Optional stop configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the environment has stopped

[Full reference →](./stopEnvironment)

---

### `stopProvider`

```typescript
client.environments.stopProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Stops the underlying provider for an environment.

Shuts down the provider process without destroying the environment.
The provider can be restarted later.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `Record<string, unknown>` | No | Optional stop configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the provider has stopped

[Full reference →](./stopProvider)

---

### `updateEnvironment`

```typescript
client.environments.updateEnvironment(id: string, data: UpdateEnvironmentRequest): Promise<Environment>
```

Updates an existing environment's configuration.

Modifies environment settings such as name, resource allocations, or
other configurable properties.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to update |
| `data` | `UpdateEnvironmentRequest` | Yes | The fields to update on the environment |

**Returns:** `Promise<Environment>` — A promise that resolves to the updated

[Full reference →](./updateEnvironment)

---

### `updateInstalledProvider`

```typescript
client.environments.updateInstalledProvider(id: string, data: UpdateInstalledProviderRequest): Promise<InstalledProvider>
```

Updates the configuration of an installed provider.

Modifies provider settings such as name, credentials, or resource limits.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider to update |
| `data` | `UpdateInstalledProviderRequest` | Yes | The fields to update on the provider |

**Returns:** `Promise<InstalledProvider>` — A promise that resolves to the updated

[Full reference →](./updateInstalledProvider)

---

### `writeFile`

```typescript
client.environments.writeFile(id: string, data: WriteEnvironmentFileRequest): Promise<unknown>
```

Writes a file to an environment's filesystem.

Creates or overwrites a file at the specified path within the
environment. Useful for deploying configuration or code changes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `WriteEnvironmentFileRequest` | Yes | The file write request specifying path and content |

**Returns:** `Promise<unknown>` — A promise that resolves when the file has been written

[Full reference →](./writeFile)

