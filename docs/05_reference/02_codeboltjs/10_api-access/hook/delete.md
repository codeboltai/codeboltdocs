---
name: delete
description: Delete a hook.
cbbaseinfo:
  description: Delete a hook.
data:
  name: delete
  category: hook
  link: delete.md
---

# delete

```text
codebolt.hooks.delete(hookId: string): Promise<HookResponse>
```

Delete a hook.

## When to use it

Remove a hook configuration that a project no longer uses. Use disable to pause a configuration you plan to keep.

## Example

### Delete a Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.delete('hook-123');

  if (result.success) {
    console.log('Hook deleted successfully');
  }
});
```
