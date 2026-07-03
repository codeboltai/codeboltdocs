---
sidebar_position: 3
title: Environment Providers
description: Providers are the adapters that let Codebolt create, connect to, start, stop, and communicate with environment runtimes.
---

# Environment Providers

An **environment provider** is the adapter that knows how to connect Codebolt to a place where work can run.

The environment is the saved record you see in the UI. The runtime is the actual place where work happens. The provider is the bridge between them.

```text
Environment record
  -> Provider
  -> Runtime
```

> **Image placeholder:** Add a provider-relationship diagram that labels the saved environment record, provider adapter, and runtime, with examples such as local, cloudprovider, runner, and custom provider.

## What providers do

A provider can:

- Create a new runtime or attach to an existing one.
- Tell Codebolt which path the runtime should use.
- Start and stop the runtime.
- Forward agent messages into the runtime.
- Send logs, status, file changes, and runtime events back to Codebolt.
- Report when the environment is ready.

Codebolt remains the control plane. It stores the environment record, tracks lifecycle state, updates the UI, and routes messages.

## Provider types

| Provider type | User-facing meaning |
|---|---|
| **Local provider** | Runs work on your machine, usually in the active project or a local worktree. |
| **Cloudprovider** | Built-in bridge between local Codebolt and Codebolt Cloud runtimes. |
| **Cloud runtime provider** | A cloud backend such as `e2b-remote`, `sprites-remote`, or `runloop-remote`. |
| **Runner provider** | A connected runner node that can execute work on infrastructure you control. |
| **Custom provider** | A provider package installed for your project or app. |

When you choose a cloud runtime provider, Codebolt still uses `cloudprovider` locally. The selected runtime provider is stored as `runtimeProviderId`.

Example:

```json
{
  "providerId": "cloudprovider",
  "runtimeProviderId": "e2b-remote",
  "runtimeType": "cloud",
  "syncMode": "git"
}
```

## How providers appear in the UI

Providers can be discovered from:

- Built-in provider folders.
- Project provider folders.
- Installed provider packages.
- Cloud runtime and runner data returned by `cloudprovider`.
- Portal settings, when cloud runtime credentials are configured.

If a provider defines a creation schema, Codebolt uses it to render provider-specific fields in the **New Environment** form.

For example, `cloudprovider` exposes fields for workspace ID, workspace type, runtime provider, and optional existing runtime ID.

## Choosing the right provider

| Goal | Provider to use |
|---|---|
| Work in the current project | Local provider |
| Create an isolated local workspace | Local worktree provider |
| Run in a clean cloud sandbox | Cloud runtime provider |
| Run on your own connected machine | Runner provider |
| Integrate a new runtime system | Custom provider |

If a provider requires credentials, configure those credentials before creating the environment. Otherwise the environment may be created but fail during startup.

## The built-in cloudprovider

`cloudprovider` is special. It is a local bridge that talks to Codebolt Cloud over HTTP and WebSocket.

It is used for:

- Listing cloud runtimes.
- Creating cloud sandboxes.
- Stopping and restarting cloud runtimes.
- Discovering runner nodes.
- Syncing runtime status back to the Environments panel.
- Attaching to cloud threads and forwarding messages.

Cloudprovider uses cloud HTTP APIs for create/list/stop operations and a cloud WebSocket connection for live events.

```text
Codebolt
  -> cloudprovider
  -> Codebolt Cloud
  -> cloud sandbox or runner
```

> **Image placeholder:** Add a cloudprovider flow diagram showing Codebolt on the local machine, cloudprovider as the bridge, Codebolt Cloud APIs/WebSocket, and the resulting cloud sandbox or runner runtime.

## Runner providers

Runner providers are created from connected runner nodes. They use IDs like:

```text
runner-node:<nodeId>
```

When you create work on a runner, Codebolt records it as a runner-started environment and groups child work under **User Runner Environments**.

## Advanced: provider metadata

Providers are described by `providers.yaml` or `codeboltprovider.yaml`.

Common metadata fields are:

| Field | Purpose |
|---|---|
| `name` / `unique_id` | Provider identity. |
| `entrypoint` | JavaScript file Codebolt starts for the provider. |
| `runtime` | Runtime used to execute the provider package, usually `node`. |
| `capabilities` | Optional features such as lazy runtimes, remote directory, or thread attach. |
| `config` | Provider-level defaults. |
| `createConfigSchema` | UI schema for environment creation fields. |
| `syncPolicy` | Supported sync modes and defaults. |

When Codebolt starts a provider, it merges configuration in this order:

1. Provider YAML defaults.
2. Installed provider configuration.
3. Environment-specific configuration.

The merged result is passed to the provider as `ENVIRONMENT_CONFIG`.

## Advanced: provider lifecycle

For a normal provider-backed environment, Codebolt:

1. Resolves the provider path.
2. Reads provider metadata and entrypoint.
3. Starts the provider process.
4. Sends a `providerStart` message.
5. Waits for `providerStartResponse`.
6. Marks the environment as `running`.

Common provider messages include:

| Message | Purpose |
|---|---|
| `providerStart` / `providerStartResponse` | Startup handshake and readiness signal. |
| `providerStop` / `providerStopResponse` | Graceful shutdown. |
| `providerAgentStart` | Send a user or agent message into the environment. |
| `providerLazyRequest` / `providerLazyResponse` | On-demand cloud/runtime/thread operations. |
| `providerCreateEnvironment` / `providerCreateEnvironmentResponse` | Create a child environment under a remote parent. |
| `providerReadFile` / `providerWriteFile` | Remote filesystem operations. |
| `providerGetDiffFiles`, `providerMergeAsPatch`, `providerSendPR` | Review, merge, and pull request workflows. |

Custom providers should implement only the operations their runtime supports, but they must connect back to Codebolt and send `providerStartResponse` when ready.
