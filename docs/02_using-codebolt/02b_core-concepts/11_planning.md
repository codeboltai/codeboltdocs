---
sidebar_position: 11
title: The Planning System
description: A stack of complementary artifacts — Roadmap, Specs, UI Flow, Requirement Plan, Action Plan, Tasks.
---

import PlanningOverview from '@site/src/components/diagrams/PlanningOverview';

# The Planning System

Most tools treat planning as a single thing — a list, a board, a document. Codebolt treats it as a **stack of complementary artifacts**, each optimised for a different horizon, format, and audience.

<PlanningOverview />

## Why multiple artifacts?

Software needs to be understood at several levels at once:

- **What should we build?** — product intent, prioritization, tradeoffs
- **How should it behave?** — precise interface and logic specification
- **What should it look like?** — screens, flows, component structure
- **How will we build it?** — the execution sequence, dependencies
- **What is being done right now?** — live task status

No single format serves all five. Codebolt uses a distinct artifact for each and connects them explicitly.

## The six artifacts

| Artifact | Answers | Primary author |
|---|---|---|
| **Roadmap** | What & why (phases, features, ideation) | Human |
| **Specs** | How it should behave (interface contracts, constraints) | Human |
| **UI Flow** | What it looks like (wireframes, screen flows) | Human |
| **Requirement Plan** | Aggregates the above into one readable document | Human |
| **Action Plan** | How we'll build it (executable dependency graph) | Agent |
| **Tasks** | What's happening right now (live status) | Agent |

### Composing the stack

The artifacts are independent — use just a Task list, or compose the full stack:

```
Roadmap feature             ← human decides what to build
  └─ Requirement Plan       ← aggregates the full specification
       ├─ Spec              ← what it should do
       ├─ UI Flow           ← what it should look like
       └─ Action Plan       ← how the agent will build it
            └─ Tasks        ← live execution status
```

## Agent readability is a first-class property

Every artifact is a plain file in the project, so agents automatically read them as context — the same way a human consults a spec before coding. The `codeboltjs` SDK exposes every artifact via a typed API, so agents can also **write** them.

![Roadmap](/productImages/planning/roadmap.png)

![Specs](/productImages/planning/specs.png)

![Action plan](/productImages/planning/action_plan.png)

![Tasks](/productImages/planning/tasks.png)

→ **Read the full concept page: [The Planning System](../../02_concepts/08_planning/01_planning-system.md)**

## See also

- [Agents](./03_agents.md)
- [Multi-Agent Patterns](./10_multi-agent.md)
