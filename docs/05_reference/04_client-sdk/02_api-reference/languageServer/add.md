---
title: add
---

# `add`

```typescript
client.languageServer.add(data: AddLanguageServerRequest): Promise<unknown>
```

Adds a custom language server configuration to the workspace.

Registers a new language server entry with custom settings, allowing you to configure
language servers that are not in the default catalog or to override default settings
for existing servers.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddLanguageServerRequest` | Yes | The language server configuration to add |

## Returns

`Promise<unknown>` — A promise that resolves when the configuration has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.languageServer.add(/* AddLanguageServerRequest */);
console.log(result);
```
