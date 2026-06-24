---
sidebar_position: 6
title: Local Scaling
description: "Scale Codebolt locally with model providers, environment providers, configured runtimes, and team-safe settings."
---

# Local Scaling

Local scaling means doing more work without immediately moving everything to cloud infrastructure. The main levers are model providers, environment providers, project settings, and observability.

## Provider scaling

Model providers decide where inference happens and what tradeoffs you accept.

| Provider style | Use when |
|---|---|
| **Hosted model provider** | You want strong models with minimal local setup. |
| **Local model provider** | You need local-only execution, lower marginal cost, or offline development. |
| **Bring-your-own provider** | Your team already has an internal gateway or provider contract. |
| **Routing gateway** | You need policy-based routing across models and providers. |

At local scale, provider choice is usually about cost, latency, privacy, and model fit.

## Environment scaling

An environment is where tools execute. For small tasks, this may be the current project machine. As work grows, you may need isolated project environments, configured dependencies, secrets, language servers, or remote execution providers.

Environment providers help make runs repeatable:

- same dependencies
- same secrets model
- same shell and runtime assumptions
- same language server behavior
- same project setup for agents and users

This matters because agent quality depends heavily on whether tools run in a predictable environment.

## Local coordination

Local scaling also means coordinating concurrent work:

- run background agents for independent tasks
- use checkpoints before large edits
- isolate work by thread or branch
- keep guardrails strict around destructive commands
- use memory and event logs to inspect what happened
- prefer specialized agents over one overloaded general agent

## Practical limits

Local systems are still bounded by machine resources, provider rate limits, repository size, and how many concurrent tool calls can safely run against the same workspace.

When local coordination starts requiring shared queues, managed runtimes, team-level policy, or remote access, move the relevant part of the workflow toward cloud scale.

## See also

- [Environments](../../02_using-codebolt/08a_environments/01_overview.md)
- [Environment providers](../../02_using-codebolt/08a_environments/03_environment-providers.md)
- [Local models](../../02_using-codebolt/08_integrations/02_local-models.md)
- [Routing gateway](../../02_using-codebolt/05b_guardrails-and-settings/03_routing-gateway.md)
