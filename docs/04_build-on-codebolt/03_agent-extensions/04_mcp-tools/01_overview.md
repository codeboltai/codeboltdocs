---
sidebar_position: 1
title: MCP Tools Overview
description: How to add MCP tools to a Codebolt app and how to build new MCP servers for agents.
---

# MCP Tools

How to add MCP tools to a Codebolt app and how to build new MCP servers for agents.

"Write a new tool" is usually the second extension you build after "tweak an agent" and it is often cheaper and more reusable than building a whole custom agent.

## In This Section

- [Quickstart: local MCP server](./02_quickstart-local-mcp.md)
- [Tool schema](./03_tool-schema.md)
- [Custom tools](./04_custom-tools.md)
- [Error handling](./06_error-handling.md)
- [Packaging and publishing](./07_packaging.md)

## Adding MCP tools to an app

Tools exposed over the Model Context Protocol are the primary way to add new capabilities to any agent without touching the agent's code. Install an MCP server and every agent in the project can discover and call its tools.

There are two ways to add MCP tools:

### 1. Local project tools

Place your MCP tool in the `.codebolt/tools/` directory with a `codebolttool.yaml` config. Codebolt automatically discovers and registers it:

```
.codebolt/tools/
└── my-tool/
    ├── codebolttool.yaml    # Tool configuration
    ├── index.js             # MCP server entry point
    └── package.json
```

See [Quickstart: Local MCP Server](./02_quickstart-local-mcp.md) for the full walkthrough.

### 2. External MCP servers

Configure external MCP servers in `~/.codebolt/mcp_servers.json`:

```json
{
  "servers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "my-postgres-mcp-server"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    }
  }
}
```

## The three ways to add a tool

Codebolt agents see a single flat namespace of callable tools. Under the hood, a tool can be one of three things:

| Kind | How you build it | When to use |
|---|---|---|
| **Local project tool** | A `.codebolt/tools/{name}/` directory with `codebolttool.yaml` and `index.js` | Project-specific tools, quick iteration |
| **MCP server** | A standalone process speaking the MCP protocol | Portable, community-standard tools |
| **Capability bundle** | A packaged bundle that declares tools + prompts + UI | When you need more than just a tool |

**Default choice: local project tool** for project-specific needs, **MCP server** for reusable/portable tools.

## Anatomy of an MCP tool

An MCP tool is three things:

1. **A name** — what the LLM calls it. Namespaced: `myserver.do_thing`.
2. **A schema** — the typed parameters the LLM provides.
3. **An implementation** — what actually runs when the tool is called.

The description is critical — the LLM decides whether to call your tool based on this string, not on its name. See [Tool schema](./03_tool-schema.md) for the full shape.

## Codebolt MCP APIs

Use `codebolt.mcp` to work with MCP server configuration and `codebolt.tools` to discover and execute callable tools.

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const enabled = await codebolt.mcp.getEnabledMCPServers();
  const { data } = await codebolt.tools.listRuntimeTools();
  console.log('Enabled servers:', Object.keys(enabled.data ?? {}));
  console.log('Callable tools:', data.tools);
});
```

## Tool execution flow

Select a project MCP tool from the catalog and pass its qualified name and the arguments defined by its input schema. For example, `local/greet--hello` identifies the `hello` tool from the project’s `greet` server.

```typescript
const result = await codebolt.tools.execute(tool.name, args);
if (!Array.isArray(result.data)) throw new Error('Unexpected tool response');
const [failed, reply] = result.data;
if (failed) throw new Error(String(reply));
console.log(reply);
```

## Creating an MCP server with CodeBolt

Use `codebolt mcp start` to expose tools from a running CodeBolt server to an MCP client. See [MCP Server Commands](../../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/03_tool-commands.md) for command options.

## See also

- [Tool schema](./03_tool-schema.md) — designing good tool schemas
- [Custom tools](./04_custom-tools.md) — building custom tools with CodeboltJS
- [Error handling](./06_error-handling.md) — making tools recoverable
- [Packaging](./07_packaging.md) — distributing MCP servers
