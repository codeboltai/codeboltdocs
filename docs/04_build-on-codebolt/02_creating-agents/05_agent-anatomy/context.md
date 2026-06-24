---
sidebar_position: 3
title: Context
description: The ctx object passed to your handler. It's the framework's way of saying "here's everything you need to talk to the server"
---

# Agent Context

The `ctx` object passed to your handler. It's the framework's way of saying "here's everything you need to talk to the server". Understanding what's on it — and what's *not* — shapes how you write agents.

At level 1 this is `ctx` in your `run(ctx, input)` signature. At level 2 it's the `CodeboltClient` you constructed. At level 3 it's whatever wrapper you wrote around the raw WebSocket. Same concept, different ergonomics.

## What's on ctx (level 1)

```ts
ctx.input                   // typed input from the caller
ctx.runId                   // current run ID
ctx.parentRunId             // if spawned by another agent
ctx.workspace               // workspace path + metadata
ctx.model                   // default model for this agent (can override per call)

ctx.llm.chat(req)           // LLM call → llmService
ctx.llm.embed(text)         // embedding → embeddingService
ctx.llm.count(text)         // token count → tokenizerService

ctx.tools.call(req)         // tool call → toolService
ctx.tools.available()       // list tools allowed for this agent
ctx.tools.schema(name)      // get a tool's schema

ctx.context.assemble(opts)  // explicit context build → contextAssemblyService
ctx.context.rules()         // current active context rules

ctx.memory.episodic         // episodic memory, this run
ctx.memory.persistent       // persistent memory, this workspace
ctx.memory.kv               // kv store
ctx.memory.vector           // vector search
ctx.memory.kg               // knowledge graph
ctx.memory.narrative        // narrative engine
ctx.memory.json             // structured JSON memory
ctx.memory.markdown         // markdown notebook memory

ctx.state.get(key)          // working state (lost when run ends)
ctx.state.set(key, value)
ctx.state.all()

ctx.files.read(path)        // direct file access → fileReadService
ctx.files.write(path, c)    // → fileUpdateIntentService
ctx.files.search(q)         // → project search
ctx.files.codemap()         // → codemapDataService

ctx.git.status()            // → gitService
ctx.git.diff(ref)
ctx.shadowGit               // → shadowGitService

ctx.children.start(spec)    // spawn child agent run
ctx.children.wait(runId)
ctx.children.list()

ctx.events.emit(type, p)    // → applicationEventBus
ctx.log.debug / info / warn / error

ctx.checkpoint.create()     // create an explicit checkpoint
ctx.checkpoint.rollback(id)
```

That's the whole surface. Everything in Codebolt is reachable from `ctx`; you don't need to import anything else.

## What's NOT on ctx

Deliberate omissions, and the reasons:

- **No `ctx.guardrail.check`.** Guardrails are enforced transparently by `toolService` and the write path. You don't ask for their approval; you try to do a thing and get a structured denial if it's not allowed.
- **No `ctx.agents.other(name)`.** You can't reach into other agents' state. You can spawn children via `ctx.children` or call them as tools via `codebolt_agent.start`, but you can't mutate each other directly. This is a safety property.
- **No raw database access.** You go through the services, always. If you think you need raw DB, you're writing the wrong thing — probably a [hook](../../../05_plugins/01_overview.md) or a [custom processor](../07_processors/04_writing-a-custom-processor.md).
- **No raw event bus subscription.** The framework shows you only the events relevant to your run. Cross-run subscriptions are for hooks.

## Working state vs memory

A common confusion. The difference:

| Kind | Lifetime | Backed by | Use for |
|---|---|---|---|
| **`ctx.state`** | This run only | In-memory | Working variables across phases in the same run |
| **`ctx.memory.episodic`** | This run, persisted | DB | The run's narrative. Replayable. |
| **`ctx.memory.persistent`** | Workspace-wide | DB + vector | Things you want to recall across runs |

- Temporary counter you're using between deliberate and reflect? → `ctx.state`.
- Summary of what the agent decided in this run, that future agents should see? → `ctx.memory.episodic` or `ctx.memory.persistent`.
- A cached API response you don't need after the run? → `ctx.state`.

Using `persistent` for transient state will bloat your store. Using `state` for important decisions will lose them when the run ends. Pick correctly.

## Context assembly vs just calling `ctx.llm.chat`

You have two options when calling the LLM:

### Assembled
```ts
const asm = await ctx.context.assemble({ task, history, budget: { tokens: 60000 } });
const response = await ctx.llm.chat({ messages: asm.messages, tools: asm.tools });
```

Lets the [context assembler](../../07b_subsystems/07_context-assembly.md) pull in rules, memory, codemap, vector hits, etc. Use this for "real" agent work.

### Raw
```ts
const response = await ctx.llm.chat({
  messages: [{ role: "user", content: "Summarise this file: " + fileContent }],
});
```

Skips assembly. You provide exactly what the LLM sees. Use for one-shot, utility-style calls where you don't want the machinery — e.g. "summarise this one piece of text", "classify this commit message".

**Don't mix styles unintentionally.** A chat-loop agent that calls raw between assembled turns will confuse its own history.

## Typed inputs and outputs

If your `agent.yaml` declares `inputs` and `outputs`:

```yaml
inputs:
  task: { type: string, required: true }
outputs:
  plan: { type: object }
```

Then your `ctx.input` is typed and your return value is validated:

```ts
createCodeboltAgent({
  async run(ctx, input: { task: string }) {
    // ctx.input.task is string, typed
    return { plan: { steps: ["..."] } };  // validated against outputs
  },
});
```

A return that doesn't match `outputs` fails the run. This is how you get early errors on typos instead of downstream agents consuming garbage.

## Parent / child runs

`ctx.parentRunId` tells you whether this run was spawned by another agent or directly by a user. Useful for:

- Adjusting verbosity (less chatty when called as a sub-run).
- Inheriting context from the parent if appropriate.
- Deciding what to return — a root run might talk back in natural language, a sub-run might return structured data.

When you spawn a child:

```ts
const childRunId = await ctx.children.start({
  agent: "my-planner",
  input: { task: "build a thing" },
  wait: true,
});
const childOutput = await ctx.children.wait(childRunId);
```

The child sees `ctx.parentRunId === currentRun.runId`.

## See also

- [agent.yaml](./agent-yaml.md) — what you declared to get this ctx
- [Lifecycle](./lifecycle.md) — when ctx is alive
- [Level 1 — Framework](../03_creation-levels/level-1-framework.md) — where `ctx` comes from
- [codeboltjs reference](../../../../05_reference/01_overview.md) — the same surface, lower level
