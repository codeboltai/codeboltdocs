---
sidebar_position: 7
title: Cloud Scaling
description: "How Codebolt scales through cloud environments, providers, runtime registration, remote chat, workspace scope, and marketplace distribution."
---

# Cloud Scaling

Cloud scaling moves selected parts of Codebolt from one local workspace into shared, hosted, or remotely accessible infrastructure. The server package still runs as a standalone HTTP/WebSocket server, but it can be scoped to a cloud workspace, synchronize environment providers, and register itself with Cloud as a runtime gateway.

The goal is not to make every workflow cloud-only. The goal is to decide which environments should run locally, which should run in managed cloud sandboxes, and which should be reachable by a team, a customer-facing app, or long-running automation.

## Environment is the scaling unit

Cloud scaling is built on the environment model. An **environment** is Codebolt's saved handle for an execution context. It stores the provider, runtime identity, project path, workspace scope, sync mode, merge strategy, lifecycle state, and metadata needed to reconnect or stop work later.

The split is:

| Concept | Cloud scaling meaning |
|---|---|
| Environment | The Codebolt record shown in the Environments panel. It tracks what should run, where it runs, and how it is synchronized. |
| Provider | The adapter that creates, attaches to, starts, stops, and communicates with the environment runtime. |
| Runtime | The actual execution target: a local server, cloud sandbox, runner node, or child environment. |

That means Cloud Scaling is not just "remote chat." Remote chat attaches to an environment-backed runtime. Provider sync discovers or creates cloud environments. Runtime registration makes a specific environment reachable from Cloud.

## What cloud changes

| Local-first concern | Cloud-scale version |
|---|---|
| One user's local server | An environment-backed runtime that can register with Cloud and receive remote messages |
| Personal workspace | Personal or team cloud workspace scope |
| Local provider config | Cloudprovider-owned runtime/provider discovery and sync |
| Local thread access | Remote chat forwarded through the runtime connector |
| Manual setup | Environment metadata: project path, environment path, git refs, sync mode, merge strategy |
| Personal extensions | Published agents, plugins, skills, capabilities, and marketplace flows |
| Local debugging | Runtime registration, event logs, debug sockets, and cloud-visible run history |

## Workspace scope

The server can be started with a cloud workspace scope. A workspace may be personal or team-scoped. In server configuration this appears as a `cloudWorkspace` with a `team` or `workspaceId`, and the server exposes a cloud workspace route that can switch between personal and team mode and restart the cloud plugin when needed.

That workspace scope matters because cloud sync is limited to the selected workspace. It prevents one local runtime from accidentally advertising itself into the wrong team.

## Runtime registration and remote chat

When the runtime connector environment variables are present, the server opens an outbound WebSocket to Cloud and registers itself as a gateway. The connector sends runtime metadata such as:

- runtime ID and app token
- workspace ID and workspace type
- runtime type and provider ID
- project path, project name, and environment path
- git remote, branch, base/head refs, and PR metadata when available
- sync mode and merge strategy
- runner node or sandbox identity when available

Cloud messages are normalized into the same local `/chat` WebSocket payload shape used by the CLI prompt path. Agent responses from the local chat socket are forwarded back to Cloud. A Cloud `runtime.stopRequest` can ask the runtime to acknowledge and shut down.

This means remote chat is a bridge into a running Codebolt server. It is not a separate agent implementation.

## Cloud environment types

Cloud-visible work can appear as different environment origins:

| Environment origin | What it means |
|---|---|
| `cloud_started` | A cloud sandbox or cloud runtime created through Codebolt Cloud. |
| `runner_started` | A runtime hosted on a user runner node connected to Codebolt Cloud. |
| `manual_started` | A local or self-started runtime that registered itself with Cloud. |
| `child_environment` | A nested environment created under a parent runtime for isolated sub-work. |

The Environments panel groups these into local, cloud sandboxed, self-started, and runner-backed sections. Those groups matter because they tell users where execution is happening and which provider owns lifecycle operations.

## Hosted runtimes

Hosted runtimes are useful when agents need to run:

- for a long time
- on a schedule
- from external events
- with shared team access
- in a controlled environment
- close to cloud-hosted data or APIs

Hosted runtimes should still use the same concepts: agents, tools, guardrails, memory, event logs, providers, and environments. The cloud runtime is the execution target, but the environment record is what lets Codebolt show it, route messages to it, track status, synchronize files, and stop it.

## Cloudprovider-owned runtime discovery

The current server delegates cloud runtime provider discovery and runtime sync to the `cloudprovider`. The local environment routes still own local and runner environment operations, but direct cloud runtime discovery returns `410` because that ownership moved out of the generic server route.

The server can start or reconnect the cloudprovider automatically through `startCloudProviderAutoSync()`. Provider lazy requests use the active provider connection, and if the default `cloudprovider` is missing the server tries to start the auto sync path before failing.

In practice:

- use local environment APIs for local and runner providers
- use the cloudprovider path for cloud runtime lists, schemas, and synchronization
- treat cloud runtimes as provider-managed environments rather than records the generic server invents itself

## Marketplace and distribution

Cloud scaling also includes distribution. Agents, plugins, and capabilities can move from personal customization to team or marketplace artifacts.

This changes the operational bar. Shared artifacts need clearer names, versions, permissions, documentation, and rollback paths.

## Cloud architecture questions

Before moving a workflow to cloud, decide:

- What data must stay local?
- Which tools need network or credential access?
- Who can start, stop, approve, or inspect runs?
- Which model providers are allowed?
- What guardrails are mandatory?
- How are logs, events, and memory retained?
- What needs to be packaged for reuse?
- Which workspace should own the runtime: personal or team?
- Which environment should the thread attach to?
- Which provider owns runtime lifecycle and sync?
- How should code changes return: direct sync, review merge request, external PR, or manual handoff?

## What stays local

Even when a runtime is visible from Cloud, the environment still describes where execution happens and which provider owns it. For local and self-started runtimes, the local server still owns the active project path, local tools, local PTYs, local plugin startup, and local database/filesystem state. Cloud gives you reachability, workspace scoping, provider sync, and distribution; it does not remove the need to reason about the environment's permissions and project state.

## See also

- [Cloud](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)
- [Environments](../../02_using-codebolt/08a_environments/01_overview.md)
- [Environment providers](../../02_using-codebolt/08a_environments/03_environment-providers.md)
- [Remote chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)
- [Runtimes and providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)
- [Marketplace publishing](../../02_using-codebolt/02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md)
- [Local Scaling](./06_local-scaling.md)
