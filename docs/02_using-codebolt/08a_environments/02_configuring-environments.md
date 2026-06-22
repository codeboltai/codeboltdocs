---
sidebar_position: 2
title: Configuring Environments
description: Create, inspect, start, stop, and organize execution environments from the Environments panel.
---

# Configuring Environments

The **Environments** panel is where you inspect and control the execution contexts available to a project. It shows local environments, cloud runtimes, runner-backed environments, and child environments in one tree.

Open it from the environment or execution area in Codebolt. The panel loads the current environment list from the backend and then stays updated through runtime sync events.

## Creating an environment

1. Open the **Environments** panel.
2. Click **New Environment**.
3. Enter a name.
4. Choose a provider.
5. Fill in provider-specific configuration.
6. Review or override the proposed path if available.
7. Save the environment.

When you save, Codebolt validates the provider, merges provider defaults with your config, normalizes the launch config, stores the environment, and usually starts the provider automatically.

## Choosing a provider

The provider controls what kind of runtime Codebolt creates or attaches to.

| Provider shape | What happens |
|---|---|
| Local or worktree provider | Codebolt starts a local provider process and runs work against a local path or worktree. |
| Cloud runtime provider | Codebolt creates a cloud runtime and stores it as a `cloudprovider` environment with runtime metadata. |
| Runner provider | Codebolt creates work on a connected runner node. |
| Existing cloud runtime | Codebolt can display it as a virtual cloud environment and hydrate it on demand. |

Cloud runtime provider IDs currently include values such as `e2b-remote`, `sprites-remote`, `runloop-remote`, `modal-remote`, and `daytona-remote`. Runner node providers use IDs shaped like `runner-node:<nodeId>`.

## Config fields that matter

Different providers expose different UI fields, but the normalized environment config commonly includes:

| Field | Purpose |
|---|---|
| `providerId` | The provider that Codebolt should use locally. Cloud runtime environments use `cloudprovider`. |
| `runtimeProviderId` | The actual cloud runtime provider, such as `e2b-remote` or `runloop-remote`. |
| `runtimeId` / `cloudRuntimeId` | Runtime identity returned by the cloud or remote provider. |
| `runtimeType` | Runtime category, for example `cloud` or `runner`. |
| `workspaceId` / `workspaceType` | Cloud workspace scope. Team workspaces are normalized as `team:<id>`. |
| `requestedPath` | User-requested path. |
| `resolvedPath` | Resolved path after provider/default logic. |
| `environmentPath` / `workspacePath` | Working path used by providers and UI. |
| `pathSource` | Whether the path came from the user, provider, existing runtime, or default fallback. |
| `instanceOrigin` | `manual_started`, `cloud_started`, `runner_started`, or `child_environment`. |
| `syncMode` | `none`, `git`, or `workspace_sync`. |
| `mergeStrategy` | `none`, `git`, or `workspace_sync`. |
| `parentRuntimeId` | Runtime ID of the parent environment for child environments. |
| `parentEnvironmentId` | Codebolt environment ID of the parent environment. |
| `parentProjectPath` | Parent working path used to resolve child environment placement. |

## Path behavior

Before an environment is created, Codebolt can calculate a prospective path.

For local worktree-style environments, the path is usually under the active project:

```text
<project>/.codebolt/worktree/<environment-name>
<project>/.codebolt/environments/<environment-name>
```

For cloud environments, Codebolt asks the cloud runtime service for a proposed path. If the provider cannot answer, Codebolt falls back to a path like:

```text
/home/user/<project-or-environment-name>
```

If you explicitly set a path, `pathSource` becomes `user_override`.

## Starting, stopping, and restarting

The Environments panel can start, stop, and restart environments.

| Action | What Codebolt does |
|---|---|
| Start | Optimistically marks the row as `starting`, calls the backend start route, then refetches authoritative state. |
| Stop | Marks the row as `stopping`, calls the backend stop route, then refetches state. |
| Restart | Marks the row as `restarting`, then performs backend restart behavior. |
| Refresh providers | Asks connected providers, especially `cloudprovider`, to refresh runtime/environment data. |
| Archive | Hides or de-emphasizes environments that should no longer appear in active workflows. |

For a normal local provider, starting means spawning the provider process. For a cloud-backed environment, starting usually means sending a lazy `startRuntime` request through `cloudprovider`.

## Parent and child environments

Child environments let Codebolt create isolated work under an existing parent runtime. A child environment records:

- `instanceOrigin: child_environment`
- `parentRuntimeId`
- `parentEnvironmentId`
- `parentProjectPath`

The UI uses those fields to nest the child under the correct parent. This is useful when a cloud runtime or runner starts additional isolated workspaces.

## Cloud workspace scope

Cloud environments require an auth token from the signed-in Codebolt session or environment variables. Codebolt resolves the workspace scope from the request, selected workspace config, or token-derived personal workspace.

Workspace IDs are normalized:

| Input | Normalized meaning |
|---|---|
| `team:<id>` | Team workspace |
| `<id>` | Team workspace, normalized to `team:<id>` |
| no workspace | Personal workspace derived from the auth token |

If a request tries to use a workspace that does not match the selected workspace, Codebolt rejects the sync to avoid cross-workspace leakage.

## Live updates

The UI listens for:

| Event | Meaning |
|---|---|
| `environmentRuntimeSync` | Provider sent new or updated environment/runtime rows. |
| `environmentRuntimeStatusUpdate` | Provider sent a state update for one environment/runtime. |

When an event includes full environment records, the UI upserts them into the store. When it includes only an ID and state, the UI patches the existing row. If the event is incomplete, the UI refetches the environment list.

## Practical guidance

- Use a local environment for direct work on the active project.
- Use a local worktree or child environment when you want isolation without cloud infrastructure.
- Use a cloud runtime when you want remote execution, parallel runs, or a clean sandbox.
- Use a runner environment when work should run on infrastructure you control but still be coordinated through Codebolt Cloud.
- Use `git` sync for cloud runtimes unless the provider explicitly supports another mode.
