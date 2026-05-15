---
sidebar_position: 4
title: Logs and Connection
description: The Logs tab is the operational view of gotui, showing connection state, retry status, TUI logs, and server logs.
---

# Logs and Connection

The `Logs` tab is the operational surface of the CLI interface. When the chat looks stalled or you need to understand what the client is doing, this is where you look first.

## What the Logs tab contains

![Logs tab with connection status, consolidated TUI logs, and server log panels](/productImages/cliinterface/logs.png)

The logs page has three stacked panels:

- **Connection status**
- **TUI logs**
- **Server logs**

That split is deliberate. It keeps client-side behavior, transport status, and server-side output separate enough to reason about failures.

## Connection status panel

The connection panel is driven by the WebSocket session and retry state. It tracks:

- host
- port
- connected or disconnected state
- retry count
- retry-in-progress status
- last error

This is the fastest way to answer basic questions like:

- Am I connected to the right server?
- Is the TUI retrying or idle?
- Did the last reconnect fail?

## TUI logs

The TUI logs panel is the consolidated client-side log stream. It can include:

- WebSocket client activity
- local panel logging
- notifications
- agent-side log forwarding
- UI status lines

At startup, the interface writes operational guidance here, including the available command-style chat actions and target server information.

## Server logs

The server logs panel is the rawer operational view coming from the backend side. Use it when:

- a request appears to hang
- startup sequencing is unclear
- the chat is fine locally but the backend is failing

This panel is different from general TUI logs because it is meant to expose what the server itself is emitting.

## Retry behavior

The CLI interface has explicit retry support:

- `Ctrl+R`: manual retry
- automatic retry metadata shown in the connection panel

If a retry happens, the logs page is where the status becomes visible immediately.

## Notifications

The WebSocket client can also receive notification events. Those are routed into the log pipeline so they appear as visible operational feedback instead of silent background traffic.

## Where debug logs live

Outside the in-app Logs tab, `gotui` also writes debug files into the OS temp directory:

- `gotui-debug.log`
- `gotui-channels.log`

These are useful when the terminal UI itself cannot render enough information, or when a crash happens before the normal panels are usable.

## Connection startup sequence

At a high level, startup looks like this:

1. initialize the TUI
2. initialize the WebSocket client
3. configure connection state in the shared application store
4. connect to the target server
5. route connection and retry information back into the logs page
6. bind the active thread to chat when connected

That is why the `Logs` tab is not just diagnostic noise. It is a reflection of the app's real control path.

## When to use the Logs tab

Use it when:

- the chat input sends but nothing comes back
- the interface keeps reconnecting
- onboarding does not progress
- the server seems reachable but thread state is wrong
- you need to confirm whether an issue is client-side or server-side

## See also

- [CLI Interface](./01_overview.md)
- [Chat and Commands](./03_chat-and-commands.md)
- [Onboarding and Settings](./06_onboarding-and-settings.md)
