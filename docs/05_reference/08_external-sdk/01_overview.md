---
title: External SDK
description: Connect a Node.js process to a CodeBolt direct execution gateway.
---

`@codebolt/external-sdk` exposes `ExternalCodeboltClient` for Node.js applications and external processes that connect to a CodeBolt direct execution gateway over WebSocket.

Use `createExternalCodeboltClient({ url })` to create and connect a client to your gateway. The client exposes gateway modules such as `project`, `thread`, `job`, and `artifact`. Call `close()` when the application is finished with the connection.

See [Connect External Agents](../../04_build-on-codebolt/02_creating-agents/04_third-party-agents.md) for how external agent execution fits into CodeBolt.
