# Dynamic Agent Events

> Dynamic agent events let agents publish named runtime events that hooks, plugins, and context assembly rules can react to.

Dynamic agent events are named runtime events emitted by agents through `codeboltjs`. They are useful when an agent reaches a domain-specific point that is more precise than a generic lifecycle event.

Examples:

- `analysis.completed`
- `build.started`
- `test.failed`
- `migration.planReady`

Dynamic agent events are not milestones or execution phases. They do not change the agent's running phase. They are application events with the type `agent:dynamic:event`, and the event name lives in `payload.name`.

## Emit an event from an agent

```ts

await codebolt.agentEvents.emit('test.failed', {
  suite: 'unit',
  failed: 3,
  command: 'npm test',
}, {
  metadata: {
    severity: 'warning',
  },
});
```

The server records the event as:

```ts
{
  type: 'agent:dynamic:event',
  payload: {
    name: 'test.failed',
    data: {
      suite: 'unit',
      failed: 3,
      command: 'npm test'
    },
    emittedAt: '2026-05-21T...'
  }
}
```

The event also carries source fields when available, including `threadId`, `agentId`, `agentInstanceId`, `parentAgentInstanceId`, `projectId`, `swarmId`, and `jobId`.

## Use dynamic events in hooks

Create a hook with trigger type `dynamicAgentEvent`. You can leave the event name empty to match every dynamic event, or set `eventName` to match one specific name.

```yaml
name: run-review-after-plan
description: Start reviewer after an agent emits plan.ready
enabled: true
version: 1.0.0
when:
  type: dynamicAgentEvent
  eventName: plan.ready
then:
  type: runAgent
  agentId: reviewer
  instruction: "Review the generated plan."
  runInSameThread: true
```

Advanced filters can still target the normalized application event shape:

```yaml
when:
  type: dynamicAgentEvent
  eventName: test.failed
  filter:
    conditions:
      - field: payload.data.suite
        op: =
        value: unit
```

## Use dynamic events in context assembly rules

When context assembly is invoked from an application event, dynamic event data is available under `addVar.event`.

Common variables:

| Variable | Meaning |
|---|---|
| `addVar.event.type` | The application event type, usually `agent:dynamic:event` |
| `addVar.event.name` | The dynamic event name |
| `addVar.event.data` | The payload data supplied by the agent |
| `addVar.event.source.agentId` | Agent that emitted the event |
| `addVar.event.source.agentInstanceId` | Running agent instance that emitted the event |
| `addVar.event.source.threadId` | Conversation thread associated with the event |

Example rule condition:

```yaml
conditions:
  - variable: addVar.event.name
    operator: equals
    value: test.failed
```

## Plugin listeners

Plugins can listen for dynamic agent events through `plugin.agentEvents.onAgentEvent`.

```ts

plugin.onStart(async () => {
  await plugin.agentEvents.onAgentEvent('test.failed', async (event) => {
    console.log('Agent test failure:', event.payload?.data);
  });
});
```

Use this when a plugin needs to observe agent progress and react outside the agent process, such as mirroring status to an external system, notifying a team channel, or coordinating application-level automation.

## Naming guidance

Use stable, dotted names that describe facts, not commands:

- Prefer `plan.ready`, `tests.failed`, `deploy.started`
- Avoid `runReviewerNow` or `pleaseNotifySlack`

The event should describe what happened. Hooks and plugins decide what to do in response.
