---
displayed_sidebar: getStartedSidebar
sidebar_position: 2
title: Architecture
description: Follow a request through the Codebolt runtime and agent.
---

import FivePlanes from '@site/src/components/diagrams/FivePlanes';

# Architecture

Use the five areas below to follow a request from Chat through a running agent. Which services participate depends on the task.

<FivePlanes />

| Area | Example |
|---|---|
| Control | The thread identifies the project, selected agent and policy profile. |
| Execution | The agent builds a prompt, calls a model and handles tool results. |
| Waiting and delegation | The agent can start a child thread or wait for user input. |
| Guardrails | The runtime evaluates a tool request against a policy profile. |
| Events and storage | A workflow can append structured events. Shadow Git stores project file checkpoints. |

For a walkthrough of the server and agent processes, see [Agent subsystem](../../04_build-on-codebolt/07b_subsystems/01_agent-subsystem.md).

## See also

- [Process model](../../04_build-on-codebolt/02_architecture/03_process-model.md) — what runs where (server, plugins, agents)
- [Agent run end-to-end](../../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md) — a full request from Chat to the agent
