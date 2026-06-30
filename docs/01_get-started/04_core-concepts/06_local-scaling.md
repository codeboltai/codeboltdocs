---
sidebar_position: 6
title: Local Scaling
description: "Scale Codebolt locally with one server process, provider choice, environments, background agents, jobs, memory, event logs, and observability."
---

# Local Scaling

Local scaling means doing more work on your own machine before moving work to hosted infrastructure. In the current server package, Codebolt starts as a standalone HTTP/WebSocket server. The desktop app and CLI both talk to that server, and the server owns project state, tool execution, sockets, routes, background agents, jobs, memory, and logs.

This is not horizontal server clustering. Local scaling is about making one local runtime handle more work safely and observably.

## What the local server provides

When the server starts, it initializes:

- Express API routes for chat, agents, jobs, tasks, environments, memory, evals, auto testing, guardrails, plugins, and more
- WebSocket routes for chat, shell, jobs, swarm, background agents, event logs, context assembly, plugins, and debug streams
- SQLite-backed application state through TypeORM migrations and seeders
- project-scoped runtime data under the active project, including agent execution records
- MCP, LSP, provider, plugin, and AgentFlow runtime setup in the background
- a host bridge supplied by the desktop app or CLI for process spawning, PTY, filesystem, and native host operations

The practical scaling boundary is the machine running that server: CPU, memory, filesystem, network access, terminal processes, and model/provider limits.

## Provider scaling

Model providers decide where inference happens and what tradeoffs you accept. The server initializes the LLM service and provider registry on startup, so local scale is mostly about choosing the right provider for each workload.

| Provider style | Use when |
|---|---|
| **Hosted model provider** | You want strong models with minimal local setup. |
| **Local model provider** | You need local-only execution, lower marginal cost, or offline development. |
| **Bring-your-own provider** | Your team already has an internal gateway or provider contract. |
| **Routing gateway** | You need policy-based routing across models and providers. |

At local scale, provider choice is usually about cost, latency, privacy, and model fit.

## Environment scaling

An environment is where tools execute. For small tasks, this may be the current project machine. As work grows, you may need configured environments, language servers, provider-specific setup, or a remote provider.

The server exposes environment routes and an environment lifecycle manager. Environment providers help make runs repeatable:

- same dependencies
- same secrets model
- same shell and runtime assumptions
- same language server behavior
- same project setup for agents and users

This matters because agent quality depends heavily on whether tools run in a predictable environment.

## Local coordination surfaces

Local scaling also means coordinating concurrent work:

- run background agents for independent tasks
- track jobs and job groups instead of relying only on chat messages
- use swarm and orchestrator surfaces when work needs multiple agents
- use action blocks for focused side executions
- use checkpoints before large edits
- isolate work by thread or branch
- keep guardrails strict around destructive commands
- use memory and event logs to inspect what happened
- prefer specialized agents over one overloaded general agent

The server has dedicated REST and WebSocket surfaces for these patterns. Background agents are tracked separately from foreground chat. Jobs can be listed, filtered, and updated. Agent executions are written under the project `.codebolt` directory so stale runs can be reconciled after restart.

## Durable local state

Longer local runs should not depend only on the active chat context. The server has durable surfaces for:

| Surface | Why it matters locally |
|---|---|
| **Agent executions** | Tracks running, completed, failed, cancelled, foreground, background, swarm, and child runs. |
| **Jobs** | Gives long work an explicit status, priority, dependency, and activity trail. |
| **Event log** | Provides an inspectable record of what happened across routes and sockets. |
| **Persistent memory / vector / KG / KV** | Stores facts, embeddings, graph data, and key-value state beyond one prompt. |
| **Auto testing** | Lets one agent deposit suites or cases and another agent run them later with statuses and logs. |
| **File update intents** | Lets agents announce planned file edits before they touch shared files. |

## Observability and limits

The server exposes debug and observability surfaces for agent debug, action block debug, environment debug, structured logs, event logs, task activity, and narrative graphs. Use those before increasing concurrency.

At local scale, watch for:

- too many active terminal or PTY processes
- multiple agents editing the same files without file update intents or branches
- provider rate limits and model latency
- long-running jobs without event-log or status updates
- stale agent executions after a crash or restart

If you need multiple machines, managed sandboxes, team-visible runtimes, or remote portal access, move that part of the workflow to Cloud Scaling.

## See also

- [Environments](../../02_using-codebolt/08a_environments/01_overview.md)
- [Environment providers](../../02_using-codebolt/08a_environments/03_environment-providers.md)
- [Local models](../../02_using-codebolt/08_integrations/02_local-models.md)
- [Routing gateway](../../02_using-codebolt/05b_guardrails-and-settings/03_routing-gateway.md)
- [Background Agents](../../02_using-codebolt/07a_parallel-agents/04_background-agent.md)
- [Event Log](../../02_using-codebolt/07_memory/07_event-log.md)
- [Run It Longer](./03_run-it-longer.md)
