---
title: Apps API
---

# Apps API

Apps API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`edit`](./edit) | Opens an application for editing. |
| [`fork`](./fork) | Forks an existing application. |
| [`getAll`](./getAll) | Retrieves all registered applications. |
| [`getAppFromCache`](./getAppFromCache) | Retrieves an app's data from the cache. |
| [`getById`](./getById) | Retrieves a specific application by its ID. |
| [`install`](./install) | Installs an application. |
| [`start`](./start) | Starts an installed application. |
| [`uninstall`](./uninstall) | Uninstalls an application. |
| [`updateAppToCache`](./updateAppToCache) | Updates an app's data in the cache. |

## Methods

---

### `edit`

```typescript
client.apps.edit(data: EditAppRequest): Promise<unknown>
```

Opens an application for editing.

Launches the app's source code or configuration in an editable mode,
allowing modifications to its behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EditAppRequest` | Yes | The edit configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the app is ready for editing

[Full reference →](./edit)

---

### `fork`

```typescript
client.apps.fork(data: ForkAppRequest): Promise<unknown>
```

Forks an existing application.

Creates a copy of an app that can be independently modified and
customized. Useful for creating variants of existing apps.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ForkAppRequest` | Yes | The fork configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the app has been forked

[Full reference →](./fork)

---

### `getAll`

```typescript
client.apps.getAll(): Promise<App[]>
```

Retrieves all registered applications.

Returns the complete list of apps available in the system, both
installed and available for installation.

_No parameters._

**Returns:** `Promise<App[]>` — A promise that resolves to an array of App objects

[Full reference →](./getAll)

---

### `getAppFromCache`

```typescript
client.apps.getAppFromCache(params?: AppCacheParams): Promise<unknown>
```

Retrieves an app's data from the cache.

Returns the cached representation of an app for fast access,
avoiding a full database or filesystem lookup.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AppCacheParams` | No | Optional cache parameters identifying the app |

**Returns:** `Promise<unknown>` — A promise that resolves to the cached app data

[Full reference →](./getAppFromCache)

---

### `getById`

```typescript
client.apps.getById(appId: string): Promise<App>
```

Retrieves a specific application by its ID.

Returns the full App object including its metadata, configuration,
and current status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `appId` | `string` | Yes | The unique identifier of the app |

**Returns:** `Promise<App>` — A promise that resolves to the App object

[Full reference →](./getById)

---

### `install`

```typescript
client.apps.install(data: InstallAppRequest): Promise<unknown>
```

Installs an application.

Downloads and registers an app, making it available in the CodeBolt
environment for use.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallAppRequest` | Yes | The installation configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the app has been installed

[Full reference →](./install)

---

### `start`

```typescript
client.apps.start(data: StartAppRequest): Promise<unknown>
```

Starts an installed application.

Launches an app that has been previously installed, making its
functionality active in the runtime.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartAppRequest` | Yes | The start configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the app has been started

[Full reference →](./start)

---

### `uninstall`

```typescript
client.apps.uninstall(data: UninstallAppRequest): Promise<unknown>
```

Uninstalls an application.

Removes an installed app and cleans up its associated resources.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UninstallAppRequest` | Yes | The uninstall configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the app has been uninstalled

[Full reference →](./uninstall)

---

### `updateAppToCache`

```typescript
client.apps.updateAppToCache(params?: AppCacheParams): Promise<unknown>
```

Updates an app's data in the cache.

Refreshes the cached representation of an app, ensuring that the
latest metadata is available without a full reload.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AppCacheParams` | No | Optional cache parameters identifying the app |

**Returns:** `Promise<unknown>` — A promise that resolves when the cache has been updated

[Full reference →](./updateAppToCache)

