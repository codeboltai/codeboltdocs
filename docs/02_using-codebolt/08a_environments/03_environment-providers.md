---
sidebar_position: 3
title: Environment Providers
description: Providers are the adapters that create, attach to, start, stop, and communicate with environment runtimes.
---

# Environment Providers

An **environment provider** is the adapter between Codebolt and the place where work actually runs. Codebolt owns the environment record and lifecycle state; the provider owns the runtime-specific details.

Providers can be local packages, installed provider packages, or built-in providers such as `cloudprovider`.

## Provider responsibilities

A provider is responsible for:

- Creating or attaching to the runtime.
- Returning runtime identity and path metadata.
- Starting and stopping the runtime or bridge process.
- Forwarding agent messages into the runtime.
- Forwarding logs, status, file operations, thread events, and runtime events back to Codebolt.
- Reporting provider readiness with `providerStartResponse`.

Codebolt stays the control plane. It stores environment records, tracks lifecycle state, drives UI updates, and routes provider messages.

## Provider metadata

Providers are described by `providers.yaml` or `codeboltprovider.yaml`. A provider can declare:

| Field | Purpose |
|---|---|
| `name` / `unique_id` | Provider identity. |
| `entrypoint` | JavaScript file Codebolt starts for the provider. |
| `runtime` | Runtime used to execute the provider package, usually `node`. |
| `capabilities` | Optional provider features such as lazy runtimes, remote directory, thread attach, or cloud control. |
| `config` | Provider-level defaults. |
| `createConfigSchema` | UI schema for environment creation fields. |
| `syncPolicy` | Supported sync modes and defaults. |

When starting a provider, Codebolt merges configuration in this order:

1. Provider YAML defaults.
2. Installed-provider configuration.
3. Environment-specific configuration.

The merged result is passed to the provider as `ENVIRONMENT_CONFIG`.

## Local provider process lifecycle

For a normal provider-backed environment, Codebolt:

1. Resolves the provider path.
2. Reads provider metadata and entrypoint.
3. Builds a clean process environment.
4. Adds identifiers such as `environmentId`, `providerId`, and `ENVIRONMENT_CONFIG`.
5. Starts the provider child process.
6. Captures stdout and stderr for provider debug.
7. Waits for `providerStartResponse`.
8. Marks the environment `running`.

If the provider exits before it becomes ready, startup fails and the lifecycle state becomes `error` or `stopped` depending on the failure path.

## Provider messages

Provider communication is WebSocket/message based. Common message families include:

| Message | Purpose |
|---|---|
| `providerStart` / `providerStartResponse` | Start handshake and readiness signal. |
| `providerStop` / `providerStopResponse` | Graceful shutdown. |
| `providerAgentStart` | Send a user/agent message into the environment runtime. |
| `providerLazyRequest` / `providerLazyResponse` | On-demand runtime, environment, and thread operations. |
| `providerCreateEnvironment` / `providerCreateEnvironmentResponse` | Create a child environment under a remote parent. |
| `providerReadFile`, `providerWriteFile`, `providerGetTreeChildren` | Remote filesystem operations. |
| `providerGetDiffFiles`, `providerMergeAsPatch`, `providerSendPR` | Review, merge, and PR workflows. |

## The built-in cloudprovider

`cloudprovider` is a special provider that bridges local Codebolt to Codebolt Cloud runtimes.

It declares capabilities for:

- Lazy runtime listing and hydration.
- Lazy environment listing.
- Lazy thread listing and messages.
- Remote directory operations.
- Thread attach.
- Cloud runtime control.

Its defaults include:

| Setting | Default |
|---|---|
| `cloudHttpUrl` | `https://codebolt-wrangler-ws.arrowai.workers.dev` |
| `cloudWsUrl` | `wss://codebolt-wrangler-ws.arrowai.workers.dev` |
| `workspaceType` | `personal` |
| `runtimeProviderId` | `e2b-remote` |
| `defaultSyncMode` | `git` |

The provider exposes creation fields for workspace ID, workspace type, runtime provider, and optional existing runtime ID.

## How cloudprovider works

On start, `cloudprovider`:

1. Reads `ENVIRONMENT_CONFIG`.
2. Resolves the Codebolt auth token.
3. If `syncOnly` is enabled, starts only the cloud sync bridge.
4. If no runtime ID exists, creates a runtime through the cloud HTTP API.
5. If a runtime ID exists, attaches to that runtime.
6. Opens a WebSocket to the cloud worker proxy.
7. Registers as the local app bridge.
8. Requests a connections snapshot.
9. Forwards runtime, thread, and status events back into Codebolt.

```text
Codebolt server
  -> cloudprovider process
  -> Cloud HTTP API for create/list/stop
  -> Cloud WebSocket proxy for live events and forwarding
  -> Remote runtime
```

## Cloud runtime operations

`cloudprovider` handles lazy actions:

| Action | What it does |
|---|---|
| `listRuntimes` | Lists cloud runtimes and runner nodes. |
| `getRuntime` | Hydrates a specific runtime from the cloud directory. |
| `startRuntime` / `createRuntime` | Creates a new cloud runtime. |
| `stopRuntime` | Stops a cloud runtime. |
| `restartRuntime` | Stops and recreates a runtime. |
| `listEnvironments` | Returns cached cloud environment rows from connection snapshots. |
| `listThreads` | Lists cloud threads. |
| `getThreadMessages` | Loads messages for a cloud thread. |
| `attachThread` | Subscribes local Codebolt to live thread events. |
| `sendThreadMessage` | Sends a message to a cloud runtime thread. |

## Cloud runtime providers

When the user chooses a cloud runtime provider such as `e2b-remote`, Codebolt normalizes the environment so the local provider becomes `cloudprovider`, while the actual runtime provider remains in `runtimeProviderId`.

Example:

```json
{
  "providerId": "cloudprovider",
  "runtimeProviderId": "e2b-remote",
  "runtimeType": "cloud",
  "syncMode": "git"
}
```

This lets Codebolt use one local bridge for multiple cloud runtime backends.

## Runner providers

Runner nodes are discovered through the cloudprovider runtime list. They appear as providers with IDs like:

```text
runner-node:<nodeId>
```

When you create an environment with a runner provider, Codebolt records `instanceOrigin: runner_started`, stores node metadata, and groups resulting child environments under **User Runner Environments** in the UI.

## Virtual cloud environments

Codebolt can display cloud runtimes that were not originally saved as local environment records. These are **virtual cloud environments**.

They use IDs shaped like:

```text
cloud:<runtimeId>
```

They are hydrated on demand through `cloudprovider` lazy requests. This lets the UI show currently available cloud runtimes without requiring every runtime to be pre-saved in the local environment file.

## Stopping providers

For normal providers, Codebolt sends `providerStop`, waits for a response, sends `SIGTERM`, and force-kills after a short timeout if needed.

For virtual cloud environments, Codebolt asks `cloudprovider` to stop the runtime. For cloud-backed environments, runtime stop is routed through cloudprovider or the cloud API depending on the environment shape.

## Building custom providers

A custom provider should implement the lifecycle and message contract that Codebolt expects:

- Accept `ENVIRONMENT_CONFIG`.
- Connect back to the Codebolt server.
- Respond to `providerStart`.
- Emit `providerStartResponse` when ready.
- Handle `providerStop`.
- Implement file, diff, merge, and agent-start operations if the environment supports them.
- Return enough runtime metadata for Codebolt to update environment state and paths.

For most remote execution integrations, the provider should be treated as a bridge and control adapter, not the runtime itself.
