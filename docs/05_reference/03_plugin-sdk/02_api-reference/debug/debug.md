---
title: debug
slug: debug
---

# `debug`

```typescript
plugin.debug.debug(log: string, type: logType): Promise<DebugAddLogResponse>
```

Sends a log message to the debug websocket and waits for a response.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `log` | `string` | Yes | The log message to send. |
| `type` | `logType` | Yes | The type of the log message (info, error, warning). |

## Returns

`Promise<DebugAddLogResponse>` — A promise that resolves with the response from the debug event.

## Example

```typescript
import plugin from '@codebolt/plugin-sdk';

const result = await plugin.debug.debug('log', /* logType */);
console.log(result);
```
