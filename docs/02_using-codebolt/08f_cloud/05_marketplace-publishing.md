---
sidebar_position: 5
title: Marketplace Publishing
description: Publish agents, plugins, skills, and other entities to the Codebolt marketplace from the portal or the CLI.
---

import { Accordion, AccordionItem } from '@site/src/components/Accordion';

# Marketplace Publishing

Anything you build for Codebolt can be published to the marketplace — agents, plugins, skills, MCPs, and more. Once published, your item is discoverable and installable from the desktop app, CLI, and TUI.

Publishing happens from the **cloud portal** or the **CLI**. Each extension type has matching `create`, `publish`, and `list` subcommands under `codebolt action`.

---

## What you can publish

<Accordion>

<AccordionItem title="Agents" badge="Most common">

Agents are the primary publishable entity. They run tasks, reason over codebases, and can be orchestrated in swarms and flows.

**Portal routes:** `/agents/list` (all) · `/myAgents` (yours)

**Two ways to publish:**

- **ZIP upload** — `My Agents → Upload ZIP`. Drop a packaged agent directory with a `codeboltagent.yaml` manifest. The portal validates, extracts metadata, and creates a draft.
- **Add Agent form** — `My Agents → New agent`. Fill in name, description, tools, execution mode, and tags inline. Download the manifest or publish directly.

**Execution modes:**

| Mode | How it works |
|---|---|
| `codeboltExecuted` | Codebolt launches the agent from a `remotePath`. Zero user setup — installs cleanly from the marketplace. |
| `selfExecuted` | User runs the process. The listing includes the env-var snippet (`threadToken` + `agentId`) they need. Good for wrapping Claude Code, Codex, or any external tool. |

**CLI:**

```bash
# Create a new agent from a template
codebolt action agent create \
  --name my-agent \
  --path ./my-agent \
  --description "Does X" \
  --template default

# Create a remote agent
codebolt action agent create-remote \
  --name my-agent \
  --execution-mode codeboltExecuted \
  --remote-path ./my-agent \
  --description "Does X"

# Publish
codebolt action agent publish --path ./my-agent

# List your published agents
codebolt action agent list
```

See [Creating Agents](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md) for the full agent build guide.

</AccordionItem>

<AccordionItem title="Plugins">

Plugins extend the Codebolt application — adding custom LLM providers, chat gateway connections, remote execution environments, or custom UI panels.

**Portal routes:** `/plugins/all` · `/plugins/my`

**CLI:**

```bash
# Scaffold a new plugin
codebolt action plugin create \
  --name my-plugin \
  --path ./my-plugin \
  --description "Adds X provider"

# Publish
codebolt action plugin publish --path ./my-plugin

# List your published plugins
codebolt action plugin list
```

See [Building Plugins](../08g_plugins/04_building-plugins.md) and the [Plugin developer docs](../../04_build-on-codebolt/05_plugins/01_overview.md).

</AccordionItem>

<AccordionItem title="MCP Servers">

MCP (Model Context Protocol) servers expose tools agents can call — file search, database queries, external APIs, and more.

**Portal routes:** `/mcp/all` · `/mcp/mymcp`

Publishing an MCP from the portal: fill in the connection details (URL or local command), the capability list, and authentication method. Users install it and it appears in **Settings → MCP Servers**.

See [Installing MCP Servers](../04b_agent-extensions/06_installing-mcp-servers.md) for the install flow.

</AccordionItem>

<AccordionItem title="Skills">

Skills are slash-command invocable capabilities — type `/skill-name` in chat to run one. They're installable from the marketplace and scoped to the agent that runs them.

**Portal routes:** `/skills/all` · `/skills/my`

**CLI:**

```bash
codebolt action skill create \
  --name my-skill \
  --path ./my-skill \
  --description "Does X when invoked"

codebolt action skill publish --path ./my-skill

codebolt action skill list
```

See [Skills](../04b_agent-extensions/03_skills.md).

</AccordionItem>

<AccordionItem title="Action Blocks">

Action Blocks are lightweight code units that run as side executions parallel to an agent — useful for deterministic operations that don't need LLM reasoning.

**Portal routes:** `/actionblocks/all` · `/actionblocks/my`

**CLI:**

```bash
codebolt action actionblock create \
  --name my-block \
  --path ./my-block \
  --description "Runs X in parallel"

codebolt action actionblock publish --path ./my-block

codebolt action actionblock list
```

See [Action Blocks](../04b_agent-extensions/04_action-blocks.md).

</AccordionItem>

<AccordionItem title="Capabilities">

Capabilities are versioned, reusable bundles of agent behaviour with typed inputs and outputs. They can be shared across agents and composed into larger workflows.

**Portal routes:** `/capabilities/all` · `/capabilities/my`

**CLI:**

```bash
codebolt action capability create \
  --name my-capability \
  --path ./my-capability \
  --description "Reusable bundle for X"

codebolt action capability publish --path ./my-capability

codebolt action capability list
```

See [Capabilities](../04b_agent-extensions/02_capabilities.md).

</AccordionItem>

<AccordionItem title="Executors">

Executors are language runtimes that run capabilities — Node.js, Python, shell, or custom. Publishing a custom executor makes it available for other teams to use.

**Portal routes:** `/executors/all` · `/executors/my`

**CLI:**

```bash
codebolt action executor create \
  --name my-executor \
  --path ./my-executor \
  --description "Python 3.12 runtime"

codebolt action executor publish --path ./my-executor

codebolt action executor list
```

See [Executors](../04b_agent-extensions/05_executors.md).

</AccordionItem>

<AccordionItem title="Providers">

Providers add a custom LLM or embedding model integration to Codebolt's model selector — either as a plugin or as a standalone provider package.

**Portal routes:** `/providers/all` · `/providers/my`

**CLI:**

```bash
codebolt action provider create \
  --name my-provider \
  --path ./my-provider \
  --description "Custom inference endpoint"

codebolt action provider publish --path ./my-provider

codebolt action provider list
```

</AccordionItem>

<AccordionItem title="Templates">

Project templates let users scaffold a new project with a pre-configured folder structure, agent, and settings.

**Portal routes:** `/templates/all` · `/templates`

Templates are published from the portal only — upload a ZIP of the template directory with a manifest describing the structure.

</AccordionItem>

<AccordionItem title="Apps">

Apps are fully packaged Codebolt applications — a bundled agent, UI, and configuration that users can install as a single unit.

**Portal routes:** `/apps/all` · `/apps/my`

Apps are published from the portal. Contact the Codebolt team for access to the app publishing flow.

</AccordionItem>

</Accordion>

---

## Listing metadata

For every entity type the listing form collects:

- **Name** and **slug** — globally unique
- **Description** — Markdown supported
- **Tags / categories** — drives discovery and filtering
- **Cover image / screenshots** — hosted on the portal CDN
- **Version** — semver; new versions supersede old but older versions remain installable
- **Visibility** — `public` (full marketplace) or `unlisted` (installable by URL; good for team-private items)
- **Pricing** — free or paid (paid routes through the portal billing system)

---

## Managing published items

The **My** view of each entity type lets you:

- Edit metadata (description, tags, cover image)
- Upload a new version
- **Deprecate** — keeps old installs working; hides from new discovery
- **Delete** — breaks existing installs; use deprecate instead unless the item was never used
- View ratings, downloads, and usage stats per version

---

## Who can publish

Anyone with a signed-in account can publish. Team-owned items on self-hosted deployments can be restricted to team admins — see [Teams → Roles](../09_account/02_teams.md#roles).

---

## Related

- [Cloud Overview](./01_overview.md)
- [Cloud Portal](./02_cloud-portal.md)
- [Installing an Agent](../04_agents/05_installing-an-agent.md)
- [The Marketplace (in-app)](../04_agents/04_the-marketplace.md)
- [Plugin Marketplace](../08g_plugins/03_plugin-marketplace.md)
