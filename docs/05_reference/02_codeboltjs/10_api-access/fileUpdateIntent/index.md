# File Update Intent

Record intended file edits and detect overlapping work.

## When to use it

Declare planned changes and check overlapping paths before assigning edits to multiple agents. Use an actual lock when a job needs exclusive ownership.

## Examples

### Quick Start Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an intent to modify files
  const result = await codebolt.fileUpdateIntent.create(
    {
      environmentId: 'env-123',
      files: [
        {
          filePath: '/src/components/Button.tsx',
          intentLevel: 2,
          targetSections: ['Button', 'handleClick']
        },
        {
          filePath: '/src/styles/button.css',
          intentLevel: 1
        }
      ],
      description: 'Update button component with new styles',
      priority: 5,
      autoExpire: true,
      maxAutoExpireMinutes: 30
    },
    'agent-456',
    'Frontend Developer Agent'
  );

  if (result.overlap?.hasOverlap) {
    console.log('Conflict detected:', result.overlap.message);

    if (!result.overlap.canProceed) {
      console.log('Cannot proceed due to conflicts');
      return;
    }
  }

  if (result.intent == null) throw new Error('The response is missing intent.');
  console.log('Intent created:', result.intent.id);

  // Complete the work
  await codebolt.fileUpdateIntent.complete(
    result.intent.id,
    'agent-456'
  );
});
```

### Conflict Prevention

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Check before starting work
  const overlap = await codebolt.fileUpdateIntent.checkOverlap(
    'env-123',
    ['/src/config.ts'],
    3 // Priority level
  );

  if (overlap.blockedFiles.length > 0) {
    console.log('Files are hard-locked:', overlap.blockedFiles);
    return;
  }
});
```

## SDK methods

### create

[`create`](create.md) · Create a new file update intent.

### update

[`update`](update.md) · Update an existing intent.

### get

[`get`](get.md) · Get a single intent.

### list

[`list`](list.md) · List intents.

### complete

[`complete`](complete.md) · Complete an intent.

### cancel

[`cancel`](cancel.md) · Cancel an intent.

### checkOverlap

[`checkOverlap`](checkOverlap.md) · Check for overlap without creating.

### getBlockedFiles

[`getBlockedFiles`](getBlockedFiles.md) · Get blocked files (level 4 locks).

### getByAgent

[`getByAgent`](getByAgent.md) · Get intents by agent.

### getFilesWithIntents

[`getFilesWithIntents`](getFilesWithIntents.md) · Get all files with intents.

### delete

[`delete`](delete.md) · Delete an intent.
