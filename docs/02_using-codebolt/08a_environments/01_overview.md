---
sidebar_position: 1
title: Environments Overview
description: Environments are Codebolt's saved handles for local, cloud, runner, and child execution contexts.
---

# Environments

An **environment** is Codebolt's saved handle for an execution context. It tells Codebolt where work should run, which provider controls that runtime, which project path is active, how changes are synced, and how the runtime should be started, stopped, or reconnected.

The important distinction is:

| Concept | Meaning |
|---|---|
| **Environment** | The Codebolt record you see in the Environments panel. It stores the provider, launch config, runtime identity, paths, state, and metadata. |
| **Provider** | The adapter that knows how to create, attach to, start, stop, and communicate with an execution target. |
| **Runtime** | The actual place where work runs: the local project, a local worktree, a cloud sandbox, a runner node, or a child environment. |

This separation lets the same agent and task model run against different execution surfaces without changing the agent.

## What an environment stores

Every environment has a stable record with:

| Field | Purpose |
|---|---|
| `id` | Local Codebolt environment ID. Cloud runtime rows may use `cloud:<runtimeId>`. |
| `name` | Display name in the Environments panel. |
| `provider` | Provider metadata, including provider ID, display name, local/provider path, and supported agent settings. |
| `config` | Launch config: runtime IDs, paths, sync mode, merge strategy, parent metadata, cloud workspace, and provider-specific settings. |
| `state` | Current lifecycle state such as `running`, `starting`, `stopped`, or `error`. |
| `isActive` | Whether the backing runtime is considered active. |
| `createdAt` / `updatedAt` | Timestamps for the local record. |

The `config` field is the most important part. Codebolt normalizes it before use so each environment has a consistent launch shape even if the provider supplies different raw fields.

## Runtime origins

Codebolt classifies environments by origin:

| Origin | Meaning |
|---|---|
| `manual_started` | A normal environment created directly by the user. |
| `cloud_started` | A cloud sandbox or cloud runtime started through Codebolt Cloud. |
| `runner_started` | A runtime backed by a user runner node connected to Codebolt Cloud. |
| `child_environment` | An environment created under a parent runtime, usually for isolated sub-work or nested execution. |

The origin controls default sync behavior, UI grouping, parent-child relationships, and merge ownership.

## Sync and merge modes

Environments can describe how project state moves into and out of the runtime:

| Mode | Meaning |
|---|---|
| `none` | No automatic project sync or merge behavior. Common for manually started local contexts. |
| `git` | The runtime is created or synchronized through Git. This is the default for cloud runtimes. |
| `workspace_sync` | Workspace state is synchronized directly instead of through Git. |

`mergeStrategy` usually follows `syncMode`:

| Sync mode | Default merge strategy |
|---|---|
| `none` | `none` |
| `git` | `git` |
| `workspace_sync` | `workspace_sync` |

## Environment paths

Codebolt tracks several path fields because local, cloud, runner, and child environments may describe the same workspace differently.

| Field | Meaning |
|---|---|
| `requestedPath` | The path requested by the user or provider. |
| `resolvedPath` | The path Codebolt resolved after applying defaults or provider suggestions. |
| `environmentPath` | The working path used by the environment. |
| `workspacePath` | Workspace path alias used by UI and provider integrations. |
| `pathSource` | Where the path came from: `user_override`, `provider_proposed`, `existing`, or `auto_default`. |

For cloud and runner environments, Codebolt can ask the cloud runtime service for a prospective path before creating the environment. If that fails, it falls back to a deterministic default.

## Lifecycle states

The Environments panel and backend lifecycle manager use these states:

| State | Meaning |
|---|---|
| `created` | The environment record exists but is not running. |
| `starting` | Codebolt is starting the provider or remote runtime. |
| `running` | The provider/runtime is active and available. |
| `stopping` | Codebolt is shutting down the provider or runtime. |
| `stopped` | The environment is not active. |
| `restarting` | Codebolt is stopping and starting the runtime. |
| `error` | Startup, runtime, provider, or health check failed. |
| `unconnectable` | Codebolt knows about the environment but cannot connect to it. |
| `disconnected` | A previously connected runtime/provider is no longer connected. |
| `not_available` | The runtime is unavailable in the current workspace or provider state. |
| `archived` | The environment has been archived from normal active use. |

## How the environment panel is organized

The Environments panel groups environments into a tree:

| Section | Contains |
|---|---|
| **Local** | The default local project plus local child/worktree environments. |
| **Cloud Sandboxed Environments** | Cloud runtimes started through a cloud runtime provider. |
| **Self Started Environments** | Existing runtimes that Codebolt attached to or discovered. |
| **User Runner Environments** | Environments backed by a connected runner node. |

Parent-child nesting is resolved from `parentEnvironmentId`, `parentRuntimeId`, and path metadata. This is how child environments appear under the parent runtime that created them.

## End-to-end flow

At a high level:

1. You create or select an environment.
2. Codebolt resolves the provider and normalizes the launch config.
3. Codebolt stores the environment record locally.
4. Codebolt starts a provider process or asks `cloudprovider` to start a runtime.
5. The provider creates or attaches to the actual runtime.
6. Runtime events flow back into Codebolt.
7. The UI receives `environmentRuntimeSync` or `environmentRuntimeStatusUpdate` events and refreshes the tree.

```text
Codebolt UI
  -> Codebolt server environment service
  -> Provider or cloudprovider bridge
  -> Runtime
  -> Events/status/logs back to Codebolt
```

## See also

- [Configuring Environments](./02_configuring-environments.md)
- [Environment Providers](./03_environment-providers.md)
- [Environment Debug](./04_environment-debug.md)
- [Cloud runtimes and providers](../08f_cloud/04_runtimes-and-providers.md)
