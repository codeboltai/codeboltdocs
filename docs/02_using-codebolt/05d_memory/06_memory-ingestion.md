---
sidebar_position: 6
title: Memory Ingestion
description: Process event data and route the results to project memory stores.
---

# Memory Ingestion

Open **Context → Memory Ingestion** to set up a pipeline that processes event data and routes it to a project store.

![Memory Ingestion](/productImages/memorycontext/memoryingestion.png)

## Triggers

Choose one trigger for each pipeline. The picker shows available conversation, task, job, swarm, agent, file, and Git events, plus manual execution. Add a trigger filter when you only want to handle specific payloads.

## Processors

Give each processor an input and a named output. For example, use **Parser** to read JSON input, **Normalizer** to trim text, or **Chunker** before **Vector Embed** for a document. A later processor can read an earlier processor's named output.

## Routing rules

Choose the processor output to route and a destination. Supported writes include vector, graph, key-value, and event log. Fill in the destination's fields and enable iteration when the output is an array of items you want to write individually.

## Example

1. Choose **Create Pipeline** and select the manual trigger.
2. Add a **Parser** with `event.payload.record` as its input and `parsed_record` as its output.
3. Add a route from `parsed_record` to a key-value destination. Enter a namespace such as `reviews`. The record's `id` supplies the key if you leave the key template blank.
4. Save the pipeline. Paste the JSON below into **Test Execution**, run it, and inspect the processor and routing results.

   ```json
   {
     "record": "{\"id\":\"review-1\",\"decision\":\"accepted\"}"
   }
   ```

See [Persistent Memory](./05_persistent-memory.md) for reading stored data.
