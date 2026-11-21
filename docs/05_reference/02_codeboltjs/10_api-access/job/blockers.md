# Blocker Operations

Record external blockers on a job, then resolve or remove a blocker by ID.

## When to use it

Record missing dependencies, unresolved decisions, or external work that prevents a job from proceeding.

## Examples

### addBlocker

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.addBlocker('JOB-123', {
    text: 'Missing API documentation for external service',
    addedBy: 'agent-456',
    addedByName: 'Development Agent',
    blockerJobIds: ['JOB-100', 'JOB-101']  // Optional: related blocking jobs
  });
});
```

### resolveBlocker

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.resolveBlocker(
    'JOB-123',       // jobId
    'blocker-789',   // blockerId
    'agent-456'      // resolvedBy
  );
  console.log('Blocker resolved');
});
```

### removeBlocker

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.removeBlocker('JOB-123', 'blocker-789');
  console.log('Blocker removed');
});
```

## SDK methods

### addBlocker

```text
codebolt.job.addBlocker(jobId: string, blocker: AddBlockerData): Promise<JobBlockerAddResponse>
```

### removeBlocker

```text
codebolt.job.removeBlocker(jobId: string, blockerId: string): Promise<JobBlockerRemoveResponse>
```

### resolveBlocker

```text
codebolt.job.resolveBlocker(jobId: string, blockerId: string, resolvedBy: string): Promise<JobBlockerResolveResponse>
```

### getBlockedJobs

```text
codebolt.job.getBlockedJobs(filters?: JobListFilters): Promise<JobReadyBlockedResponse>
```
