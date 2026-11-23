---
sidebar_position: 6
title: Testing & Debugging
description: Codebolt captures all agent stdout/stderr in real-time, stores it as NDJSON, and streams it to the Agent Debug Panel
---

# Testing and Debugging Agents

Codebolt captures all agent stdout/stderr in real-time, stores it as NDJSON, and streams it to the Agent Debug Panel. This page covers how to use that system effectively and how to write testable agent code.

## Agent Debug Panel

The built-in debug panel shows every agent session — running and historical.

### What's captured

Every agent process spawned by Codebolt is automatically tracked:

- **stdout and stderr** — every line is persisted and streamed in real-time
- **Session metadata** — agent name, type, thread, parent/child relationships, start/end time, exit code
- **Agent hierarchy** — child agents and sub-agents are linked to their parent

### Storage

Debug data lives in `.codebolt/agentdebug/` inside your project:

| File | Content |
|---|---|
| `index.json` | Index of all sessions with quick-lookup metadata |
| `{instanceId}.meta.json` | Full metadata per session (status, duration, exit code, agent type) |
| `{instanceId}.log` | NDJSON log file — one `{"ts", "type", "msg"}` entry per line |

### Agent types

The debug system categorizes agents automatically:

| Type | Meaning |
|---|---|
| `individual` | Standalone agent, no parent |
| `child` | Direct child of another agent |
| `subagent` | Managed by an orchestrator |
| `swarm` | Part of a swarm group |
| `orchestrator` | The orchestrator itself |

### REST API for debug data

| Endpoint | Method | Description |
|---|---|---|
| `/agent-debug/instances` | GET | All sessions |
| `/agent-debug/instances/filtered?status=running&agentType=child` | GET | Filtered sessions |
| `/agent-debug/running` | GET | Currently running sessions |
| `/agent-debug/by-thread/:threadId` | GET | Sessions for a thread (includes child agents) |
| `/agent-debug/instances/:id` | GET | Session metadata + child agents + log file path |
| `/agent-debug/instances/:id/logs?offset=0&limit=500` | GET | Paginated log entries |
| `/agent-debug/instances/:id/raw-logs` | GET | Raw NDJSON entries |
| `/agent-debug/cleanup?daysOld=30` | DELETE | Remove old debug data |
| `/agent-debug/rebuild-index` | POST | Rebuild index from meta files |

### WebSocket for real-time streaming

Connect to `ws://localhost:{socketPort}/agent-debug` for live updates:

| Message type | Direction | Description |
|---|---|---|
| `agent-debug:initial` | server → client | All instances sent on connect |
| `agent-debug:session-started` | server → client | New agent session started |
| `agent-debug:session-ended` | server → client | Agent session ended (with status, duration) |
| `agent-debug:log` | server → client | Log line from an agent (real-time) |

## Debugging level-1 framework agents

### Use console.log

Everything your agent writes to stdout/stderr appears in the debug panel:

```ts
codebolt.onMessage(async (reqMessage) => {
  console.log('[my-agent] Received:', reqMessage.userMessage?.substring(0, 100));

  const agent = new CodeboltAgent({
    instructions: systemPrompt,
    enableLogging: true,  // Logs internal events (compaction, tool refresh, errors)
  });

  const result = await agent.processMessage(reqMessage);
  console.log('[my-agent] Done:', result.success ? 'success' : result.error);
});
```

### enableLogging

With `enableLogging: true` (the default), `CodeboltAgent` logs:
- Compaction decisions and token savings
- Tool refresh results
- Error recovery attempts
- Execution failures

### Prefix your logs

Use a consistent prefix like `[my-agent]` so you can quickly identify your agent's logs when multiple agents run simultaneously.

## Unit testing processors

Custom processors are plain objects with a `modify` method. Test them without running the agent loop:

```ts
import { ProcessedMessage } from '@codebolt/types/agent';

// Your custom processor
const myRedactor = {
  async modify(_req: any, message: ProcessedMessage): Promise<ProcessedMessage> {
    const content = message.message.messages?.at(-1)?.content;
    if (typeof content === 'string') {
      message.message.messages[message.message.messages.length - 1].content =
        content.replace(/[\w.]+@[\w.]+/g, '[redacted]');
    }
    return message;
  },
};

// Test it directly
test('redactor removes emails', async () => {
  const message: ProcessedMessage = {
    message: {
      messages: [{ role: 'user', content: 'my email is alice@example.com' }],
      model: 'test',
    },
  } as any;

  const result = await myRedactor.modify({}, message);
  expect(result.message.messages[0].content).toBe('my email is [redacted]');
});
```

## Unit testing external event processors

The external event processor pattern from [Level 1 — Framework](./03_agent-types/level-2-framework.md#processing-external-events) is also testable in isolation:

```ts
test('steering event is injected into prompt', () => {
  const prompt: ProcessedMessage = {
    message: { messages: [{ role: 'system', content: 'You are an assistant.' }] },
  } as any;

  const event = {
    type: 'agentQueueEvent',
    data: { payload: { type: 'steering', instruction: 'Focus on tests only' } },
  };

  const result = processExternalEvent(event, prompt);
  const lastMessage = result.message.messages.at(-1);
  expect(lastMessage?.content).toContain('Focus on tests only');
});
```

## Common failure patterns

### "Agent keeps calling the same tool in a loop"

Check the debug panel for repeated identical log entries.

- Add `LoopDetectionService` to your agent config.
- The tool may be returning a confusing result. Log the tool result to see what the LLM is seeing.
- Add a system prompt instruction: "if a tool returns an error, do not retry the same call."

### "Agent ignores a user instruction"

The instruction was likely compressed away or buried.

- Check if `ChatCompressionModifier` is active and summarized away the message.
- Pin instructions with `@`-mentions.
- Reduce context volume to prevent dilution.

### "Agent runs for a long time doing nothing"

Check the last log entry in the debug panel.

- **Hanging tool call** — a tool is taking too long.
- **Slow LLM** — provider latency. Check provider health.
- **Large context assembly** — big projects take longer for directory scanning.

### "Agent calls a tool that doesn't exist"

The LLM is hallucinating tool names.

- Too many tools confuse the LLM. Tighten `allowedTools`.
- Tool descriptions are too similar. Override with `ToolInjectionModifier`.

### "Agent is too expensive"

Usually too much context being assembled.

- Add `ConversationCompactorModifier` to compress between turns.
- Reduce `maxTurns`.
- Use `ChatCompressionModifier` to summarize older history.

### "Tests pass locally, production fails"

Almost always a context difference — different environment, different directory structure, different memory state. Compare the logs from both environments.

## Stale session cleanup

If Codebolt crashes while agents are running, those sessions are marked `cancelled` on next startup. Old debug data (30+ days) can be cleaned up via:

```
DELETE /agent-debug/cleanup?daysOld=30
```

If the index gets corrupted, rebuild it from the meta files:

```
POST /agent-debug/rebuild-index
```

## See also

- [Agent Debug (user guide)](../../02_using-codebolt/04_agents/08_agent-debug.md)
- [Level 1 — Framework](./03_agent-types/level-2-framework.md)
- [Writing a Custom Processor](./07_processors/04_writing-a-custom-processor.md)
