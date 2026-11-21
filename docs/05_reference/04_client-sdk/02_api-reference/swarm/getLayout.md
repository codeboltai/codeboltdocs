---
title: getLayout
---

# `getLayout`

```typescript
client.swarm.getLayout(): Promise<SwarmLayout>
```

Get the swarm layout.

Retrieves the current layout configuration for swarms in the system.
The layout defines how swarms, teams, and agents are organized and
displayed in user interfaces.

## Parameters

_No parameters._

## Returns

`Promise<SwarmLayout>` — A promise that resolves to the SwarmLayout object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getLayout();
console.log(result);
```
