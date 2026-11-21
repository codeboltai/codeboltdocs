---
title: installCli
---

# `installCli`

```typescript
client.system.installCli(data?: InstallCliRequest): Promise<InstallCliResponse>
```

Installs the CodeBolt CLI tool on the system.

Downloads and configures the command-line interface tool for CodeBolt,
enabling terminal-based operations and command execution. The installation
process includes setting up necessary binaries and configuration files.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallCliRequest` | No | Optional parameters for CLI installation |

## Returns

`Promise<InstallCliResponse>` — A promise that resolves to installation status and details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.system.installCli();
console.log(result);
```
