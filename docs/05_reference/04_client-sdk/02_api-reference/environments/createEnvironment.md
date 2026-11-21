---
title: createEnvironment
---

# `createEnvironment`

```typescript
client.environments.createEnvironment(data: CreateEnvironmentRequest): Promise<Environment>
```

Creates a new development environment.

Provisions a new environment using the specified provider and configuration.
The environment can then be started, stopped, and managed through other methods.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEnvironmentRequest` | Yes | Environment creation parameters including name, provider, and settings |

## Returns

`Promise<Environment>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.createEnvironment(/* CreateEnvironmentRequest */);
console.log(result);
```
