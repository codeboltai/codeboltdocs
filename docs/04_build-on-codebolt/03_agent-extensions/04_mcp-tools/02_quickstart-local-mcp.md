---
sidebar_position: 2
title: Quickstart — Local MCP Server
description: "Create a local MCP tool, register it with Codebolt, and have an agent call it. This covers two approaches:"
---

# Quickstart: Build a Local MCP Tool

Create a local MCP tool, register it with Codebolt, and have an agent call it. This covers two approaches:

1. **Local project tool** — place in `.codebolt/tools/` with a YAML config
2. **CodeBolt as an MCP server** — use `codebolt mcp start` with an MCP client.

**You'll need:** Codebolt installed and running, Node.js 18+, a project open.

---

## Approach 1: Local Project Tool

### Step 1 — Create the tool directory

```bash
cd /path/to/your/project
mkdir -p .codebolt/tools/greet
cd .codebolt/tools/greet
npm init -y
npm pkg set type=module
npm install @modelcontextprotocol/sdk
```

### Step 2 — Create `codebolttool.yaml`

This is the configuration file that Codebolt uses to discover and register your tool:

```yaml
# .codebolt/tools/greet/codebolttool.yaml
name: Greeting Tool
uniqueName: greet
version: 1.0.0
description: A simple greeting tool that returns friendly messages
# env_required:
#   - env_name: API_KEY
#     env_description: API key for the greeting service
```

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Display name of the tool |
| `uniqueName` | Yes | Unique identifier — used as the MCP server name |
| `version` | Yes | Semver version string |
| `description` | Yes | What the tool does |
| `env_required` | No | Array of required environment variables (`env_name`, `env_description`) |

### Step 3 — Write the MCP server

Save this as `index.js` in your tool directory.

```js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server({ name: 'greet', version: '1.0.0' }, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'hello',
    description: 'Return a greeting for the supplied name.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name']
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async request => {
  const name = request.params.arguments?.name;
  if (request.params.name !== 'hello' || typeof name !== 'string') {
    return { isError: true, content: [{ type: 'text', text: 'Expected hello with a name.' }] };
  }
  return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
});

await server.connect(new StdioServerTransport());
```

### Step 4 — How discovery works

Codebolt scans the open project's `.codebolt/tools/` directory for a `codebolttool.yaml` and an `index.js`. For this project it builds a Node.js launch configuration for `greet`, connects to the server, and reads its tool list. The runtime catalog exposes the greeting as `local/greet--hello`.

### Step 5 — Use from an agent

Look up the greeting in the project-local catalog and execute it by its qualified name. The server returns a pair in `data`: an error flag and the tool response.

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'project-local' });
  const greeting = data.tools.find(tool => tool.name === 'local/greet--hello');

  if (!greeting) {
    throw new Error('The hello tool is not available in the current project.');
  }

  const result = await codebolt.tools.execute(greeting.name, { name: 'Alice' });
  if (!Array.isArray(result.data)) throw new Error('Unexpected tool response');
  const [failed, reply] = result.data;
  if (failed) throw new Error(String(reply));

  const text = reply.content?.find((block: { type: string }) => block.type === 'text')?.text;
  if (reply.isError || !text) throw new Error(text || 'The greeting tool returned no text.');
  return text;
});
```

### Step 6 — Test from chat

Open a chat tab and ask the agent to use the greeting tool. With the handler above, the reply should be `Hello, Alice!`.

## Approach 2 — Expose CodeBolt as an MCP server {#approach-2-mcp-server-via-codeboltjs-api}

Start a CodeBolt project server. Use the CLI as the MCP client's stdio command, replacing `2719` with the project server's port.

```bash
codebolt mcp start --gateway-port 2719
```

See [MCP Server Commands](../../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/03_tool-commands.md) for options.

## Common pitfalls

- **Missing `codebolttool.yaml`** — without this file, Codebolt won't discover your tool.
- **Wrong entry point** — the tool directory must contain an `index.js` file (the default entry point).
- **Vague tool descriptions** — "Greet someone" is worse than "Return a friendly greeting for the given name. Use when the user asks to be greeted."
- **Writing to stdout during handling** — stdio transport uses stdout for protocol messages. Use stderr for logging.
- **Throwing instead of returning errors** — exceptions become opaque failures. Return structured error objects.

## See also

- [MCP Tools Overview](./01_overview.md)
- [Tool schema](./03_tool-schema.md)
- [Error handling](./06_error-handling.md)
- [Packaging](./07_packaging.md)
