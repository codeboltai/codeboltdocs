# getAvailableToolBoxes

Use `codebolt.mcp.searchAvailableMCPServers('')` to list all configured servers. To narrow the results, pass part of a server name or description.

## List configured servers

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.mcp.searchAvailableMCPServers('');
  console.log(Object.keys(data ?? {}));
});
```
