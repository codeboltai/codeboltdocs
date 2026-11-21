---
name: enable
description: Enable a hook.
cbbaseinfo:
  description: Enable a hook.
data:
  name: enable
  category: hook
  link: enable.md
---

# enable

```text
codebolt.hooks.enable(hookId: string): Promise<HookResponse>
```

Enable a hook.

## When to use it

Re-enable a configured hook after you have checked its event and handler.

## Examples

### Enable a Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.enable('hook-123');

  if (result.success) {
    console.log('Hook enabled and active');
  }
});
```

### Enable Multiple Hooks

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const hookIds = ['hook-001', 'hook-002', 'hook-003'];

  const results = await Promise.all(
    hookIds.map(id => codebolt.hooks.enable(id))
  );

  console.log(`Enabled ${results.filter(r => r.success).length} hooks`);
});
```
