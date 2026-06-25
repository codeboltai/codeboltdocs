---
sidebar_position: 4
title: Debug a Hung Agent
description: An agent that's stopped responding — no new tool calls, no messages, no progress. Here's the triage.
---

# Debug a Hung Agent

An agent that's stopped responding — no new tool calls, no messages, no progress. Here's the triage.

## 0. Is it actually hung?

First, confirm it's not just slow. Some operations are legitimately slow:

- **First-time project indexing** on large codebases.
- **LLM calls with big contexts** — Claude Opus on 200k tokens can take 30+ seconds.
- **Tool calls that call slow APIs.**

Check the run trace in the UI for the last activity timestamp.

If the last event was < 30 seconds ago, it's probably still working. Wait longer.

If the last event was > 2 minutes ago with no progress, it's hung.

## 1. What was it doing?

Look at the last several events in the run trace (available in the UI). Patterns:

### Pattern A: Last event is an LLM call that never returned

```
14:23:05  llm.chat.request   (provider: anthropic, model: claude-sonnet)
[no response]
```

- **Provider is slow or down.** Check connectivity to your LLM provider.
- **Request is huge.** Big contexts time out on some providers. Reduce.
- **Network issue.** Check connectivity.

### Pattern B: Last event is a tool call that never returned

```
14:23:05  tool.call  codebolt_fs.search_files  query="..."
[no response]
```

- **Tool is slow.** Some tools (browser, network) can be slow. Give it more time.
- **Tool is hung.** Check the MCP server status in Settings → Tools.
- **Endless loop inside the tool.** The tool's own bug. Restart the MCP server.

### Pattern C: Heartbeat timeout about to fire

If you see recent `phase.heartbeat` events but nothing since, the agent is waiting for something. It will be killed by `HeartbeatManager` shortly.

### Pattern D: Agent is in deliberation but no LLM call

Rare. The agent's deliberation phase is thinking but hasn't reached the LLM call. Usually means context assembly is slow or stuck — for huge projects, this can take seconds.

## 2. Stop the agent

Graceful stop first:

```bash
codebolt agent stop <run-id>
```

Waits for the current phase to finish then exits cleanly. Usually works within 10-30 seconds.

If graceful stop doesn't work:

```bash
codebolt agent kill <run-id>
```

Force-kill. Run ends with status `killed`, reason `forced`.

## 3. Figure out why

Once the agent is dead, the run trace in the UI tells you what happened.

Look for:

- **The last event before the hang.** What kind of call was it?
- **Durations on nearby events.** Was something getting slower leading up to the hang?
- **Any errors.** Sometimes a hang is a cascade — an earlier error caused a retry loop that never made progress.
- **Memory ingestion events.** If the ingestion pipeline is backed up, new events can queue and the agent appears to wait.

## 4. Common root causes

### Loop detection failed

Agent is calling the same tool with the same args, forever. `LoopDetectionModifier` should catch this but can miss exotic loops.

Fix: stop the agent, tune `LoopDetectionModifier` threshold, add a system prompt instruction like "if a tool returns the same error twice in a row, stop and report".

### Blocking tool call

A tool is making a network call with no timeout. The agent waits forever.

Fix: file a bug against the tool. Meanwhile, wrap it in a hook that enforces a timeout:

```ts
export default {
  phase: "before_tool_call",
  match: { tool: "slow-tool.fetch" },
  handler: async (ctx) => {
    // Can't actually enforce timeout here, but can log it
    ctx.log.info("about to call slow-tool.fetch", { args: ctx.args });
    return { verdict: "allow" };
  },
};
```

Or configure the tool server's timeout settings in its configuration if it supports it.

### Context assembly thrashing

For very large projects, context assembly can be slow. Usually vector search or KG traversal.

Fix: profile assembly via the run trace UI. If one source dominates, reduce its weight in context rules.

### Provider rate limiting mid-run

The agent made several LLM calls, hit a rate limit, is backing off. Technically not hung — just very slow.

Fix: check provider usage. Switch to a provider with higher limits, or add a fallback chain.

### Plugin / MCP server crashed

A plugin crashed and isn't being restarted fast enough. Tool calls to it hang until the restart completes.

Fix: check MCP server status in Settings → Tools. Restart the server manually if stuck.

## 5. Prevent recurrence

Once you've identified the cause, prevent it:

- **Budget limits.** Monitor agent usage via **Settings → Usage**.
- **Loop detection tuning.** Lower the threshold for agents prone to loops.
- **Tool timeouts.** Configure timeouts on any slow tools in their MCP server configuration.
- **Watchdog hook.** A hook that watches for long phases and alerts you.

## 6. Document the issue

If the hang is reproducible, note the steps and context that triggered it. This helps with debugging future occurrences.

## See also

- [Agent Debug](../../02_using-codebolt/05c_agent-observability/02_agent-debug.md)
- [Running agents](../../02_using-codebolt/04_agents/03_running-agents.md)
- [Agent run end-to-end (internals)](../../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md)
- [Process Model (internals)](../../04_build-on-codebolt/02_architecture/03_process-model.md)
