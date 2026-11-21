---
title: getInstalled
---

# `getInstalled`

```typescript
client.languageServer.getInstalled(): Promise<LanguageServer[]>
```

Retrieves the list of language servers currently installed in the workspace.

Returns metadata for each installed language server including its name, supported
languages, and current status. Use this to check which LSP capabilities are available
before performing language-specific operations.

## Parameters

_No parameters._

## Returns

`Promise<LanguageServer[]>` — A promise that resolves to an array of installed language server configurations

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.languageServer.getInstalled();
console.log(result);
```
