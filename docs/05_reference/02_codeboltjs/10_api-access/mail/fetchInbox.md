---
name: fetchInbox
description: Fetches messages from the agent's inbox with optional filtering.
cbbaseinfo:
  description: Fetches messages from the agent's inbox with optional filtering.
data:
  name: fetchInbox
  category: mail
  link: fetchInbox.md
---

# fetchInbox

```text
codebolt.mail.fetchInbox(params: IFetchInboxParams): Promise<IFetchInboxResponse>
```

Fetches messages from the agent's inbox with optional filtering.

## When to use it

Read an agent's mailbox or request unread messages when checking for new handoffs.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.fetchInbox({
    agentId: 'agent-001',
    limit: 20
  });
  console.log(result);
});
```
