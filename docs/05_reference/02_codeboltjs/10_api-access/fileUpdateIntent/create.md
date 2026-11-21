---
name: create
description: Create a new file update intent.
cbbaseinfo:
  description: Create a new file update intent.
data:
  name: create
  category: fileUpdateIntent
  link: create.md
---

# create

```text
codebolt.fileUpdateIntent.create(data: CreateFileUpdateIntentRequest, claimedBy: string, claimedByName?: string): Promise<{ intent?: FileUpdateIntent; overlap?: IntentOverlapResult; }>
```

Create a new file update intent

## When to use it

Record which files an agent expects to edit so other agents can inspect overlaps before beginning.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        { filePath: '/src/utils/format.ts', intentLevel: 2 }
      ],
      description: 'Add date formatting utilities',
      priority: 5,
      autoExpire: true,
      maxAutoExpireMinutes: 30
    },
    'agent-2'
  );
});
```

## More examples

### Create Basic Intent

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        {
          filePath: '/src/components/Header.tsx',
          intentLevel: 2
        }
      ],
      description: 'Add navigation menu to header',
      priority: 5
    },
    'agent-456',
    'Frontend Agent'
  );

  if (result.intent) {
    console.log('Intent created:', result.intent.id);
  }

  if (result.overlap?.hasOverlap) {
    console.log('Overlap detected:', result.overlap.message);
  }
});
```

### Create with Multiple Files

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        { filePath: '/src/auth/login.tsx', intentLevel: 3, targetSections: ['LoginForm'] },
        { filePath: '/src/auth/api.ts', intentLevel: 2 },
        { filePath: '/src/styles/auth.css', intentLevel: 1 }
      ],
      description: 'Implement OAuth login flow',
      priority: 7,
      estimatedDuration: 45
    },
    'agent-789'
  );
});
```

### Handle Conflicts

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        { filePath: '/src/config.ts', intentLevel: 4 }
      ],
      description: 'Update configuration',
      priority: 10
    },
    'agent-1'
  );

  if (result.overlap?.hasOverlap) {
    if (!result.overlap.canProceed) {
      console.log('Cannot proceed - files are blocked');
      console.log('Blocked by:', result.overlap.overlappingIntents);
      return;
    }

    console.log('Overlap detected but can proceed');
    console.log('Conflicting agents:', result.overlap.overlappingIntents);
  }
});
```

### Create Hard Lock for Critical File

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        {
          filePath: '/src/database/schema.ts',
          intentLevel: 4
        }
      ],
      description: 'Critical: Update database schema',
      priority: 10,
      estimatedDuration: 15
    },
    'database-agent'
  );
});
```

### Create with Section-Level Intent

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        {
          filePath: '/src/components/UserProfile.tsx',
          intentLevel: 2,
          targetSections: ['UserProfile', 'updateEmail', 'updatePassword']
        }
      ],
      description: 'Update email and password change handlers',
      priority: 6
    },
    'agent-3'
  );
});
```
