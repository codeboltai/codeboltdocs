---
sidebar_position: 5
title: Observability and Tracing
description: Find the desktop views for code maps, recorded file changes, and execution traces.
---

# Code Observability

Use the desktop **Debug** menu to trace what an agent ran and what changed in your project.

| What you need | Where to look |
|---|---|
| Understand how part of the code works | [Codemap](../02_surfaces/02_desktop-app/03b_code-and-terminal/06_codemap.md) |
| Follow recorded file operations, commands, or environment events | [Narrative Graph](../02_surfaces/02_desktop-app/03b_code-and-terminal/07_narrative-graph.md) |
| See how threads and agent runs are related | [Narrative Hierarchy](../02_surfaces/02_desktop-app/03b_code-and-terminal/07_narrative-graph.md#narrative-hierarchy) |
| Find which run touched a file | [File Trace Viewer](../02_surfaces/02_desktop-app/03b_code-and-terminal/07_narrative-graph.md#file-trace-viewer) |
| Read a saved summary of changes | [Change Summaries](../02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/08_changes-summary.md) |

For example, open **Debug → Narrative Graph**, find a file operation, and select its path to inspect the recorded changes to that file and the associated execution.

For process output or model requests, see [Application Logs](../06a_application-logs.md).
