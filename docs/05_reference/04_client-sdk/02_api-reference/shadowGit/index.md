---
title: ShadowGit API
---

# ShadowGit API

Shadow Git API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`checkpoint`](./checkpoint) | Create a shadow git checkpoint |
| [`cleanup`](./cleanup) | Clean up shadow git data |
| [`diff`](./diff) | Get diff between shadow git checkpoints |
| [`getCheckpoints`](./getCheckpoints) | List all shadow git checkpoints |
| [`initialize`](./initialize) | Initialize shadow git tracking |
| [`readFile`](./readFile) | Read a file from a shadow git checkpoint |
| [`restore`](./restore) | Restore to a previous shadow git checkpoint |

## Methods

---

### `checkpoint`

```typescript
client.shadowGit.checkpoint(data?: ShadowGitCheckpointRequest): Promise<ShadowGitCheckpoint>
```

Create a shadow git checkpoint

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitCheckpointRequest` | No |  |

**Returns:** `Promise<ShadowGitCheckpoint>`

[Full reference →](./checkpoint)

---

### `cleanup`

```typescript
client.shadowGit.cleanup(data?: ShadowGitCleanupRequest): Promise<unknown>
```

Clean up shadow git data

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitCleanupRequest` | No |  |

**Returns:** `Promise<unknown>`

[Full reference →](./cleanup)

---

### `diff`

```typescript
client.shadowGit.diff(data?: ShadowGitDiffRequest): Promise<unknown>
```

Get diff between shadow git checkpoints

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitDiffRequest` | No |  |

**Returns:** `Promise<unknown>`

[Full reference →](./diff)

---

### `getCheckpoints`

```typescript
client.shadowGit.getCheckpoints(params?: Record<string, unknown>): Promise<ShadowGitCheckpoint[]>
```

List all shadow git checkpoints

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No |  |

**Returns:** `Promise<ShadowGitCheckpoint[]>`

[Full reference →](./getCheckpoints)

---

### `initialize`

```typescript
client.shadowGit.initialize(data?: ShadowGitInitializeRequest): Promise<unknown>
```

Initialize shadow git tracking

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitInitializeRequest` | No |  |

**Returns:** `Promise<unknown>`

[Full reference →](./initialize)

---

### `readFile`

```typescript
client.shadowGit.readFile(data: ShadowGitReadFileRequest): Promise<unknown>
```

Read a file from a shadow git checkpoint

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitReadFileRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./readFile)

---

### `restore`

```typescript
client.shadowGit.restore(data: ShadowGitRestoreRequest): Promise<unknown>
```

Restore to a previous shadow git checkpoint

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitRestoreRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./restore)

