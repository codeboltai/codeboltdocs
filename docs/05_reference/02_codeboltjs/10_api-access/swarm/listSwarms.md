---
name: listSwarms
description: List all available swarms.
cbbaseinfo:
  description: List all available swarms.
data:
  name: listSwarms
  category: swarm
  link: listSwarms.md
---

# listSwarms

```text
codebolt.swarm.listSwarms(): Promise<ListSwarmsResponse>
```

List all available swarms

## Returns

Promise resolving to array of swarms

## When to use it

Find a swarm and its identifier before showing a picker or loading team information.

## Examples

### Basic Swarm Listing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all swarms
  const result = await codebolt.swarm.listSwarms();

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log(`✅ Found ${result.data.swarms.length} swarms:`);
      result.data.swarms.forEach(swarm => {
          console.log(`- ${swarm.name} (${swarm.id})`);
      });
  }
});
```

### Display Detailed Swarm Information

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.swarm.listSwarms();

  if (result.success) {
      console.log('📋 All Swarms:');
      console.log('═'.repeat(60));

      if (result.data == null) throw new Error('The response is missing data.');
      result.data.swarms.forEach((swarm, index) => {
          console.log(`\n${index + 1}. ${swarm.name}`);
          console.log(`   ID: ${swarm.id}`);
          console.log(`   Description: ${swarm.description || 'No description'}`);
          console.log(`   Created: ${new Date(swarm.createdAt).toLocaleString()}`);
          if (swarm.metadata) {
              console.log(`   Metadata: ${JSON.stringify(swarm.metadata, null, 2)}`);
          }
      });
  }
});
```

### Error Handling

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
      const result = await codebolt.swarm.listSwarms();

      if (!result.success) {
          console.error('Failed to list swarms:', result.error);
          return;
      }

      if (result.data == null) throw new Error('The response is missing data.');
      if (result.data.swarms.length === 0) {
          console.log('No swarms found. Create one first!');
      } else {
          if (result.data == null) throw new Error('The response is missing data.');
          console.log(`Found ${result.data.swarms.length} swarm(s)`);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
  }
});
```
