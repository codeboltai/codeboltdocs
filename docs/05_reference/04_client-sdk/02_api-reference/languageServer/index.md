---
title: LanguageServer API
---

# LanguageServer API

Language Server API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`add`](./add) | Adds a custom language server configuration to the workspace. |
| [`getInstalled`](./getInstalled) | Retrieves the list of language servers currently installed in the workspace. |
| [`install`](./install) | Installs a language server by downloading and configuring it for use in the workspace. |

## Methods

---

### `add`

```typescript
client.languageServer.add(data: AddLanguageServerRequest): Promise<unknown>
```

Adds a custom language server configuration to the workspace.

Registers a new language server entry with custom settings, allowing you to configure
language servers that are not in the default catalog or to override default settings
for existing servers.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddLanguageServerRequest` | Yes | The language server configuration to add |

**Returns:** `Promise<unknown>` — A promise that resolves when the configuration has been saved

[Full reference →](./add)

---

### `getInstalled`

```typescript
client.languageServer.getInstalled(): Promise<LanguageServer[]>
```

Retrieves the list of language servers currently installed in the workspace.

Returns metadata for each installed language server including its name, supported
languages, and current status. Use this to check which LSP capabilities are available
before performing language-specific operations.

_No parameters._

**Returns:** `Promise<LanguageServer[]>` — A promise that resolves to an array of installed language server configurations

[Full reference →](./getInstalled)

---

### `install`

```typescript
client.languageServer.install(data: InstallLanguageServerRequest): Promise<unknown>
```

Installs a language server by downloading and configuring it for use in the workspace.

Triggers the installation process for a specified language server. The server will be
downloaded and set up so it can provide LSP features for its supported languages.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallLanguageServerRequest` | Yes | The installation request configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the installation request has been accepted

[Full reference →](./install)

