---
title: saveLayout
---

# `saveLayout`

```typescript
client.swarm.saveLayout(data: SaveLayoutRequest): Promise<void>
```

Save or update the swarm layout.

Persists a new layout configuration for swarms. The layout defines
how swarms, teams, and agents are organized and displayed. Use
this to save custom arrangements or update the structure.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveLayoutRequest` | Yes | The layout configuration to save |

## Returns

`Promise<void>` — A promise that resolves when the layout is saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.saveLayout(/* SaveLayoutRequest */);
console.log(result);
```
