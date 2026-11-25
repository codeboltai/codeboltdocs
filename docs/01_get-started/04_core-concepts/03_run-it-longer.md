---
displayed_sidebar: getStartedSidebar
sidebar_position: 3
title: Run It Longer
description: "How Codebolt supports longer work through loops, delegation, deposition, auto testing, guardrails, memory, and checkpoints."
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

**Deposition** means leaving durable traces for later turns or other agents. Examples include task status, event log entries, memory updates, file update intents, locks, comments, auto-testing records, and stigmergic signals such as pheromones. Auto testing is part of this deposition model: one agent can finish an implementation task and deposit the expected test suites or test cases, then another agent can later pick up those deposited tests, run them, update run case statuses and run step statuses, and attach logs. Deposited state prevents long work from depending only on transient model context.

## Guardrails

The active policy profile controls tool requests. For example, a file-write request can require approval even when the agent has access to the tool. A denied request blocks that action.

The agent loop controls how long the run continues. For a framework agent, set `maxTurns` in `createAgent` to bound the number of turns.

## Memory

Longer runs need memory beyond the current context window:

| Memory type | Use |
|---|---|
| **Thread history** | Keeps the current conversation coherent. |
| **Persistent memory** | Stores facts and preferences that should survive across runs. |
| **Vector memory** | Retrieves relevant documents, code chunks, and previous work by meaning. |
| **Knowledge graph** | Captures structured relationships in a project or domain. |
| **Event log** | Stores the events an agent or workflow explicitly records. |

Memory should be treated as working state, not magic. The agent still needs good instructions about what to store, retrieve, and trust.

## Checkpoints and rollback

When Desktop Chat saves a checkpoint for a user message, you can restore the captured project files from that message. Codebolt creates a backup of the current files before restoring the snapshot.

Checkpoints make it practical to let an agent attempt larger changes, inspect the result, and return to a known state if the direction is wrong.

## See also

- [Parallel Agents](../../02_using-codebolt/07a_parallel-agents/01_overview.md)
- [Memory & Context](../../02_using-codebolt/05d_memory/01_overview.md)
- [Guardrails](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md)
- [Stigmergic Coordination](../../02_using-codebolt/07d_stigmergic-coordination/01_overview.md)
- [Deposition Framework](../../03_guides/03_loops-and-deposition-engineering/deposition-framework.md)
