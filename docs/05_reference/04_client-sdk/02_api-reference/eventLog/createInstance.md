---
title: createInstance
---

# `createInstance`

```typescript
client.eventLog.createInstance(data: CreateEventLogInstanceRequest): Promise<EventLogInstance>
```

Creates a new event log instance.

An event log instance acts as a container that groups related events
together. Create one per logical context (e.g., per agent session or workflow).

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogInstanceRequest` | Yes | Instance creation payload including name and configuration |

## Returns

`Promise<EventLogInstance>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.createInstance(/* CreateEventLogInstanceRequest */);
console.log(result);
```
