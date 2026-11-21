---
name: initialize
description: Initialize the hook manager for a project.
cbbaseinfo:
  description: Initialize the hook manager for a project.
data:
  name: initialize
  category: hook
  link: initialize.md
---

# initialize

```text
codebolt.hooks.initialize(projectPath: string): Promise<HookResponse>
```

Initialize the hook manager for a project.

## When to use it

Initialize hook handling against the project path your workflow will use.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.initialize('/Users/developer/my-project');
  console.log(result);
});
```
