---
sidebar_position: 7
title: AI Requests
description: "Inspect the model requests created by chat: live request status, streaming responses, request payloads, response payloads, token usage, and cost estimates."
---

# AI Requests

AI requests are the model calls created while an agent is working in chat. Codebolt shows them in two places:

- inline in the chat transcript as request and streaming-response cards
- in the **AI Debug** panel, where you can inspect request and response payloads

Use this when you need to understand what the agent sent to the model, what came back, which thread or agent produced the call, and how many tokens or estimated cost were attached to the response.

## In Chat

During a run, chat can show two AI request-related message types.

| Card | What it shows |
|---|---|
| **AI Request** | A compact clickable row for a model request. It shows the request label and a status icon. |
| **AI Stream** | The live model output. It shows whether the model is generating, thinking, complete, or failed. |

The compact **AI Request** row uses these states:

- pending or sending
- request succeeded
- request failed

Click an **AI Request** row to open the **AI Debug** panel and focus the matching request.

## Streaming Responses

When the model streams output, Codebolt renders an **AI Stream** card in chat.

The stream header can show:

- **Generating** while normal response content is streaming
- **Thinking** while reasoning content is streaming
- **AI Response Complete** when the request succeeds
- **AI Request Failed** when the request fails
- the model name when the message includes one

If reasoning is present, it appears in a collapsible **Reasoning** section above the response body. Failed requests show the error message in the stream body.

## AI Debug Panel

Open **AI Debug** from the Debug menu, or click an AI request row in chat.

The panel title is **Debug AI Request**. It loads AI request history and also listens for live debug events while agents are running.

Each request entry can include:

- request preview
- timestamp
- model
- thread
- agent
- agent instance
- environment type
- request id
- error state, when the response failed

Click an entry to inspect the full detail.

## Detail Tabs

The request detail view has three tabs:

| Tab | What it contains |
|---|---|
| **AI Request** | The raw agent/model request payload. |
| **AI Response** | The raw model response payload. |
| **Info** | Token usage, estimated input/output cost, total estimated cost, or error details. |

The JSON views include copy buttons. Use them when you need to share the exact request or response while debugging.

## Tokens And Cost

The AI Debug header shows the accumulated token count and total estimated cost for the loaded response summaries.

Hover the token/cost summary to see:

- input tokens
- output tokens
- input cost
- output cost

Individual request details can show:

- total tokens
- prompt/input tokens
- cached input tokens
- completion/output tokens
- reasoning tokens when available
- total, input, and output price estimates

Cost values depend on pricing data attached to the response. If the response does not include pricing, the panel shows zero for that request.

## Filtering And Grouping

Use the filter button in **AI Debug** to narrow the request list by:

- thread
- agent instance
- agent type: orchestrator, swarm, agent, or system

Use the grouping menu to group requests by:

- time
- thread
- agent
- model
- environment
- agent instance

The default grouping is time. Time groups are shown as **Today**, **Yesterday**, **This Week**, **This Month**, and **Older**.

## Layout Modes

AI Debug supports two inspection layouts:

| Mode | Behavior |
|---|---|
| **Side panel** | Select a request on the left and inspect details in a resizable panel on the right. |
| **Accordion** | Expand request details inline inside the request list. |

The refresh button reloads request history. When there are more results, the list loads more entries as you scroll.

## Spotting issues

Patterns to watch for:

- **Failed requests** — open the **AI Response** tab and check the error type, message, parameter, code, provider, and status.
- **Unexpected answer** — compare **AI Request** with **AI Response** to see the exact prompt and model output.
- **High token usage** — check the **Info** tab for prompt, completion, cached, and reasoning token counts.
- **Unexpected cost** — use the header total and per-request cost fields to identify which responses contributed most.
- **Wrong agent or thread** — group or filter by thread, agent, environment, or agent instance.

## See also

- [Chat Overview](./01_overview.md)
- [AI Debug & Console](../05c_agent-observability/03_ai-debug-and-console.md)
- [Agent Debug](../05c_agent-observability/02_agent-debug.md)
- [LLM Providers](../08_integrations/01_llm-providers.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/07b_subsystems/03_llm-and-inference.md)
