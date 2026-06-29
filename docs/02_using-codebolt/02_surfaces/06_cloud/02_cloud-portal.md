---
sidebar_position: 2
title: Cloud Portal
description: The portal at portal.codebolt.ai is the browser UI for Codebolt Cloud. It's organised into three top-level tabs, each focused on one kind of task.
---

# The Cloud Portal

The portal at [portal.codebolt.ai](https://portal.codebolt.ai) is the browser UI for Codebolt Cloud. It's organised into **three top-level tabs**, each focused on one kind of task.

## Sign in

First visit opens a sign-in screen. Use the same account you use for the desktop app — email + password or OAuth (Google / GitHub / Microsoft). On self-hosted deployments, OIDC / SAML / LDAP show up here as configured by your admin.

See [Authentication & Authorization](../../09_account/01_authentication-and-authorization.md) for the full auth story across app, CLI, and remote agents.

## Registry — browse and discover

The Registry tab is where you browse everything publishable. Each entity type has an **All** view (public marketplace) and a **My** view (what you've published).

| Section | All view (discover) | My view (publish) |
|---|---|---|
| **Agents** | Browse public agents with ratings, filters, ZIP upload | Edit, update, deprecate your own agents |
| **MCPs** | Browse MCP servers, search by capability | Manage MCPs you've published |
| **Providers** | Browse LLM provider integrations | Manage your published providers |
| **Skills** | Slash-command skills from the marketplace | Manage your skills |
| **Action Blocks** | Side-execution code units | Manage your blocks |
| **Capabilities** | Versioned capability bundles | Manage your capabilities |
| **Plugins** | Plugin marketplace | Manage your plugins |
| **Executors** | Runtime executors (Node, Python, shell) | Manage your executors |
| **Templates** | Project templates | Manage your templates |
| **Apps** | Packaged apps | Manage your apps |

See [Marketplace Publishing](./03_registry/02_marketplace-publishing.md) for the publishing flow. The Registry also hosts [AI Models](./03_registry/03_ai-models.md) (toggle model availability) and [Profiles](./03_registry/04_profiles.md) (public developer pages).

## Agents — run and iterate

The Agents tab is where you actually *use* the cloud runtime.

| Page | Purpose |
|---|---|
| **Remote Chat** | Start or join a chat against an agent running in a cloud sandbox. Pick a runtime, select an agent, optionally clone a GitHub repo into the sandbox before chatting. See [Remote Chat](./04_running-agents/01_remote-chat.md). |
| **Environments** | Tree of your runtime instances — live status (online / offline / starting), type (local / E2B / Docker / custom), project path, active threads, and a stop button. See [Cloud Environments](./04_running-agents/02_environments.md) and [Runtimes & Providers](./04_running-agents/04_runtimes-and-providers.md). |
| **Runner Nodes** | Self-hosted machines you've connected with the runner daemon. See [Runner Nodes](./04_running-agents/05_runner-nodes.md). |
| **Review Merge** | Review queue for agent-raised changes (RMRs). See [Review Merge Requests](./04_running-agents/06_review-merge-requests.md). |
| **Scheduled Tasks** | Run agent prompts later or on a schedule. See [Scheduled Tasks](./04_running-agents/07_scheduled-tasks.md). |
| **Inbox** | Messages from agents that need your attention. See [Inbox](./04_running-agents/08_inbox.md). |
| **Tasks** | Ticket-style issues assigned to your agents or raised by them (All Issues / My Issues). See [Issues & Tasks](./04_running-agents/09_issues-and-tasks.md). |

## Settings — account and config

The Settings tab collects everything configuration-related. See the [Settings Overview](./05_settings/01_overview.md) for the full map.

### General Settings
Profile info, display preferences, theme, and account-wide defaults. See [General Settings](./05_settings/01_overview.md) and [Account Settings](./05_settings/10_account-settings.md).

### Subscription
- **Plans** — browse and upgrade / downgrade your subscription. Pulls from `/users/plan` on the API.
- **Usage** — token, request, and cost charts broken down by model and project.
- **Billing** — payment methods, invoices, add credit, transaction history.

See [Plans, Usage & Billing](./05_settings/08_subscription-plans-usage-billing.md).

### Agent Settings
- **Login Tokens** — personal access tokens you can paste into the CLI, HTTP API, or runner daemon. Create with a name and expiry (30 d / 90 d / 1 year / no expiry). See [Login Tokens](./05_settings/07_login-tokens.md).
- **Remote Sandboxes** — bring-your-own-key for [E2B](https://e2b.dev), [Daytona](https://daytona.io), Runloop, Sprites, and Modal. Stored in your browser's local storage, never transmitted to the portal backend. See [Remote Sandboxes](./05_settings/03_remote-sandboxes.md).
- **Thread Runtime Providers** — enable which sandbox providers can host chat and issue threads. See [Thread Runtime Providers](./05_settings/04_thread-runtime-providers.md).
- **Connectors** — GitHub App integration for clone, push, and PR creation. See [Connectors](./05_settings/02_connectors.md).
- **LLM Provider Settings** — configure which LLM providers and models are available to your cloud agents. Same format as the desktop app's provider settings — the portal writes them into the sandbox's `settings.json` when a runtime starts. See [LLM Provider Settings](./05_settings/05_llm-provider-settings.md).
- **Preview Provider Settings** — manage providers serving live artifact previews. See [Preview Provider Settings](./05_settings/06_preview-provider-settings.md).

### Team Settings
Shared workspaces — team profile and members. See [Team Settings](./05_settings/09_team-settings.md).

## What the portal talks to

| Surface | Endpoint |
|---|---|
| REST API | `https://api.codebolt.ai/api` |
| Live updates (runtimes, chats) | `wss://codebolt-wrangler-ws.arrowai.workers.dev` (Cloudflare Workers) |
| CodeBolt server inside a sandbox | `https://<sandbox-host>:3100` (auto-assigned per runtime) |

You rarely touch these directly — the portal handles all of it — but the URLs are useful when debugging a stuck connection or scripting against the API.

## Related

- [Cloud Get Started](./00_get-started.md)
- [Authentication & Authorization](../../09_account/01_authentication-and-authorization.md)
