---
sidebar_position: 4
title: Map-Reduce
description: "A specialisation of manager-worker for the classic map-reduce shape: apply the same operation to N inputs in parallel, then combine the N outputs."
---

# Map-Reduce

A specialisation of [manager-worker](./manager-worker.md) for the classic map-reduce shape: apply the same operation to N inputs in parallel, then combine the N outputs.

## When to use

- **Homogeneous tasks.** Every sub-task is structurally the same — same prompt, same tools, different input.
- **Results combine cleanly.** There's a well-defined reduce step: sum, union, merge, concatenate, pick-best.
- **Scale matters.** N is large enough that running sequentially is painful.

Examples: summarise each file in a directory, generate tests for each function in a module, extract a field from each of N JSON documents, translate each paragraph.

## Shape

```
          input list [i1, i2, i3, ..., iN]
                       │
                       ▼
                  ┌──── map ────┐
                  ▼     ▼   ... ▼
                 A1    A2       AN      ← worker agents, same prompt
                  │     │        │
                  ▼     ▼        ▼
                 r1    r2       rN      ← partial results
                  │     │        │
                  └──── reduce ──┘
                       │
                       ▼
                    result
```

## Map vs manager-worker

Map-reduce is manager-worker with two constraints:

1. All workers run the *same* agent configuration.
2. The combine step is a pure function of the partial results, not a new round of decision-making.

If either constraint is false, it's just manager-worker.

## Implementation

In a connected parent agent, pass the current thread ID, an installed worker’s agent ID, and two project file paths to this function. Each child gets a separate conversation and a read-only task. Both run concurrently. The parent waits for their replies and combines them in file order.

```ts
import codebolt from '@codebolt/codeboltjs';

async function summarizePair(parentId: string, agentId: string, files: [string, string]) {
  const summaries = await Promise.all(files.map(async (file) => {
    const result = await codebolt.thread.createAndStartThreadAndWait({
      parentId,
      agentId,
      userMessage: `Read ${file} and summarize its purpose in one paragraph.`,
    });
    if (!result.success || !result.output) {
      throw new Error(result.error || `No summary returned for ${file}`);
    }
    return `${file}\n${result.output}`;
  }));
  return summaries.join('\n\n');
}
```

For a larger file list, process it in bounded batches so your parent agent controls the number of simultaneous requests. [Subagent and child thread APIs](../../03_agent-extensions/08_subagents.md)

## The reduce step

Two flavours:

### Pure reduce (deterministic)
The orchestrator collects results and applies a deterministic function: sum the numbers, merge the sets, concatenate the strings. No LLM needed. Cheapest and most predictable.

### LLM reduce
The orchestrator asks an LLM to synthesise the partials into a unified result. Use when the partials need judgment to combine — e.g. "here are 10 draft summaries of different files, write a unified summary of the module".

Prefer pure reduce when possible. LLM reduce re-introduces non-determinism and cost.

## Variations

### Bounded parallelism
Cap concurrency to K workers at a time. Start the next batch after the current batch finishes. Essential at large N.

### Map-reduce with filtering
The map step can drop items ("this file isn't relevant"). The reduce step only sees items that survived. Cheap way to combine classification + processing.

### Hierarchical reduce
For very large N, combine in a tree: reduce groups of 10, then reduce the reductions. Keeps any single reduce step's context manageable.

## Pitfalls

- **Unbounded parallelism.** N=1000 with no cap will open 1000 processes, spend your LLM budget in seconds, and probably hit provider rate limits. Always cap.
- **Heterogeneous items pretending to be homogeneous.** If some items need different prompts, you don't have a map-reduce — you have manager-worker. Don't force it.
- **Losing the per-item context in the reduce.** If the reduce needs to know which item each result came from, carry the item ID in the partial result. Easy to forget.
- **Rate limits.** Bursty concurrent LLM calls will hit provider rate limits before they hit Codebolt's own caps. Set worker concurrency below your provider's sustained rate.

## Example output

For two input files, the combined reply contains the first file’s path and summary, followed by the second file’s path and summary. The parent can return that text in Chat or pass it to a reviewer with a request to compare the modules.

## See also

- [Manager-Worker](./manager-worker.md) — the general form
- [Pipeline](./pipeline.md) — for sequential work
- [Agent Flows](../04_agent-flows.md)
