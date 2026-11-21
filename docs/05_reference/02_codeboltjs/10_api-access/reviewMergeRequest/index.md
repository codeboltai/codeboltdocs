---
sidebar_position: 1
title: Review Merge Request Module
---

# Review Merge Request

Create and manage requests to review and merge changes.

## When to use it

Create a review request for agent-produced changes, collect reviews, and inspect the request before merging.

## Examples

### Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new review request
  const request = await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: 'Implement user authentication',
    title: 'feat: Add OAuth2 login',
    description: 'Adds OAuth2 authentication with Google and GitHub providers',
    majorFilesChanged: ['src/auth/oauth.ts', 'src/auth/login.ts'],
    diffPatch: 'diff --git a/src/auth/oauth.ts...',
    agentId: 'agent_dev_001',
    agentName: 'Developer Agent',
    swarmId: 'swarm_frontend'
  });

  // Add review feedback
  if (request.request == null) throw new Error('The response is missing request.');
  await codebolt.reviewMergeRequest.addReview(request.request.id, {
    agentId: 'agent_reviewer_001',
    agentName: 'Code Reviewer',
    type: 'approve',
    comment: 'LGTM! Great implementation.'
  });

  // Update status to approved
  if (request.request == null) throw new Error('The response is missing request.');
  await codebolt.reviewMergeRequest.updateStatus(request.request.id, 'approved');

  // Merge the request
  if (request.request == null) throw new Error('The response is missing request.');
  await codebolt.reviewMergeRequest.merge(request.request.id, 'agent_dev_001');
});
```

### Review Only

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.reviewMergeRequest.create({
    type: 'review',
    initialTask: 'Code review for PR #123',
    title: 'Review: User profile updates',
    description: 'Please review the user profile update changes',
    majorFilesChanged: ['src/user/profile.ts'],
    diffPatch: '...',
    agentId: 'agent_dev',
    agentName: 'Developer'
  });
});
```

### Review with Merge

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: 'Implement search feature',
    title: 'feat: Add full-text search',
    description: 'Implements Elasticsearch-based search',
    majorFilesChanged: ['src/search/index.ts', 'src/search/query.ts'],
    diffPatch: '...',
    agentId: 'agent_dev',
    agentName: 'Developer',
    mergeConfig: {
      strategy: 'git_worktree',
      worktreeDetails: {
        worktreePath: '/tmp/worktree',
        branchName: 'feature/search',
        baseBranch: 'main'
      }
    }
  });
});
```

### Query and Filter Requests

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get pending requests
  const pending = await codebolt.reviewMergeRequest.pending();
  console.log(`Pending reviews: ${pending.totalCount}`);

  // Get requests ready to merge
  const ready = await codebolt.reviewMergeRequest.readyToMerge();
  console.log(`Ready to merge: ${ready.totalCount}`);

  // Filter by status
  const filtered = await codebolt.reviewMergeRequest.list({
    status: ['in_review', 'pending_review'],
    agentId: 'agent_dev_001',
    limit: 10
  });

  // Get requests by swarm
  const swarmRequests = await codebolt.reviewMergeRequest.bySwarm('swarm_frontend');
});
```

### Track Review Statistics

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const stats = await codebolt.reviewMergeRequest.statistics();
  console.log('Review Statistics:', stats.statistics);
});
```

## SDK methods

### list

List review merge requests.

```text
codebolt.reviewMergeRequest.list(filters?: ReviewMergeRequestFilters): Promise<{ requests: ReviewMergeRequest[]; totalCount: number; }>
```

### get

Get a single review merge request.

```text
codebolt.reviewMergeRequest.get(id: string): Promise<{ request: ReviewMergeRequest; }>
```

### create

[`create`](create.md) · Create a new review merge request.

### update

Update an existing review merge request.

```text
codebolt.reviewMergeRequest.update(id: string, data: UpdateReviewMergeRequest): Promise<{ request: ReviewMergeRequest; }>
```

### delete

Delete a review merge request.

```text
codebolt.reviewMergeRequest.delete(id: string): Promise<{ deleted: boolean; }>
```

### addReview

[`addReview`](addReview.md) · Add review feedback.

### updateStatus

Update status.

```text
codebolt.reviewMergeRequest.updateStatus(id: string, status: ReviewRequestStatus): Promise<{ request: ReviewMergeRequest; }>
```

### merge

Merge request.

```text
codebolt.reviewMergeRequest.merge(id: string, mergedBy: string): Promise<{ result: MergeResult; }>
```

### addLinkedJob

Add linked job.

```text
codebolt.reviewMergeRequest.addLinkedJob(id: string, jobId: string): Promise<{ request: ReviewMergeRequest; }>
```

### removeLinkedJob

Remove linked job.

```text
codebolt.reviewMergeRequest.removeLinkedJob(id: string, jobId: string): Promise<{ request: ReviewMergeRequest; }>
```

### addArtifact

Attach an artifact to a review merge request.

```text
codebolt.reviewMergeRequest.addArtifact(id: string, artifactId: string): Promise<{ request: ReviewMergeRequest; }>
```

### removeArtifact

Remove an artifact from a review merge request.

```text
codebolt.reviewMergeRequest.removeArtifact(id: string, artifactId: string): Promise<{ request: ReviewMergeRequest; }>
```

### pending

Get pending reviews.

```text
codebolt.reviewMergeRequest.pending(): Promise<{ requests: ReviewMergeRequest[]; totalCount: number; }>
```

### readyToMerge

Get ready to merge requests.

```text
codebolt.reviewMergeRequest.readyToMerge(): Promise<{ requests: ReviewMergeRequest[]; totalCount: number; }>
```

### byAgent

Get requests by agent.

```text
codebolt.reviewMergeRequest.byAgent(agentId: string): Promise<{ requests: ReviewMergeRequest[]; totalCount: number; }>
```

### bySwarm

Get requests by swarm.

```text
codebolt.reviewMergeRequest.bySwarm(swarmId: string): Promise<{ requests: ReviewMergeRequest[]; totalCount: number; }>
```

### checkConflict

Check for merge conflicts.

```text
codebolt.reviewMergeRequest.checkConflict(id: string): Promise<any>
```

### statistics

Get statistics.

```text
codebolt.reviewMergeRequest.statistics(): Promise<{ statistics: any; }>
```
