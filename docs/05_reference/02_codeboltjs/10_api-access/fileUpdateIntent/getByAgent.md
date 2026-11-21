---
name: getByAgent
description: Get intents by agent.
cbbaseinfo:
  description: Get intents by agent.
data:
  name: getByAgent
  category: fileUpdateIntent
  link: getByAgent.md
---

# getByAgent

```text
codebolt.fileUpdateIntent.getByAgent(agentId: string): Promise<FileUpdateIntent[]>
```

Get intents by agent

## When to use it

Review pending and historical intents associated with a particular agent.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const intents = await codebolt.fileUpdateIntent.getByAgent('agent-456');

  const active = intents.filter(i => i.status === 'active');

  console.log(`Agent has ${active.length} active intents`);
});
```
