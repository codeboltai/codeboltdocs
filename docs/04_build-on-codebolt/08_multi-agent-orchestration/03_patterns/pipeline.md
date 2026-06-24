---
sidebar_position: 3
title: Pipeline
description: A linear sequence of specialised agents where each stage's output is the next stage's input. No delegation, no parallelism — just a straight line.
---

# Pipeline

A linear sequence of specialised agents where each stage's output is the next stage's input. No delegation, no parallelism — just a straight line.

## When to use

- **The work has a natural sequence** that can't be parallelised. Understand → plan → code → test → review is the canonical example.
- **Each stage benefits from specialisation** — different model, different system prompt, different tools, different authority.
- **You want a clean audit trail.** A pipeline produces a linear transcript that's trivial to review after the fact.

## Shape

```
input → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → output
        understand    plan        code         test
```

Each stage is a separate agent run with its own context, its own allowlist, and its own success criteria. The output of one stage becomes the structured input of the next — never a raw chat dump.

## Why not just one agent?

A single agent can do all four stages. The reasons to split them:

- **Fresh context per stage.** A coder that hasn't read all the planning deliberations has a clean context window to actually code with.
- **Specialisation.** The "understand" stage can use a big model with lots of retrieval; the "code" stage can use a fast cheap model; the "test" stage needs no LLM at all (just tools).
- **Isolation of failure.** If the code stage fails, the plan is still valid — you re-run only the code stage, not everything.
- **Tool authority.** The "understand" stage might have read-only access to production logs; the "code" stage should not.

## How it works in Codebolt

- An orchestrator (which itself may just be the agent flow runtime) starts each stage as a child run via `agentService.startRun`.
- The output of each stage is structured — usually a JSON document with the fields the next stage expects. The output is stored in `jsonMemoryService` or passed directly as the next run's input.
- Stages run sequentially; the orchestrator blocks on each before starting the next.
- If a stage fails, the orchestrator consults the [planning hierarchy](../../07b_subsystems/08_planning-hierarchy.md) to decide: retry this stage, replan from the previous stage, or fail the whole pipeline.

This is what the [agent flow runtime](../04_agent-flows.md) was built for — a fixed pipeline expressed as a graph with one path.

## Example: plan → code → test → review

| Stage | Agent | Reads | Writes | Tools |
|---|---|---|---|---|
| **Plan** | planner-agent (big model) | Task, codemap, persistent memory | Plan document | `codebolt_fs.read`, `codebolt_code.*`, retrieval |
| **Code** | coder-agent (fast model) | Plan document, relevant files | File edits | `codebolt_fs.*`, `codebolt_code.format` |
| **Test** | test-runner (no LLM) | Changed files | Test results | Shell / test runner tools only |
| **Review** | reviewer-agent (different family) | Original plan + diff | Approve / request changes | Read-only |

Each stage has its own `agent.yaml` in the project; the pipeline is declared as a flow.

## Variations

### Conditional stages
Some stages are skipped based on the previous stage's output. E.g. skip "review" if the diff is trivial. Implement in the flow graph.

### Feedback loops
If review rejects, go back to code. Bounded by a max-iteration count. This is still a pipeline — the loop is part of the graph, not dynamic spawning.

### Pipelines of pipelines
The output of one pipeline is the input of another. Use for cross-cutting concerns (e.g. "design → implement → deploy", where "implement" is itself a plan/code/test/review sub-pipeline).

## Pitfalls

- **Over-specialisation.** Splitting into too many tiny stages adds more coordination overhead than specialisation benefit. Three or four stages is usually the sweet spot.
- **Context bloat at stage boundaries.** If you pass "everything the previous stage saw" to the next stage, you've lost the fresh-context benefit. Pass only the structured output.
- **Feedback loops without caps.** A code↔review loop with no iteration limit is how you burn money. Always cap.
- **Missing the "stage zero" understanding step.** Pipelines that start at "plan" often plan for the wrong problem. An explicit understand/research stage up front saves time overall.

## See also

- [Plan-execute-review](./plan-execute-review.md) — the most common pipeline instance
- [Agent Flows](../04_agent-flows.md) — how pipelines are expressed
- [Manager-Worker](./manager-worker.md) — when work is parallel, not sequential
