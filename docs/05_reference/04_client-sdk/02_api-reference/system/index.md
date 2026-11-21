---
title: System API
---

# System API

System API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`checkCli`](./checkCli) | Checks the current CLI installation status. |
| [`installCli`](./installCli) | Installs the CodeBolt CLI tool on the system. |
| [`openFolder`](./openFolder) | Opens a folder in the system's native file manager. |

## Methods

---

### `checkCli`

```typescript
client.system.checkCli(): Promise<CliStatus>
```

Checks the current CLI installation status.

Returns information about whether the CLI tool is installed, which
version is present, and if it's properly configured. Use this to
verify CLI availability before attempting to use it.

_No parameters._

**Returns:** `Promise<CliStatus>` — A promise that resolves to CLI status information

[Full reference →](./checkCli)

---

### `installCli`

```typescript
client.system.installCli(data?: InstallCliRequest): Promise<InstallCliResponse>
```

Installs the CodeBolt CLI tool on the system.

Downloads and configures the command-line interface tool for CodeBolt,
enabling terminal-based operations and command execution. The installation
process includes setting up necessary binaries and configuration files.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallCliRequest` | No | Optional parameters for CLI installation |

**Returns:** `Promise<InstallCliResponse>` — A promise that resolves to installation status and details

[Full reference →](./installCli)

---

### `openFolder`

```typescript
client.system.openFolder(data: OpenFolderRequest): Promise<OpenFolderResponse>
```

Opens a folder in the system's native file manager.

Launches the default file explorer or Finder window for the specified
folder path. This provides convenient access to project directories
and workspace locations directly from the application.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `OpenFolderRequest` | Yes | Request containing folder information |

**Returns:** `Promise<OpenFolderResponse>` — A promise that resolves when the folder has been opened

[Full reference →](./openFolder)

