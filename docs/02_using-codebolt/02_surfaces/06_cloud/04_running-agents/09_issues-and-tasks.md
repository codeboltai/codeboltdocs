---
sidebar_position: 9
title: Issues & Tasks
description: The portal's ticket system for assigning issues to agents, tracking work, and proposing environment changes — with All Issues and My Issues views.
---

# Issues & Tasks

The **Tasks** page (**Agents → Tasks** in the portal) is Codebolt Cloud's built-in issue tracker. Issues are ticket-style work items you can assign to agents, and agents can raise issues back to you. It's the coordination surface between human plans and agent execution.

## The two views

| View | Shows |
|---|---|
| **All Issues** | Every issue in the current workspace |
| **My Issues** | Issues assigned to you |

Each issue shows its title, status, assignee, linked agent, and the runtime/environment it's tied to. Filter and search to narrow the list.

## The issue lifecycle

An issue moves through a ticket lifecycle: it's created, assigned to an agent (or a human), picked up by a runtime, worked on, and closed. Key events:

- **Assignment** — assigning an issue to an agent triggers the local `RoutingGateway` (on a local/runner runtime) or a cloud dispatch to start the appropriate agent against it.
- **Environment change** — the agent may propose switching or creating an environment to work on the issue (e.g. spinning a worktree). The **Environment Change** modal lets you approve or reject that proposal.
- **Resolution** — the agent (or you) closes the issue when the work is done, often after a Review Merge Request lands.

## Creating an issue

Click **Create** to open the create modal and fill in:

- **Title / Description** — the work to do
- **Assignee** — an agent or a human teammate
- **Project / Runtime** — where the work should happen
- **Labels / Priority** — for triage

Once created, an issue assigned to an agent becomes actionable immediately — the runtime picks it up and begins.

## Environment changes

When an agent needs a different working context to solve an issue, it proposes an environment change via the **Task Environment Change** modal. You can:

- **Approve** — let the runtime create/switch the environment (e.g. a child worktree).
- **Reject** — keep the current environment.

This keeps humans in control of where work happens, especially for risky or parallel branches. See [Cloud Environments](./02_environments.md) for parent/child environments.

## Tasks and the routing gateway

On local and runner runtimes, the `RoutingGateway` watches for issue assignments and starts the matching agent. This is what makes the portal a control plane: you assign work in the browser, and execution happens on your hardware. On cloud sandboxes, assignment dispatches a new thread.

## See also

- [Remote Chat](./01_remote-chat.md) — ad-hoc agent runs
- [Cloud Environments](./02_environments.md) — where issues get worked
- [Review Merge Requests](./06_review-merge-requests.md) — closing the loop on issue work
- [Inbox](./08_inbox.md) — agent-raised notifications
