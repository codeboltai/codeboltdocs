---
name: startWithCode
description: Start a side execution with inline JavaScript code.
cbbaseinfo:
  description: Start a side execution with inline JavaScript code.
data:
  name: startWithCode
  category: sideExecution
  link: startWithCode.md
---

# startWithCode

```text
codebolt.sideExecution.startWithCode(inlineCode: string, params?: Record<string, any>, timeout?: number): Promise<StartSideExecutionResponse>
```

Start a side execution with inline JavaScript code

## Parameters

- `inlineCode` — JavaScript code to execute
- `params` — Additional parameters available in the execution context
- `timeout` — Execution timeout in milliseconds (default: 5 minutes)

## Returns

Promise resolving to the side execution ID

## When to use it

Run a small purpose-built operation, such as a validation or a file transformation, and pass its inputs separately.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute async code with delays
  const result = await codebolt.sideExecution.startWithCode(
    `
  async function processTask() {
    const steps = [];

    for (let i = 1; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      steps.push({ step: i, status: 'completed', timestamp: Date.now() });
    }

    return { steps, message: 'All steps completed' };
  }

  return await processTask();
  `,
    {},
    300000 // 5 minute timeout
  );
  console.log('✅ Async execution started');
});
```

## More examples

### Data Processing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Process data in isolation
  const rawData = [1, 2, 3, 4, 5];

  const result = await codebolt.sideExecution.startWithCode(
    `
  const data = params.input;

  const processed = data.map(item => ({
    original: item,
    squared: item * item,
    cubed: item * item * item
  }));

  const sum = processed.reduce((acc, item) => acc + item.original, 0);

  return { processed, sum, count: processed.length };
  `,
    { input: rawData }
  );
  console.log('✅ Data processing started');
});
```

### Error Handling in Inline Code

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute code with error handling
  const result = await codebolt.sideExecution.startWithCode(
    `
  try {
    const data = params.input;

    if (!data || data.length === 0) {
      throw new Error('Input data is empty');
    }

    const result = data.map(item => {
      if (item.value < 0) {
        throw new Error(\`Invalid value: \${item.value}\`);
      }
      return item.value * 2;
    });

    return { success: true, result };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
  `,
    { input: [{ value: 1 }, { value: 2 }, { value: 3 }] }
  );
  console.log('✅ Code execution with error handling started');
});
```

### Complex Computation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Perform complex calculation without blocking main thread
  const result = await codebolt.sideExecution.startWithCode(
    `
  const { iterations } = params;

  // Fibonacci calculation
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const results = [];

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    const fib = fibonacci(i + 30);
    const duration = Date.now() - start;

    results.push({
      n: i + 30,
      fibonacci: fib,
      duration: duration
    });
  }

  return {
    iterations: results.length,
    results: results,
    totalDuration: results.reduce((acc, r) => acc + r.duration, 0)
  };
  `,
    { iterations: 5 },
    600000 // 10 minute timeout for heavy computation
  );
  console.log('✅ Heavy computation started in side process');
});
```
