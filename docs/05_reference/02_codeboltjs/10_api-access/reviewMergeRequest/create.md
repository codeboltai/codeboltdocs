---
name: create
description: Create a new review merge request.
cbbaseinfo:
  description: Create a new review merge request.
data:
  name: create
  category: reviewMergeRequest
  link: create.md
---

# create

```text
codebolt.reviewMergeRequest.create(data: CreateReviewMergeRequest): Promise<{ request?: ReviewMergeRequest; data?: { request: ReviewMergeRequest; }; success?: boolean; }>
```

Create a new review merge request

## When to use it

Open a review handoff for work that needs a separate approval or review step.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create request documenting implementation details
  const result = await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: 'Add rate limiting',
    title: 'feat: Implement API rate limiting',
    description: 'Adds configurable rate limiting to all API endpoints',
    majorFilesChanged: ['src/middleware/rate-limit.ts'],
    diffPatch: '...',
    agentId: 'agent_api_001',
    agentName: 'API Developer',
    issuesFaced: [
      'Had to handle distributed counter synchronization',
      'Redis connection pooling required tuning'
    ],
    remainingTasks: [
      'Add rate limiting to admin endpoints',
      'Implement rate limit exceeded response formatting'
    ]
  });
});
```

## More examples

### Create Basic Review Request

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple review request
  const result = await codebolt.reviewMergeRequest.create({
    type: 'review',
    initialTask: 'Fix login bug',
    title: 'fix: Resolve authentication timeout',
    description: 'Fixes the timeout issue when users try to login',
    majorFilesChanged: ['src/auth/login.ts', 'src/auth/service.ts'],
    diffPatch: 'diff --git a/src/auth/login.ts...',
    agentId: 'agent_dev_001',
    agentName: 'Developer Agent'
  });

  if (result.request == null) throw new Error('The response is missing request.');
  console.log('Review request created:', result.request.id);
  console.log('Status:', result.request.status); // 'draft'
});
```

### Create Review with Merge Request

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a review request that includes merge
  const result = await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: 'Implement user search feature',
    title: 'feat: Add user search with filters',
    description: 'Implements full-text search with advanced filtering capabilities',
    majorFilesChanged: [
      'src/search/user-search.ts',
      'src/search/filters.ts',
      'src/api/search-routes.ts'
    ],
    diffPatch: 'diff --git a/src/search/user-search.ts...',
    agentId: 'agent_dev_002',
    agentName: 'Backend Developer',
    swarmId: 'swarm_backend',
    mergeConfig: {
      strategy: 'patch',
      patchContent: 'diff --git a/...'
    }
  });

  console.log('Review & merge request created');
});
```

### Create with Extended Description

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create request with rich description
  const result = await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: 'Implement caching layer',
    title: 'feat: Add Redis caching',
    taskDescription: `
## Task Overview
Implement a Redis-based caching layer for frequently accessed data.

## Technical Approach
- Use Redis as cache store
- Implement cache-aside pattern
- Add cache invalidation logic
- Handle cache failures gracefully

## Implementation Details
- Cache TTL: 5 minutes default
- Cache key format: resource:id
- Fallback to DB on cache miss
  `.trim(),
    description: 'Adds Redis caching with automatic invalidation',
    majorFilesChanged: [
      'src/cache/redis.ts',
      'src/cache/middleware.ts',
      'src/config/cache.ts'
    ],
    diffPatch: '...',
    agentId: 'agent_perf_001',
    agentName: 'Performance Specialist'
  });
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Automatically create review after code generation
async function autoReviewAfterCodegen(codegenResult: any, agentId: string) {
  return await codebolt.reviewMergeRequest.create({
    type: 'review_merge',
    initialTask: codegenResult.task,
    title: `feat: ${codegenResult.feature}`,
    description: codegenResult.description,
    majorFilesChanged: codegenResult.files,
    diffPatch: codegenResult.diff,
    agentId: agentId,
    agentName: 'Code Generator Agent'
  });
}
```
