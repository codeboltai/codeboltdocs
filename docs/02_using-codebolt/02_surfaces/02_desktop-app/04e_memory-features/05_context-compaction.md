---
sidebar_position: 5
title: Context Compaction
description: Use Context Compaction to manage workflow-driven compaction for long-running agent threads.
---

# Context Compaction

Context Compaction reduces long-running thread context into smaller layers that agents can continue from. Use it when a conversation or workflow is getting too large but still needs useful history.

Open via: **Context menu -> Context Compaction**, the panel-header **+** menu, or the Panel Selector.

## What you can do

- Configure compaction behavior for thread context.
- Inspect compaction runs and failures.
- Review what context was retained after compaction.
- Coordinate compaction with memory and context assembly settings.

## See also

- [Context Assembly](./04_context-assembly.md)
- [Memory](./01_memory.md)
- [Chat tabs and history](../03_chat/02_tabs-and-history.md)
