---
name: list
description: List all available ActionBlocks.
cbbaseinfo:
  description: List all available ActionBlocks.
data:
  name: list
  category: actionBlock
  link: list.md
---

# list

```text
codebolt.actionBlock.list(filter?: ActionBlockFilter): Promise<ListActionBlocksResponse>
```

List all available ActionBlocks

## Parameters

- `filter` — Optional filter to narrow results by type

## Returns

Promise resolving to list of ActionBlocks

## When to use it

Populate a block picker for a workflow. Use the returned names to load details before building the input form.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.actionBlock.list();

  if (result.success) {
    console.log('Available ActionBlocks:');
    result.actionBlocks.forEach(block => {
      console.log(`- ${block.name} (${block.type}): ${block.description}`);
    });
  }
});
```

## More examples

### Build ActionBlock Registry

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const buildRegistry = async () => {
    const result = await codebolt.actionBlock.list();

    const registry = result.actionBlocks.reduce((acc, block) => {
      if (!acc[block.type]) acc[block.type] = [];

      acc[block.type].push({
        name: block.name,
        description: block.description,
        version: block.version,
        inputs: block.metadata.inputs || [],
        outputs: block.metadata.outputs || []
      });

      return acc;
    }, {} as Record<string, any>);

    return registry;
  };

  const registry = await buildRegistry();
  console.log('ActionBlock Registry:', registry);
});
```

### Find ActionBlocks by Tag

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const findByTag = async (tag: string) => {
    const result = await codebolt.actionBlock.list();

    const matched = result.actionBlocks.filter(block =>
      block.metadata.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    );

    return matched;
  };

  const dataBlocks = await findByTag('data');
  console.log('Data-related ActionBlocks:', dataBlocks);
});
```

### Search ActionBlocks

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const searchActionBlocks = async (searchTerm: string) => {
    const result = await codebolt.actionBlock.list();

    const matched = result.actionBlocks.filter(block =>
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.metadata.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return matched;
  };

  const results = await searchActionBlocks('file');
  console.log('File-related ActionBlocks:', results);
});
```

### ActionBlock Discovery

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const discoverActionBlocks = async () => {
    const result = await codebolt.actionBlock.list();

    const categorized = result.actionBlocks.reduce((acc, block) => {
      const category = block.type;
      if (!acc[category]) acc[category] = [];

      acc[category].push({
        name: block.name,
        description: block.description,
        canExecute: canExecuteBlock(block)
      });

      return acc;
    }, {} as Record<string, any[]>);

    return categorized;
  };

  function canExecuteBlock(block: any): boolean {
    // Check if we have required dependencies
    return true;
  }
});
```

### Build Workflow Catalog

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const buildWorkflowCatalog = async () => {
    const result = await codebolt.actionBlock.list();

    const catalog = {
      dataProcessing: result.actionBlocks.filter(b => b.metadata.tags?.includes('data')),
      fileOperations: result.actionBlocks.filter(b => b.type === 'filesystem'),
      system: result.actionBlocks.filter(b => b.type === 'builtin'),
      custom: result.actionBlocks.filter(b => b.metadata.author !== 'system')
    };

    return catalog;
  };
});
```
