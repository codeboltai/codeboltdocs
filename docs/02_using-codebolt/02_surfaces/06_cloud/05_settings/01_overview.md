---
sidebar_position: 1
title: Settings Overview
description: The Settings tab collects account, subscription, agent, and team configuration for Codebolt Cloud.
---

# Settings Overview

The **Settings** tab is the third top-level tab of the cloud portal. It groups every configuration surface into four areas:

| Area | Covers |
|---|---|
| **General** | Your profile snapshot — name, username, email, user ID, plan |
| **Subscription** | [Plans](./08_subscription-plans-usage-billing.md), [Usage](./08_subscription-plans-usage-billing.md), [Billing](./08_subscription-plans-usage-billing.md) |
| **Agent Settings** | [Login Tokens](./07_login-tokens.md), [Remote Sandboxes](./03_remote-sandboxes.md), [Thread Runtime Providers](./04_thread-runtime-providers.md), [Connectors](./02_connectors.md), [LLM Provider Settings](./05_llm-provider-settings.md), [Preview Provider Settings](./06_preview-provider-settings.md) |
| **Team Settings** | [Team General & Members](./09_team-settings.md) |

A separate **Account Settings** page (`/settings`) holds the older Profile / Password / Notification / Integration / Billing tabbed editor — see [Account Settings](./10_account-settings.md).

## General Settings

`/settings/general` shows a read-only snapshot of your account: avatar, full name, username, email, user ID, and current plan. To edit these fields, use [Account Settings](./10_account-settings.md).

## Subscription

Three pages drive the commercial side of your account:

- **Plans** (`/plan`) — browse and switch subscription tiers; includes a pricing page.
- **Usage** (`/usage`, `/usage/model`) — token, request, and cost charts broken down by model.
- **Billing** (`/billing`, `/transaction`) — payment methods, add credit, request credit, and transaction history.

See [Plans, Usage & Billing](./08_subscription-plans-usage-billing.md) for the full picture.

## Agent Settings

This is where you configure how cloud agents authenticate, where they run, and what they can reach:

- [**Login Tokens**](./07_login-tokens.md) — personal access tokens for the CLI and HTTP API.
- [**Remote Sandboxes**](./03_remote-sandboxes.md) — bring-your-own-key for E2B, Daytona, Runloop, Sprites, and Modal.
- [**Thread Runtime Providers**](./04_thread-runtime-providers.md) — enable which sandbox providers can host chat/issue threads.
- [**Connectors**](./02_connectors.md) — GitHub App integration for clone, push, and PR creation.
- [**LLM Provider Settings**](./05_llm-provider-settings.md) — which LLM providers and models your cloud agents can use.
- [**Preview Provider Settings**](./06_preview-provider-settings.md) — manage providers that serve live artifact previews.

## Team Settings

For shared workspaces: [**Team General**](./09_team-settings.md) (team profile) and **Members** (invite and manage teammates).

## Related

- [Cloud Portal](../02_cloud-portal.md)
- [Account Settings](./10_account-settings.md)
