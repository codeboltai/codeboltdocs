import ExecutorArchitecture from '@site/src/components/diagrams/ExecutorArchitecture';

# Executors

> Executors are the runtime environments that run capabilities

![Executors](/productImages/agent_extensions/executor.png)

Executors are the runtime environments that run capabilities. When an agent invokes a capability, the Capability Manager looks up which executor handles that capability's type, then delegates execution to it.

Open via: **Agents dropdown → Capabilities → Executors tab**

## What executors do

A capability file defines *what* to do and *what inputs/outputs* it has. An executor defines *how* to actually run it — which language runtime, which entry point handler, and how to pass data in and out.

<ExecutorArchitecture />

## Where executors live

| Source | Path |
|---|---|
| **Project** | `.codebolt/capabilities/executors/{name}/` |
| **Global** | `~/.codebolt/capabilities/executors/{name}/` |
| **Built-in** | Shipped with Codebolt |

## Executor configuration

Each executor directory contains an `executor.yaml`:

```yaml
name: node-executor
version: 1.0.0
description: Runs capabilities written in Node.js
supportedTypes:
  - skill
  - power
entryPoint: executor.js
author: codeboltai
```

The `supportedTypes` list declares which capability types this executor can handle. The Capability Manager matches a capability's `type` field against the `supportedTypes` of all registered executors to find the right one.

## The Executors tab

The **Executors tab** in the Capabilities panel shows:

- All locally installed executors (built-in, global, project)
- Name, version, supported types, and source
- A **Marketplace** sub-tab to browse and download additional executors

Click **Refresh** to re-scan after installing a new executor.

## Multiple executors for the same type

If more than one executor supports the same capability type, the Capability Manager selects based on source priority (project > global > built-in). You can also pin a specific executor for a capability by naming it explicitly in the capability's configuration.

## Built-in executors

Codebolt ships with executors for the most common runtimes out of the box. Additional executors for other languages or environments are available from the marketplace.
