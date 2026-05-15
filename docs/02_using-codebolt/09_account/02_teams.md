---
sidebar_position: 2
title: Teams
description: Teams are groups of users who share workspaces, projects, agents, and billing. The pattern for organisations using Codebolt collaboratively.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Teams

Teams are groups of users who share workspaces, projects, agents, and billing. The pattern for organisations using Codebolt collaboratively.

## Team vs individual

| | Individual | Team |
|---|---|---|
| Users | 1 | Many |
| Workspaces | Personal | Shared |
| Projects | Personal | Shared |
| Agents | Personal install | Shared portfolio |
| Memory | Per-user | Optionally shared |
| Billing | Personal | Per-team |
| Admin | You | Designated admins |

An individual can be a member of multiple teams and have their own personal workspace alongside.

## Creating a team

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Teams → Create team.** Name the team, invite initial members by email, pick a billing plan (hosted) or pick from existing identity-provider groups (self-hosted).

</TabItem>
<TabItem value="oidc" label="OIDC sync">

On self-hosted with OIDC/SAML, teams are typically mapped from identity-provider groups automatically. Configure in `codebolt-server.yaml`:

```yaml
auth:
  oidc:
    group_to_team:
      "platform-engineers": "Platform Team"
      "data-team":          "Data Team"
```

When a user signs in, their groups are read from the OIDC token and they're added to the matching teams.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/teams
{ "name": "Platform Team", "admins": ["alice@my-org.com"] }
```

</TabItem>
</Tabs>

## Inviting members

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Teams → Members → Invite.** Enter email addresses. Invitees receive an invite link.

</TabItem>
<TabItem value="oidc" label="OIDC sync">

For OIDC-based teams, membership is managed at the identity provider (group membership in Google Workspace, Entra, etc.), not in Codebolt. Add the user to the right group in your IdP and they'll be in the team next time they sign in.

</TabItem>
</Tabs>

## Roles

Three default roles:

- **Owner** — can change team settings, manage billing, delete the team.
- **Admin** — can invite members, manage portfolios, configure guardrails.
- **Member** — normal use; can create projects, run agents, but can't change team-level settings.

Custom roles are supported on self-hosted for more granular permissions.

## Shared workspaces

A team workspace is visible to every team member. Projects created in it are team projects.

- Team members can open the same project concurrently.
- Agent runs are visible to everyone (though you can configure per-user privacy).
- Persistent memory can be shared or per-user (admin decides).
- The knowledge graph is shared — everyone benefits from everyone's work.

## Per-user vs shared memory

**Settings → Team → Memory** controls what's shared:

- **Fully shared** — all memory layers visible to all members.
- **Shared persistent, private episodic** — persistent memory is shared; chat history is per-user.
- **Fully private** — nothing shared between users.

For most teams, **shared persistent, private episodic** is the right default. Decisions and project conventions are shared; personal chat history isn't.

## Shared portfolios

The team can curate a shared agent portfolio:

- **Approved agents** for the team — only these show up in pickers for team projects.
- **Required agents** — auto-installed for every member.
- **Forbidden agents** — explicitly blocked even if a member tries to install.

Admins manage this in **Settings → Team → Agent portfolio**.

## Shared guardrails

Team-wide guardrail policies apply to everyone. Members can add more guardrails for their own projects but can't weaken the team ones. This is the enforcement mechanism for "no agent in this org can push to main" / "no agent can read production secrets" / etc.

## Billing

Team plans are billed per-member or per-usage depending on your agreement. See [Usage and Billing](./03_usage-and-billing.md).

## Removing members

**Settings → Teams → Members → Remove.** Their access ends immediately. Their contributions to the team (agent runs, memory, history) are preserved by default — you can configure whether to transfer ownership or purge them.

For OIDC-managed teams, removing a member from the OIDC group is usually sufficient; Codebolt will revoke access on next session check.

## Dissolving a team

**Settings → Team → Delete team.** Requires owner confirmation. All shared data is either archived or deleted (you pick). Individual member accounts are not affected.

## See also

- [Authentication & Authorization](./01_authentication-and-authorization.md)
- [Workspace](./03_workspace.md)
- [Usage and Billing](./03_usage-and-billing.md)
