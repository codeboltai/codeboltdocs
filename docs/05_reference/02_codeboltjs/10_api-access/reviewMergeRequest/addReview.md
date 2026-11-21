---
name: addReview
description: Add review feedback.
cbbaseinfo:
  description: Add review feedback.
data:
  name: addReview
  category: reviewMergeRequest
  link: addReview.md
---

# addReview

```text
codebolt.reviewMergeRequest.addReview(id: string, feedback: AddReviewFeedback): Promise<{ request: ReviewMergeRequest; }>
```

Add review feedback

## When to use it

Record a reviewer's feedback and decision against a specific request.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a comment without approving or requesting changes
  const result = await codebolt.reviewMergeRequest.addReview(
    'req_abc123',
    {
      agentId: 'agent_reviewer_ui',
      agentName: 'UI/UX Reviewer',
      type: 'comment',
      comment: 'Consider adding a loading state while the search is processing. ' +
               'Also, the results could benefit from better visual hierarchy.'
    }
  );
});
```

## More examples

### Approve Request

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Approve a review request
  const result = await codebolt.reviewMergeRequest.addReview(
    'req_abc123',
    {
      agentId: 'agent_reviewer_001',
      agentName: 'Senior Code Reviewer',
      type: 'approve',
      comment: 'LGTM! Code looks clean and well-structured. Approved for merge.'
    }
  );

  console.log('Review added');
  console.log('Total reviews:', result.request.reviews.length);
});
```

### Request Changes

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Request changes to the code
  const result = await codebolt.reviewMergeRequest.addReview(
    'req_abc123',
    {
      agentId: 'agent_reviewer_security',
      agentName: 'Security Reviewer',
      type: 'request_changes',
      comment: 'Please address the following security concerns:\n' +
               '1. Add input validation to the search parameter\n' +
               '2. Sanitize user input before database query\n' +
               '3. Implement rate limiting on this endpoint'
    }
  );

  console.log('Changes requested');
});
```

### Multiple Reviews from Different Agents

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Simulate a code review process
  const requestId = 'req_abc123';

  // Review 1: Automated checks
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_bot_lint',
    agentName: 'Lint Bot',
    type: 'approve',
    comment: 'All linting checks passed. No issues found.'
  });

  // Review 2: Technical review
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_reviewer_tech',
    agentName: 'Technical Lead',
    type: 'comment',
    comment: 'Good implementation. Consider extracting the validation logic ' +
             'into a separate utility for reusability.'
  });

  // Review 3: Security review
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_reviewer_security',
    agentName: 'Security Analyst',
    type: 'approve',
    comment: 'Security review passed. No vulnerabilities detected.'
  });

  console.log('All reviews completed');
});
```

### Detailed Code Review

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Comprehensive code review
  const result = await codebolt.reviewMergeRequest.addReview(
    'req_abc123',
    {
      agentId: 'agent_reviewer_senior',
      agentName: 'Senior Developer',
      type: 'request_changes',
      comment: `
## Code Review Feedback

### Critical Issues
1. **Memory Leak**: The event listener in \`SearchComponent\` is never removed
   - Location: src/components/Search.tsx:45
   - Fix: Add cleanup in useEffect return

2. **Race Condition**: Async state updates could cause inconsistencies
   - Location: src/hooks/useSearch.ts:78
   - Fix: Use functional state updates

### Suggestions
1. Consider using TypeScript strict mode for better type safety
2. Add error boundaries for better error handling
3. Extract magic numbers into constants
4. Add JSDoc comments for public functions

### Positive Notes
- Clean component structure
- Good use of custom hooks
- Comprehensive test coverage
    `.trim()
    }
  );
});
```

### Conditional Approval

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Approve with conditions
  async function approveWithConditions(requestId: string, conditions: string[]) {
    const comment = `
## Approval with Conditions

This code is approved for merge with the following conditions:

${conditions.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Please address these in a follow-up PR.
  `.trim();

    const result = await codebolt.reviewMergeRequest.addReview(requestId, {
      agentId: 'agent_reviewer_lead',
      agentName: 'Team Lead',
      type: 'approve',
      comment
    });

    return result;
  }

  // Usage
  await approveWithConditions('req_123', [
    'Add unit tests for the new utility function',
    'Update documentation to reflect the new API',
    'Create a tracking ticket for performance optimization'
  ]);
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Different reviewers for different aspects
async function multiStageReview(requestId: string) {
  // Stage 1: Automated checks
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_bot',
    agentName: 'CI Bot',
    type: 'comment',
    comment: 'Build passed, tests passed'
  });

  // Stage 2: Code review
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_reviewer_code',
    agentName: 'Code Reviewer',
    type: 'approve',
    comment: 'Code review passed'
  });

  // Stage 3: Security review
  await codebolt.reviewMergeRequest.addReview(requestId, {
    agentId: 'agent_reviewer_security',
    agentName: 'Security Reviewer',
    type: 'approve',
    comment: 'Security review passed'
  });
}
```
