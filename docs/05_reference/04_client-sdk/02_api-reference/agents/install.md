---
title: install
---

# `install`

```typescript
client.agents.install(data: InstallAgentRequest): Promise<Agent>
```

Installs an agent from the remote registry.

Downloads and registers an agent from the CodeBolt agent marketplace,
making it available for local use.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallAgentRequest` | Yes | The installation configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the installed Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.install(/* InstallAgentRequest */);
console.log(result);
```
