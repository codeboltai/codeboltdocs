# Locking Operations

Lock a job by ID. Use unlock requests to coordinate an unlock when another agent holds the lock.

## When to use it

Use a lock when one agent needs exclusive control of a job. Release a lock your workflow acquired when the protected work ends.

## Examples

### lockJob

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.lockJob(
    'JOB-123',      // jobId
    'agent-456',    // agentId
    'Code Agent'    // optional agentName
  );

  if (result.job) {
    console.log('Lock acquired successfully');
  } else {
    console.log('Failed to acquire lock');
  }
});
```

### unlockJob

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.unlockJob('JOB-123', 'agent-456');
  console.log('Lock released');
});
```

### isJobLocked

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const status = await codebolt.job.isJobLocked('JOB-123');

  if (status.isLocked) {
    if (status.lock == null) throw new Error('The response is missing lock.');
    console.log(`Locked by ${status.lock.lockedByName} at ${status.lock.lockedAt}`);
  } else {
    console.log('Job is not locked');
  }
});
```

### addUnlockRequest

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.addUnlockRequest('JOB-123', {
    requestedBy: 'agent-789',
    requestedByName: 'Urgent Agent',
    reason: 'Need to fix critical bug in this job'
  });
});
```

### approveUnlockRequest

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.approveUnlockRequest(
    'JOB-123',           // jobId
    'request-abc',       // unlockRequestId
    'agent-456'          // respondedBy (current lock holder)
  );
});
```

### rejectUnlockRequest

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.rejectUnlockRequest(
    'JOB-123',
    'request-abc',
    'agent-456'
  );
});
```

### deleteUnlockRequest

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.deleteUnlockRequest('JOB-123', 'request-abc');
});
```

## SDK methods

### lockJob

```text
codebolt.job.lockJob(jobId: string, agentId: string, agentName?: string): Promise<JobLockAcquireResponse>
```

### unlockJob

```text
codebolt.job.unlockJob(jobId: string, agentId: string): Promise<JobLockReleaseResponse>
```

### isJobLocked

```text
codebolt.job.isJobLocked(jobId: string): Promise<JobLockCheckResponse>
```

### addUnlockRequest

```text
codebolt.job.addUnlockRequest(jobId: string, request: AddUnlockRequestData): Promise<JobUnlockRequestAddResponse>
```

### approveUnlockRequest

```text
codebolt.job.approveUnlockRequest(jobId: string, unlockRequestId: string, respondedBy: string): Promise<JobUnlockRequestApproveResponse>
```

### rejectUnlockRequest

```text
codebolt.job.rejectUnlockRequest(jobId: string, unlockRequestId: string, respondedBy: string): Promise<JobUnlockRequestRejectResponse>
```

### deleteUnlockRequest

```text
codebolt.job.deleteUnlockRequest(jobId: string, unlockRequestId: string): Promise<JobUnlockRequestDeleteResponse>
```
