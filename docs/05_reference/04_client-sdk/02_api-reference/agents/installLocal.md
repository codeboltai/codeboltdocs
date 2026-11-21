---
title: installLocal
---

# `installLocal`

```typescript
client.agents.installLocal(data: InstallLocalAgentRequest): Promise<Agent>
```

Installs an agent from a local file path.

Loads and registers an agent from the local filesystem, making it
available for use in the runtime.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallLocalAgentRequest` | Yes | The local installation configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the installed Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.installLocal(/* InstallLocalAgentRequest */);
console.log(result);
```
