# Utils

**Default server support.** The SDK sends the filesystem action `edit_file_and_apply_diff`. The default application server does not register that action, so this helper cannot apply the edit. For a targeted text change, see [File System](../fs/index.md).

Apply an edit and diff through the SDK.

## Replace text in a file

If you know the original text, use `codebolt.fs.editFile`. This example expects the heading `# Setup` to appear once in the workspace README.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const result = await codebolt.fs.editFile({
    file_path: 'README.md',
    old_string: '# Setup',
    new_string: '# Installation',
  });
  return result.success ? 'Updated the README heading.' : result.error;
});
```

## Intended use

Use the diff helper when an edit workflow already has a target file, a proposed diff, and a prompt for applying it.

## Request examples for a compatible server

### Request format

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Edit a file with AI assistance
  const result = await codebolt.utils.editFileAndApplyDiff(
    '/path/to/file.ts',
    'Change function signature',
    'diff-001',
    'Update the function to accept new parameters'
  );

  console.log('File edited:', result.success);
});
```

## SDK methods

### editFileAndApplyDiff

[`editFileAndApplyDiff`](editFileAndApplyDiff.md) · Edits a file and applies a diff with AI assistance.
