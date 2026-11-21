---
sidebar_position: 4
title: Hooks
description: Run handlers at supported points in a CodeBolt agent session.
---

# Hooks

A hook runs a handler when a supported runtime event occurs. Open **Agents → Hooks** from the desktop bottom bar to create hooks, test handlers, and inspect invocations.

## Trigger events

| When | Events |
|---|---|
| Agent session | `agentSessionStart`, `agentSessionEnd`, `agentSessionError` |
| User prompt | `userPromptSubmit` |
| Tool use | `preToolUse`, `postToolUse` |
| Context compaction | `preCompaction`, `postCompaction` |
| Subprocess | `subprocessStart`, `subprocessEnd` |

Use an optional matcher to narrow the event. For tool events, match the tool name. For `postToolUse`, you can also match the outcome.

## Actions

The handler types are `command`, `actionBlock`, `tool`, `agent`, `http`, `prompt`, and `chain`. Each has its own configuration and timeout.

## Hook configuration

Project hooks are JSON files with a `.hook` extension in `.codebolt/hooks/`. Set the hook's `name`, `event`, and `handler`. The handler needs a `type` and the settings for that type.

## The Hooks panel

Click **New Hook**, set the event and optional matcher, configure the handler, and click **Create Hook**. To try the handler, hover over its row, select **Test**, and click **Run** with sample input. Read the result under **HookOutput**. Use **History** to inspect invocations and **Debug** to view live activity.

See [Write a Simple Hook](../../03_guides/05_mcp-and-tools/write-a-simple-hook.md) for a minimal command handler.
