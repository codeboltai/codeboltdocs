---
sidebar_position: 2.8
title: Context Compaction
description: Preview compaction for a conversation thread and run it from an agent.
---

# Context Compaction

Use compaction when a conversation has grown long and you want to reduce the history carried into subsequent turns. To retrieve information from project stores, use [Context Assembly](./02g_context-assembly.md).

## Preview a thread

From a connected agent, pass an existing **context thread ID**. The server uses the project’s saved default profile unless you pass a `profileId`. A dry run executes the workflow, including any model-backed summarization steps, and returns the projected messages without replacing the stored context.

```js
const preview = await codebolt.contextCompaction.dryRun({ threadId });
if (!preview.success) throw new Error(preview.error);
const result = preview.data.result;
if (!result.success) throw new Error(result.error);
if (result.deferred) {
  console.log(result.deferredReason);
} else {
  console.log(result.stats.estimatedBeforeTokens, result.stats.estimatedAfterTokens);
  console.log(result.stepResults, result.preview?.messages);
}
```

To apply compaction to that thread, call `codebolt.contextCompaction.run({ threadId })`. A deferred dry run does not schedule another preview. Retry after the active model or tool round finishes. An applied run can be queued and retried by the server.

Use `getConfig()` to read the configuration and `getStepSpecs()` to inspect the available pipeline steps.

See the [desktop compaction panel](../../02_using-codebolt/02_surfaces/02_desktop-app/03c_panels/04e_memory-features/05_context-compaction.md) for the settings and the [SDK reference](../../05_reference/02_codeboltjs/10_api-access/contextCompaction/index.md) for method arguments.
