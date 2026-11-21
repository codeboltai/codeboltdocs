---
name: getKnowledge
description: Retrieves a value from the in-memory database by key.
cbbaseinfo:
  description: Retrieves a value from the in-memory database by key.
data:
  name: getKnowledge
  category: dbmemory
  link: getKnowledge.md
---

# getKnowledge

```text
codebolt.dbmemory.getKnowledge(key: string): Promise<MemoryGetResponse>
```

Retrieves a value from the in-memory database by key.

## Parameters

- `key` — The key of the value to retrieve.

## Returns

A promise that resolves with the response from the memory get event.

## When to use it

Read a value your workflow saved earlier. Use the same key and handle a missing value.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Performance test - retrieving 10 items
  const retrieveStartTime = Date.now();
  for (let i = 0; i < 10; i++) {
    await codebolt.dbmemory.getKnowledge(`perf:item:${i}`);
  }
  const retrieveTime = Date.now() - retrieveStartTime;

  console.log(`10 retrieve operations: ${retrieveTime}ms`);
  console.log(`Average retrieve time: ${(retrieveTime / 10).toFixed(2)}ms`);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Retrieve configuration setting
  const themeResult = await codebolt.dbmemory.getKnowledge('config:theme');
  console.log("Theme:", themeResult.value); // 'dark'
});
```
