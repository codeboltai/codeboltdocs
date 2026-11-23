---
sidebar_position: 7
title: Narrative Graph
description: Follow recorded code changes, commands, threads, and agent runs in the desktop app.
---

# Narrative Graph

Open **Debug → Narrative Graph**. The **Graph** tab shows recorded file operations, commands, environment events, and thread forks. Select an entry to inspect its details. Entries with thread, objective, or agent-run links can open the corresponding part of the hierarchy.

## Narrative Hierarchy

Select **Hierarchy** inside **Narrative Graph**. Expand an objective or thread to find related agent runs and child threads. When a run has recorded file changes, expand **Files Changed By This Agent** to see them.

## File Trace Viewer

Select a file path on a **Graph** entry to open **File Trace**. Rows show the recorded operation, the agent or thread when available, the timestamp, and the before and after tree hashes. Expand a row to inspect its recorded details.

For example, if several agents touched a file, open its trace and use the execution and timestamp columns to identify each recorded change.

## See also

- [Codemap](./06_codemap.md)
- [Agent Debug](../../../04_agents/08_agent-debug.md)
- [Thread Panel](../../../04_agents/08_thread-panel.md)
