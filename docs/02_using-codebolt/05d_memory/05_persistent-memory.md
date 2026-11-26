---
sidebar_position: 5
title: Persistent Memory
description: Define a retrieval pipeline that context assembly can select and run.
---

# Persistent Memory

A Persistent Memory definition tells CodeBolt what information to retrieve and how to include it in assembled context. A definition can read from sources such as the vector database, knowledge graph, KV store, or Event Log.

![Persistent Memory showing scope filters and the option to add a memory](/img/desktop/persistent-memory.webp)

## Define a pipeline

Open **Context → Persistent Memory** from the desktop bottom bar. In the definition builder, choose the inputs the pipeline needs, add retrieval steps, and choose where and how the results appear in context.

CodeBolt saves definitions as JSON in `.codebolt/PersistentMemory/`. Steps are in `retrieval.pipeline`. Each step has a `step` name and a `params` object. Use an exported definition as a starting point when editing by hand.

## Run a pipeline

Context assembly selects definitions requested explicitly or added by matching [context rules](./04_context-rules.md). It runs the selected pipelines using the inputs supplied on that request.

To test a definition, open its details and find **Test Retrieval**. Enter a query and any required context variables, then click **Run** and inspect the output. To include the definition in context assembly, select it explicitly or add it with a context rule.

See [Persistent Memory for developers](../../04_build-on-codebolt/07a_memory-management/02d_persistent-memory.md) for the stored schema, supported steps, and pipeline execution API.
