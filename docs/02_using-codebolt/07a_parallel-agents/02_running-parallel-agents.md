---
sidebar_position: 2
title: Running Parallel Agents
description: Codebolt supports four ways to run agents concurrently. Each has a different level of coordination and is suited to different situations.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running Parallel Agents

Codebolt supports four ways to run agents concurrently. Each has a different level of coordination and is suited to different situations.

## Tabs — independent parallel runs

The simplest pattern. Open multiple chat tabs, pick a different agent (or the same one) in each, and run them simultaneously. Each tab is fully independent — separate threads, separate context, separate checkpoints.

**Desktop:** `Cmd/Ctrl+T` to open a new tab. The agent picker in each tab is independent.

**Use this when:** you want to run two unrelated tasks at the same time, or compare how two agents handle the same prompt.

## Child agents — programmatic delegation

An agent can spawn sub-agents from within its own code using `codebolt_agent.start`. The child runs as a nested run under the parent. Results are returned to the parent when the child finishes.

```ts
const result = await codebolt.agents.start('specialist', {
  task: 'Write unit tests for the auth module',
  project: currentProject,
});
```

The child appears in the **Running Agent panel** alongside the parent. Both are monitored in real time.

**Use this when:** an orchestrator agent needs to delegate subtasks to specialists automatically.

See [Sub Agent](./05_sub-agent.md) for the user-facing view of how delegated child runs appear in Codebolt.

## Flows — declared pipelines

A flow is a graph where nodes are agents and edges are data connections. The flow runtime executes agents in dependency order — independent nodes run in parallel automatically.

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose the older flow-execution commands from previous drafts.

</TabItem>
<TabItem value="desktop" label="Desktop">

**Flows panel → Run** on a flow card. Inputs are filled from the flow's input schema.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/flows/:name/run
{ "inputs": { "task": "..." } }
```

</TabItem>
</Tabs>

**Use this when:** you have a repeatable multi-agent pattern with a fixed structure. See [Reading a flow](../07_multi-agent-usage/03_reading-a-flow.md).

## Swarms — dynamic cooperation

A swarm is a group of agents that share a common goal, communicate through a shared memory space, and divide work dynamically without a fixed graph. Agents in a swarm pick up tasks from a shared queue rather than being explicitly assigned them.

The current CLI does not expose the older swarm command family from previous drafts. Use the desktop orchestration surfaces that your build provides.

**Use this when:** the work is large, exploratory, or hard to decompose upfront. See [Running a swarm](../07_multi-agent-usage/02_running-a-swarm.md).

---

## Monitoring concurrent runs

### Running Agent panel

Open via **Execution dropdown → Running Agent** in the bottom bar. Shows every active agent process with name, status, duration, token usage, and a stop button. Updates in real time.

### Background Agents panel

Open via **Execution dropdown → Background Agents**. This is a dedicated panel for tracked background runs, with active items, history, and start/stop controls.

See [Background Agent](./04_background-agent.md) for when runs move into this panel and how to monitor them.

### Chat Canvas

The [Chat Canvas](./03_chat-canvas.md) gives you a 2D visual view of all running agent conversations. Best for understanding how agents in a parallel run relate to each other.

---

## Limits

All concurrent runs share server-wide limits:

- **Max concurrent agent processes** — configurable in server settings
- **Max spawn rate** — prevents runaway delegation loops
- **Per-agent budgets** — `max_tool_calls`, `max_tokens`, `max_wall_time_seconds`, `max_cost_usd` in the agent manifest

If you hit concurrency limits, new runs queue until a slot opens. See [Self-hosting → Scaling](../../04_build-on-codebolt/10_self-hosting/01_overview.md) for raising these limits.

---

## Stopping parallel runs

Stop individual runs from the Running Agent panel, or from the chat tab. To stop all runs in a swarm:

```bash
codebolt command agents stop --id <agentId>
```
