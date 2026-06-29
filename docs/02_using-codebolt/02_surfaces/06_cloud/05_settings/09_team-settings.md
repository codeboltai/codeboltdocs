---
sidebar_position: 9
title: Team Settings
description: Manage a shared Codebolt Cloud workspace — team profile in General and teammate membership in Members.
---

# Team Settings

**Team Settings** (`/settings/team`) configures a shared Codebolt Cloud workspace. A team workspace lets multiple people share environments, published items, and billing under one umbrella. (Visiting `/settings/team` redirects to `/settings/team/general`.)

There are two pages:

## General (`/settings/team/general`)

Team-level profile and configuration — the team name, identity, and workspace-wide defaults. This is the team counterpart to personal [General Settings](./01_overview.md). What you set here applies to everyone in the team workspace.

## Members (`/settings/team/members`)

Member management:

- **Invite** teammates by email or username
- **Roles** — assign roles that control what a member can do (e.g. admin vs. member). On self-hosted deployments, team-owned marketplace items can be restricted to admins — see [Teams → Roles](../../../09_account/02_teams.md#roles).
- **Remove** members who leave the team

Membership determines visibility: members see team environments, team-published items, and (for billing admins) team billing.

## Workspaces and environments

Every environment is scoped to a workspace — personal or team. The [Cloud Environments](../04_running-agents/02_environments.md) page only shows runtimes in your current workspace, and `workspace_id` / `workspace_type` travel with every runtime record. Switching to a team workspace is how a teammate's runners and chats become visible to you.

## See also

- [Settings Overview](./01_overview.md)
- [Plans, Usage & Billing](./08_subscription-plans-usage-billing.md) — team billing
- [Teams](../../../09_account/02_teams.md) — the broader teams guide
