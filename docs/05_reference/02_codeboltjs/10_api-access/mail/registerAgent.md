---
name: registerAgent
description: Registers an agent with the mail system to enable sending and receiving messages.
cbbaseinfo:
  description: Registers an agent with the mail system to enable sending and receiving messages.
data:
  name: registerAgent
  category: mail
  link: registerAgent.md
---

# registerAgent

```text
codebolt.mail.registerAgent(params: IRegisterAgentParams): Promise<IRegisterAgentResponse>
```

Registers an agent with the mail system to enable sending and receiving messages.

## When to use it

Register a sender identity and its advertised capabilities before using mail.

## Example

### Register an agent with mail

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.registerAgent({
    id: 'docs-reviewer-id',
    name: 'Docs reviewer',
    capabilities: ['documentation-review'],
  });
  console.log(result);
});
```
