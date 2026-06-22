---
sidebar_position: 2
sidebar_label: Managing Environments
title: Environments
description: Use the Desktop App Environments panel to manage local, cloud, runner, and child execution contexts.
---

# Environments

The Desktop App **Environments** panel is the user-facing view of Codebolt's environment system. It shows local environments, cloud runtimes, runner-backed environments, and child environments in one tree.

An environment tells Codebolt:

- where work should run
- which provider controls the runtime
- which project path the runtime should use
- how project state should sync
- whether changes should merge back through Git, workspace sync, or no merge flow
- how the runtime relates to any parent environment

## What an environment stores

Every environment has a local Codebolt record:

| Field | Purpose |
|---|---|
| `id` | Environment ID. Cloud runtime rows can use `cloud:<runtimeId>`. |
| `name` | Display name in the Environments panel. |
| `provider` | Provider metadata and provider capabilities. |
| `config` | Launch config: runtime IDs, paths, sync mode, merge strategy, cloud workspace, and parent metadata. |
| `state` | Lifecycle state such as `starting`, `running`, `stopped`, or `error`. |
| `isActive` | Whether the backing runtime is active. |

The `config` object is normalized by the backend before the environment is listed or started. That normalization gives different providers a consistent shape in the UI.

## Runtime origins

Codebolt classifies each environment with `instanceOrigin`:

| Origin | Meaning |
|---|---|
| `manual_started` | A normal user-created environment. |
| `cloud_started` | A cloud runtime started through Codebolt Cloud. |
| `runner_started` | A runtime backed by a connected runner node. |
| `child_environment` | An environment created under a parent runtime. |

This origin affects default sync mode, merge behavior, and where the environment appears in the tree.

## UI tree grouping

The Desktop App builds the environment tree from runtime identity, provider identity, parent metadata, and paths.

| Section | Contains |
|---|---|
| **Local** | The default local project plus local child/worktree environments. |
| **Cloud Sandboxed Environments** | Cloud runtimes started through cloud runtime providers. |
| **Self Started Environments** | Existing runtimes Codebolt attached to or discovered. |
| **User Runner Environments** | Child environments running under connected runner nodes. |

Child environments are nested by matching `parentEnvironmentId`, `parentRuntimeId`, or normalized parent project paths.

## Creating an environment

When you create an environment from the Desktop App:

1. Codebolt validates the selected provider.
2. Provider defaults are merged with the environment config.
3. Codebolt resolves a prospective path when possible.
4. The launch config is normalized.
5. The environment record is saved locally.
6. Codebolt registers it with the lifecycle manager.
7. Codebolt starts the provider or asks `cloudprovider` to start the runtime.
8. The UI receives an `environmentRuntimeSync` event and updates the tree.

Cloud runtime provider selections such as `e2b-remote`, `sprites-remote`, `runloop-remote`, `modal-remote`, and `daytona-remote` are normalized so the local provider is `cloudprovider` and the actual runtime provider is stored in `runtimeProviderId`.

## Important config fields

| Field | Meaning |
|---|---|
| `providerId` | Local provider. Cloud runtimes use `cloudprovider`. |
| `runtimeProviderId` | Actual runtime backend, such as `e2b-remote` or `runner-node:<nodeId>`. |
| `runtimeId` / `cloudRuntimeId` | Runtime identity returned by the cloud or provider. |
| `runtimeType` | Runtime category, such as `cloud` or `runner`. |
| `workspaceId` / `workspaceType` | Cloud workspace scope. |
| `requestedPath` | User-requested path. |
| `resolvedPath` | Path after provider/default resolution. |
| `environmentPath` / `workspacePath` | Working path used by providers and UI. |
| `pathSource` | `user_override`, `provider_proposed`, `existing`, or `auto_default`. |
| `syncMode` | `none`, `git`, or `workspace_sync`. |
| `mergeStrategy` | `none`, `git`, or `workspace_sync`. |
| `parentRuntimeId` | Parent runtime ID for child environments. |
| `parentEnvironmentId` | Parent Codebolt environment ID. |
| `parentProjectPath` | Parent project path used for nesting and child placement. |

## Paths

Codebolt tracks multiple path fields because a local worktree, cloud sandbox, runner node, and child environment can each expose workspace paths differently.

For local worktree-style environments, Codebolt commonly resolves under:

```text
<project>/.codebolt/worktree/<environment-name>
<project>/.codebolt/environments/<environment-name>
```

For cloud environments, Codebolt asks the cloud runtime service for a proposed path. If the cloud service cannot provide one, it falls back to a path like:

```text
/home/user/<project-or-environment-name>
```

## Sync and merge modes

| Mode | Meaning |
|---|---|
| `none` | No automatic project sync or merge flow. |
| `git` | Runtime/project state is synchronized through Git. This is the default for cloud runtimes. |
| `workspace_sync` | Workspace state is synchronized directly. |

`mergeStrategy` usually follows `syncMode`. For example, `git` sync uses a `git` merge strategy.

## Start, stop, and restart

The Desktop App calls backend environment routes and then refetches authoritative state.

| Action | Backend behavior |
|---|---|
| Start | Marks the environment `starting`, then starts a provider process or sends `startRuntime` through `cloudprovider`. |
| Stop | Marks the environment `stopping`, sends provider stop or cloud runtime stop, then marks it `stopped`. |
| Restart | Performs stop/start behavior and refreshes runtime metadata. |
| Refresh providers | Asks connected providers to refresh runtime and environment rows. |
| Archive | Hides or de-emphasizes environments that should not appear in active workflows. |

## How normal providers start

For a local/provider-backed environment, Codebolt:

1. Resolves the provider path.
2. Reads provider metadata.
3. Merges provider YAML config, installed-provider config, and environment config.
4. Starts the provider entrypoint as a child process.
5. Passes `ENVIRONMENT_CONFIG`, `environmentId`, and `providerId`.
6. Captures stdout and stderr for provider debug.
7. Waits for `providerStartResponse`.
8. Marks the environment `running`.

If the process exits before readiness, startup fails and the environment moves to an error or stopped state.

## How cloudprovider works

`cloudprovider` is the built-in bridge between the Desktop App and Codebolt Cloud runtimes.

It can:

- create cloud runtimes
- list cloud runtimes
- stop cloud runtimes
- discover runner nodes
- list cloud threads and messages
- attach to live thread events
- forward local messages to remote runtimes
- forward runtime status updates back to the Desktop App

It uses:

| Channel | Purpose |
|---|---|
| Cloud HTTP API | Create, list, stop runtimes; list threads; fetch thread messages. |
| Cloud WebSocket proxy | Register local Codebolt, receive runtime events, forward messages, and receive connection snapshots. |

When cloudprovider starts, it resolves the signed-in Codebolt auth token, opens the cloud WebSocket, registers as the local app bridge, requests a runtime snapshot, and forwards cloud runtime events back into Codebolt.

## Virtual cloud environments

The Desktop App can show cloud runtimes that were not saved as local environment records. These are virtual environments with IDs like:

```text
cloud:<runtimeId>
```

They are hydrated through cloudprovider lazy requests. This lets Codebolt show available cloud runtimes without requiring every runtime to already exist in the local environment storage file.

## Debugging environments

When an environment does not behave as expected, inspect:

| Check | Why it matters |
|---|---|
| State | Shows whether Codebolt is starting, running, stopped, or failed. |
| Provider | Confirms local provider, cloudprovider, runtime provider, or runner node. |
| Runtime ID | Required for cloud and runner environments. |
| Runtime provider ID | Shows the actual cloud backend. |
| Paths | Confirms the project/workspace path being used. |
| Parent metadata | Explains nesting and child environment routing. |
| Sync mode | Explains how changes should move in and out of the runtime. |

Common failure patterns:

| Symptom | Likely cause |
|---|---|
| Stuck on `starting` | Provider did not send `providerStartResponse`, or cloudprovider is waiting on cloud registration. |
| Immediate `error` | Provider entrypoint missing, provider crash, missing auth token, or cloud runtime create failure. |
| Cloud list works but live updates do not | HTTP path works, WebSocket registration or connection snapshots are failing. |
| Child environment appears at root | Missing or mismatched `parentEnvironmentId`, `parentRuntimeId`, or parent path. |
| Runner environments missing | cloudprovider cannot list runner nodes, or no child environments exist under the runner. |

## Related docs

- [Full Environments reference](../../../08a_environments/01_overview.md)
- [Configuring Environments](../../../08a_environments/02_configuring-environments.md)
- [Environment Providers](../../../08a_environments/03_environment-providers.md)
- [Environment Debug](../../../08a_environments/04_environment-debug.md)
- [Cloud runtimes and providers](../../../08f_cloud/04_runtimes-and-providers.md)
