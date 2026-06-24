---
sidebar_position: 6
title: Cloud Environments
description: Environments are how Codebolt Cloud organizes where your agent runs. Set them up from the portal, group related work, and spawn isolated child environments.
---

# Cloud Environments

An **environment** is the logical container for where your agent runs — the project path, the repo, the sync strategy, and (optionally) a parent environment it was spawned from. Environments are how Cloud keeps parallel tasks isolated from each other and organized in the Environments tree.

Every runtime you see under **Agents → Environments** is an environment. The page groups them into three categories, and each can be the **parent** of further child environments.

## The three categories

The Environments tree groups every active runtime into one of three buckets. Knowing which bucket you're in tells you where the work is happening and how changes get back to your repo.

### Cloud Sandboxed Environments

These are sandboxes the **portal** created for you on a managed provider (E2B, Daytona, Runloop, or a self-hosted Docker host). They're the default when you pick **New** in Remote Chat and select a sandbox provider.

- Spawned from a template (E2B) or a provider workspace (Daytona / Runloop).
- Project path is usually `/home/user/<repo-name>`.
- Changes sync back via **Git** (clone → work → push) or **Review Merge Requests**.
- Auto-terminate after ~1 hour idle.

### Self Started Environments

These are runtimes **you** started yourself and connected to the portal — not on a managed sandbox provider. Examples:

- A local `codebolt --server` instance you launched on your laptop and registered with your cloud account.
- A worktree of a local project that syncs via **Workspace Sync**.
- Any runtime the portal learned about after the fact (no matching sandbox provider).

They appear under "Self Started" because the portal didn't create them — it only discovered them when they registered.

### Self-Hosted Runner Nodes

These are **machines** you connected to Cloud with the runner daemon (`codebolt runner daemon start`). The runner node is the host; the runtimes it hosts appear nested underneath it. See [Runner Nodes](./08_runner-nodes.md).

Runner-hosted runtimes have no idle timeout and run until you stop the daemon.

## Setting up an environment

### From Remote Chat (most common)

1. Go to **Agents → Remote Chat**.
2. Pick a runtime mode:
   - **Existing** — reuse a runtime that's already online.
   - **New** — create a fresh one.
3. If **New**, choose a provider (E2B sandbox, a Runner Node, a local workspace provider, etc.).
4. Optionally supply a **GitHub repo URL** and branch. The sandbox will clone it.
5. Pick a **sync mode** — see [Syncing Changes](./07_syncing-changes.md).
6. (Optional) Set an **environment path** if you want the work isolated in a sub-folder or worktree.
7. Choose an agent and start chatting.

The portal resolves the final **project path** for you (calling the server's `/runtimes/prospective-path` endpoint) and shows it before you confirm.

### From the CLI

```bash
# Connect your local machine as a runtime
codebolt runner daemon start --auth-token <your-cloud-auth-token>

# Or start a local server and register it
codebolt --server --project ./my-project
```

The runtime appears in the Environments tree within seconds.

## Environment identity

Every environment is tracked by several overlapping identifiers so the portal can reconcile live WebSocket connections with persisted records:

| Identifier | When it's set |
|---|---|
| `runtime_id` | Always present — the primary ID (e.g. `e2b-abc123`, `runner-<nodeId>-<rand>`, `cloud:<uuid>`) |
| `cloud_runtime_id` | Set for runtimes created through the cloud runtime API |
| `environment_id` | Set for environments created through the environments API |
| `sandbox_id` | The provider sandbox ID (E2B / Docker) |
| `project_path` / `resolved_path` | The working directory inside the sandbox |

The portal merges records that share any of these identifiers (plus matching paths and workspace), so the same physical runtime shows up once even if it was reported by multiple sources.

## Parent and child environments

Environments can form a **tree**. A child environment is one that was created *from* a parent — for example, an agent spawning an isolated worktree of the current project to try a risky change.

A child environment carries:

- `parent_runtime_id` / `parent_environment_id` — which environment it came from
- `parent_project_path` — the parent's working directory
- `instance_origin: child_environment`

### When children are useful

- **Parallel experiments** — spawn a worktree per hypothesis, keep the parent clean.
- **Agent sub-tasks** — an agent creates a child environment to isolate side work.
- **Preview vs execution** — keep the long-lived parent runtime and spin short-lived children for individual tasks.

Children always use **Workspace Sync** by default (since they share the parent's files) and appear nested under their parent in the Environments tree.

:::tip
The Environments tree shows counts next to each node: providers (`3p`), active threads (`2t`), and children (`4c`). Use these to spot busy or fork-heavy environments at a glance.
:::

## Preview Environments

The **Preview Environments** tab (separate from execution environments) lists live previews of artifacts the agent is building — websites, web apps, anything with a URL the agent can serve.

| Field | Meaning |
|---|---|
| **Status** | `starting` → `acknowledged` → `ready` (green), or `error` (red) |
| **Provider** | Which preview provider is serving it |
| **URL** | The live preview link — click to open in a new tab |
| **Sandbox** | The execution environment hosting it |

Previews are managed by a separate **PreviewHub** Durable Object on the Wrangler server. Stop a preview with the stop button — this tears down the preview session but leaves the execution runtime intact.

## Environments and workspaces

Every environment is scoped to a **workspace** — either your personal workspace or a team workspace. The Environments page only shows runtimes in your current workspace. The `workspace_id` and `workspace_type` travel with every runtime record and every API call, so team members only see team environments and personal work stays personal.

## See also

- [Syncing Changes](./07_syncing-changes.md) — how changes in an environment reach your repo
- [Runner Nodes](./08_runner-nodes.md) — connecting a machine
- [Runtimes & Providers](./04_runtimes-and-providers.md) — runtime types and lifecycle
