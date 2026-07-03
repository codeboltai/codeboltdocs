---
sidebar_position: 2
title: Create and Manage Environments
description: Create, start, stop, reconnect, refresh, and organize Codebolt environments from the Environments panel.
---

# Create and Manage Environments

Use the **Environments** panel to choose where Codebolt and agents run work. The panel shows local environments, cloud sandboxes, runner-backed environments, and child environments in one tree.

![Environments panel showing local and cloud environments](/productImages/environments/environment-list.png)

## Before you create an environment

Decide four things:

| Decision | What to choose |
|---|---|
| **Name** | A human-readable name, such as `feature-checkout-flow` or `cloud-test-run`. |
| **Provider** | The adapter Codebolt should use: local, cloud, runner, or a custom provider. |
| **Path** | Where the workspace should live. You can use the proposed path or override it. |
| **Sync mode** | Usually `none` for simple local work and `git` for cloud runtimes. |

If you are creating an environment under another environment, also choose the parent. Codebolt uses the parent runtime and path to keep the child environment nested correctly.

## Create an environment

![Create New Environment form with provider selection](/productImages/environments/create-environment.png)

1. Open the **Environments** panel.
2. Select **New Environment**.
3. Enter a name.
4. Choose a provider.
5. Fill in the provider-specific fields.
6. Review the proposed path.
7. Choose the sync mode if the provider allows it.
8. Save the environment.

After you save, Codebolt validates the provider, merges provider defaults with your choices, stores the environment, and usually starts it automatically.

## Create from the chat window

You can also open the environment selector from the chat window. This is useful when you want to switch the active environment for a chat, add a cloud environment, or add a child environment without leaving the conversation.

![Environment selector in the chat window](/productImages/environments/create-env-from-chat-window.png)

## Choose a provider

The provider controls what kind of runtime Codebolt creates or connects to.

| Provider choice | What happens |
|---|---|
| **Local provider** | Codebolt works against a local path or local worktree. |
| **Cloud runtime provider** | Codebolt starts a cloud sandbox through `cloudprovider`. |
| **Runner provider** | Codebolt sends work to a connected runner node. |
| **Existing cloud runtime** | Codebolt shows an available cloud runtime and hydrates details when needed. |
| **Custom provider** | Codebolt starts a provider package installed for the project or app. |

Cloud runtime provider IDs can include `e2b-remote`, `sprites-remote`, `runloop-remote`, `modal-remote`, and `daytona-remote`. Runner providers use IDs shaped like `runner-node:<nodeId>`.

## Understand the proposed path

When possible, Codebolt proposes a path before creating the environment.

For local worktree-style environments, the path is usually under the active project:

```text
<project>/.codebolt/worktree/<environment-name>
<project>/.codebolt/environments/<environment-name>
```

For cloud environments, Codebolt asks the cloud runtime service for a path. If the cloud service cannot answer, Codebolt falls back to a path like:

```text
/home/user/<project-or-environment-name>
```

If you type a custom path, Codebolt treats it as a user override.

## Start, stop, and reconnect

Use the environment actions from the panel.

> **Image placeholder:** Add a screenshot of the environment action menu showing Start, Stop, Restart, Reconnect, Refresh, and Delete.

| Action | Use it when | What Codebolt does |
|---|---|---|
| **Start** | The environment is stopped and you want to use it. | Starts the provider process or remote runtime. |
| **Stop** | You are done with the environment. | Sends a graceful stop request, then cleans up the provider/runtime connection. |
| **Restart** | The environment is stuck or stale. | Stops and starts it again. |
| **Reconnect** | The provider is running but the connection is stale. | Sends a reconnect request without recreating the whole environment. |
| **Refresh** | Cloud or runner lists look stale. | Asks connected providers to send fresh runtime data. |
| **Delete** | You no longer need the environment record. | Stops the provider first, then removes the record. |

For a normal local provider, starting means launching the provider process. For a cloud-backed environment, starting usually means sending a runtime request through `cloudprovider`.

## Create a child environment

A child environment is useful when you want isolated work under a parent runtime.

Use a child environment when:

- A cloud or runner task needs a separate workspace.
- You want one parent runtime to coordinate several pieces of work.
- You want the UI to show sub-work under the environment that created it.

Child environments store parent metadata so Codebolt can nest them:

- `parentRuntimeId`
- `parentEnvironmentId`
- `parentProjectPath`

If a child appears at the root of the tree, one of those values may be missing or not matching the visible parent.

## Cloud workspace scope

Cloud environments use your signed-in Codebolt session or configured cloud auth token. Codebolt also checks workspace scope so runtimes from one workspace do not leak into another.

Workspace IDs are normalized like this:

| Input | Meaning |
|---|---|
| `team:<id>` | Team workspace |
| `<id>` | Team workspace, normalized to `team:<id>` |
| no workspace | Personal workspace derived from the auth token |

If a request targets a different workspace than the selected workspace, Codebolt rejects the sync.

## Live updates

The Environments panel stays updated from:

- An initial environment list fetch.
- Provider runtime sync events.
- Runtime status update events.
- Manual refresh from connected providers.

If the panel looks stale, use refresh first. If the backend has only partial event data, the UI refetches the full environment list.

## Reference: important config fields

You may see these fields in debug panels, logs, or provider payloads:

| Field | Purpose |
|---|---|
| `providerId` | Local provider Codebolt uses. Cloud runtime environments usually use `cloudprovider`. |
| `runtimeProviderId` | Actual cloud backend, such as `e2b-remote` or `runloop-remote`. |
| `runtimeId` / `cloudRuntimeId` | Runtime identity returned by cloud or runner systems. |
| `runtimeType` | Runtime category, such as `cloud` or `runner`. |
| `requestedPath` | Path requested by the user or provider. |
| `resolvedPath` | Path Codebolt resolved after defaults/provider logic. |
| `environmentPath` / `workspacePath` | Working path used by providers and UI. |
| `instanceOrigin` | Whether the environment is manual, cloud, runner, or child. |
| `syncMode` | `none`, `git`, or `workspace_sync`. |
| `mergeStrategy` | How changes should be merged back. Usually follows `syncMode`. |
