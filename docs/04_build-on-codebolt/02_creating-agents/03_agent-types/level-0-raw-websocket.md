---
sidebar_position: 4
title: Level 0 — Raw WebSocket
description: Speak to Codebolt over WebSocket without @codebolt/codeboltjs. This is the escape hatch when your agent must run outside the JS SDK.
---

# Level 3 — Raw WebSocket

Speak to Codebolt over WebSocket without `@codebolt/codeboltjs`. This is the escape hatch when your agent must run outside the JS SDK.

## When level 3 is the right choice

- You need your agent in Go, Rust, Python, Elixir, or another non-JS runtime.
- You are wrapping an existing service or binary instead of writing a Node agent.
- You accept owning the transport layer yourself.

If JavaScript is acceptable, stop at [level 2](./level-2-codeboltjs.md). If the standard loop is acceptable, stop at [level 1](./level-1-framework.md).

## What level 3 actually means

At level 3 you implement the client transport yourself. Your process is responsible for:

1. Reading the connection details Codebolt injects when it starts the agent.
2. Opening a WebSocket connection back to the server.
3. Registering or otherwise identifying itself on that socket.
4. Receiving work messages, doing the work, and sending responses back.

The current repo implementations do **not** match the old `llm.chat.request` / `tools.call` envelope that earlier drafts of this page described. The shipped transport today is connection-oriented and registration-oriented.

Level 3 is a transport choice, not a placement choice. A raw-WebSocket agent can still be launched locally by Codebolt from a `remotePath`, or it can be run elsewhere in `selfExecuted` mode. That depends on how you register the agent, not on whether you use the SDK.

## What the current transport looks like

From the code in `remoteexecutor/updatedAgentServer`, provider clients, and transport tests:

- Clients connect to a WebSocket endpoint at `/codebolt`.
- Spawned agents/providers are given identifiers such as `agentId`, `parentId`, `threadId`, `connectionId`, and `SOCKET_PORT`.
- Some flows also use `CODEBOLT_SERVER_URL`; many local flows default to `localhost`.
- Registration messages such as `register` and acknowledgements such as `registered` are part of the current transport.
- Some server paths auto-register a connection from URL/query parameters during connection establishment.

Representative shapes from the repo today:

```text
ws://localhost:${SOCKET_PORT}/codebolt?agentId=${agentId}&parentId=${parentId}
```

```json
{
  "type": "register",
  "clientType": "agent",
  "agentId": "my-agent"
}
```

```json
{
  "type": "registered",
  "connectionId": "my-agent",
  "connectionType": "agent"
}
```

Treat those as current implementation patterns, not a frozen public protocol spec. Different clients in the repo add different query params and message fields.

## Minimal flow

A raw level-3 agent usually does something like this:

```text
read env:
  agentId
  parentId
  threadId
  SOCKET_PORT
  CODEBOLT_SERVER_URL (if provided)

connect to:
  ws://<server>:<port>/codebolt?agentId=<agentId>&parentId=<parentId>

send a register message if your host expects it
wait until the socket is registered/ready

loop:
  receive a request frame from the server or parent client
  run your own LLM/tool/file logic
  send the response frame back with the routing metadata the server expects

close cleanly
```

Unlike [level 2](./level-2-codeboltjs.md), there is no SDK normalizing any of this for you.

## Folder structure

A typical raw agent keeps transport code separate from business logic:

```text
my-raw-agent/
├── codeboltagent.yaml
├── src/
│   ├── main.<lang>
│   ├── websocket_client.<lang>
│   └── message_types.<lang>
└── bin/
    └── agent
```

Notes:

- `main.<lang>` reads env vars and owns the agent loop.
- `websocket_client.<lang>` handles connect, register, send, receive, and reconnect behavior.
- `message_types.<lang>` mirrors the message shapes your client supports.
- `bin/agent` is your compiled or packaged executable if your language needs one.

## Reference implementations

Start from existing transport code instead of inventing a new client from scratch:

- `codeboltjs/providers/remoteserverprovider`
- `codeboltjs/providers/dockerprovider`
- `codeboltjs/remoteexecutor/updatedAgentServer`
- `codeboltjs/tui/gotui`
- `codeboltjs/tui/inkbasedtui`

These are the best references for current connection URLs, registration behavior, and message routing.

## What you lose

At level 3 you own everything below the agent logic:

- Socket lifecycle, reconnects, and timeouts.
- Registration and readiness handling.
- Message parsing, validation, and routing.
- Correlation of requests and responses.
- Compatibility with transport changes across server versions.

If you can use `@codebolt/codeboltjs`, do that instead.

## What you gain

- Your agent can run in any runtime that can speak WebSocket.
- You can reuse an existing non-JS codebase directly.
- You control the transport, packaging, and runtime behavior end to end.

## See also

- [Level 2 — codeboltjs](./level-2-codeboltjs.md)
- [Communication Subsystem internals](../../07b_subsystems/11_communication.md)
- [Remote Execution](../../11_agent-infrastructure/09_remote-execution.md)
