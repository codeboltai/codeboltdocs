---
sidebar_position: 1
title: Registry Overview
description: The Registry is the cloud portal's marketplace — browse, publish, and manage every kind of Codebolt entity from one place.
---

# Registry Overview

Sign in to the cloud portal and open **Registry**. Choose **All** to browse a catalog or **My** to find your listings.

## The entity types

| Type | All view | My view | Detail |
|---|---|---|---|
| **Agents** | `/agents/list` | `/myAgents` | `/agents/agentDetails/:agent_id` |
| **MCPs** | `/mcp/all` | `/mcp/mymcp` | `/mcps/details/:id` |
| **Providers** | `/providers/all` | `/providers/my` | `/providers/detail/:id` |
| **Skills** | `/skills/all` | `/skills/my` | `/skills/detail/:id` |
| **Action Blocks** | `/actionblocks/all` | `/actionblocks/my` | `/actionblocks/detail/:id` |
| **Capabilities** | `/capabilities/all` | `/capabilities/my` | `/capabilities/detail/:id` |
| **Plugins** | `/plugins/all` | `/plugins/my` | `/plugins/detail/:id` |
| **Executors** | `/executors/all` | `/executors/my` | `/executors/detail/:id` |
| **Templates** | `/templates/all` | `/templates` | `/templates/detail/:id/:source` |
| **Apps** | `/apps/all` | `/apps/my` | `/apps/detail/:id/:source` |
| **[MiniApps](../../../../04_build-on-codebolt/04b_custom-agentic-applications/05_mini-apps.md)** | `/miniapps/all` | `/miniapps/my` | Install from the catalog card |

## Browse a catalog

Open **Skills**, for example, to search the catalog and open a skill’s details. Skill cards can show ratings, review counts, and downloads. Under **All MiniApps**, search for an app and select **Install** to add it to your workspace. Find it again under **Agents → Tools → Installed MiniApps**.

For instructions on publishing an item, see [Marketplace Publishing](./02_marketplace-publishing.md).

## What else lives in the Registry

Beyond the marketplace entities, the Registry tab area includes:

- **AI Models** (`/aiModels`) — view the CodeLoom Model entry. See [AI Models](./03_ai-models.md).
- **People / Developer Profiles** (`/people/:username`) — sign in to see what a developer has published (agents, MCPs, templates, apps). See [Profiles](./04_profiles.md).

## Related

- [Marketplace Publishing](./02_marketplace-publishing.md) — the publishing flow for every entity type
- [Cloud Get Started](../00_get-started.md)
- [Cloud Portal](../02_cloud-portal.md)
