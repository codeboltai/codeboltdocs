---
sidebar_position: 2
title: Context Compaction
description: Context Compaction lets you define when and how long-running thread context is compacted.
---

# Context Compaction

Use compaction when you want to continue a long conversation with less history in the next model request. The default profile preserves recent context, summarizes older work, and replaces the older entries with a continuation summary. That summary carries forward details such as decisions, files changed, blockers, and the next action.

## Compact the current conversation

In Chat, send `/compact`. To tell Codebolt which details matter for your next turn, add instructions on the same line. For example:

```text
/compact Keep the failing test name, the files we changed, and the next debugging step.
```

Chat runs the saved default profile on the current thread and displays **Conversation context compacted.** when it finishes. If a model or tool round is still being recorded, Chat can report that compaction is queued. To preview the effect before applying it, use **Dry Run** in the panel.

![Context Compaction settings with the active profile, auto-trigger options, and workflow steps](/img/desktop/context-compaction.webp)

## What you configure

Open **Context → Context Compaction** and select an **Active profile**. Saving this selection makes it the project default. A profile has three parts.

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
| Minimum estimated tokens | Token threshold used when checking whether compaction is due |

The message and token thresholds are alternatives. Codebolt also checks the available model context and can request compaction before sending an over-budget prompt. The built-in default listens for `context:added` and sets **Minimum messages** to 80. Your saved profile can use different values.

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
| `remove_tool_calls` | Removes matching unprotected entries when a summary exists or lossy removal is enabled. Otherwise it compacts them to metadata and a preview. |
| `compact_tool_calls` | Replaces matching tool calls with compact metadata and a short preview |
| `truncate_large_fields` | Truncates oversized string fields such as `stdout`, `stderr`, `content`, `diff`, or `result` |
| `dedupe_repeated_context` | Removes duplicate unprotected entries after normalization |
| `llm_summarize` | Summarizes selected older context using the configured LLM |
| `replace_with_summary` | Replaces selected messages with one synthetic summary message |
| `budget_enforce` | Tries to meet the budget by compacting eligible tool entries. It can remove unprotected entries when a summary exists or lossy removal is enabled. |

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

Under **Auto Trigger**, fill in **Thread id filter** with an existing context thread ID. This field also supplies the target for **Run Now**. If you changed the workflow or output policy, select **Validate**, review the result, and select **Save** so the run uses those changes. Saving the thread filter also restricts automatic triggers to that thread.

- **Dry Run** shows the projected result and step stats without changing stored context.
- **Run** applies the selected profile and persists according to the output policy.

In **Last Result**, compare **Before** and **After**, check **Compacted** and **Dry run**, and expand your investigation using the step results shown underneath.

## Related panels

- [Context Compaction panel](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/05_context-compaction.md)
- [Context Assembly](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/04_context-assembly.md)
- [Memory](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/01_memory.md)
