---
sidebar_position: 1
title: Custom Agentic Application Overview
---

import CustomAgenticApplicationsArchitecture from '@site/src/components/diagrams/CustomAgenticApplicationsArchitecture';

# Custom Agentic Application

Custom agentic applications are product-specific applications built on top of Codebolt.

The most important architecture choice is where the application runs, and what it connects to.

## The three levels

| Level | Where the app runs | Primary connection model |
|---|---|---|
| [Level 1: Inside Codebolt](./02_level-1-inside-codebolt.md) | Inside the Codebolt product | Plugin SDK, Dynamic Panels, plugin UI |
| [Level 2: Separate app, local Codebolt server](./03_level-2-separate-app-local-server.md) | Outside Codebolt | Client SDK or Plugin SDK to a local Codebolt server |
| [Level 3: Separate app, hosted runtimes](./04_level-3-hosted-runtimes.md) | Outside Codebolt | Cloud relay / remote runtime connection |

<CustomAgenticApplicationsArchitecture />

## What’s in this section

| Page | What it covers |
|---|---|
| [Level 1: Inside Codebolt](./02_level-1-inside-codebolt.md) | Embedded applications built as plugins, Dynamic Panels, or plugin-hosted UIs |
| [Level 2: Separate app, local Codebolt server](./03_level-2-separate-app-local-server.md) | Standalone apps that talk to a local Codebolt server over HTTP and WebSockets |
| [Level 3: Separate app, hosted runtimes](./04_level-3-hosted-runtimes.md) | Hosted apps that connect to remote Codebolt runtimes instead of `localhost` |
| [Choosing the Right Architecture](./05_choosing-the-right-architecture.md) | How to decide between the three levels and pick the right SDK |

## Shared idea

In all three levels, your application can use Codebolt for:

- Agents and threads
- Files, tasks, and jobs
- Memory and event streams
- Automation, integrations, and routing

What changes is where the UI runs, where the application logic runs, and whether the connection target is local or remote.

## See also

- [Plugins](../07z_plugins/01_overview.md) for plugin packaging and lifecycle
- [Auto Interactivity](../08d_auto-interactivity/01_overview.md) for webhooks, schedules, and hooks
- [External Integrations](../08e_external-integrations/01_overview.md) for routing gateway and channel-style integrations
- [Cloud](../02_surfaces/06_cloud/00_get-started.md) for hosted runtimes and remote execution
- [Client SDK](../../04_build-on-codebolt/04_custom-uis/02_client-sdk.md) for standalone client applications
- [Custom Interfaces Overview](../../04_build-on-codebolt/04_custom-uis/01_overview.md) for frontend-building paths
