---
sidebar_position: 4
title: Environment Debug
description: Use environment debug views and provider logs to understand startup, runtime sync, cloudprovider, and provider connection issues.
---

# Environment Debug

Environment debugging in Codebolt is about understanding two things:

1. The normalized environment record Codebolt is using.
2. The provider or runtime events that explain the current state.

The Environments panel shows the user-facing state. Provider debug and logs show what happened during provider startup, cloud runtime sync, and message forwarding.

## What to inspect first

When an environment behaves unexpectedly, check:

| Item | Why it matters |
|---|---|
| Environment state | Confirms whether Codebolt thinks the runtime is `starting`, `running`, `stopped`, or `error`. |
| Provider display name | Confirms whether this is local, cloudprovider, a cloud runtime provider, or a runner node. |
| Runtime ID | Required for cloud, runner, and virtual cloud environments. |
| Runtime provider ID | Shows the actual cloud backend, for example `e2b-remote` or `runloop-remote`. |
| Paths | Confirms which project path the runtime is using. |
| Parent metadata | Explains nesting and child environment routing. |
| Sync mode and merge strategy | Explains how changes should move between local/project/cloud runtime. |

## Provider debug lifecycle

When Codebolt starts a normal provider, it creates an environment debug session and records:

- Provider ID and provider name.
- Environment ID and environment name.
- Provider stdout and stderr.
- Provider process spawn events.
- Provider readiness from `providerStartResponse`.
- Provider exit code.
- Final status: stopped or error.

Provider stdout and stderr are also sent to the UI as provider debug events so you can inspect startup failures without leaving Codebolt.

## Common states and causes

| State | Common cause |
|---|---|
| `starting` for too long | Provider process started but never sent `providerStartResponse`, or cloudprovider is waiting on cloud registration. |
| `error` | Provider entrypoint missing, provider process crashed, auth token missing, cloud runtime create failed, or cloud API returned an error. |
| `stopped` immediately after start | Provider exited before readiness, cloud runtime was inactive, or stop was requested. |
| `disconnected` | A runtime or provider had a known resource ID but no active connection. |
| `unconnectable` | Codebolt has metadata for the runtime but cannot establish a provider/runtime connection. |
| `not_available` | The runtime belongs to another workspace, project scope, or unavailable provider state. |

## Debugging cloudprovider

`cloudprovider` has two communication paths:

| Path | Used for |
|---|---|
| Cloud HTTP API | Create, list, stop runtimes; list threads; load thread messages. |
| Cloud WebSocket proxy | Register local Codebolt, receive runtime events, forward messages to runtimes, receive connection snapshots. |

Check these details:

| Check | Expected |
|---|---|
| Auth token | A signed-in Codebolt session or configured cloud auth token exists. |
| Workspace | Workspace ID matches the selected workspace. |
| Cloud HTTP URL | Defaults to the Codebolt worker HTTP URL unless overridden. |
| Cloud WebSocket URL | Defaults to the Codebolt worker WebSocket URL unless overridden. |
| Runtime ID | Present after runtime creation or attach. |
| Sync mode | Usually `git` for cloud runtimes. |

If cloud runtime listing works but live updates do not, the HTTP path is working but the WebSocket registration or connection snapshot path is likely failing.

## Debugging path issues

If an environment opens the wrong project path:

1. Check `requestedPath`.
2. Check `resolvedPath`.
3. Check `environmentPath`.
4. Check `workspacePath`.
5. Check `pathSource`.

Interpretation:

| `pathSource` | Meaning |
|---|---|
| `user_override` | A user or request explicitly set the path. |
| `provider_proposed` | The provider or cloud runtime service proposed the path. |
| `existing` | The path came from an existing environment/runtime record. |
| `auto_default` | Codebolt generated a fallback path. |

For child environments, also inspect `parentProjectPath`; child placement may be derived from the parent.

## Debugging UI refresh

The Environments panel updates from:

- An initial `fetchEnvironments()` call.
- WebSocket messages of type `environmentRuntimeSync`.
- WebSocket messages of type `environmentRuntimeStatusUpdate`.
- Document events named `environmentRuntimeUpdate`.
- Manual refresh from connected providers.

If the backend state is correct but the UI looks stale, refresh connected providers or reload the panel. If provider events contain only partial data, the UI falls back to refetching the full environment list.

## Debugging child environments

Child environments should include:

```json
{
  "instanceOrigin": "child_environment",
  "parentRuntimeId": "...",
  "parentEnvironmentId": "...",
  "parentProjectPath": "..."
}
```

If a child appears at the root of the tree instead of under its parent, one of these values is missing or does not match any visible parent environment. Codebolt also uses runtime IDs and normalized paths as fallback parent-resolution keys.

## Debugging runner environments

Runner environments depend on cloudprovider discovering connected runner nodes. If runner environments do not appear:

1. Refresh connected providers.
2. Confirm cloudprovider can list runtimes.
3. Confirm the runner node appears in the cloud runtime list.
4. Check that the runtime/provider ID is shaped like `runner-node:<nodeId>`.
5. Confirm the runner has a base path or project path.

Runner roots only appear in the UI when there are child environments under that runner.

## Useful log signals

Look for messages like:

| Log signal | Meaning |
|---|---|
| `Provider path resolved successfully` | Codebolt found the provider package and entrypoint. |
| `Process spawned successfully` | The provider child process started. |
| `providerStartResponse received` | The provider is ready and the environment can be marked running. |
| `Direct cloud runtime create sending` | Codebolt is creating a cloud runtime directly. |
| `Direct cloud runtime create accepted` | Cloud runtime creation returned a runtime ID. |
| `cloud socket message received` | cloudprovider is receiving WebSocket events. |
| `forward_to_runtime sending` | A local message is being forwarded to a cloud runtime. |
| `providerLazyResponse` | A lazy cloudprovider operation returned. |

## Recovery steps

- For provider startup failures, verify the provider path, package entrypoint, and provider dependencies.
- For cloud failures, verify sign-in, workspace scope, and cloud runtime provider selection.
- For stale cloud lists, use **Refresh environments from connected providers**.
- For stuck local providers, stop and restart the environment.
- For wrong nesting, inspect parent runtime/environment IDs and paths.
- For missing thread replies from cloud runtimes, attach or refresh the thread so cloudprovider subscribes to live thread events.
