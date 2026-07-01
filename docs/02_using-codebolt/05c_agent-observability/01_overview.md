---
sidebar_position: 1
title: Agent Observability Overview
description: Observability in Codebolt is how you see what an agent did, what it's doing right now, and why it made a particular choice
---

# Agent Observability

Observability in Codebolt is how you see what an agent *did*, what it's *doing right now*, and why it made a particular choice. It spans running processes, historical runs, and LLM-level traces, with execution replays linked from Code Observability.



## Panels in this section

| Panel | Purpose |
|---|---|
| [Agent Debug](./02_agent-debug.md) | Per-instance log stream: LLM calls, tool calls, status events, errors — with filters and history mode |
| [AI Debug & Console](./03_ai-debug-and-console.md) | Raw LLM inputs/outputs, token counts, latency, cost estimates, plus agent stdout/stderr console |

## Related observability panels

Other views that live alongside the agent lifecycle:

| Panel | Location |
|---|---|
| Running Agents (currently executing processes) | [Agents → Running Agents](../04_agents/03_running-agents.md) |
| Background Agents (trigger-started, detached runs) | [Agents → Running Agents](../04_agents/03_running-agents.md#background-agents-panel) |
| Thread Panel (conversation and run history) | [Agents → Thread Panel](../04_agents/08_thread-panel.md) |
| Narrative Graph (visual run replay) | [Code Observability → Narrative Graph](../09b_code-observability/03_narrative-graph.md) |

## When to reach for which

- **Something is still running and you want to watch it** → [Running Agents](../04_agents/03_running-agents.md)
- **An agent started itself (cron, webhook, file-change trigger)** → [Background Agents](../04_agents/03_running-agents.md#background-agents-panel)
- **You want to see *why* the agent did what it did** → [Narrative Graph](../09b_code-observability/03_narrative-graph.md)
- **You want the exact prompt the LLM received** → [AI Debug](./03_ai-debug-and-console.md)
- **You want the full per-instance log stream** → [Agent Debug](./02_agent-debug.md)

## Related

- [Guardrails & Settings](../05b_guardrails-and-settings/01_guardrails.md) — constrains what agents can do
- [Code Observability](../09b_code-observability/01_overview.md) — codemap, narrative graph, and structural execution views
