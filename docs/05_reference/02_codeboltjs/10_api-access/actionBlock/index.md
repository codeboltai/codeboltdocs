# Action Block

Find Action Blocks and start one by name.

## When to use it

Use an Action Block for a reusable operation with named inputs. Discover the block, inspect its input metadata, then pass those inputs when starting it.

## Examples

### Quick Start Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initialize connection

  // List available ActionBlocks
  const blocks = await codebolt.actionBlock.list();
  console.log('Available ActionBlocks:', blocks.actionBlocks);

  // Get details about a specific ActionBlock
  const detail = await codebolt.actionBlock.getDetail('file-reader');
  console.log('ActionBlock details:', detail.actionBlock);

  // Execute an ActionBlock
  const result = await codebolt.actionBlock.start('file-reader', {
    path: '/path/to/file.txt'
  });

  console.log('Execution result:', result);
});
```

### Data Processing

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get ActionBlock details to understand parameters
  const detail = await codebolt.actionBlock.getDetail('data-processor');

  // Execute with parameters
  const result = await codebolt.actionBlock.start('data-processor', {
    input: 'raw-data.csv',
    output: 'processed-data.json',
    transformations: ['clean', 'normalize', 'validate']
  });
});
```

### Workflow Automation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Chain multiple ActionBlocks
  const step1 = await codebolt.actionBlock.start('data-fetcher', { url: 'api/data' });
  const step2 = await codebolt.actionBlock.start('data-transformer', { input: step1.result });
  const step3 = await codebolt.actionBlock.start('data-saver', { data: step2.result, path: 'output.json' });
});
```

### Dynamic Execution

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Build dynamic workflows based on available ActionBlocks
  const blocks = await codebolt.actionBlock.list();
  const processorBlocks = blocks.actionBlocks.filter(b =>
    b.name.includes('process') || b.name.includes('transform')
  );

  for (const block of processorBlocks) {
    console.log(`Executing ${block.name}...`);
    await codebolt.actionBlock.start(block.name, { data: 'input-data' });
  }
});
```

## SDK methods

### list

[`list`](list.md) · List all available ActionBlocks.

### search

Search available ActionBlocks by name, description, tags, and inputs.

```text
codebolt.actionBlock.search(query: string, options?: ActionBlockSearchOptions): Promise<SearchActionBlocksResponse>
```

### getDetail

[`getDetail`](getDetail.md) · Get detailed information about a specific ActionBlock.

### start

[`start`](start.md) · Start an ActionBlock by name.
