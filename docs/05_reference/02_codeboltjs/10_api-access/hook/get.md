---
name: get
description: Get a hook by id.
cbbaseinfo:
  description: Get a hook by id.
data:
  name: get
  category: hook
  link: get.md
---

# get

```text
codebolt.hooks.get(hookId: string): Promise<HookResponse>
```

Get a hook by id.

## When to use it

Inspect one hook's configuration by ID before changing it.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.get('hook-123');
  console.log(result);
});
```
