# Runtime Tools

Discover and invoke callable tools through the runtime gateway.

Use the runtime catalog to find a tool by name or source. Each descriptor includes `name`, `sourceType`, and `inputSchema`. Pass the discovered name and arguments to `execute`. Use the descriptor's `sourceId` to select a specific source, or use `sourceId: "codebolt"` for a built-in tool.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.tools.listRuntimeTools({ namespace: 'fs', limit: 10 });
  for (const tool of data.tools) {
    console.log(tool.name, tool.sourceType);
  }
});
```

## More examples

### Call a tool provided by an MCP server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  const greeting = data.tools.find(tool => tool.toolName === 'hello');
  if (!greeting) return;

  const response = await codebolt.tools.execute(
    greeting.name,
    { name: 'Ada' },
    { sourceId: greeting.sourceId },
  );
  if (Array.isArray(response.data)) {
    const [failed, value] = response.data;
    if (failed) throw new Error(String(value));
    return value;
  }
  throw new Error(response.error ?? 'Unexpected MCP tool response');
});
```

## SDK methods

### listBuiltInTools

```text
codebolt.tools.listBuiltInTools(options?: Pick<RuntimeToolListOptions, "namespace" | "grep" | "limit">): Promise<RuntimeToolListResponse>
```

### listExternalTools

```text
codebolt.tools.listExternalTools(options?: Pick<RuntimeToolListOptions, "namespace" | "sourceType" | "sourceId" | "grep" | "limit">): Promise<RuntimeToolListResponse>
```

### listRuntimeTools

```text
codebolt.tools.listRuntimeTools(options?: RuntimeToolListOptions): Promise<RuntimeToolListResponse>
```

### listToolNamespaces

```text
codebolt.tools.listToolNamespaces(options?: RuntimeToolListOptions): Promise<ToolNamespaceListResponse>
```

### listToolsByNamespace

```text
codebolt.tools.listToolsByNamespace(namespace: string, options?: Omit<RuntimeToolListOptions, "namespace">): Promise<RuntimeToolListResponse>
```

### listToolSources

```text
codebolt.tools.listToolSources(options?: RuntimeToolListOptions): Promise<ToolSourceListResponse>
```

### listToolsBySource

```text
codebolt.tools.listToolsBySource(sourceId: string, options?: Omit<RuntimeToolListOptions, "sourceId">): Promise<RuntimeToolListResponse>
```

### listToolGroups

```text
codebolt.tools.listToolGroups(options?: ToolGroupListOptions): Promise<ToolGroupListResponse>
```

### getRuntimeTool

```text
codebolt.tools.getRuntimeTool(name: string): Promise<{ data: { tool?: RuntimeToolDescriptor; }; }>
```

### execute

```text
codebolt.tools.execute(toolName: string, params?: ToolParameters, options?: ToolGatewayExecuteOptions): Promise<ExecuteToolResponse>
```

Check `success` before reading the returned `result`. The exact result content depends on the tool. See the [Web Search example](../webSearch/index.md) for a built-in call.
