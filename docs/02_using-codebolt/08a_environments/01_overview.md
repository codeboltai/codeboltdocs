---
sidebar_position: 1
title: What are Environments?
description: "Environments are where Codebolt and agents do work: local projects, worktrees, cloud sandboxes, runners, or child workspaces."
---

# What are Environments?

An **environment** is where Codebolt does work for a project. When you ask an agent to read files, run commands, make changes, or test something, Codebolt needs to know which workspace or runtime the work should happen in. That target is the environment.

The simple model is:

| Concept | Plain meaning |
|---|---|
| **Agent** | Who does the work. |
| **Environment** | Where the work runs. |
| **Provider** | How Codebolt creates, connects to, starts, stops, and talks to that place. |



For example, the same agent can work in your local project, in a separate local worktree, in a cloud sandbox, or on a runner machine. The environment tells Codebolt which one to use.

```text
Your message
  -> Agent: who works on it
  -> Environment: where the work happens
  -> Provider: how Codebolt connects to that place
```

## Why environments exist

Environments give you control over where work happens and how isolated it is.

Use environments when you want to:

- Keep experimental changes away from your main project folder.
- Run work in a clean cloud sandbox.
- Use a runner machine that has special tools, credentials, or hardware.
- Let multiple agents work in separate workspaces at the same time.
- Create child environments for subtasks without losing the parent project context.
- Track runtime status, paths, sync mode, and provider logs in one place.

Without environments, every agent action would have to run in the same local workspace. That is simple, but it becomes risky when you want parallel work, isolated changes, or remote execution.

## Which environment should I use?

| Use case | Environment to choose |
|---|---|
| Work directly on the open project | **Local** environment |
| Try changes without touching the main folder | **Local worktree** or **child** environment |
| Run in a clean remote sandbox | **Cloud sandbox** environment |
| Use your own remote machine or infrastructure | **Runner** environment |
| Split a larger task into isolated follow-up work | **Child** environment under the parent runtime |

If you are not sure, start with the local environment. Move to a cloud, runner, or child environment when you need isolation or remote execution.

## Common environment types

| Type | What it means |
|---|---|
| **Local** | Work happens in the active project on your machine. |
| **Local worktree** | Codebolt creates a separate local path for isolated work. |
| **Cloud sandbox** | Codebolt starts or connects to a remote runtime through Codebolt Cloud. |
| **Runner** | Work runs on a user-connected runner node. |
| **Child environment** | Work runs under an existing parent environment, usually for a subtask or isolated branch of work. |

The Environments panel groups these types into a tree so you can see parent and child relationships.

## What an environment remembers

Codebolt stores an environment record for each created or discovered environment. This record lets Codebolt reconnect to it, show it in the UI, and route agent work correctly.

An environment remembers:

- Its name and current state.
- Which provider controls it.
- The project or workspace path.
- Whether it is local, cloud, runner-backed, or child-owned.
- How project files are synced.
- Runtime IDs used by cloud or runner systems.
- Parent environment metadata, if it is a child environment.

Most users do not need to edit these fields manually. They are useful when debugging or when building custom providers.

## How creation works

At a high level:

> **Image placeholder:** Add a creation-flow diagram or annotated UI screenshot showing **New Environment**, provider selection, path/sync defaults, save, provider start, and running status.

1. You choose **New Environment**.
2. You select a provider.
3. Codebolt asks the provider or cloud service for defaults, such as a path and sync mode.
4. Codebolt saves the environment record.
5. Codebolt starts the provider or remote runtime.
6. The provider reports back when the runtime is ready.
7. The Environments panel updates with the current state.

```text
Create environment
  -> choose provider
  -> resolve path and sync settings
  -> save environment record
  -> start provider or runtime
  -> show status in the UI
```

## Lifecycle states

The Environments panel shows whether an environment is ready or needs attention.

| State | Meaning |
|---|---|
| `created` | The environment record exists but is not running yet. |
| `starting` | Codebolt is starting the provider or runtime. |
| `running` | The environment is active and ready. |
| `stopping` | Codebolt is shutting it down. |
| `stopped` | The environment is not active. |
| `restarting` | Codebolt is stopping and starting it again. |
| `error` | Startup, provider, cloud, or health check failed. |
| `disconnected` | Codebolt has metadata, but the active connection is gone. |
| `not_available` | The runtime is not available in the current project, workspace, or provider state. |

## Advanced details

Internally, Codebolt classifies environments by origin:

| Origin | Meaning |
|---|---|
| `manual_started` | Created directly by the user. |
| `cloud_started` | Started through Codebolt Cloud. |
| `runner_started` | Backed by a connected runner node. |
| `child_environment` | Created under a parent runtime or environment. |

Codebolt also tracks sync and merge mode:

| Mode | Meaning |
|---|---|
| `none` | No automatic sync behavior. |
| `git` | Project state moves through Git. Common for cloud runtimes. |
| `workspace_sync` | Workspace state is synchronized directly. |

Path fields such as `requestedPath`, `resolvedPath`, `environmentPath`, and `workspacePath` explain where the environment actually runs. You usually only need these when troubleshooting path or nesting issues.

## See also

- [Create and Manage Environments](./02_configuring-environments.md)
- [Environment Providers](./03_environment-providers.md)
- [Manage and Troubleshoot Environments](./04_environment-debug.md)
- [Cloud runtimes and providers](../02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)
