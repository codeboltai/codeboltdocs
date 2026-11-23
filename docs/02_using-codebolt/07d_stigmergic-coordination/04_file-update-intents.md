---
sidebar_position: 4
title: File Update Intents
description: A File Update Intent is a declaration — "I plan to modify these files for this reason" — that agents post before starting work
---

# File Update Intents

A **File Update Intent** is a declaration — "I plan to modify these files for this reason" — that agents post *before* starting work. Other agents read the active intents, detect overlap at the file level, and either coordinate, defer, or escalate depending on the **intent level** each side chose.

Where a [lock](./03_locks-and-unlock-requests.md) is entity-wide (the whole job, the whole review request) and binary (locked or not), an intent is file-scoped and graded. It's the primitive for "I'm probably going to touch `src/auth/login.ts` and `src/auth/session.ts` in the next ~30 minutes, priority 7" rather than "mine until further notice."

File update intents are managed by `fileUpdateIntentService` on the server and exposed under `/file-update-intents`. The `files_blocked` pheromone (see [Pheromones](./02_pheromones.md#default-pheromone-types)) is the bridge — when an agent's files are reserved at level 4 by someone else, a `files_blocked` pheromone surfaces that up to the entity level.

## Create an intent in the desktop app

Open **Environment**, open the environment in a panel, and select **File Intents**. Choose **Create**, describe your change, and add the path and intent level for each file. For example, add an advisory intent for a README update so collaborators can see which file you plan to edit. Select **Create** to save it and look for it in the same tab.

## Anatomy of an intent

```ts
{
  id: "uuid",
  environmentId: "env-42",
  claimedBy: "agent-reviewer",
  claimedByName: "Reviewer",
  files: [
    { filePath: "src/auth/login.ts", intentLevel: 2 },
    { filePath: "src/auth/session.ts", intentLevel: 4, targetSections: ["createSession"] }
  ],
  description: "Fixing session expiry bug",
  priority: 7,            // 1–10, higher = more important
  autoExpire: true,
  maxAutoExpireMinutes: 30,
  expiresAt: "...",
  status: "active"        // active | completed | expired | cancelled
}
```

Each file line has its own `intentLevel`, so one intent can be advisory on some files and exclusive on others.

## The four intent levels

| Level | Name | Behaviour on overlap | Use case |
|---|---|---|---|
| **1** | Advisory / Notification | Just informs others; overlapping agents proceed but log a warning | Low-risk, exploratory changes |
| **2** | Soft Reservation | Agents should prefer to pick another task or negotiate if overlap | Default for most coding swarms |
| **3** | Priority-Based | Higher `priority` wins; the lower-priority one backs off or escalates | Urgent fixes vs. feature work |
| **4** | Hard Lock | Blocks others entirely (traditional exclusion) | Critical or sensitive files |

Levels are per-file, not per-intent. A typical pattern is to mark the file you'll rewrite as L4 and the surrounding files you might touch as L2.

## Overlap detection

Before starting, an agent calls `POST /file-update-intents/check-overlap` with a proposed file list. The server returns:

```ts
{
  hasOverlap: true,
  canProceed: false,                 // L4 blocks override canProceed
  blockedFiles: ["src/auth/session.ts"],
  overlappingIntents: [
    {
      intentId: "...",
      claimedBy: "agent-other",
      claimedByName: "Other",
      files: ["src/auth/session.ts", "src/auth/middleware.ts"],
      intentLevels: [4, 2],
      priority: 5
    }
  ],
  message: "Cannot proceed: 1 file(s) are hard-locked (level 4)"
}
```

Overlap is a set intersection on `filePath`. The calling agent uses `canProceed` + `blockedFiles` + `intentLevels` to decide: advise the user, pick a different task, negotiate, or wait for the existing intent to complete.

## Lifecycle

```
create (POST /)  →  active  →  complete (POST /:id/complete)
                          →  cancel   (POST /:id/cancel)
                          →  expire   (auto, if autoExpire=true and now > expiresAt)
```

- **Active** intents are the ones overlap checks consider.
- **Complete** is the normal exit: the agent finished the work.
- **Cancel** is voluntary retraction.
- **Expired** is automatic when `autoExpire: true` and `expiresAt` passes — useful when agents crash or stall.

Expiry is lazy: the server checks expiry on read. Set `autoExpire: true` with a sensible `maxAutoExpireMinutes` (default 60) so a crashed agent doesn't block others forever.

## HTTP surface

| Method & path | Purpose |
|---|---|
| `POST /file-update-intents` | Create a new intent (`CreateFileUpdateIntentRequest`) |
| `GET /file-update-intents` | List intents, filterable by `environmentId`, `status`, `claimedBy`, `filePathContains`, date range |
| `GET /file-update-intents/:id` | Single intent |
| `PUT /file-update-intents/:id` | Update files/priority/description/autoExpire |
| `POST /file-update-intents/:id/complete` | Mark completed |
| `POST /file-update-intents/:id/cancel` | Cancel |
| `DELETE /file-update-intents/:id` | Delete |
| `POST /file-update-intents/check-overlap` | Pre-flight overlap check |
| `GET /file-update-intents/blocked-files` | All currently hard-locked (L4) files |
| `GET /file-update-intents/files-with-intents` | Every file touched by an active intent |
| `GET /file-update-intents/agent/:agentId` | All intents held by one agent |

A WebSocket channel (`fileUpdateIntentSocket`) streams create/update/complete/cancel/expire events so agents see intent changes in real time.

## How this composes with other primitives

- **Pheromones.** An L4 block surfaces as a `files_blocked` pheromone on the parent entity (job, review request). Other agents scanning the entity level see the block without needing to query `/blocked-files` directly.
- **Locks.** An entity lock is the right primitive when "no agent touches this job until I'm done". A file update intent is the right primitive when "don't edit these specific files while I'm in them". Often both coexist: lock the job, intent the files.
- **Unlock requests.** Intents don't have unlock requests — to release an intent's hold, ask the agent to `complete` or `cancel` it.

## When to reach for intents vs locks vs pheromones

| Situation | Reach for |
|---|---|
| "Don't run this job in parallel with me" | [Lock](./03_locks-and-unlock-requests.md) on the job |
| "I plan to edit these files; coordinate at the file level" | **File Update Intent** |
| "I'm touching these files right now — hard-reserve them" | **File Update Intent, level 4** |
| "Soft-reserve these files; negotiate on overlap" | **File Update Intent, level 2** |
| "Priority 8 fix vs. a priority 4 feature's files" | **File Update Intent, level 3** with matching `priority` |
| "Nudge other agents away from a job" | [Pheromone](./02_pheromones.md) (`saturation`, `importance`, etc.) |

## Related

- [Pheromones](./02_pheromones.md) — the `files_blocked` pheromone surfaces L4 blocks to the entity level
- [Locks & Unlock Requests](./03_locks-and-unlock-requests.md) — coarse, entity-wide exclusion
- [Stigmergic Coordination Overview](./01_overview.md)
