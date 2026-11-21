---
title: runCommand
---

# `runCommand`

```typescript
client.projects.runCommand(data: RunCommandRequest): Promise<unknown>
```

Executes a shell command within the project's working directory.

Runs a command (e.g., build, test, lint) in the context of the project, with access
to the project's environment variables and path configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RunCommandRequest` | Yes | The command execution request |

## Returns

`Promise<unknown>` — A promise that resolves to the command execution result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.runCommand(/* RunCommandRequest */);
console.log(result);
```
