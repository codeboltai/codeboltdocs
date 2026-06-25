---
sidebar_position: 1
title: Install a Third-Party MCP Server
description: "The fastest path to adding tools an agent can use: install an existing MCP server from the marketplace or a third party."
---

# Install a Third-Party MCP Server

The fastest path to adding tools an agent can use: install an existing MCP server from the marketplace or a third party.

**You'll need:** Codebolt installed, a project open.

## Option 1 — from the marketplace

Open **Settings → Marketplace → Tools**. Browse or search for what you need. Typical searches:

- `postgres` — SQL database access
- `slack` — post messages, read channels
- `github` — issues, PRs, repos
- `linear` — project management
- `stripe` — payments
- `kubernetes` — kubectl-style operations

Click an entry, read the description, check what tools it provides. If it looks right, click **Install**.

Codebolt will:
1. Download the bundle.
2. Verify signature.
3. Install files.
4. Start the server process.
5. Register tools in your workspace namespace.

Watch the status — it should go from `installing` to `running` within seconds.

## Option 2 — manual install from npm

If you know of an MCP server on npm but it's not in the marketplace:

```bash
# Global install (recommended for shared tools)
npm install -g @some-author/mcp-server-name

# Or local (per-project)
cd /path/to/project
npm install @some-author/mcp-server-name
```

Then register in your project's MCP server configuration (via **Settings → Tools → Add MCP Server** or by editing the MCP config directly):

```yaml
servers:
  some-server:
    command: npx
    args: ["@some-author/mcp-server-name"]
```

Codebolt picks up the new server within a few seconds.

## Option 3 — local binary or script

If the server is a local binary or script you have:

```yaml
servers:
  my-server:
    command: /usr/local/bin/my-mcp-server
    args: ["--config", ".my-config.yaml"]
    env:
      API_KEY: ${MY_API_KEY}
```

The `${MY_API_KEY}` syntax reads from your shell environment — never hard-code secrets.

## Option 4 — remote MCP server

For an MCP server running on a remote machine (HTTP or SSE transport):

```yaml
servers:
  remote-server:
    url: https://mcp.my-company.com
    auth:
      type: bearer
      token_env: REMOTE_MCP_TOKEN
```

## Verify the install

Check **Settings → Tools** — your new server should appear with state `running`.

Verify it provides the expected tools by checking the tool list in the settings panel.

## Give an agent access

New tools are **not** automatically in every agent's allowlist. Add them explicitly:

```yaml
# .codebolt/agents/my-agent/codeboltagent.yaml
tools:
  allow:
    - codebolt_fs.*
    - my-server.*          # all tools from my-server
    # or more narrowly:
    - my-server.read_data
    - my-server.create_issue
```

Restart Codebolt or reload the project for changes to take effect.

Test in a chat: ask the agent to do something that needs the new tool. Watch the stream to confirm the tool call happens.

## Security considerations

Installing an MCP server runs code on your machine with your credentials. Treat it like installing any other library:

- **Check the author.** Marketplace entries show install count and rating. Low-trust sources warrant caution.
- **Read the tool list.** A simple tool that wants `codebolt_fs.write_file + codebolt_git.git_push` is suspicious. Think about blast radius.
- **Prefer first-party.** The official Stripe MCP server from Stripe is safer than "some random person's Stripe MCP".
- **Use env-var auth.** Never commit API keys to config files. Always use `${VAR}` references.
- **Start with a scoped allowlist.** Don't immediately give every agent access to the new tools. Add them only where needed.

## Troubleshooting

### "Server keeps crashing"
Check logs in **Settings → Tools → [server name] → Logs**.
Usually a missing dependency, bad config, or missing env var.

### "Tool not found" from an agent
The tool isn't in the agent's `tools.allow`. Add it.

### "Server is slow"
Check resource usage in **Settings → Tools → [server name]**. Long tool calls are usually the server's problem, not Codebolt's — optimise the server or pick a faster alternative.

### "Permission denied"
Check that the command in the MCP server configuration is executable and on PATH. Use absolute paths if in doubt.

## Updating

From the marketplace, use the **Update** button in **Settings → Tools**.

For manually-installed npm packages:
```bash
npm update -g @some-author/mcp-server-name
```

Then restart the MCP server via **Settings → Tools → [server name] → Restart**.

## Uninstalling

Use **Settings → Tools → [server name] → Uninstall** to remove the server and stop the process.

## See also

- [Tools & MCP Overview](../../02_using-codebolt/05_tools-and-mcp/01_overview.md)
- [Installing MCP Servers](../../02_using-codebolt/05_tools-and-mcp/02_installing-mcp-servers.md)
- [Build Your First MCP Server](./build-your-first-mcp-server.md) — if you can't find what you need
- [MCP Tools Overview](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
