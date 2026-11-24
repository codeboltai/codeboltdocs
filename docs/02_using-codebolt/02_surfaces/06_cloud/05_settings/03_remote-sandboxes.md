---
sidebar_position: 3
title: Remote Sandboxes
description: Bring your own API keys for E2B, Daytona, Runloop, Sprites, and Modal sandbox providers so cloud usage bills to your account.
---

# Remote Sandboxes

**Remote Sandboxes** (`/settings/remotesandboxes`) is where you bring your own credentials for the sandbox providers Codebolt Cloud can spin up. Supplying a key means sandbox usage **bills to your account** with that provider, not the hosted Codebolt tier.

Provider credentials are used by the following features:

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

Saving a field updates browser storage and sends the value to your account settings. When you open the field again, the portal loads the saved account value. If sync fails, the portal displays **Saved locally**. To remove a saved credential, use **Clear** on its field.

:::note
When Remote Chat creates an E2B sandbox with your key, the portal passes the key to the E2B SDK. Stopping an E2B sandbox you own requires the same E2B API key that created it. If the key is missing from local storage, the portal sends a graceful stop request but cannot destroy the sandbox directly.
:::

## Setting a credential

1. Open the provider's panel.
2. Paste the key (and server URL for Daytona) into the corresponding fields.
3. Select **Save** for each field. A checkmark indicates that at least one field has a saved value. For a thread runtime, also check that the provider is enabled in [Thread Runtime Providers](./04_thread-runtime-providers.md).

## Related

- [Thread Runtime Providers](./04_thread-runtime-providers.md) — enable per-thread runtimes using these credentials
- [Preview Provider Settings](./06_preview-provider-settings.md) — managed preview providers
- [Runtimes & Providers](../04_running-agents/04_runtimes-and-providers.md) — runtime types and the BYO-key note
