---
sidebar_label: Hooks
---

# Hooks

Create hooks and manage their enabled state.

Access these methods through `codebolt.hooks` on the default client.

## When to use it

Run a handler at a supported CodeBolt lifecycle event. Inspect the saved hook and enable it after its event and handler are configured.

## Examples

### Automated Testing

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create hook to run tests on file changes
  await codebolt.hooks.create({
    name: 'test-on-change',
    description: 'Run tests when source files change',
    events: ['file.save'],
    filter: {
      pattern: 'src/**/*.ts'
    },
    action: {
      type: 'command',
      command: 'npm test',
      timeout: 30000
    }
  });
});
```

### Code Quality Checks

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create hook to lint code before commits
  await codebolt.hooks.create({
    name: 'pre-commit-lint',
    description: 'Run linter before git commits',
    events: ['git.pre-commit'],
    action: {
      type: 'command',
      command: 'npm run lint'
    }
  });
});
```

### Build Automation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create hook to build on specific file changes
  await codebolt.hooks.create({
    name: 'build-on-config-change',
    description: 'Rebuild when configuration changes',
    events: ['file.save'],
    filter: {
      pattern: '{package.json,tsconfig.json}'
    },
    action: {
      type: 'command',
      command: 'npm run build'
    }
  });
});
```

### Custom Workflows

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create hook for custom notifications
  await codebolt.hooks.create({
    name: 'notify-on-error',
    description: 'Send notification when errors occur',
    events: ['error.occurred'],
    action: {
      type: 'notification',
      message: 'An error occurred in the project'
    }
  });
});
```

## SDK methods

### initialize

[`initialize`](initialize.md) · Initialize the hook manager for a project.

### create

[`create`](create.md) · Create a new hook.

### update

Update an existing hook.

```text
codebolt.hooks.update(hookId: string, config: Partial<HookConfig>): Promise<HookResponse>
```

### delete

[`delete`](delete.md) · Delete a hook.

### list

[`list`](list.md) · List all hooks.

### get

[`get`](get.md) · Get a hook by id.

### enable

[`enable`](enable.md) · Enable a hook.

### disable

[`disable`](disable.md) · Disable a hook (preserves configuration; can be re-enabled).
