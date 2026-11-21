# Dbmemory

Store and retrieve values in the application memory database.

## When to use it

Store and retrieve values by key for lightweight agent memory. Use the KV Store API when your workflow needs explicit instances and namespaces.

## Examples

### Integration with State Module

```javascript
import codebolt from '@codebolt/codeboltjs';

async function syncStateToMemory() {
  // Get project state
  const projectState = await codebolt.cbstate.getProjectState();

  // Cache in memory for fast access
  if (projectState.projectState == null) throw new Error('The response is missing projectState.');
  await codebolt.dbmemory.addKnowledge(
    'cache:project_config',
    projectState.projectState.state
  );

  console.log('✅ Project state cached in memory');
  return projectState;
}
```

### Integration with History Module

```javascript
import codebolt from '@codebolt/codeboltjs';

async function cacheConversationHistory() {
  // Get conversation summary
  const summary = await codebolt.chatSummary.summarizeAll();

  // Cache in memory for quick access
  await codebolt.dbmemory.addKnowledge(
    'cache:conversation_summary',
    {
      summary,
      cachedAt: new Date().toISOString()
    }
  );

  return summary;
}
```

### Memory Usage

```javascript
import codebolt from '@codebolt/codeboltjs';

// Monitor memory usage
async function checkMemorySize() {
  const keys = ['cache:users', 'cache:posts', 'cache:comments'];
  let totalSize = 0;

  for (const key of keys) {
    const result = await codebolt.dbmemory.getKnowledge(key);
    if (result.value) {
      const size = JSON.stringify(result.value).length;
      totalSize += size;
      console.log(`${key}: ${size} bytes`);
    }
  }

  console.log(`Total memory usage: ${totalSize} bytes`);
  return totalSize;
}
```

## SDK methods

### addKnowledge

[`addKnowledge`](addKnowledge.md) · Adds a key-value pair to the in-memory database.

### getKnowledge

[`getKnowledge`](getKnowledge.md) · Retrieves a value from the in-memory database by key.
