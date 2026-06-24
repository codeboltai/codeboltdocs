---
sidebar_position: 11
title: Communication
description: "Source code: channels/, sockets/, gateway/, events/, routes/, cliLib/, controllers/{chat,inbox,mail,calendar,convas},."
---

# Communication Subsystem

This is how anything outside the server talks to anything inside. Desktop app, CLI, TUI, chat widget, remote agent, webhook — all arrive here first.

> **Source code:** `channels/`, `sockets/`, `gateway/`, `events/`, `routes/`, `cliLib/`, `controllers/{chat,inbox,mail,calendar,convas}`, `services/{chatService,inboxService,mailService,calendarService,calendarSchedulerService,canvasServices,dynamicPanelService,terminalService,portScannerService}`.

## The three entry points

| Entry point | Transport | Used by |
|---|---|---|
| **Gateway / sockets** | WebSocket | Desktop app, CLI, TUI, chat widget — anything long-lived |
| **Routes** | REST | One-shot operations, webhooks, integrations |
| **Channels** | In-process pub/sub on top of the event bus | Internal subsystem ↔ subsystem |

All three eventually drop their payload onto the `applicationEventBus`, where the rest of the server picks it up. This unification is why a chat message from the CLI and a chat message from the desktop app are indistinguishable downstream.

## The WebSocket path

```
client
   │
   ▼
gateway/  ← auth, session, protocol handshake
   │
   ▼
sockets/  ← connection multiplexing, per-client state
   │
   ▼
channels/ ← logical pipes: chat, agent-events, tool-stream, status, ...
   │
   ▼
applicationEventBus
```

Channels are the important abstraction: a single WS connection carries many logical streams. The UI subscribes to `chat`, `agent-events`, and `status`; a background agent might only subscribe to `agent-events` for its own runs.

## The REST path

`routes/` defines the HTTP surface. Used for:
- Auth / login
- Webhook receivers (GitHub, Linear, etc.)
- One-shot operations that don't need a long-lived connection
- Health / readiness

Every route handler is thin — it normalises the request and drops it onto the bus. Business logic lives in services.

## Communication services

### `chatService`
The chat domain: messages, threads, tabs, history. The `chat` channel is its WS projection.

### `inboxService`
Agents' inboxes — messages waiting for a specific agent (from users or peer agents). Backed by `agentEventQueue` (see [Agent Subsystem](./01_agent-subsystem.md)).

### `mailService` + `calendarService` + `calendarSchedulerService`
Real email and calendar integrations. Used by agents that need to email humans or schedule work. Calendar scheduling also drives background-agent triggers.

### `canvasServices`
The collaborative canvas — shared whiteboard-like surface that agents and users can both draw on / write to.

### `dynamicPanelService`
Lets extensions register UI panels at runtime. The panel is declared by an extension, rendered by the UI, and communicates back over its own channel.

### `terminalService`
Server-side pty management. When an agent runs a long shell command, or when the user opens a terminal in the UI, this is the service that owns the pty.

### `portScannerService`
Detects which ports the user's running app is listening on — used to auto-wire "open in browser" actions without the user configuring URLs.

## Why this is a subsystem, not "just sockets"

Because the same message ("run this agent on this project") can arrive over WS from the desktop, REST from a webhook, or stdin from the CLI, and it all has to end up in the same place with the same semantics. The communication subsystem is the "same semantics" part.

## See also

- [Process Model](../../02_architecture/03_process-model.md) — external clients as peers
- [Agent Subsystem](./01_agent-subsystem.md) — where messages end up
- [Chat message end-to-end](../../02_architecture/04_data-flow-walkthroughs/chat-message-end-to-end.md)
