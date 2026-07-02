---
sidebar_position: 7
title: Steps and Steering
description: Add queued next steps to a running thread or steer the active agent with live instructions.
---


# Steps and Steering

Steps and Steering are two ways to guide an agent after a thread has already started.

- **Next Step** queues additional work for the thread.
- **Steering** sends live guidance to the currently running agent.

Use **Next Step** when you want the agent to continue with another instruction after the current work. Use **Steering** when the agent is already running and you need to redirect its current approach.

## Next Step

When a thread is processing, the chat composer can submit your input as a **next step** instead of a normal message. Codebolt stores the step on the thread with status `pending`.

New next steps do not immediately interrupt the agent. They are added to the thread's step list and can be started or steered from the activity area.

## How next steps work


The next executable step is the first step in the thread whose status is `pending`.

When a step is started, Codebolt activates that step, builds a normal user message from the step text and metadata, adds it to chat history, and passes it to the agent for processing.

## Steering

Steering is different from adding a next step. A steering instruction is delivered to the running agent through the agent event queue.

Use Steering when:

- the agent is going in the wrong direction
- you want it to focus on a specific file, constraint, or test
- you want to interrupt the current approach without waiting for the next queued step
- you want to send one of the pending thread steps as immediate guidance

If there is no running agent for the thread, Codebolt cannot deliver the steering message and shows a steering error.

## How steering works

The UI sends a message marked as a steering message:

Agent implementations that consume the event queue can inject this steering instruction into their next model turn.

## Steering a pending step

The thread steps list can show a **Steer** action for pending, active, or in-progress steps. Clicking **Steer** sends that step's instruction as a steering message to the active agent.

This lets you write a step as queued work first, then decide to push it into the live agent run if it becomes urgent.


## Practical guidance

| Situation | Use |
|---|---|
| Add more work after the current run | Next Step |
| Queue a sequence of instructions | Next Step |
| Redirect a running agent immediately | Steering |
| Send a pending step into the active run | Steer on the step |
| Give a normal new request after the thread is idle | Normal chat message |

## Related

- [Chat overview](./03_chat/01_overview.md)
- [Tabs and history](./03_chat/02_tabs-and-history.md)
- [Running agents](../03c_panels/04b_agent-management-features/01_running-agents.md)
