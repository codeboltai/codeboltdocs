---
title: Direct Plugin Socket Interface
description: How Codebolt routes plugin and execution-gateway connections.
---

# Direct Plugin Socket Interface

Managed plugins connect through the Plugin SDK on `/plugin`. For current external execution integrations, use the execution gateway described in the [Proxy Execution Gateway guide](./01_overview.md).

## Server implementation

The WebSocket dispatcher is in `packages/server/src/sockets/index.ts`. It selects the handler for each connection. The current external gateway lives in `packages/server/src/externalGatewayLib/`. The older direct-provider bridge is implemented separately in `packages/server/src/pluginLib/directExecutionGateway.ts`. The bridge plugin source is `plugins/remote-execution-plugin/src/index.ts`.

## See Also

- [Proxy Execution Gateway](./01_overview.md)
- [Remote Environments](../../08a_multi-environment-orchestration/02_remote-environments/01_overview.md)
- [Creating a Custom Provider](../../08a_multi-environment-orchestration/03_creating-a-custom-provider.md)
- [Plugin SDK and Lifecycle](../02_sdk-and-lifecycle.md)
