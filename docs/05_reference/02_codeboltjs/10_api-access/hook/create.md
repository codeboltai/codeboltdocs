---
name: create
description: Create a new hook.
cbbaseinfo:
  description: Create a new hook.
data:
  name: create
  category: hook
  link: create.md
---

# create

```text
codebolt.hooks.create(config: HookConfig): Promise<HookResponse>
```

Create a new hook.

## When to use it

Register a handler for a supported agent lifecycle event, such as a check before an operation proceeds.

## Examples

### Create Git Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const hook = await codebolt.hooks.create({
    name: 'pre-commit-tests',
    description: 'Run tests before committing',
    events: ['git.pre-commit'],
    action: {
      type: 'command',
      command: 'npm test',
      timeout: 60000
    },
    enabled: true
  });

  console.log('Pre-commit hook created');
});
```

### Create Build Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const hook = await codebolt.hooks.create({
    name: 'build-on-dependency-change',
    description: 'Rebuild when package.json changes',
    events: ['file.save'],
    filter: {
      pattern: 'package.json'
    },
    action: {
      type: 'command',
      command: 'npm run build'
    },
    enabled: true
  });
});
```

### Create Notification Hook

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const hook = await codebolt.hooks.create({
    name: 'error-notifications',
    description: 'Notify when errors occur',
    events: ['error.occurred'],
    action: {
      type: 'notification',
      message: 'Error occurred in {{file}}: {{error}}',
      level: 'error'
    },
    enabled: true
  });
});
```
