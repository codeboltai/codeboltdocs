---
sidebar_position: 3
title: Locks & Unlock Requests
description: Locks are the strong, exclusive counterpart to pheromones
---

# Locks & Unlock Requests

![Locks and Unlock Requests](/productImages/StigmergicCoordination/lock_unlock.png)

Locks are the strong, exclusive counterpart to [pheromones](./02_pheromones.md). Where a pheromone is a soft signal ("this is important", "I'm interested"), a **lock** is a hard claim: while an agent holds it, no other agent may modify the entity. When another agent needs that entity, it files an **unlock request** the holder can approve or reject.

Locks are handled by the same `coordinationService` that manages pheromones. Every coordinated entity (jobs, review merge requests) gets an optional `lock` field and an `unlockRequests` list.

## Manage a job lock in the desktop app

Open **Tools → Jobs** and select a job. In **Lock Status**, choose **Lock Job** to claim an unlocked job. If the job is held by another agent, choose **Request Unlock**, enter the reason, and select **Submit Request**. Existing requests appear in **Unlock Requests** with **Approve** and **Reject** actions where available.

## Acquiring a lock

When an agent starts active work on an entity, it acquires the lock:

```ts
// on the server
coordinationService.acquireLock(currentLock, agentId, agentName);
```

If the entity is already locked, the call throws `Entity is already locked by <holder>`. Only one agent holds the lock at a time.

The resulting lock carries:

| Field | Meaning |
|---|---|
| `lockedBy` | ID of the agent holding the lock |
| `lockedByName` | Optional display name |
| `lockedAt` | ISO timestamp when it was acquired |

## Releasing a lock

Only the current holder can release the lock:

```ts
coordinationService.releaseLock(currentLock, agentId);
```

Calling from a different agent throws `Only the lock holder (<holder>) can unlock this entity`. On release, the `lock` field is set back to `null`.

If the holding agent crashes, the lock stays. Use a stale-agent sweep (heartbeat-based) or a human override to clean up.

## Unlock requests

When agent A needs an entity that agent B has locked, A **requests** an unlock rather than forcibly taking it:

```ts
coordinationService.addUnlockRequest(requests, currentLock, {
    requestedBy: 'agent-a',
    requestedByName: 'Agent A',
    reason: 'Need to apply a conflicting file edit',
});
```

The request carries:

| Field | Meaning |
|---|---|
| `id` | UUID |
| `requestedBy` / `requestedByName` | Who is asking |
| `reason` | Why unlock is needed — always required |
| `requestedAt` | ISO timestamp |
| `status` | `pending`, `approved`, or `rejected` |
| `respondedAt` / `respondedBy` | Who answered and when |

### Approving an unlock request

Only the lock holder can respond:

```ts
coordinationService.approveUnlockRequest(requests, currentLock, requestId, agentId);
// → returns { requests, releaseLock: true }
```

Approval both updates the request to `approved` and signals the caller to release the lock (`releaseLock: true`). The usual pattern is: the holder finishes its current step, approves the request, and the service releases the lock in the same transaction.

### Rejecting an unlock request

```ts
coordinationService.rejectUnlockRequest(requests, currentLock, requestId, agentId);
```

Marks the request `rejected` with `respondedAt` and `respondedBy`. The lock stays in place. The requesting agent sees the rejection and typically deposits a `task_not_ready` pheromone on its own blocked work and moves on.

### Deleting a request

If the requesting agent no longer needs the entity (e.g., it found a workaround), it can delete its pending request:

```ts
coordinationService.deleteUnlockRequest(requests, requestId);
```

## Lock vs pheromone — when to reach for which

| Situation | Use |
|---|---|
| "I intend to start on this, so deprioritise for others" | `takeup_interest` [pheromone](./02_pheromones.md) |
| "I'm actively editing this right now, exclusive" | **Lock** |
| "This entity is already being worked on by many agents — don't pile on" | `saturation` pheromone |
| "No one else should touch `foo.ts` until I commit" | **Lock** (plus `files_blocked` pheromone to signal upstream) |
| "I'd like the holder to finish soon and hand this over" | **Unlock request** |

Locks are expensive — they stop other work. Prefer pheromones when the signal is advisory; reserve locks for the moments where contention must be resolved definitively.

## HTTP / SDK surface

The routes below exist on each coordinated entity's router (examples shown on `/jobs/:id`; analogous routes exist for review merge requests):

```http
POST   /jobs/:id/lock                       # acquire — { agentId, agentName? }
POST   /jobs/:id/unlock                     # release (must be holder)
GET    /jobs/:id/unlock-requests            # list requests
POST   /jobs/:id/unlock-requests            # file a request
POST   /jobs/:id/unlock-requests/:reqId/approve
POST   /jobs/:id/unlock-requests/:reqId/reject
DELETE /jobs/:id/unlock-requests/:reqId
```

## Related

- [Pheromones](./02_pheromones.md) — the soft signalling counterpart
- [Jobs](../07c_agent-coordination/02_jobs.md) — the primary coordinated entity
- [Stigmergy Swarm (concepts)](../../02_concepts/07_multi-agent/04_stigmergy-swarm.md) — broader theory and scaling model
