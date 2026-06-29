---
sidebar_position: 7
title: Login Tokens
description: Personal access tokens you can paste into the CLI, HTTP API, or the runner daemon to authenticate as your account.
---

# Login Tokens

**Login Tokens** (`/settings/loginTokens`) are personal access tokens (PATs) you create to authenticate as your account where a browser sign-in isn't possible — the CLI, the HTTP API, and the runner daemon.

## Creating a token

1. Go to **Settings → Login Tokens**.
2. Click **Create** and give the token a **name** (e.g. "laptop-runner", "ci-deploy").
3. Choose an **expiry**:
   - 30 days
   - 90 days
   - 1 year
   - No expiry
4. The portal shows the token **once**. Copy and store it securely — you can't retrieve it again after closing the dialog.

## Where to use a token

| Surface | How |
|---|---|
| **Runner daemon** | `codebolt runner daemon start --auth-token <token>` — see [Runner Nodes](../04_running-agents/05_runner-nodes.md) |
| **CLI** | Pass as the auth token for `codebolt` commands authenticating against the cloud |
| **HTTP API** | `Authorization: Bearer <token>` against `https://api.codebolt.ai/api` |
| **Remote agent** | The `appToken` / cloud auth token a self-executed remote agent needs — see [Remote Chat](../04_running-agents/01_remote-chat.md) |

## Managing tokens

- **Name** — label so you remember what each token is for.
- **Expiry** — shown so you can rotate before it lapses.
- **Revoke** — immediately invalidates a token. Use this if a token leaks or a machine is decommissioned.

Treat tokens like passwords: scope names to their purpose, prefer short expiries for sensitive uses, and revoke anything unused.

## See also

- [Runner Nodes](../04_running-agents/05_runner-nodes.md) — primary consumer of login tokens
- [Remote Chat](../04_running-agents/01_remote-chat.md) — the `appToken` env var
- [Authentication & Authorization](../../../09_account/01_authentication-and-authorization.md)
