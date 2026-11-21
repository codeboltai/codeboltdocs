---
name: configureMCPServer
description: Configures a specific MCP server with provided configuration.
cbbaseinfo:
  description: Configures a specific MCP server with provided configuration.
data:
  name: configureMCPServer
  category: mcp
  link: configureMCPServer.md
---

# configureMCPServer

```text
codebolt.mcp.configureMCPServer(name: string, config: MCPConfiguration): Promise<ConfigureToolBoxResponse>
```

Configures a specific MCP server with provided configuration.

## Example

### Configure an existing MCP server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const serverName = 'your-installed-server';
  const result = await codebolt.mcp.configureMCPServer(serverName, { serverName });
  console.log(result);
});
```
