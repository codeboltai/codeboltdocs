---
name: editFileAndApplyDiff
description: Edits a file and applies a diff with AI assistance.
cbbaseinfo:
  description: Edits a file and applies a diff with AI assistance.
data:
  name: editFileAndApplyDiff
  category: utils
  link: editFileAndApplyDiff.md
---

# editFileAndApplyDiff

**Default server support.** The SDK sends the filesystem action `edit_file_and_apply_diff`. The default application server does not register that action, so this helper cannot apply the edit. For a targeted text change, see [File System](../fs/index.md).

```text
codebolt.utils.editFileAndApplyDiff(filePath: string, diff: string, diffIdentifier: string, prompt: string, applyModel?: string): Promise<FsEditFileAndApplyDiffResponse>
```

For an example using the default server, see [Replace text in a file](./index.md#replace-text-in-a-file).

## Parameters

- `filePath` — The path to the file to edit.
- `diff` — The diff to apply.
- `diffIdentifier` — The identifier for the diff.
- `prompt` — The prompt for the AI model.
- `applyModel` — Optional model to use for applying the diff.

## Returns

A promise that resolves with the edit response.

## Request examples for a compatible server

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // 1. Define the change
  const diff = 'Add error handling';

  // 2. Create detailed prompt
  const prompt = 'Add try-catch blocks around all async operations. Handle errors appropriately with logging and user feedback.';

  // 3. Apply the diff
  const result = await codebolt.utils.editFileAndApplyDiff(
    '/src/api/client.ts',
    diff,
    `diff-${Date.now()}`,
    prompt
  );

  // 4. Check result
  if (result.success) {
    console.log('Changes applied successfully');
  } else {
    console.error('Failed to apply changes:', result.error);
  }
});
```

## Additional request example

### Basic File Edit with Diff

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Edit a file with a simple diff
  const result = await codebolt.utils.editFileAndApplyDiff(
    '/src/utils/helpers.ts',
    'Add new helper function',
    'diff-001',
    'Add a utility function to format dates'
  );

  console.log('File edit result:', result);

  // }
});
```
