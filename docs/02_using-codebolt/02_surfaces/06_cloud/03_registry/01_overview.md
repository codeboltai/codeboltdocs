---
sidebar_position: 1
title: Registry Overview
description: The Registry is the cloud portal's marketplace — browse, publish, and manage every kind of Codebolt entity from one place.
---

# Registry Overview

The **Registry** is the first tab of the cloud portal and Codebolt's central marketplace. Everything publishable — agents, MCPs, providers, skills, action blocks, capabilities, plugins, executors, templates, and apps — lives here. Each entity type has an **All** view (the public marketplace, for discovery) and a **My** view (what you've published, for management).

If you've used the desktop app's marketplace, the Registry is the same catalog, served from the cloud and reachable from any browser.

## The entity types

| Type | All view | My view | Detail |
|---|---|---|---|
| **Agents** | `/agents/list` | `/myAgents` | `/agents/agentDetails/:id` |
| **MCPs** | `/mcp/all` | `/mcp/mymcp` | `/mcps/details/:id` |
| **Providers** | `/providers/all` | `/providers/my` | `/providers/detail/:id` |
| **Skills** | `/skills/all` | `/skills/my` | `/skills/detail/:id` |
| **Action Blocks** | `/actionblocks/all` | `/actionblocks/my` | `/actionblocks/detail/:id` |
| **Capabilities** | `/capabilities/all` | `/capabilities/my` | `/capabilities/detail/:id` |
| **Plugins** | `/plugins/all` | `/plugins/my` | `/plugins/detail/:id` |
| **Executors** | `/executors/all` | `/executors/my` | `/executors/detail/:id` |
| **Templates** | `/templates/all` | `/templates` | `/templates/detail/:id/:source` |
| **Apps** | `/apps/all` | `/apps/my` | `/apps/detail/:id/:source` |

## Browse vs publish

- **Browse** (the **All** view) — search, filter by tags/categories, read descriptions, check ratings and download counts, and install an item into your desktop app or cloud runtime.
- **Publish** (the **My** view) — create a new listing, upload a new version, edit metadata, deprecate, or delete your published items.

For the full publishing flow — manifests, CLI commands, visibility, pricing, and versioning — see [Marketplace Publishing](./02_marketplace-publishing.md).

## What else lives in the Registry

Beyond the marketplace entities, the Registry tab area includes:

- **AI Models** (`/aiModels`) — toggle which models are available to your agents. See [AI Models](./03_ai-models.md).
- **People / Developer Profiles** (`/people/:username`) — public profiles showing what a developer has published (agents, MCPs, templates, apps). See [Profiles](./04_profiles.md).

## Discoverability

Listings are surfaced by:

- **Search** — full-text over name and description
- **Tags / categories** — applied at publish time
- **Ratings** — community ratings feed ranking
- **Downloads / usage stats** — per version

Unlisted items (visibility `unlisted`) are only installable by direct URL — good for team-private distributions.

## Related

- [Marketplace Publishing](./02_marketplace-publishing.md) — the publishing flow for every entity type
- [Cloud Get Started](../00_get-started.md)
- [Cloud Portal](../02_cloud-portal.md)
