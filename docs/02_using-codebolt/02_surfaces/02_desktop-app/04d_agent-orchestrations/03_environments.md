---
sidebar_position: 3
sidebar_label: Environments
title: Environments
description: Use the Desktop App Environments panel to manage local, cloud, runner, and child execution contexts.
---

# Environments

The Desktop App **Environments** panel shows local environments, cloud runtimes, runner-backed environments, and child environments in one tree.

An environment tells Codebolt:

- where work should run
- which provider controls the runtime
- which lifecycle state the runtime is in
- which project or workspace path is attached
- whether it belongs under a parent environment

## Environment tree

The panel groups environments into sections:

| Section | Contains |
|---|---|
| **Local** | The default local project plus local child/worktree environments. |
| **Cloud Sandboxed Environments** | Cloud runtimes started through cloud runtime providers. |
| **Self Started Environments** | Existing runtimes Codebolt attached to or discovered. |
| **User Runner Environments** | Child environments running under connected runner nodes. |

Child environments appear under their parent when the app can match parent environment, runtime, or path metadata.

## Environment state

Each environment row shows its current state. Common states include:

| State | Meaning |
|---|---|
| `created` | The environment record exists but is not running yet. |
| `starting` | Codebolt is starting or connecting to the runtime. |
| `running` | The runtime is available. |
| `stopping` | Codebolt is stopping the runtime. |
| `stopped` | The runtime is stopped. |
| `restarting` | Codebolt is cycling the runtime. |
| `error` | The runtime or provider failed. |
| `disconnected` | The runtime is no longer connected. |
| `archived` | The environment is archived. |

## Creating an environment

Click **Add** in the Environments panel to create an environment. The create dialog lets you choose a provider or runtime option, name the environment, and provide the required configuration.



Cloud runtime options can include providers such as E2B, Modal, Sprites, Runloop, Daytona, or custom providers, depending on what is available in your app configuration.

## Start, stop, and restart

The Environments panel exposes lifecycle actions for an environment:

| Action | Use it when |
|---|---|
| **Start** | The environment exists but is not running. |
| **Stop** | You want to stop a running runtime. |
| **Restart** | You want to cycle the runtime and refresh its state. |
| **Refresh** | You want the panel to refetch environment and provider state. |
| **Archive** | You no longer want the environment in the active workflow list. |

## Environment details

Select an environment to inspect its details. The detail panel can show information about the environment, changed files, tasks, and file update intent, depending on the environment type and available data.

## Chat environment mode

The panel includes a **Chat Environment Mode** selector. Use it to choose how chat should relate to environments when environment-aware chat behavior is enabled.

## Debugging environments

When an environment does not behave as expected, inspect the fields visible in the Environments panel and detail view:

| Check | Why it matters |
|---|---|
| State | Shows whether Codebolt is starting, running, stopped, or failed. |
| Provider | Confirms local provider, cloudprovider, runtime provider, or runner node. |
| Runtime ID | Required for cloud and runner environments. |
| Runtime provider | Shows the actual cloud or runner backend when available. |
| Paths | Confirms the project or workspace path being used. |
| Parent metadata | Explains nesting and child environment routing. |

Common failure patterns:

| Symptom | Likely cause |
|---|---|
| Stuck on `starting` | The provider or remote runtime has not finished connecting. |
| Immediate `error` | Provider configuration, authentication, or runtime creation failed. |
| Child environment appears at root | Parent metadata or path matching did not resolve. |
| Runner environments missing | Runner discovery failed or no child environments are available under the runner. |

## Related docs

- [Proxy Execution](./01_proxy-execution.md)
- [Routing Gateway](./02_routing-gateway.md)
- [Full Environments reference](../../08a_environments/01_overview.md)
- [Configuring Environments](../../08a_environments/02_configuring-environments.md)
- [Environment Providers](../../08a_environments/03_environment-providers.md)
- [Environment Debug](../../08a_environments/04_environment-debug.md)
- [Cloud runtimes and providers](../../06_cloud/04_running-agents/04_runtimes-and-providers.md)
