---
name: listAgents
description: Lists all registered agents in the mail system.
cbbaseinfo:
  description: Lists all registered agents in the mail system.
data:
  name: listAgents
  category: mail
  link: listAgents.md
---

# listAgents

```text
codebolt.mail.listAgents(): Promise<IListAgentsResponse>
```

Lists all registered agents in the mail system.

## When to use it

Discover agents registered with the mail service before preparing a communication workflow.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.listAgents();
  console.log(result);
});
```
