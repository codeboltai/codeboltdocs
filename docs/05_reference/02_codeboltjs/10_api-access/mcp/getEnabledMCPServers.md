---
name: getEnabledMCPServers
description: Gets the list of currently enabled MCP servers.
cbbaseinfo:
  description: Gets the list of currently enabled MCP servers.
data:
  name: getEnabledMCPServers
  category: mcp
  link: getEnabledMCPServers.md
---

# getEnabledMCPServers

```text
codebolt.mcp.getEnabledMCPServers(): Promise<GetEnabledToolBoxesResponse>
```

Gets the list of currently enabled MCP servers.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const enabled = await codebolt.mcp.getEnabledMCPServers();
  console.log(enabled);
});
```

## More examples

### Get Enabled Servers

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get list of enabled MCP servers
  const enabledServers = await codebolt.mcp.getEnabledMCPServers();
  console.log('Enabled MCP servers:', enabledServers);

  // }
});
```
