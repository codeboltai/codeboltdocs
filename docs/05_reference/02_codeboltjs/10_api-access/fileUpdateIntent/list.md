---
name: list
description: List intents.
cbbaseinfo:
  description: List intents.
data:
  name: list
  category: fileUpdateIntent
  link: list.md
---

# list

```text
codebolt.fileUpdateIntent.list(filters?: FileUpdateIntentFilters): Promise<FileUpdateIntent[]>
```

List intents

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const intents = await codebolt.fileUpdateIntent.list({
    environmentId: 'env-123'
  });

  console.log(`Found ${intents.length} intents`);
});
```

## More examples

### List Active Intents

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const activeIntents = await codebolt.fileUpdateIntent.list({
    environmentId: 'env-123',
    status: ['active']
  });

  console.log('Active intents:', activeIntents.length);
});
```

### List by Agent

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const agentIntents = await codebolt.fileUpdateIntent.list({
    environmentId: 'env-123',
    claimedBy: 'agent-456'
  });

  console.log(`Agent has ${agentIntents.length} intents`);
});
```

### List by File Pattern

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const allIntents = await codebolt.fileUpdateIntent.list({
    environmentId: 'env-123'
  });

  const buttonIntents = allIntents.filter(intent =>
    intent.files.some(f => f.filePath.includes('Button'))
  );
});
```
