---
name: updateThreadStatus
cbbaseinfo:
  description: "Updates the status of a mail thread (open, closed, or archived)."
cbparameters:
  parameters:
    - name: params
      typeName: IUpdateThreadStatusParams
      description: Object containing threadId and the new status value.
  returns:
    signatureTypeName: "Promise<IUpdateThreadStatusResponse>"
    description: A promise that resolves with the updated thread.
data:
  name: updateThreadStatus
  category: mail
  link: updateThreadStatus.md
---
# updateThreadStatus

```typescript
codebolt.mail.updateThreadStatus(params: IUpdateThreadStatusParams): Promise<IUpdateThreadStatusResponse>
```

Updates the status of a mail thread (open, closed, or archived).
### Parameters

- **`params`** (IUpdateThreadStatusParams): Object containing threadId and the new status value.

### Returns

- **`Promise<IUpdateThreadStatusResponse>`**: A promise that resolves with the updated thread.

### Response Structure

```typescript
interface IUpdateThreadStatusResponse {
  success: boolean;
  thread?: {
    id: string;
    status: string;
    updatedAt: string;
  };
  error?: string;
}
```

### Examples

#### Example 1: Close a Thread

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.updateThreadStatus({
    threadId: 'thread-123',
    status: 'closed'
  });

  if (result.success) {
    console.log('Thread closed');
  }
});
```

#### Example 2: Archive Completed Thread

```typescript
const result = await codebolt.mail.updateThreadStatus({
  threadId: 'thread-456',
  status: 'archived'
});

console.log('Thread archived');
```

### Common Use Cases

- **Thread Lifecycle**: Manage thread states
- **Cleanup**: Archive or close old threads
- **Workflow Control**: Control thread visibility and state

### Notes

- Valid statuses: open, closed, archived
- Archived threads don't appear in default listings
- Closed threads cannot receive new messages
