---
sidebar_position: 2
title: Connectors
description: Connect external systems like GitHub to Codebolt Cloud so agents can clone repos, push branches, and open pull requests.
---

# Connectors

**Connectors** (`/settings/connectors`) link Codebolt Cloud to external systems your agents need — today that's **GitHub**, with room for more (task trackers, email, workflow sync) as the connector list grows.

Connect GitHub before using Git-synced [Cloud Environments](../04_running-agents/02_environments.md) or [Review Merge Requests](../04_running-agents/06_review-merge-requests.md).

## GitHub

The GitHub connector installs the **Codebolt GitHub App** on a user or organization account. Once installed, Codebolt uses short-lived **installation tokens** for:

- **Clone** — private repos you've granted access to
- **Push** — branches the agent creates
- **PR creation** — opening upstream GitHub Pull Requests from [Review Merge Requests](../04_running-agents/06_review-merge-requests.md)

### Connecting

1. Go to **Settings → Connectors** and click **Connect GitHub**.
2. GitHub asks you to install the Codebolt App on a user or org account and pick which repositories it can access.
3. After the OAuth round-trip (with a state token to prevent CSRF), you land back on the connector page showing **Connected** with:
   - **Installation ID** — GitHub's identifier for the install
   - **Account** — the user or org you installed it on
   - **Repository Access** — `all`, `selected`, or similar selection

### Managing and disconnecting

- **Manage Install** — re-opens GitHub's app settings to change repository access.
- **Disconnect** — removes the connector. Subsequent Git operations will fall back to per-session OAuth tokens or fail until reconnected.

:::note
The GitHub App install URL is set by the `VITE_GITHUB_APP_SLUG` build variable. If **Connect GitHub** is disabled with a "not configured" warning, the portal build needs that variable set and redeployed.
:::

## OAuth callback

The connector completes via `/settings/connectors/github/callback`. The callback verifies the state token, persists the installation ID and account info, and redirects back to the connector page.

## See also

- [Review Merge Requests](../04_running-agents/06_review-merge-requests.md) — the workflow that needs GitHub most
- [Syncing Changes](../04_running-agents/03_syncing-changes.md) — the `github_pr` git transport
- [Cloud Environments](../04_running-agents/02_environments.md)
