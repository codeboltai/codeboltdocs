---
sidebar_position: 3
title: Context Assembly
description: Run a context assembly request and review its memory and rule trace.
---

# Context Assembly

Context Assembly combines requested Persistent Memory definitions with definitions selected by context rules. The result contains grouped context items and a trace of the assembly request.

![Context Assembly Engine showing the Rule Engines list and the New Engine control](/img/desktop/context-assembly.webp)

## What gets assembled

The request supplies input, scopes, and any memory definitions or rule engines to run. Matching rules can add memory definitions. Codebolt runs the selected memory pipelines, deduplicates their items, and groups the results. If the request sets a token budget, Codebolt applies it to the assembled items.

## The assembly trace

Open **Context → Context Assembly**. Choose a rule engine and select **Run**, then enter sample input and scope variables. Inspect the returned context and trace to see which rules matched, which memory calls ran, and whether the results were truncated. This tests the assembly request you made. Use [AI Requests](../02_surfaces/02_desktop-app/03_chat/08_ai-requests.md) to inspect a recorded model call.

## See also

- [Context rules](./04_context-rules.md)
- [Persistent memory](./05_persistent-memory.md)
- [Memory ingestion](./06_memory-ingestion.md)
