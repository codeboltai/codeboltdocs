# Job

Manage jobs, dependencies, assignments, locks, bids, and pheromones.

## Example

### Usage Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a job group
  const groupResult = await codebolt.job.createJobGroup({
    shortName: 'PROJ',
    name: 'My Project'
  });

  // Create a job in the group
  const jobResult = await codebolt.job.createJob(groupResult.group.id, {
    name: 'Implement feature X',
    type: 'feature',
    priority: 3,
    description: 'Detailed description...'
  });

  // Deposit a pheromone to indicate interest
  await codebolt.job.depositPheromone(jobResult.job.id, {
    type: 'interested',
    intensity: 0.8,
    depositedBy: 'agent-123'
  });

  // Lock the job before working
  await codebolt.job.lockJob(jobResult.job.id, 'agent-123', 'My Agent');

  // When done, unlock
  await codebolt.job.unlockJob(jobResult.job.id, 'agent-123');
});
```

## SDK methods

### createJob

[`createJob`](createJob.md)

### getJob

```text
codebolt.job.getJob(jobId: string): Promise<JobShowResponse>
```

### updateJob

```text
codebolt.job.updateJob(jobId: string, data: UpdateJobData): Promise<JobUpdateResponse>
```

### deleteJob

```text
codebolt.job.deleteJob(jobId: string): Promise<JobDeleteResponse>
```

### deleteJobs

```text
codebolt.job.deleteJobs(jobIds: string[]): Promise<JobDeleteBulkResponse>
```

### listJobs

```text
codebolt.job.listJobs(filters?: JobListFilters): Promise<JobListResponse>
```

### createJobGroup

```text
codebolt.job.createJobGroup(data: CreateJobGroupData): Promise<JobGroupCreateResponse>
```

### addDependency

```text
codebolt.job.addDependency(jobId: string, targetId: string, type?: DependencyType): Promise<JobDependencyResponse>
```

### removeDependency

```text
codebolt.job.removeDependency(jobId: string, targetId: string): Promise<JobDependencyResponse>
```

### getReadyJobs

```text
codebolt.job.getReadyJobs(filters?: JobListFilters): Promise<JobReadyBlockedResponse>
```

### getBlockedJobs

```text
codebolt.job.getBlockedJobs(filters?: JobListFilters): Promise<JobReadyBlockedResponse>
```

### addLabel

```text
codebolt.job.addLabel(label: string): Promise<JobLabelsResponse>
```

### removeLabel

```text
codebolt.job.removeLabel(label: string): Promise<JobLabelsResponse>
```

### listLabels

```text
codebolt.job.listLabels(): Promise<JobLabelsResponse>
```

### getPheromoneTypes

```text
codebolt.job.getPheromoneTypes(): Promise<JobPheromoneTypesResponse>
```

### addPheromoneType

```text
codebolt.job.addPheromoneType(data: AddPheromoneTypeData): Promise<JobPheromoneTypeResponse>
```

### removePheromoneType

```text
codebolt.job.removePheromoneType(name: string): Promise<JobPheromoneTypeResponse>
```

### depositPheromone

```text
codebolt.job.depositPheromone(jobId: string, deposit: DepositPheromoneData): Promise<JobPheromoneDepositResponse>
```

### removePheromone

```text
codebolt.job.removePheromone(jobId: string, type: string, depositedBy?: string): Promise<JobPheromoneRemoveResponse>
```

### getPheromones

```text
codebolt.job.getPheromones(jobId: string): Promise<JobPheromoneListResponse>
```

### getPheromonesAggregated

```text
codebolt.job.getPheromonesAggregated(jobId: string): Promise<JobPheromoneAggregatedResponse>
```

### listJobsByPheromone

```text
codebolt.job.listJobsByPheromone(type: string, minIntensity?: number): Promise<JobPheromoneSearchResponse>
```

### getPheromonesWithDecay

```text
codebolt.job.getPheromonesWithDecay(jobId: string): Promise<JobPheromoneListResponse>
```

### getPheromonesAggregatedWithDecay

```text
codebolt.job.getPheromonesAggregatedWithDecay(jobId: string): Promise<JobPheromoneAggregatedResponse>
```

### addSplitProposal

```text
codebolt.job.addSplitProposal(jobId: string, proposal: AddSplitProposalData): Promise<JobSplitProposeResponse>
```

### deleteSplitProposal

```text
codebolt.job.deleteSplitProposal(jobId: string, proposalId: string): Promise<JobSplitDeleteResponse>
```

### acceptSplitProposal

```text
codebolt.job.acceptSplitProposal(jobId: string, proposalId: string): Promise<JobSplitAcceptResponse>
```

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

### addBid

```text
codebolt.job.addBid(jobId: string, bid: AddBidData): Promise<JobBidAddResponse>
```

### withdrawBid

```text
codebolt.job.withdrawBid(jobId: string, bidId: string): Promise<JobBidWithdrawResponse>
```

### acceptBid

```text
codebolt.job.acceptBid(jobId: string, bidId: string): Promise<JobBidAcceptResponse>
```

### listBids

```text
codebolt.job.listBids(jobId: string): Promise<JobBidListResponse>
```

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

## Related pages

- [Bidding](./bidding.md)
- [Blockers](./blockers.md)
- [Locking](./locking.md)
- [Pheromones](./pheromones.md)
