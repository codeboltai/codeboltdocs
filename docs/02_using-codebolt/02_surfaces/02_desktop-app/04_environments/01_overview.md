---
sidebar_position: 1
sidebar_label: Overview
title: Environments Overview
description: Environments in the Desktop App are saved execution contexts for local, cloud, runner, and child runtimes.
---

# Environments

In the Desktop App, an **environment** is the execution context shown in the Environments panel. It is not just a language runtime such as Node or Python. It is Codebolt's saved handle for where work runs, which provider controls that runtime, which project path is active, how changes are synced, and what lifecycle state the runtime is in.

The core model is:

| Concept | Meaning |
|---|---|
| **Environment** | The row/tree item you see in the Desktop App. It stores provider, launch config, runtime IDs, paths, state, and parent metadata. |
| **Provider** | The adapter that creates, attaches to, starts, stops, and communicates with the runtime. |
| **Runtime** | The actual place where work runs: local project, worktree, cloud sandbox, runner node, or child environment. |

## In this section

- [Managing Environments](./02_environments.md) - Desktop App environment panel, lifecycle, cloudprovider, sync modes, and debugging.

## Full environment reference

The broader Using Codebolt environment docs cover the same system in more detail:

- [Environments](../../../08a_environments/01_overview.md)
- [Configuring Environments](../../../08a_environments/02_configuring-environments.md)
- [Environment Providers](../../../08a_environments/03_environment-providers.md)
- [Environment Debug](../../../08a_environments/04_environment-debug.md)
- [Cloud runtimes and providers](../../../08f_cloud/04_runtimes-and-providers.md)
