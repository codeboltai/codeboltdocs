---
title: install
---

# `install`

```typescript
client.languageServer.install(data: InstallLanguageServerRequest): Promise<unknown>
```

Installs a language server by downloading and configuring it for use in the workspace.

Triggers the installation process for a specified language server. The server will be
downloaded and set up so it can provide LSP features for its supported languages.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallLanguageServerRequest` | Yes | The installation request configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the installation request has been accepted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.languageServer.install(/* InstallLanguageServerRequest */);
console.log(result);
```
