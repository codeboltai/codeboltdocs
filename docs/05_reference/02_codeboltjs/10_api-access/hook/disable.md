---
name: disable
description: Disable a hook (preserves configuration; can be re-enabled).
cbbaseinfo:
  description: Disable a hook (preserves configuration; can be re-enabled).
data:
  name: disable
  category: hook
  link: disable.md
---

# disable

```text
codebolt.hooks.disable(hookId: string): Promise<HookResponse>
```

Disable a hook (preserves configuration; can be re-enabled).

## When to use it

Pause one hook while troubleshooting it or while its handler is unavailable.

## Examples

### Disable a Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.hooks.disable('hook-123');

  if (result.success) {
    console.log('Hook disabled');
  }
});
```

### Temporarily Disable Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

async function runWithoutHook(hookId: string, task: () => Promise<void>) {
  // Disable hook
  await codebolt.hooks.disable(hookId);

  try {
    // Run task without hook interference
    await task();
  } finally {
    // Re-enable hook
    await codebolt.hooks.enable(hookId);
  }
}
```
