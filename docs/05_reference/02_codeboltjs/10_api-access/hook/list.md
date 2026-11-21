---
name: list
description: List all hooks.
cbbaseinfo:
  description: List all hooks.
data:
  name: list
  category: hook
  link: list.md
---

# list

```text
codebolt.hooks.list(): Promise<HookResponse>
```

List all hooks.

## When to use it

Inspect the available hook configurations before selecting one to modify.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.list();
  console.log(result);
});
```
