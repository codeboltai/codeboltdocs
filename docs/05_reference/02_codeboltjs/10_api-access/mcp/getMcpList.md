---
name: getMcpList
description: SDK request for the MCP server catalog.
cbbaseinfo:
  description: SDK request for the MCP server catalog.
data:
  name: getMcpList
  category: mcp
  link: getMcpList.md
---

# getMcpList

```text
codebolt.mcp.getMcpList(): Promise<GetMcpListResponse>
```

The default server returns an unknown-action error for the SDK’s `getMcpList` request. To list configured servers, call `searchAvailableMCPServers('')`. The empty query matches every server name. The response’s `data` object is keyed by server name.

## List configured server names

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.mcp.searchAvailableMCPServers('');
  console.log(Object.keys(response.data ?? {}));
});
```

## List enabled server names

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.mcp.getEnabledMCPServers();
  console.log(Object.keys(response.data ?? {}));
});
```
