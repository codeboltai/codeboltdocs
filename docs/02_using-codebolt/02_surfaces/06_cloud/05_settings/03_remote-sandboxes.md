---
sidebar_position: 3
title: Remote Sandboxes
description: Bring your own API keys for E2B, Daytona, Runloop, Sprites, and Modal sandbox providers so cloud usage bills to your account.
---

# Remote Sandboxes

**Remote Sandboxes** (`/settings/remotesandboxes`) is where you bring your own credentials for the sandbox providers Codebolt Cloud can spin up. Supplying a key means sandbox usage **bills to your account** with that provider, not the hosted Codebolt tier.

This page is the single source of credentials for two downstream features:

- **Runtimes** — sandboxes created in Remote Chat and [Runtimes & Providers](../04_running-agents/04_runtimes-and-providers.md)
- **Thread Runtime Providers** — see [Thread Runtime Providers](./04_thread-runtime-providers.md), which consume these credentials to enable per-thread runtimes
- **Preview Providers** — managed preview sandboxes (see [Preview Provider Settings](./06_preview-provider-settings.md))

## The providers

| Provider | Credential fields | Used for |
|---|---|---|
| **E2B** | API Key (`e2bSandboxToken`) | E2B remote chat sandboxes and managed E2B previews |
| **Daytona** | API Key (`daytonaSandboxApiKey`) + Server URL (`daytonaSandboxServerUrl`) | Managed Daytona sandbox previews |
| **Runloop** | API Key (`runloopApiKey`) | Managed Runloop Devbox previews and thread runtimes |
| **Sprites** | API Token (`spritesApiToken`) | Stateful app/static site previews (Fly.io-backed). Existing Fly API tokens are still accepted by the backend. |
| **Modal** | Token ID (`modalTokenId`) + Token Secret (`modalTokenSecret`) | Reserved for future managed Modal sandbox previews |

## Where credentials live

Credentials are stored **in your browser's local storage** under your account settings, and sent directly from the browser to the provider when creating or stopping a sandbox. They are **never transmitted to or stored on the portal backend**.

Consequences:

- Keys are **per-browser** — set them in each browser you use, or they won't be available there.
- Clearing browser storage removes them; re-enter to restore.
- The hosted Codebolt tier is used automatically when a key is absent.

:::note
Stopping an E2B sandbox you own requires the same E2B API key that created it. If the key is missing from local storage, the portal sends a graceful stop request but cannot destroy the sandbox directly.
:::

## Setting a credential

1. Open the provider's panel.
2. Paste the key (and server URL for Daytona) into the masked fields.
3. Save. The provider shows **credentials set** and becomes available wherever runtime/preview providers are selected.

## Related

- [Thread Runtime Providers](./04_thread-runtime-providers.md) — enable per-thread runtimes using these credentials
- [Preview Provider Settings](./06_preview-provider-settings.md) — managed preview providers
- [Runtimes & Providers](../04_running-agents/04_runtimes-and-providers.md) — runtime types and the BYO-key note
