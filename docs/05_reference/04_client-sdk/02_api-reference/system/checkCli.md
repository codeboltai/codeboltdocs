---
title: checkCli
---

# `checkCli`

```typescript
client.system.checkCli(): Promise<CliStatus>
```

Checks the current CLI installation status.

Returns information about whether the CLI tool is installed, which
version is present, and if it's properly configured. Use this to
verify CLI availability before attempting to use it.

## Parameters

_No parameters._

## Returns

`Promise<CliStatus>` — A promise that resolves to CLI status information

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.system.checkCli();
console.log(result);
```
