---
sidebar_position: 7
title: Narrative Graph
description: The Narrative Graph is a visual replay of an agent run — every decision, branch, tool call, and outcome laid out as a directed graph
---

# Narrative Graph

The Narrative Graph is a visual replay of an agent run — every decision, branch, tool call, and outcome laid out as a directed graph. Where Agent Debug shows a flat time-ordered log, the Narrative Graph shows *why* the agent took the path it did, with branching and retrying visible as graph structure.

Open via: **Code Observability → Narrative Graph**

## What the graph shows

Each node in the graph represents one meaningful event in the agent's execution:

| Node type | Shape | Description |
|---|---|---|
| **User message** | Rectangle | The input that triggered this run |
| **LLM decision** | Diamond | An LLM call that produced a decision |
| **Tool call** | Rounded rect | A tool invocation |
| **Tool result** | Small rect | The output of a tool call |
| **Branch** | Fork | A point where the agent considered multiple paths |
| **Retry** | Loopback | A tool call that failed and was retried |
| **Completion** | Circle | The run's final state (`completed` or `failed`) |

Edges connect nodes in execution order. Edge width encodes time — thicker means more time elapsed between events.

## Reading the graph

Start at the **User message** node (top-left). Follow edges downward and to the right to trace the execution path. Branches appear as diverging edges — only one branch was executed; the others are shown in grey as "paths not taken" if the agent explicitly considered alternatives.

Click any node to open a detail panel on the right showing:
- The full content of that event (prompt text, tool input/output, error message)
- Timestamp and duration
- Token count (for LLM decision nodes)
- Link to the corresponding entry in the Agent Debug panel

## Narrative Hierarchy

The **Narrative Hierarchy** view (toolbar toggle) shows the same data as a collapsible tree — useful for very deep graphs that are hard to read as a flat layout.

## File Trace Viewer

The **File Trace Viewer** (a node's detail panel → "File trace") shows which lines of agent code executed to produce a specific event. Use it when you need to understand exactly which code path in your agent implementation ran.

## Using the graph to improve agents

The Narrative Graph is the most direct way to identify where an agent's reasoning went wrong:

| Pattern | What to look for | Fix |
|---|---|---|
| Unnecessary retries | Loopback nodes on the same tool | Fix the tool or adjust the retry policy |
| Early termination | Completion node reached with few preceding nodes | Check the LLM decision nodes just before completion |
| Inefficient path | Long chains of sequential tool calls | Restructure for parallelism or use a swarm |
| Wrong branch taken | Branch node that diverges to a failed path | Examine the prompt context at that branch node |

## Sharing a graph

- **Export → PNG / SVG** — save as an image
- **Export → JSON** — export raw narrative data for offline analysis or sharing with a team member; can be re-imported into the Narrative Graph

## See also

- [Code Observability Overview](./01_overview.md)
- [Codemap](./02_codemap.md)
- [Agent Debug](../05c_agent-observability/02_agent-debug.md)
- [Thread Panel](../04_agents/08_thread-panel.md)
