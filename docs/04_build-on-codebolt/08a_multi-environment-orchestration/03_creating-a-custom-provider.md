---
sidebar_position: 3
title: Creating a Custom Provider
description: A provider bridges Codebolt to a remote execution environment such as an E2B sandbox, Docker container, remote server, git worktree, or other custom backend
---

import ProviderAuthoringDiagram from '@site/src/components/diagrams/ProviderAuthoringDiagram';

# Creating a Custom Provider

A provider bridges Codebolt to a remote execution environment such as an E2B sandbox, Docker container, remote server, git worktree, or other custom backend. It handles environment creation, agent execution, file operations, and teardown.

<ProviderAuthoringDiagram />

## The BaseProvider Class

All providers extend `BaseProvider` from `@codebolt/provider`. It handles lifecycle wiring, WebSocket transport, reconnection, heartbeats, request queueing, and message forwarding. Your provider implements the environment-specific parts.

### Abstract Methods

| Method | Purpose |
|---|---|
| `setupEnvironment(initVars)` | Create or connect to the remote environment |
| `resolveProjectContext(initVars)` | Resolve project paths and metadata |
| `onGetDiffFiles()` | Return file changes in the remote environment |

### Optional Hooks

| Hook | Purpose |
|---|---|
| `teardownEnvironment()` | Clean up the environment on shutdown |
| `ensureAgentServer()` | Start Codebolt or the remote runtime inside the environment |
| `resolveWorkspacePath(initVars)` | Resolve the remote workspace path |
| `checkEnvironmentHealth()` | Custom health check |
| `beforeClose()` | Run logic before disconnecting |
| `afterConnected(startResult)` | Run logic after transport is established |
| `onReconnectAttempt()` | Pre-reconnect checks |
| `onEnvironmentRecoveryFailed(resourceId)` | Clean up orphaned resources |
| `buildWebSocketUrl(initVars)` | Customize the transport URL |

## Provider Entry Point

The entry point creates your provider, gets its handlers, and registers them with the Codebolt runtime:

```ts
import codebolt from "@codebolt/codeboltjs";
import { MyProvider } from "./services/MyProvider";

const provider = new MyProvider({
  agentServerPort: parseInt(process.env.REMOTE_EXECUTION_PORT || "3100", 10),
  agentServerHost: "localhost",
  transport: "websocket",
});

const handlers = provider.getEventHandlers();

codebolt.onProviderStart(handlers.onProviderStart);
codebolt.onProviderAgentStart(handlers.onProviderAgentStart);
codebolt.onProviderStop(handlers.onProviderStop);
codebolt.onCloseSignal(handlers.onCloseSignal);
codebolt.onRawMessage(handlers.onRawMessage);
codebolt.onGetDiffFiles(handlers.onGetDiffFiles);
```

## Suggested Package Structure

Use a structure close to this:

```text
my-provider/
  codeboltprovider.yaml
  providers.yaml
  package.json
  src/
    index.ts
    services/
      MyProviderService.ts
    utils/
      logger.ts
```

Recommended responsibility split:

- `codeboltprovider.yaml`: provider identity and packaging metadata
- `providers.yaml`: runtime defaults and configurable fields
- `src/index.ts`: instantiate provider and register handlers
- `src/services/MyProviderService.ts`: extend `BaseProvider` and implement lifecycle/resource logic
- `src/utils/*`: provider-specific helpers such as logging, remote API wrappers, or transport utilities

## Minimal Manifest Shape

`codeboltprovider.yaml` should describe the provider as an installable/runtime unit:

```yaml
name: my-remote-provider
unique_id: my-remote-provider
runtime: node
entrypoint: dist/index.js
```

`providers.yaml` should carry runtime defaults and configurable fields:

```yaml
name: My Remote Provider
unique_id: my-remote-provider
config:
  pluginPort: 3100
  region: us
  workspaceRoot: /workspace
```

## Minimal Skeleton

```ts
import codebolt from '@codebolt/codeboltjs';
import { BaseProvider } from '@codebolt/provider';
import type { ProviderInitVars } from '@codebolt/types/provider';

class MyProviderService extends BaseProvider {
  async resolveProjectContext(initVars: ProviderInitVars): Promise<void> {
    const path = initVars.projectPath;
    if (typeof path !== 'string' || !path) throw new Error('Expected a project path');
    this.state.projectPath = path;
  }

  async setupEnvironment(initVars: ProviderInitVars): Promise<void> {
    // Create or reconnect your remote resource here.
  }

  async ensureAgentServer(): Promise<void> {
    // Start the remote runtime or connect to an existing one.
  }

  async onGetDiffFiles(): Promise<any> {
    return { files: [] };
  }
}

const provider = new MyProviderService({
  agentServerPort: parseInt(process.env.REMOTE_EXECUTION_PORT || '3100', 10),
  agentServerHost: 'localhost',
  transport: 'websocket',
});

const handlers = provider.getEventHandlers();

codebolt.onProviderStart(handlers.onProviderStart);
codebolt.onProviderAgentStart(handlers.onProviderAgentStart);
codebolt.onProviderStop(handlers.onProviderStop);
codebolt.onCloseSignal(handlers.onCloseSignal);
codebolt.onRawMessage(handlers.onRawMessage);
codebolt.onGetDiffFiles(handlers.onGetDiffFiles);
```

## Writing Strategy

When authoring a provider, design it in this order:

1. define what the remote resource is: sandbox, container, VM, worktree, remote service, or other runtime
2. define how you will create or reconnect it
3. define how the remote runtime will accept agent-start and raw messages
4. define which filesystem or diff operations the provider must implement directly
5. decide whether the remote setup also needs Proxy Execution Gateway support

## If Your Provider Also Uses Proxy Execution Gateway

Some providers only host the remote runtime boundary.

Others also want selected capabilities to proxy through the gateway. In that case the usual split is:

- the provider owns environment creation, reconnect, and remote runtime startup
- the gateway owns selective routing for capabilities such as `Inference`, filesystem calls, or tool access

That is the model documented in [Execution Chaining](./02_remote-environments/03_execution-chaining.md).

## What BaseProvider Gives You

You do not need to reimplement:

- queued messages before transport is ready
- WebSocket reconnection with backoff
- keepalive pings
- pending request timeout tracking
- resource ID persistence helpers
- provider and environment heartbeats
- connected-environment tracking

## Good Providers To Study

| Provider | Why it matters |
|---|---|
| `codeboltjs/providers/e2b` | Strong full-stack example of sandbox creation, recovery, and transport |
| `codeboltjs/providers/daytona-remote-provider` | Similar remote workspace model with reconnect logic |
| `codeboltjs/providers/dockerprovider` | Container-oriented environment management |
| `codeboltjs/providers/remoteserverprovider` | Remote server execution model |

`codeboltjs/providers/e2b` is especially useful because it shows:

- resource creation and reconnect through persisted `resourceId`
- local metadata under `.codebolt/remote-envs/{environmentName}`
- remote runtime startup before transport is used
- upload of `.codebolt` config to support capability proxying across the boundary

## See Also

- [Remote Environments](./02_remote-environments/01_overview.md)
- [Provider Architecture](./02_remote-environments/02_provider-architecture.md)
- [Execution Chaining](./02_remote-environments/03_execution-chaining.md)
- [Environment Lifecycle](./02_remote-environments/04_environment-lifecycle.md)
- [Environment Creation And Management](./02_remote-environments/05_environment-creation-and-management.md)
- [Communication Flow](./02_remote-environments/06_communication-flow.md)
