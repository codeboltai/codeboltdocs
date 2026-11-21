---
name: getAgent
description: Retrieves details about a specific registered agent.
cbbaseinfo:
  description: Retrieves details about a specific registered agent.
data:
  name: getAgent
  category: mail
  link: getAgent.md
---

# getAgent

```text
codebolt.mail.getAgent(params: IGetAgentParams): Promise<IGetAgentResponse>
```

Retrieves details about a specific registered agent.

## When to use it

Check a registered agent's identity or capabilities before deciding whether to contact it.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.getAgent({
    agentId: 'developer-agent-001'
  });
  console.log(result);
});
```
