---
name: archiveThread
cbbaseinfo:
  description: Archives a mail thread to remove it from active view while preserving history.
cbparameters:
  parameters:
    - name: params
      typeName: IArchiveThreadParams
      description: Object containing the threadId to archive.
  returns:
    signatureTypeName: "Promise<IArchiveThreadResponse>"
    description: A promise that resolves when the thread is archived.
data:
  name: archiveThread
  category: mail
  link: archiveThread.md
---
# archiveThread

```typescript
codebolt.mail.archiveThread(params: IArchiveThreadParams): Promise<IArchiveThreadResponse>
```

Archives a mail thread to remove it from active view while preserving history.
### Parameters

- **`params`** (IArchiveThreadParams): Object containing the threadId to archive.

### Returns

- **`Promise<IArchiveThreadResponse>`**: A promise that resolves when the thread is archived.

### Response Structure

```typescript
interface IArchiveThreadResponse {
  success: boolean;
  error?: string;
}
```

### Examples

#### Example 1: Archive a Thread

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.archiveThread({
    threadId: 'thread-123'
  });

  if (result.success) {
    console.log('Thread archived successfully');
  }
});
```

### Common Use Cases

- **Clean Up**: Remove completed threads from active view
- **Organization**: Archive old conversations
- **Storage**: Preserve thread history without clutter

### Notes

- Archived threads are preserved but hidden
- Can be retrieved with status filter
- Alternative to deletion for keeping history
