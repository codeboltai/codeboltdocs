---
sidebar_position: 3
title: Run It Longer
description: "How Codebolt supports longer work through loops, delegation, deposited state, guardrails, memory, and checkpoints."
---

# Run It Longer

Longer work is different from a quick chat turn. The agent needs to loop, preserve state, recover from mistakes, coordinate with other work, and stay inside project constraints.

## Loops

An agent run is a loop:

1. Assemble context.
2. Call the model.
3. Choose a tool or response.
4. Apply guardrails.
5. Execute the action.
6. Observe the result.
7. Decide whether to continue.

Short tasks may complete in one or two turns. Longer tasks repeat this loop until the goal is done, a budget is reached, a guardrail blocks the run, or the user intervenes.

## Delegation and deposition

As work gets longer, the agent should not keep everything in a single private scratchpad.

**Delegation** means assigning parts of the work to sub-agents, background agents, or specialized flows. This is useful when tasks can run in parallel, need different skills, or need review before merging.

**Deposition** means leaving durable traces for later turns or other agents. Examples include task status, event log entries, memory updates, file update intents, locks, comments, and stigmergic signals such as pheromones. Deposited state prevents long work from depending only on transient model context.

## Guardrails

Guardrails matter more as runs get longer. They can:

- block dangerous tool calls
- rewrite unsafe paths or arguments
- pause for human approval
- enforce budget limits
- detect repetitive loops
- prevent edits outside the intended scope

Guardrails are how Codebolt lets agents work for longer without silently expanding the blast radius.

## Memory

Longer runs need memory beyond the current context window:

| Memory type | Use |
|---|---|
| **Thread history** | Keeps the current conversation coherent. |
| **Persistent memory** | Stores facts and preferences that should survive across runs. |
| **Vector memory** | Retrieves relevant documents, code chunks, and previous work by meaning. |
| **Knowledge graph** | Captures structured relationships in a project or domain. |
| **Event log** | Records what happened so runs can be inspected and evaluated. |

Memory should be treated as working state, not magic. The agent still needs good instructions about what to store, retrieve, and trust.

## Checkpoints and rollback

Longer runs need recovery points. Codebolt records file-changing work so users can roll back a bad turn without treating the real git history as the only undo mechanism.

Checkpoints make it practical to let an agent attempt larger changes, inspect the result, and return to a known state if the direction is wrong.

## See also

- [Parallel Agents](../../02_using-codebolt/07a_parallel-agents/01_overview.md)
- [Memory & Context](../../02_using-codebolt/07_memory/01_overview.md)
- [Guardrails](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md)
- [Stigmergic Coordination](../../02_using-codebolt/07d_stigmergic-coordination/01_overview.md)
