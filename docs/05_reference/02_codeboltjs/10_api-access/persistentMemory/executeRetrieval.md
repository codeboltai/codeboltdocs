---
name: executeRetrieval
description: Execute memory retrieval pipeline.
cbbaseinfo:
  description: Execute memory retrieval pipeline.
data:
  name: executeRetrieval
  category: persistentMemory
  link: executeRetrieval.md
---

# executeRetrieval

```text
codebolt.persistentMemory.executeRetrieval(memoryId: string, intent: PipelineExecutionIntent): Promise<PersistentMemoryExecuteResponse>
```

Execute memory retrieval pipeline

## Parameters

- `memoryId` — Memory ID
- `intent` — Execution intent with context

## When to use it

Run an existing retrieval definition with the variables it needs, then use the returned results when assembling context.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve code-related context
  const result = await codebolt.persistentMemory.executeRetrieval(
      'code-memory-123',
      {
          query: 'Error handling in async functions',
          context: {
              language: 'typescript',
              framework: 'express',
              file: 'auth.ts'
          },
          action: 'code_assist'
      }
  );

  if (result.success) {
      console.log('Code context retrieved');
      // Use the result to provide intelligent assistance
  }
});
```

## More examples

### Basic Retrieval Execution

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a simple retrieval
  const result = await codebolt.persistentMemory.executeRetrieval(
      'memory-123',
      {
          query: 'How do I implement authentication?'
      }
  );

  if (result.success) {
      console.log('✅ Retrieval successful');
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('Results:', result.data.result);
  }
});
```

### Execute with Context

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute with detailed context
  const result = await codebolt.persistentMemory.executeRetrieval(
      'memory-123',
      {
          query: 'Best practices for API design',
          context: {
              project: 'E-commerce Platform',
              stack: ['Node.js', 'Express', 'MongoDB'],
              stage: 'development'
          },
          action: 'code_review'
      }
  );

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Retrieval with context:', result.data.result);
});
```

### Execute with Keywords

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute with keywords for better matching
  const result = await codebolt.persistentMemory.executeRetrieval(
      'memory-123',
      {
          query: 'Database optimization techniques',
          keywords: ['performance', 'mongodb', 'indexing', 'query']
      }
  );

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Retrieval results:', result.data.result);
});
```

### Execute with Multiple Context Variables

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Complex execution with extensive context
  const result = await codebolt.persistentMemory.executeRetrieval(
      'memory-123',
      {
          query: 'User onboarding flow',
          context: {
              user_id: 'user-456',
              current_step: 'verification',
              previous_steps: ['signup', 'email_confirmation'],
              user_segment: 'enterprise',
              a_b_test_group: 'B'
          },
          action: 'user_guidance',
          keywords: ['onboarding', 'verification', 'enterprise']
      }
  );

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Guidance retrieved:', result.data.result);
});
```
