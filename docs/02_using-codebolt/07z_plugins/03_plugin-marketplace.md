---
sidebar_position: 3
title: Plugin Marketplace
---

# Plugin Marketplace

The Plugin Marketplace is where you find, install, and manage plugins published by the Codebolt team and the community. It is accessible from inside the app and from the Codebolt web portal.

## Browsing

Open the marketplace from the **Plugins panel → Browse Marketplace**, or from the web portal at [codebolt.ai/marketplace](https://codebolt.ai/marketplace) filtered to plugins.

Plugins are organised by category:

| Category | What you'll find |
|---|---|
| **LLM Providers** | Custom model providers — private deployments, niche inference APIs, internal servers |
| **Chat Gateways** | Platform connectors — Slack, Telegram, Discord, WhatsApp, custom webhook receivers |
| **Execution** | Remote execution routers — cloud VMs, Docker containers, SSH hosts, sandboxed environments |
| **UI Panels** | Custom interface panels that appear inside the Codebolt desktop app |
| **Utilities** | Background automation, event-driven integrations, monitoring tools |

## Plugin cards

Each plugin listing shows:

- **Name and publisher** — verified publishers show a badge
- **Type** — LLM Provider, Chat Gateway, Execution, or Generic
- **Description** — what it does and what platforms/services it connects to
- **Required configuration** — what credentials or setup you need before it works
- **Version and last updated**
- **Install count and community rating**

Click a card to open the full detail page with documentation, configuration instructions, and a changelog.

## Trust and security

Plugins run as Node.js processes with the same filesystem access as Codebolt itself. Before installing a plugin:

- **Check the publisher** — verified badges indicate publishers who have agreed to Codebolt's security policy and whose code has been reviewed
- **Read the required permissions** — each plugin listing declares what it accesses (filesystem, network, terminal)
- **Review the source** — marketplace plugins link to their source repository

Community plugins (unverified) can be installed but show a warning banner. Use them only if you trust the source.

## Private registries

Organizations can host a private plugin registry accessible only to their team:

1. Go to **Settings → Plugins → Registries**
2. Click **Add Registry** and enter the registry URL and auth token
3. Plugins from your private registry appear in the marketplace alongside public ones, tagged with your org name

Private registries are useful for internal tooling — execution plugins that connect to your company's infrastructure, gateway plugins for internal chat systems, or LLM provider plugins for private model deployments.

## Publishing a plugin

If you've built a plugin and want to share it:

```bash
codebolt action plugin publish --path ./my-plugin
```

Before publishing, make sure your plugin passes the pre-publish checklist — see [Building Plugins](./04_building-plugins.md) for the full workflow. Once published, it appears in the marketplace and can be installed by anyone with access to your registry (public or private).

## Managing your published plugins

From the [Codebolt web portal](https://codebolt.ai):

- **Edit listing** — update description, screenshots, configuration docs
- **Release a new version** — push an update; existing installs see the update badge
- **Deprecate** — mark a plugin as no longer maintained; it stays installable but shows a warning
- **Unpublish** — remove from the marketplace; existing installs continue to work but can't be freshly installed
