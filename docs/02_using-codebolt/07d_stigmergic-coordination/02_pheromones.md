---
sidebar_position: 2
title: Pheromones
description: A pheromone is a typed signal that an agent or user deposits on a shared entity (a job, a review request, etc.) to influence what other agents do next
---

# Pheromones


A **pheromone** is a typed signal that an agent or user deposits on a shared entity (a job, a review request, etc.) to influence what other agents do next. Any agent reading the entity sees the current pheromone load and reacts — there is no central scheduler.

Pheromone types are project-level coordination settings. The default types are available automatically, and custom types can be added from **Settings -> Pheromones** when your team needs a project-specific signal.

![Pheromones](/productImages/StigmergicCoordination/pheromones.png)


## What a pheromone contains

A pheromone deposit is a signal with a type, strength, owner, and lifetime:

| Part | Meaning |
|---|---|
| Type | What the signal means, such as `importance`, `saturation`, or a custom type. |
| Intensity | How strong the signal is, from 0 to 10. Higher values should mean stronger intent. |
| Depositor | The user or agent that added the signal. |
| Time | When the signal was deposited. |
| Decay | Whether the signal fades over time or stays until removed. |

A single agent can hold **one deposit per type per entity** — depositing again of the same type from the same agent updates the existing deposit rather than stacking.

## The lifecycle: deposit → decay → aggregate → action

A pheromone moves through four phases:

1. **Deposit** — an agent writes a pheromone with an initial intensity `I₀`.
2. **Decay** — the intensity fades over time by `I(t) = I₀ · e^(-λ·t)` where `λ` is the decay rate. Stale signals self-clean.
3. **Aggregate** — multiple deposits of the same type sum: `I_total(j, t) = Σᵢ Iᵢ(j, t)`. Many weak signals can combine into a strong one.
4. **Action** — an agent reading the entity reacts to the aggregated, decayed intensity (typically against a threshold) and picks a next action.

A single agent can hold only **one deposit per type per entity** — depositing the same type again from the same agent updates the existing deposit rather than stacking. Aggregation is therefore across *different* depositors.

A pheromone with high `decayRate` is good for "I am actively doing this right now" signals: if the agent stops refreshing, the signal disappears on its own. A pheromone with `decayRate = 0` is a persistent marker — use it when the signal must be removed explicitly.

## Temporal layers

Grouping the default types by decay rate gives a practical lens — signals at different decay rates serve different coordination horizons:

| Layer | Decay rate | Persists for | Examples |
|---|---|---|---|
| **Permanent** | 0 | Until removed | `request_split`, `importance`, `task_not_ready`, `files_blocked`, `reviewadded` |
| **Slow** | 0.05 | Hours | `saturation`, `available` |
| **Moderate** | 0.1 | ~1 hour | `takeup_interest` |
| **Fast** | 0.2 | Minutes | `workingonit` |

Pick the layer that matches the *meaning* of your signal. "This is important" is persistent; "I'm on it right now" should fade fast and require the agent to refresh it if still working.

## Default pheromone types

The server ships nine default types. They cover the common coordination scenarios and cannot be removed (but custom types can be added alongside them).

| Type | Meaning | Default decay | Good for |
|---|---|---|---|
| `request_split` | This entity should be split into smaller parts | 0 | Signalling scope is too large |
| `importance` | Priority/importance signal | 0 | Nudging the queue without editing priority |
| `saturation` | Entity is being worked on or is saturated with agents | 0.05 (slow) | "Enough hands on this already — go elsewhere" |
| `takeup_interest` | Interest in taking this up | 0.1 (moderate) | Soft bid before a formal bid |
| `task_not_ready` | Entity has blocking dependencies | 0 | "Don't start this yet" |
| `available` | Blockers are resolved, entity is available again | 0.05 (slow) | Counter-signal to `task_not_ready` |
| `files_blocked` | Required files reserved by another agent via File Update Intent | 0 | Soft warning that a lock sits upstream |
| `workingonit` | An agent is actively working on this | 0.2 (fast) | Live "in progress" signal; auto-fades if not refreshed |
| `reviewadded` | A review was added (may trigger deliberation) | 0 | Persistent review marker |

`saturation` is the signal to reach for when an entity is "full" — enough agents are already on it and new arrivals should pick something else. It decays slowly so it lingers past the moment of deposit but still fades if the work wraps up.

## Custom pheromone types

Use a custom pheromone type when the default signals do not describe the coordination state your project needs.

For example, a project might add:

| Custom type | Why it exists |
|---|---|
| `needs_security_review` | Marks work that should wait for a security-focused pass. |
| `customer_blocker` | Marks work that is blocking a customer-facing issue. |
| `docs_needed` | Marks implementation work that still needs documentation. |

A custom type defines the vocabulary of the signal. It does not deposit the signal by itself. After the type exists, users and agents can deposit it on jobs and review requests just like a default pheromone.

### Why create one

Create a custom type when:

- The signal is repeated across many jobs or review requests.
- Agents should be able to react to the signal consistently.
- The signal is not just a one-off comment.
- The team needs a visible badge, color, and shared name for that state.

Do not create a custom type for every small note. Use comments or job descriptions for one-off context.

### Create a custom type from the UI

![Add custom pheromone type](/productImages/StigmergicCoordination/add-custom-pheromones.png)

1. Open **Settings**.
2. Select **Pheromones**.
3. Click **Add Type**.
4. Enter a **Name**. This is the identifier, for example `needs_security_review`.
5. Enter a **Display Name**. This is what users see in the UI, for example `Needs Security Review`.
6. Add an optional **Description**.
7. Pick a **Color** for the badge.
8. Click **Add Type**.

Codebolt normalizes the name to a lowercase identifier with underscores. Default types are locked and cannot be removed. Custom types appear under **Custom Types** and can be removed from the same settings screen.

### Use the custom type

After creating the type:

1. Open a job or review request.
2. Find the **Pheromones** section.
3. Click the add/deposit control.
4. Select your custom type.
5. Choose an intensity.
6. Deposit the pheromone.

The custom signal appears in the pheromone badges, job list summaries, and heatmap views wherever pheromones are shown.

### Create a custom type with the API

For automation, the same type management is available through the jobs API:

```http
GET    /jobs/pheromone-types
POST   /jobs/pheromone-types
DELETE /jobs/pheromone-types/:name
```

Create a type with:

```json
{
  "name": "needs_security_review",
  "displayName": "Needs Security Review",
  "description": "Flag work that needs a security-focused pass",
  "color": "#DC2626"
}
```

The normal UI/API path uses `name`, `displayName`, `description`, and `color`. Open job views receive the updated type list automatically.

## Depositing, viewing, and removing

### From the UI

Open the entity (a job in the Jobs panel, a request in the Review/Merge panel). The right-hand detail view shows a **Pheromones** section with:

- A colour-coded badge per active type, sized by aggregated intensity
- The list of individual deposits (who, when, at what intensity)
- A **+ Deposit** button to add a new pheromone with type and intensity 0–10
- A **×** control to remove your own deposit

### From the HTTP API

Each coordinated entity exposes the same CRUD surface. For jobs:

```http
GET    /jobs/:id/pheromones                 # raw list
GET    /jobs/:id/pheromones/aggregated      # grouped by type with totals
POST   /jobs/:id/pheromones                 # { type, intensity?, depositedBy?, decayRate? }
DELETE /jobs/:id/pheromones/:type           # remove all of a type, or yours only
```

Similar routes exist under `/review-merge-requests/:id/pheromones`.

### From agent code

The SDKs wrap the same calls — see [`jobs.depositPheromone`](../../05_reference/03_plugin-sdk/02_api-reference/job/depositPheromone.md), [`jobs.getPheromonesAggregated`](../../05_reference/03_plugin-sdk/02_api-reference/job/getPheromonesAggregated.md), and the similar surface on the review-merge socket.

## Querying by pheromone

Need a list of entities matching a signal? The server exposes `GET /jobs/pheromones/:type/jobs` to list jobs that currently carry a given pheromone. Combine with the UI filter bar to build views like *"all jobs tagged `importance >= 5`"* or *"everything with `task_not_ready` right now"*.

## Good stigmergic signals

A few practical rules of thumb:

- **Prefer decay.** A signal that fades on its own is self-correcting; a signal with zero decay must be cleaned up.
- **Keep intensity meaningful.** The 0–10 range is only useful if agents treat `9` differently from `2`. If every deposit is `1`, use the aggregation count instead.
- **Pair signals.** `task_not_ready` + `available` are a paired signal; depositing one typically replaces the other. Design custom types in pairs when the signal has a natural on/off.
- **Let the decay rate match the meaning.** "I'm working on this right now" should fade fast. "This is important" should not fade at all. Use the defaults as a guide.

## Related

- [Locks & Unlock Requests](./03_locks-and-unlock-requests.md) — hard exclusion when signals are not enough
- [Jobs](../07c_agent-coordination/02_jobs.md) — the primary coordinated entity
- [Stigmergy Swarm (concepts)](../../02_concepts/07_multi-agent/04_stigmergy-swarm.md) — the full theory, decay/aggregation formulas, and scaling model
