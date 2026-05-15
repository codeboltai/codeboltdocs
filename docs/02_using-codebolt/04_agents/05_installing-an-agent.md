---
sidebar_position: 5
title: Installing an Agent
description: Adding an agent from the marketplace, a private registry, or a local file. Same process regardless of source — what differs is where the manifest comes from.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing an Agent

Adding an agent from the marketplace, a private registry, or a local file. Same process regardless of source — what differs is where the manifest comes from.

![Installed Agents](/productImages/agents/installed.png)

## From the marketplace

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Open the **Agents** panel and switch to **Marketplace**, or open **Select your Agent** and switch to **Marketplace**. Click an agent to open its details, then choose **Install**.

</TabItem>
<TabItem value="cli" label="CLI">

The current `packages/cli` implementation does not expose an end-user `agent install` command. Use the desktop UI for marketplace installs, or add a project-local agent under `.codebolt/agents/` when you are working directly in the filesystem.

</TabItem>
<TabItem value="tui" label="TUI">

`m` → marketplace pane → `Tab` to **Agents** → `↑/↓` → `Enter` → `i` to install.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/agents/install
{ "source": "marketplace/my-agent", "version": "1.2.0" }
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.agents.install('marketplace/my-agent');
```

</TabItem>
</Tabs>

Under the hood: download, verify signature, check compatibility, install files, add to portfolio.

## From a private registry

If your org runs a private registry, configure and install through the UI surface that is wired to that registry.

Private registries take precedence over the public marketplace when there's a name collision.

## From a local directory

For agents under development, or agents committed to a project repo:

Place the agent in the appropriate local agents directory or add it through the product UI.

In the current desktop UI, local imports live under **Agents** → **My Agents** → **Add Agent**.

This adds the local agent to your workspace without publishing it anywhere. Useful for:

- **Project-local agents** — already in `.codebolt/agents/` in the project repo; installed automatically when you open the project.
- **Development** — iterate on an agent before publishing.
- **Sharing by email** — someone zipped you an agent directory.

## From a URL

If you are distributing an unpacked agent directly, treat it like a local agent rather than relying on a CLI install command.

## What installation does

1. **Download / copy** the agent to the Codebolt agents directory.
2. **Validate** the manifest (`agent.yaml`).
3. **Install dependencies** if it's a framework agent (runs `npm install` inside its directory).
4. **Check compatibility** with your Codebolt version.
5. **Register** the agent with the server so it appears in installed-agent surfaces.
6. **Optionally make it available in the active workspace**.

## Install scopes

- **Workspace** (default) — agent is available in the current workspace only.
- **User** — available in every workspace.
- **Project-local** — agent lives in `.codebolt/agents/` and is committed to git; everyone who opens the project gets it.

For a team-shared agent, commit it to the project. For something you use across all your own work, promote to user scope.

## Dependencies

Some agents depend on other extensions — an MCP server, a capability, a specific LLM provider. During install, you're prompted to install the dependencies if they're missing.

```
my-agent requires:
  - mcp-server: linter-mcp (not installed) [Install]
  - capability: ts-analyzer (not installed) [Install]
  - provider: anthropic (configured ✓)
```

You can install everything at once or pause and handle dependencies manually.

## Checking install state

The current CLI exposes inspection commands through `codebolt command agents`, for example:

```bash
codebolt command agents list
codebolt command agents local
codebolt command agents config <name>
```

## Updating

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose `agent update` or `agent update-all`. Use the desktop UI for agent updates.

</TabItem>
<TabItem value="desktop" label="Desktop">

The current `packages/ui` agent marketplace components do not expose a clear desktop update action. Document a specific update flow only for builds that ship one.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/agents/:name/update
POST /api/agents/:name/update  { "version": "1.3.0" }
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.agents.update('my-agent');
await codebolt.agents.update('my-agent', { version: '1.3.0' });
```

</TabItem>
</Tabs>

## Uninstalling

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose `agent uninstall`. Use the desktop UI to remove an installed agent.

</TabItem>
<TabItem value="desktop" label="Desktop">

The current `packages/ui` agent marketplace components do not expose a clear desktop uninstall action.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
DELETE /api/agents/:name
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.agents.uninstall('my-agent');
```

</TabItem>
</Tabs>

Removes the files, removes from portfolio, removes from the agent list. Does not delete:

- Historical runs of that agent (still in the event log).
- Memory the agent wrote (still in persistent memory).
- Checkpoints taken during its runs.

Purging agent data is an administrative cleanup step handled through the product UI and runtime internals, not the current CLI command set.

## Install troubleshooting

### "Version incompatible"
The agent requires a newer or older Codebolt than you have. Update Codebolt, or find a compatible version of the agent.

### "Dependency not satisfied"
Install the missing dependency and retry.

### "Signature invalid"
The downloaded bundle is either tampered with or from an untrusted publisher. Don't bypass — investigate.

### "Permission denied writing to agents directory"
Filesystem permission issue. Check ownership of `~/.codebolt/agents/` (or `.codebolt/agents/` for project scope).

## See also

- [The Marketplace](./04_the-marketplace.md)
- [Agent Portfolios](./06_agent-portfolios.md)
- [Publishing (for builders)](../../04_build-on-codebolt/02_creating-agents/10_publishing.md)
