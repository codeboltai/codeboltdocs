---
sidebar_position: 2
title: Context Compaction
description: Context Compaction lets you define when and how long-running thread context is compacted.
---

# Context Compaction

Context Compaction lets you define rules for shrinking long-running thread context while preserving enough history for an agent to continue working. It is useful when a run has accumulated many messages, large tool outputs, repeated context, or bulky fields that would otherwise push the next LLM request toward the model's context limit.

![Context Compaction](/productImages/guardrails/context-compaction.png)



## What you configure

Compaction is profile-based. A profile defines:

- **Auto trigger**: when compaction should be considered.
- **Workflow steps**: the ordered operations used to compact context.
- **Output policy**: what gets written back to the thread after compaction.

The project-level compaction config is stored at:

```text
.codebolt/compaction.json
```

Because it lives under `.codebolt`, teams can version-control compaction behavior with the project.


## Auto triggers

In the **Auto Trigger** section, you can set:

| Setting | What it does |
|---|---|
| Events | Event names that can trigger compaction, such as `context:added` |
| Thread id filter | Optional thread id restriction |
| Debounce ms | Delay used to collapse repeated trigger events into one run |
| Minimum messages | Number of new messages required since the last compaction |
| Minimum estimated tokens | Estimated token threshold required since the last compaction |

Codebolt also checks compaction during LLM execution. If the prompt payload is over budget, the server can run the selected compaction profile before enforcing the final payload budget. LLM responses also return whether compaction is required so the runtime and UI can surface that state.

## Workflow steps

Workflow steps run in order. Each step has:

- an enabled toggle
- a label
- a scope
- step-specific parameters

Supported scopes:

| Scope | Meaning |
|---|---|
| `all` | Apply to all unremoved messages |
| `older_than_preserved` | Apply only to messages not protected by a preserve step |
| `tool_calls_only` | Apply to tool-like entries |
| `llm_requests_only` | Apply to LLM request entries |
| `assistant_only` | Apply to assistant messages |
| `user_only` | Apply to user messages |

Supported step types:

| Step | What it does |
|---|---|
| `preserve_recent` | Protects the newest messages, turns, or LLM requests from later steps |
| `remove_tool_calls` | Deletes matching unprotected tool-call or LLM-request entries |
| `compact_tool_calls` | Replaces matching tool calls with compact metadata and a short preview |
| `truncate_large_fields` | Truncates oversized string fields such as `stdout`, `stderr`, `content`, `diff`, or `result` |
| `dedupe_repeated_context` | Removes duplicate unprotected entries after normalization |
| `llm_summarize` | Summarizes selected older context using the configured LLM |
| `replace_with_summary` | Replaces selected messages with one synthetic summary message |
| `budget_enforce` | Drops oldest unprotected messages until the estimated token budget is met |

Put `preserve_recent` early in the workflow when you want newer conversation turns protected before destructive or summarizing steps run.

## Output policy

The **Output** section controls what is persisted after a successful non-dry-run compaction.

| Output option | Effect |
|---|---|
| `replaceMessages` | Replaces the thread's stored messages with the compacted message list |
| `updateSummary` | Updates the thread summary with the compaction summary when available |
| `updateCompactedContext` | Stores compacted artifacts, removed messages, stats, and metadata on the thread |
| `appendHistory` | Preserves a history entry for the compaction change |

Dry runs return a preview and step results without persisting changes.



## Running compaction manually

Use **Run Now** when you want to test or force a profile on a specific thread.

- **Dry Run** shows the projected result and step stats without changing stored context.
- **Run** applies the selected profile and persists according to the output policy.

The result includes before/after message counts, compacted message count, removed message count, estimated token counts, and per-step stats.

## Related panels

- [Context Compaction panel](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/05_context-compaction.md)
- [Context Assembly](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/04_context-assembly.md)
- [Memory](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/01_memory.md)
