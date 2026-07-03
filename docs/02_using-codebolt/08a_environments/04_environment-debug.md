---
sidebar_position: 4
title: Manage and Troubleshoot Environments
description: Use environment status, provider logs, refresh actions, and debug details to fix common environment issues.
---

# Manage and Troubleshoot Environments

When an environment behaves unexpectedly, start with the Environments panel. It shows the state Codebolt currently believes: running, starting, stopped, error, or disconnected.

![Environment Debug](/productImages/environments/environment-debug.png)

> **Image placeholder:** Add an annotated version of the Environment Debug screenshot that labels state, provider, runtime ID, path, sync mode, parent metadata, and logs.

## What to check first

| Check | Why it matters |
|---|---|
| **State** | Shows whether Codebolt thinks the runtime is ready, starting, stopped, or failed. |
| **Provider** | Confirms whether this is local, cloudprovider, a cloud runtime provider, a runner, or custom. |
| **Runtime ID** | Required for cloud, runner, and virtual cloud environments. |
| **Path** | Confirms where the environment is actually running. |
| **Sync mode** | Explains whether changes move through Git, workspace sync, or not at all. |
| **Parent metadata** | Explains why a child environment appears under a parent, or why it does not. |

Most issues can be diagnosed from those fields before reading logs.

## Common tasks

| Task | What to do |
|---|---|
| Check if an environment is usable | Look for `running` state. |
| Refresh cloud or runner data | Use refresh so connected providers send fresh runtime data. |
| Fix a stale connection | Use reconnect if the provider is running but messages are not flowing. |
| Fix a stuck provider | Stop, then start the environment again. |
| Confirm the working folder | Check `requestedPath`, `resolvedPath`, `environmentPath`, and `workspacePath`. |
| Confirm child nesting | Check `parentRuntimeId`, `parentEnvironmentId`, and `parentProjectPath`. |

## Common problems and fixes

> **Image placeholder:** Add a troubleshooting flowchart that starts from the visible state (`starting`, `error`, `disconnected`, or stale UI) and points to the first field or log to inspect.

| Problem | Likely cause | First fix |
|---|---|---|
| Stuck in `starting` | Provider process started but did not report ready. | Open provider debug logs and look for missing `providerStartResponse`. |
| Goes to `error` on start | Provider path, entrypoint, dependency, auth, or cloud API failed. | Check provider logs and verify credentials. |
| Stops immediately | Provider exited before readiness or runtime was inactive. | Restart and inspect the first provider error. |
| Cloud runtimes are missing | Cloudprovider has stale data or cannot list runtimes. | Refresh connected providers and check cloud auth/workspace. |
| Runner environments are missing | Runner node is not visible to cloudprovider. | Confirm the runner is connected and appears as `runner-node:<nodeId>`. |
| Wrong project path | Path was overridden or provider returned a different path. | Inspect path fields and `pathSource`. |
| Child appears at root | Parent metadata does not match a visible parent. | Check parent runtime/environment IDs and parent path. |
| UI looks stale | Backend has newer state than the current panel. | Refresh the environment list or reload the panel. |

## Debug provider startup

When Codebolt starts a normal provider, it creates a debug session and records:

- Provider ID and provider name.
- Environment ID and environment name.
- Provider stdout and stderr.
- Process spawn events.
- Readiness from `providerStartResponse`.
- Provider exit code.
- Final status.

Useful log signals:

| Log signal | Meaning |
|---|---|
| `Provider path resolved successfully` | Codebolt found the provider package and entrypoint. |
| `Process spawned successfully` | The provider child process started. |
| `providerStartResponse received` | The provider is ready and the environment can run work. |
| `Provider process exited` | The provider stopped or crashed. |

If startup hangs, the provider likely connected but never completed the readiness handshake, or it never connected back to Codebolt.

## Debug cloudprovider

Cloudprovider uses two paths:

| Path | Used for |
|---|---|
| Cloud HTTP API | Create, list, stop, and restart runtimes; list threads; load thread messages. |
| Cloud WebSocket proxy | Register local Codebolt, receive runtime events, forward messages, and receive connection snapshots. |

Check:

- You are signed in or have a cloud auth token.
- Workspace ID and workspace type match the selected workspace.
- Cloud HTTP and WebSocket URLs are configured or using defaults.
- The environment has a runtime ID after creation.
- Sync mode is correct, usually `git` for cloud runtimes.

If listing works but live updates do not, HTTP is probably working and the WebSocket registration or connection snapshot path is the issue.

## Debug path issues

Path fields explain where Codebolt thinks the runtime lives.

| Field | Meaning |
|---|---|
| `requestedPath` | Path requested by the user or provider. |
| `resolvedPath` | Path Codebolt resolved after applying defaults. |
| `environmentPath` | Working path used by the environment. |
| `workspacePath` | Workspace path used by UI and provider integrations. |
| `pathSource` | Whether the path came from the user, provider, existing runtime, or fallback. |

Common `pathSource` values:

| Value | Meaning |
|---|---|
| `user_override` | A user or request explicitly set the path. |
| `provider_proposed` | The provider or cloud service proposed it. |
| `existing` | It came from an existing environment/runtime record. |
| `auto_default` | Codebolt generated a fallback path. |

For child environments, also check `parentProjectPath`; Codebolt may use it to place or group the child.

## Debug child environments

Child environments should include:

```json
{
  "instanceOrigin": "child_environment",
  "parentRuntimeId": "...",
  "parentEnvironmentId": "...",
  "parentProjectPath": "..."
}
```

The UI uses those values, plus runtime IDs and normalized paths, to place the child under its parent.

## Debug runner environments

Runner environments depend on cloudprovider discovering connected runner nodes.

If runner environments do not appear:

1. Refresh connected providers.
2. Confirm cloudprovider can list runtimes.
3. Confirm the runner appears in the runtime list.
4. Check that the provider ID is shaped like `runner-node:<nodeId>`.
5. Confirm the runner has path metadata for created child work.

Runner roots usually appear only when there are child environments under that runner.

## Recovery checklist

- Restart the environment if state is stale or stuck.
- Refresh connected providers if cloud or runner data is stale.
- Verify provider path, package entrypoint, and dependencies for provider startup failures.
- Verify sign-in, cloud workspace, and credentials for cloud failures.
- Inspect parent IDs and paths if nesting is wrong.
- Attach or refresh the cloud thread if messages from a cloud runtime are missing.
