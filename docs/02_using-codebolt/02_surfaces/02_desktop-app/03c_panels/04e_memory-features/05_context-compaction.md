---
sidebar_position: 5
title: Context Compaction
description: Use Context Compaction to manage workflow-driven compaction for long-running agent threads.
---

# Context Compaction

Open **Context → Context Compaction** to edit a project profile or preview what it would do to a thread. For the current conversation, you can also send `/compact` directly in Chat.

## Preview a saved profile

1. Select the **Active profile**. Under **Workflow Steps**, expand a step to inspect its scope and parameters. If you edit the profile, use **Validate** and **Save** before testing it.
2. Under **Auto Trigger**, enter the existing context thread ID in **Thread id filter**. **Run Now** shows the target as **Runs on** followed by the ID. Saving this filter also limits the profile’s automatic triggers to that thread.
3. In **Run Now**, select **Dry Run**. In **Last Result**, compare the before and after message counts and read the per-step results. A preview can call the configured model if the workflow includes summarization.
4. To apply the saved workflow to that thread, select **Run**. The **Output** settings determine which changes are written back.

See [Context Compaction settings](../../../../05b_guardrails-and-settings/02_context-compaction.md) for the Chat command, trigger rules, and workflow steps.

## See also

- [Context Assembly](./04_context-assembly.md)
- [Memory](./01_memory.md)
- [Chat tabs and history](../../03_chat/02_tabs-and-history.md)
