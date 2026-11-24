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

The default server returns an object in `data` keyed by enabled server name. Use `Object.keys` to read just the names.

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
  const { data } = await codebolt.mcp.getEnabledMCPServers();
  console.log('Enabled MCP servers:', Object.keys(data ?? {}));
});
```
