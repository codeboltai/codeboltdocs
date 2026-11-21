# Utils

Apply an edit and diff through the SDK.

## When to use it

Use the diff helper when an edit workflow already has a target file, a proposed diff, and a prompt for applying it.

## Example

### Quick Start Example

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
