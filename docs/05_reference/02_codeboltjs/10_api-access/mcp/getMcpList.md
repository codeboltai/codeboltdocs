---
name: getMcpList
description: Gets the list of available MCP servers.
cbbaseinfo:
  description: Gets the list of available MCP servers.
data:
  name: getMcpList
  category: mcp
  link: getMcpList.md
---

# getMcpList

```text
codebolt.mcp.getMcpList(): Promise<GetMcpListResponse>
```

Gets the list of available MCP servers.

## Example

### Get All Available MCP Servers

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get list of all available MCP servers
  const serverList = await codebolt.mcp.getMcpList();
  console.log('Available MCP servers:', serverList);

  // }
});
```

## Inspect server names for a picker

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.mcp.getMcpList();
  for (const server of response.data ?? []) {
    console.log(server.name, server.enabled);
  }
});
```
