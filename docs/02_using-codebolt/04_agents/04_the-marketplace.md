---
sidebar_position: 4
title: The Marketplace
description: A public catalog of agents, tools, and capabilities that anyone can install into their Codebolt
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# The Agent Marketplace

A public catalog of agents, tools, and capabilities that anyone can install into their Codebolt. Think of it as a package registry — npm or PyPI, but for AI agents.

![Agent Marketplace](/productImages/agents/marketplace.png)

## What's on the marketplace

Three kinds of things:

| Kind | What | Examples |
|---|---|---|
| **Agents** | Custom agents ready to run | Code reviewers, language-specific specialists, test generators |
| **Tools / MCP servers** | New capabilities agents can call | Linters, internal API clients, database tools |
| **Capabilities** | Bundles combining agents + tools + prompts + UI | Full integrations like "Stripe", "Supabase", "Linear" |

All three install through the same UI. From your point of view, installing an agent and installing an MCP server look the same.

## Browsing

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Open the **Agents** panel and switch to the **Marketplace** tab. The same marketplace tab is also available from the **Select your Agent** dialog.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
codebolt command agents featured
codebolt command agents recommended
codebolt command agents list
codebolt command agents config <name>
```

The current CLI does not expose a dedicated `marketplace` command family. In practice, the available agent discovery commands are the `featured`, `recommended`, `list`, and `config` commands under `codebolt command agents`.

</TabItem>
<TabItem value="tui" label="TUI">

`m` opens the marketplace pane. `Tab` switches between Agents / Tools / Capabilities. `/` to search, `↑/↓` to navigate, `Enter` for detail.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/marketplace/search?q=reviewer&kind=agent
GET /api/marketplace/items/:name
```

</TabItem>
</Tabs>

In the current desktop UI, the marketplace is an in-app agent browser rather than a separate browser page. You can:

- Browse marketplace agents in a list.
- Open an agent to view its description and install state.
- Install directly from the card or from the detail view.
- Switch between **Installed**, **Marketplace**, and **My Agents** in the Agents surface.

The current `packages/ui` marketplace components do not expose the old browser-style search box, filter sidebar, or sort dropdown described in earlier drafts.

**Read the README before installing.** It should tell you what the agent is for, what tools it needs, what its blast radius is (read-only? write-capable? shell access?).

## Installing

For the install action across surfaces, see [Installing an agent](./05_installing-an-agent.md). The summary:

Under the hood, regardless of surface:

1. The marketplace manifest is downloaded.
2. The server checks compatibility (protocol version, required MCP servers, required capabilities).
3. If dependencies are needed, you're prompted to install them too.
4. The agent is added to your portfolio and appears in the agent picker.

Installation is per-workspace by default. Use the settings UI when you need to change the effective scope.

## Trust model

Marketplace entries go through automated review:

- **Lint check** — manifest is valid, required fields present.
- **Security scan** — no obvious secret leakage, no known-bad dependencies.
- **Basic behaviour check** — the agent loads and can handle a trivial task.

This catches obvious problems. It **does not** catch:

- Malicious intent disguised as normal behaviour.
- Subtle security issues (prompt injection vulnerabilities, privilege escalation via tool chains).
- Quality issues (agent is slow, prompts are bad, memory usage is wasteful).

**Treat marketplace agents like third-party libraries.** Read the manifest. Check the author's track record. Look at the tool allowlist — if an unfamiliar agent wants `codebolt_fs.write_file` + `codebolt_git.push`, think carefully before installing.

## Portfolios

Your workspace has an **agent portfolio** — the curated set of agents actually available in that workspace. Installing doesn't automatically add to the portfolio; you add explicitly. This lets you install several agents to try, decide which are keepers, and remove the rest without them cluttering your picker.

In the current desktop UI, installed agents show up under the **Installed** and **My Agents** tabs, and per-agent portfolio data is available from the agent profile panel.

Teams that self-host often constrain what the portfolio can contain: "only approved agents from our internal registry". See [Self-hosting](../../04_build-on-codebolt/10_self-hosting/01_overview.md).

## Publishing your own

To publish an agent, see [Build on Codebolt → Publishing](../../04_build-on-codebolt/02_creating-agents/10_publishing.md).

Quick version:

```bash
codebolt action agent publish --path ./my-agent
```

The first publish of a name reserves it. Subsequent publishes must be from the same account.

## Private registries

Organizations can host their own marketplace. A private registry:

- Has its own namespace (e.g. `my-org/my-agent`).
- Uses your company's auth.
- Supports reviewing agents before they become available.
- Can mirror approved public marketplace entries.

Configure a private registry in **Settings → Registries**. Private registries take precedence over the public marketplace for the same name. See [Self-hosting → Registries](../../04_build-on-codebolt/10_self-hosting/01_overview.md).

## See also

- [What is an agent](./01_what-is-an-agent.md)
- [Running agents](./03_running-agents.md)
- [Installing an agent](./05_installing-an-agent.md)
- [Agent portfolios](./06_agent-portfolios.md)
- [Publishing (for builders)](../../04_build-on-codebolt/02_creating-agents/10_publishing.md)
