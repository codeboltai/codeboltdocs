---
sidebar_position: 7
title: Cloud Scaling
description: "How to think about Codebolt Cloud, hosted runtimes, remote chat, publishing, and team-level operation."
---

# Cloud Scaling

Cloud scaling moves selected parts of Codebolt from a single local workspace into shared, hosted, or remotely accessible infrastructure.

The goal is not to make every workflow cloud-only. The goal is to decide which parts should be available to a team, a customer-facing app, or long-running automation.

## What cloud changes

| Local-first concern | Cloud-scale version |
|---|---|
| One user's machine | Shared or hosted runtime |
| Local provider config | Organization-level provider policy |
| Local thread access | Remote chat and shared access |
| Manual setup | Reproducible environments and deployment modes |
| Personal extensions | Published agents, plugins, and marketplace flows |
| Local debugging | Central logs, run history, and operational visibility |

## Cloud portal and remote chat

The cloud layer gives teams a place to manage work that should not depend on one desktop session. Remote chat and portal workflows are useful when a user needs to start, inspect, or continue agent work from outside the local app.

## Hosted runtimes

Hosted runtimes are useful when agents need to run:

- for a long time
- on a schedule
- from external events
- with shared team access
- in a controlled environment
- close to cloud-hosted data or APIs

Hosted runtimes should still use the same concepts: agents, tools, guardrails, memory, event logs, providers, and environments.

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

## See also

- [Cloud](../08f_cloud/01_overview.md)
- [Remote chat](../08f_cloud/03_remote-chat.md)
- [Runtimes and providers](../08f_cloud/04_runtimes-and-providers.md)
- [Marketplace publishing](../08f_cloud/05_marketplace-publishing.md)
