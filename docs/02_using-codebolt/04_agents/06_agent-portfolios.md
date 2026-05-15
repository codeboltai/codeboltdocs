---
sidebar_position: 6
title: Agent Portfolios
description: A portfolio is the curated set of agents active in a workspace
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Agent Portfolios

A **portfolio** is the curated set of agents active in a workspace. Installing an agent doesn't automatically add it to the portfolio — you choose which installed agents are actually available in a given project.

![Agent Portfolio](/productImages/agents/agent_portfolio.png)

## Why portfolios exist

Two reasons:

1. **Installed ≠ active.** You might have 20 agents installed across various projects, but you only want 4 of them usable in your current workspace. The portfolio is the filter.
2. **Curated sets per project.** Different projects need different tools. A mobile project's portfolio probably doesn't include a database-migration specialist; a backend project's might.

## Viewing your portfolio

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Open an agent's profile from the **Agents** panel or an agent picker to inspect portfolio-style data such as reputation, conversations, testimonials, karma, and talents. The current desktop UI does not expose a dedicated **Settings → Agents → Portfolio** screen.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose `agent portfolio` commands. Portfolio management is currently a UI-driven concept.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/portfolio
GET /api/portfolio?scope=workspace
```

</TabItem>
</Tabs>

## Adding and removing

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose add, remove, or pin operations for portfolios.

</TabItem>
<TabItem value="desktop" label="Desktop">

Pinning is available from agent pickers. The current `packages/ui` code does not expose a dedicated desktop portfolio editor, so use the config file or the product surface shipped in your build when you need explicit portfolio editing.

</TabItem>
<TabItem value="config" label="Config file">

Edit `.codebolt/portfolio.yaml` directly:

```yaml
portfolio:
  - name: my-agent
    enabled: true
    pinned: true
```

Commit to git to share with the team.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST   /api/portfolio { "name": "my-agent", "pinned": false }
DELETE /api/portfolio/:name
```

</TabItem>
</Tabs>

Removing from the portfolio doesn't uninstall — the agent is still on disk, just not in the active set. Re-add at any time.

## Portfolio files

The portfolio is stored as `.codebolt/portfolio.yaml` in the workspace:

```yaml
portfolio:
  - name: generalist
    enabled: true
  - name: planner
    enabled: true
  - name: my-pr-reviewer
    enabled: true
    pinned: true    # always show in pickers
  - name: refactor
    enabled: false  # installed but not in portfolio
```

Committing this to git lets your team share a workspace portfolio.

## Pinned agents

Pinning an agent keeps it at the top of pickers and command palettes. Use for agents you use multiple times per day.

## Default portfolio for new workspaces

Default portfolio behavior is a workspace/runtime concern. Document an exact desktop path only if your build exposes one.

## Reputation (optional)

When reputation tracking is enabled, each agent accumulates a score based on its run history:

- Success rate
- Downstream stability (did its changes stick?)
- Cost efficiency
- User-reported quality (if thumbs-up/down is used)

Reputation surfaces in the portfolio as a numeric score, and in pickers as an ordering hint. Agents with low reputation sink to the bottom.

See [Stigmergy and Reputation](../../04_build-on-codebolt/08_multi-agent-orchestration/05_stigmergy-and-reputation.md) for the mechanism.

## Per-scope portfolios

Portfolios can exist at multiple scopes:

- **Project** — committed to `.codebolt/portfolio.yaml` in the project.
- **Workspace** — for your workspace's personal use.
- **User** — your defaults across all workspaces.

The active portfolio is the union of these, with overrides following the same precedence as settings.

## Exporting and sharing

The practical sharing mechanism today is the portfolio file itself. Commit `.codebolt/portfolio.yaml` to the repository when you want teammates to use the same curated set.

## See also

- [What is an agent](./01_what-is-an-agent.md)
- [The Marketplace](./04_the-marketplace.md)
- [Installing an Agent](./05_installing-an-agent.md)
- [Stigmergy and Reputation](../../04_build-on-codebolt/08_multi-agent-orchestration/05_stigmergy-and-reputation.md)
