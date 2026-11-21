---
name: listActionBlocks
description: List all available ActionBlocks.
cbbaseinfo:
  description: List all available ActionBlocks.
data:
  name: listActionBlocks
  category: sideExecution
  link: listActionBlocks.md
---

# listActionBlocks

```text
codebolt.sideExecution.listActionBlocks(projectPath?: string): Promise<ListActionBlocksResponse>
```

List all available ActionBlocks

## Parameters

- `projectPath` — Optional project path to search for ActionBlocks

## Returns

Promise resolving to list of ActionBlocks

## When to use it

Discover action blocks in the project before building a picker for side executions.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.sideExecution.listActionBlocks('/my-project/actionblocks');
  console.log(result);
});
```

## Discover blocks in the active project

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const project = await codebolt.project.getProjectPath();
  if (!project.projectPath) throw new Error('Open a project first.');
  const catalog = await codebolt.sideExecution.listActionBlocks(project.projectPath);
  console.log(catalog);
});
```
