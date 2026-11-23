---
title: Debug API
---

# Debug API

The `debug` module of the `@codebolt/plugin-sdk`.

```typescript
import plugin from '@codebolt/plugin-sdk';
```

## Quick Reference

| Method | Description |
|---|---|
| [`debug`](./debug.md) | Sends a log message to the debug websocket and waits for a response. |
| [`openDebugBrowser`](./openDebugBrowser) | Requests to open a debug browser at the specified URL and port. |

## Methods

---

### `debug`

```typescript
plugin.debug.debug(log: string, type: logType): Promise<DebugAddLogResponse>
```

Sends a log message to the debug websocket and waits for a response.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `log` | `string` | Yes | The log message to send. |
| `type` | `logType` | Yes | The type of the log message (info, error, warning). |

**Returns:** `Promise<DebugAddLogResponse>` — A promise that resolves with the response from the debug event.

[Full reference →](./debug.md)

---

### `openDebugBrowser`

```typescript
plugin.debug.openDebugBrowser(url: string, port: number): Promise<OpenDebugBrowserResponse>
```

Requests to open a debug browser at the specified URL and port.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `url` | `string` | Yes | The URL where the debug browser should be opened. |
| `port` | `number` | Yes | The port on which the debug browser will listen. |

**Returns:** `Promise<OpenDebugBrowserResponse>` — A promise that resolves with the response from the open debug browser event.

[Full reference →](./openDebugBrowser)

