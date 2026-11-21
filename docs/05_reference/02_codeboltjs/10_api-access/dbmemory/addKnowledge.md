---
name: addKnowledge
description: Adds a key-value pair to the in-memory database.
cbbaseinfo:
  description: Adds a key-value pair to the in-memory database.
data:
  name: addKnowledge
  category: dbmemory
  link: addKnowledge.md
---

# addKnowledge

```text
codebolt.dbmemory.addKnowledge(key: string, value: MemoryValue): Promise<MemorySetResponse>
```

Adds a key-value pair to the in-memory database.

## Parameters

- `key` — The key under which to store the value.
- `value` — The value to be stored.

## Returns

A promise that resolves with the response from the memory set event.

## When to use it

Save data under a key you can look up later, such as a cached calculation or a project preference.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Performance test - storing 10 items
  const startTime = Date.now();
  for (let i = 0; i < 10; i++) {
    await codebolt.dbmemory.addKnowledge(`perf:item:${i}`, {
      id: i,
      value: `test value ${i}`,
      timestamp: Date.now()
    });
  }
  const storeTime = Date.now() - startTime;
  console.log(`10 store operations: ${storeTime}ms`);
  console.log(`Average store time: ${(storeTime / 10).toFixed(2)}ms`);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Store complex object with error handling
  try {
    const sessionResult = await codebolt.dbmemory.addKnowledge('session:current', {
      sessionId: 'sess_' + Date.now(),
      userId: 'user:123',
      startTime: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        language: 'en'
      }
    });

    if (sessionResult.success) {
      console.log("Session data stored successfully");
    } else {
      console.error("Failed to store session data:", sessionResult.error);
    }
  } catch (error) {
    console.error("Error storing session data:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // String value
  await codebolt.dbmemory.addKnowledge('config:theme', 'dark');

  // Number value
  await codebolt.dbmemory.addKnowledge('counter:visits', 42);

  // Array value
  await codebolt.dbmemory.addKnowledge('tags:project', ['javascript', 'nodejs', 'codebolt']);

  // Complex object
  await codebolt.dbmemory.addKnowledge('settings:app', {
    theme: 'dark',
    language: 'en',
    notifications: true,
    features: {
      autoSave: true,
      darkMode: true
    }
  });

  console.log('✅ Different data types stored successfully');
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store session data
  const sessionData = {
    sessionId: 'sess_' + Date.now(),
    userId: 'user:123',
    startTime: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      language: 'en'
    },
    activity: []
  };

  await codebolt.dbmemory.addKnowledge('session:current', sessionData);
  console.log('✅ Session data stored successfully');
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store project configuration
  const projectConfig = {
    name: 'codebolt-test-project',
    version: '1.0.0',
    dependencies: ['@codebolt/codeboltjs'],
    scripts: {
      test: 'node tests/dbmemory-test.js',
      start: 'node index.js'
    },
    settings: {
      autoSave: true,
      linting: true,
      formatting: 'prettier'
    }
  };

  await codebolt.dbmemory.addKnowledge('project:config', projectConfig);
  console.log('✅ Project configuration stored successfully');
});
```

### Updating Existing Data

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initial data
  await codebolt.dbmemory.addKnowledge('user:123', {
    name: 'John Doe',
    age: 30,
    role: 'developer'
  });

  // Update the data
  const updatedUser = {
    name: 'John Doe',
    age: 31, // Updated age
    role: 'senior developer', // Updated role
    lastLogin: new Date().toISOString()
  };

  await codebolt.dbmemory.addKnowledge('user:123', updatedUser);
  console.log('✅ Knowledge updated successfully');
});
```
