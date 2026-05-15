---
sidebar_position: 7
title: AI Requests
description: "A unified view of every LLM call Codebolt has made: which agent, which model, how many tokens, how much it cost, how long it took"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AI Requests

A unified view of every LLM call Codebolt has made: which agent, which model, how many tokens, how much it cost, how long it took. Used for debugging, cost tracking, and spotting performance issues.

The underlying data is the event log (`type == llm.chat`). Every surface is just a different lens on it.

## Viewing AI requests

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → AI Requests** or click the status-bar token counter. Sortable table, filter sidebar, click any row for full payload.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older reporting command families from previous drafts. Use the desktop AI Requests view for usage and request inspection.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/events?type=llm.chat&since=1h
GET /api/usage?since=7d&group_by=agent
```

</TabItem>
</Tabs>

## What's shown

```
Time      Agent       Model               Tokens       Cost     Duration   Run
--------- ----------- ------------------- ------------ -------- ---------- --------
14:23:05  generalist  claude-sonnet-4-6   4.2k / 850   $0.018   2.1s       run_abc
14:23:10  generalist  claude-sonnet-4-6   5.1k / 120   $0.017   1.4s       run_abc
14:23:15  reviewer    gpt-5               3.8k / 340   $0.021   2.8s       run_def
```

Each row:
- **Time** — when the call was made.
- **Agent** — which agent requested it.
- **Model** — which model answered.
- **Tokens** — input / output.
- **Cost** — computed from per-token rates.
- **Duration** — wall time from request to response.
- **Run** — the agent run ID; click through to the full trace.

## Filtering

Filter by:
- Agent
- Model
- Provider
- Date range
- Run
- Cost threshold (`> $0.10`)
- Duration threshold (`> 5s`)

Useful for finding the slow or expensive calls.

## Aggregate view

Toggle from "list" to "aggregate" to see totals:

- Cost per agent (which agents are expensive?)
- Cost per model (which models dominate spend?)
- Cost per day / week / month
- Request count per agent
- Average duration per agent

## Per-project cost tracking

Costs are tagged with the project the run was in. The aggregate view can group by project for chargeback or attribution.

## Spotting issues

Patterns to watch for:

- **An agent making many short calls** — should it be batching?
- **Very long single calls (>30s)** — usually a heavily context-loaded planner; check if the context can be trimmed.
- **High output token counts** — the agent is generating long responses; consider tightening prompts.
- **Recent cost spike** — a specific agent started burning more tokens; diff recent changes to that agent's config.
- **Failed requests** — rate limits, auth errors. Check provider health.

## Exporting

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose a dedicated AI Requests export command.

</TabItem>
<TabItem value="desktop" label="Desktop">

Settings → AI Requests → **Export** button. CSV or JSON. Honours the active filters.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/events?type=llm.chat&format=jsonl    # streaming JSONL
GET /api/events?type=llm.chat&format=csv
```

</TabItem>
</Tabs>

Full data for all LLM calls (subject to retention). Pipe into your analytics tool of choice.

## Relationship to the event log

AI Requests is the user-facing surface for inspecting LLM request activity. In current builds, rely on that UI rather than the removed event-query CLI examples from older drafts.

## See also

- [Chat Overview](./01_overview.md)
- [LLM Providers](../08_integrations/01_llm-providers.md)
- [Query the event log](../../03_guides/07_advanced/query-the-event-log.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/03_llm-and-inference.md)
