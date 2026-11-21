---
name: listCapabilities
description: List all available capabilities with optional filtering.
cbbaseinfo:
  description: List all available capabilities with optional filtering.
data:
  name: listCapabilities
  category: capability
  link: listCapabilities.md
---

# listCapabilities

```text
codebolt.capability.listCapabilities(filter?: CapabilityFilter): Promise<ListCapabilitiesResponse>
```

List all available capabilities with optional filtering

## Parameters

- `filter` — Optional filter criteria (type, tags, author)

## Returns

Promise resolving to list of capabilities

Requirements: 9.1

## When to use it

Populate a capability picker or find a capability before starting it. Inspect the selected capability's details before supplying inputs.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Combine multiple filters
  const filtered = await codebolt.capability.listCapabilities({
    type: 'skill',
    tags: ['automation'],
    author: 'codebolt-team'
  });

  console.log('Filtered capabilities:', filtered.capabilities);
});
```

## More examples

### List All Capabilities

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all available capabilities without filtering
  const result = await codebolt.capability.listCapabilities();

  if (result.success) {
    console.log(`Found ${result.capabilities.length} capabilities:`);
    result.capabilities.forEach(cap => {
      console.log(`- ${cap.name} (${cap.type}): ${cap.description}`);
    });
  } else {
    console.error('Failed to list capabilities:', result.error);
  }
});
```

### Filter by Type

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List only skills
  const skills = await codebolt.capability.listCapabilities({
    type: 'skill'
  });

  console.log('Available skills:', skills.capabilities);

  // List only powers
  const powers = await codebolt.capability.listCapabilities({
    type: 'power'
  });

  console.log('Available powers:', powers.capabilities);
});
```

### Filter by Tags

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find AI-related capabilities
  const aiCapabilities = await codebolt.capability.listCapabilities({
    tags: ['ai', 'machine-learning']
  });

  console.log('AI Capabilities:', aiCapabilities.capabilities);

  // Find data processing capabilities
  const dataCapabilities = await codebolt.capability.listCapabilities({
    tags: ['data', 'processing']
  });

  console.log('Data Processing Capabilities:', dataCapabilities.capabilities);
});
```

### Filter by Author

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get capabilities by a specific author
  const authorCapabilities = await codebolt.capability.listCapabilities({
    author: 'codebolt-team'
  });

  console.log('Official Codebolt capabilities:', authorCapabilities.capabilities);

  // Get community capabilities
  const communityCapabilities = await codebolt.capability.listCapabilities({
    author: 'community-contributor'
  });

  console.log('Community capabilities:', communityCapabilities.capabilities);
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
    const result = await codebolt.capability.listCapabilities();

    if (!result.success) {
      console.error('Operation failed:', result.error);
      return;
    }

    // Process capabilities
    result.capabilities.forEach(capability => {
      console.log(`${capability.name}: ${capability.description}`);
    });

    // Group by type
    const byType = result.capabilities.reduce((acc, cap) => {
      if (!acc[cap.type]) acc[cap.type] = [];
      acc[cap.type].push(cap);
      return acc;
    }, {} as Record<string, typeof result.capabilities>);

    console.log('Capabilities by type:', byType);

  } catch (error) {
    console.error('Unexpected error:', error);
  }
});
```

### Capability Discovery

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const discoverCapabilities = async () => {
    const result = await codebolt.capability.listCapabilities();

    const capabilityMap = result.capabilities.reduce((map, cap) => {
      map[cap.name] = cap;
      return map;
    }, {} as Record<string, any>);

    return capabilityMap;
  };

  const capabilities = await discoverCapabilities();
  console.log('Available capabilities:', Object.keys(capabilities));
});
```
