---
name: start
description: Start an ActionBlock by name.
cbbaseinfo:
  description: Start an ActionBlock by name.
data:
  name: start
  category: actionBlock
  link: start.md
---

# start

```text
codebolt.actionBlock.start(actionBlockName: string, params?: Record<string, any>, options?: StartActionBlockOptions): Promise<StartActionBlockResponse>
```

Start an ActionBlock by name

## Parameters

- `actionBlockName` — Name of the ActionBlock to start
- `params` — Optional parameters to pass to the ActionBlock
- `options` — Optional execution controls

## Returns

Promise resolving to execution result

## When to use it

Run a named block after you know its expected inputs. Use side execution when your caller has a block directory path or needs inline code.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.actionBlock.start('data-processor', {
    input: 'raw-data.csv',
    output: 'processed-data.json',
    transformations: ['clean', 'normalize', 'validate'],
    options: {
      skipErrors: true,
      maxRows: 10000
    }
  });

  console.log('Processing complete:', result.sideExecutionId);
});
```

## More examples

### Execute Simple ActionBlock

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.actionBlock.start('file-reader', {
    path: '/path/to/file.txt'
  });

  if (result.success) {
    console.log('File content:', result.result);
  } else {
    console.error('Execution failed:', result.error);
  }
});
```

### Chain ActionBlocks

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a workflow using multiple ActionBlocks
  const workflow = async (inputFile: string) => {
    // Step 1: Read file
    const step1 = await codebolt.actionBlock.start('file-reader', {
      path: inputFile
    });

    if (!step1.success) throw new Error('Failed to read file');

    // Step 2: Process data
    const step2 = await codebolt.actionBlock.start('data-transformer', {
      data: step1.result,
      transform: 'normalize'
    });

    if (!step2.success) throw new Error('Failed to transform data');

    // Step 3: Save result
    const step3 = await codebolt.actionBlock.start('file-writer', {
      path: 'output.json',
      data: step2.result
    });

    return step3;
  };

  const result = await workflow('input.csv');
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const executeWithErrorHandling = async (
    actionBlockName: string,
    params: Record<string, any>
  ) => {
    try {
      const result = await codebolt.actionBlock.start(actionBlockName, params);

      if (!result.success) {
        console.error('Execution failed:', result.error);
        return null;
      }

      console.log('Execution ID:', result.sideExecutionId);
      return result.result;
    } catch (error) {
      console.error('Unexpected error:', error);
      return null;
    }
  };

  const result = await executeWithErrorHandling('file-reader', { path: 'data.txt' });
});
```

### Parallel Execution

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const processMultipleFiles = async (files: string[]) => {
    const results = await Promise.allSettled(
      files.map(file =>
        codebolt.actionBlock.start('file-reader', { path: file })
      )
    );

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        console.log(`File ${index}: OK`);
      } else {
        console.error(`File ${index}: Failed`);
      }
    });

    return results;
  };

  const results = await processMultipleFiles(['file1.txt', 'file2.txt', 'file3.txt']);
});
```

### Conditional Execution

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const smartProcessor = async (file: string) => {
    // Detect file type
    const detect = await codebolt.actionBlock.start('file-type-detector', {
      path: file
    });

    const fileType = detect.result?.type;

    // Choose appropriate processor
    if (fileType === 'image') {
      return await codebolt.actionBlock.start('image-processor', { file });
    } else if (fileType === 'document') {
      return await codebolt.actionBlock.start('document-processor', { file });
    } else if (fileType === 'data') {
      return await codebolt.actionBlock.start('data-processor', { file });
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  };
});
```

### File Operations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Read file
  const content = await codebolt.actionBlock.start('file-reader', {
    path: 'data.json'
  });

  // Write file
  await codebolt.actionBlock.start('file-writer', {
    path: 'output.json',
    data: { key: 'value' }
  });

  // Delete file
  await codebolt.actionBlock.start('file-deleter', {
    path: 'temp.txt'
  });
});
```

### Batch Operations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const batchProcess = async (items: any[]) => {
    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);

      await codebolt.actionBlock.start('batch-processor', {
        items: batch,
        operation: 'transform'
      });

      console.log(`Processed batch ${i / batchSize + 1}`);
    }
  };
});
```
