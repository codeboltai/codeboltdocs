---
sidebar_position: 6
title: Installing MCP Servers
description: "Three sources for an MCP server: a marketplace registry, a manual config entry for a private/local server, or a capability bundle that ships its own"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing MCP Servers

![Installing MCP Servers](/productImages/agent_extensions/install_mcp_server.png)

Three sources for an MCP server: a marketplace registry, a manual config entry for a private/local server, or a capability bundle that ships its own. The mechanics are the same — what differs is where the manifest comes from.

## 1. From the marketplace (easiest)

The same install action across surfaces:

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the MCP server or Tools install surface exposed by your build. Read the description, review permissions, then install.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool-install commands from previous drafts.

</TabItem>
<TabItem value="tui" label="TUI">

Press `m` to open the marketplace pane, switch to the **Tools** tab with `Tab`, navigate with `↑/↓`, press `Enter` on the entry, then `i` to install.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/tools/install
Content-Type: application/json

{ "source": "marketplace/my-server", "version": "2.1.0" }
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
import codebolt from '@codebolt/codeboltjs';

await codebolt.tools.install('marketplace/my-server');
await codebolt.tools.install('marketplace/my-server', { version: '2.1.0' });
```

</TabItem>
</Tabs>

What happens internally — same in every surface:

1. The marketplace manifest is downloaded and **signature-verified**.
2. Codebolt checks **compatibility** (MCP protocol version, required dependencies).
3. The server binary or package is fetched.
4. A local entry is added to your workspace's `.codebolt/mcp-servers.yaml`.
5. The server is spawned under `PluginProcessManager`.
6. Codebolt performs the MCP **handshake** and enumerates the tools.
7. The tools appear in your workspace's tool namespace.

You see a success toast (desktop), a `✓ installed` line (CLI), a state-change notification (TUI), or a 200 response (API/SDK) — but the work is the same.

## 2. Manual configuration (for private or local servers)

When you have an MCP server that isn't on the marketplace — an internal tool, a development build, a local binary, a remote endpoint — add it manually.

Edit `.codebolt/mcp-servers.yaml` (create it if it doesn't exist):

```yaml
servers:
  # Local binary
  my-linter:
    command: /usr/local/bin/my-linter-mcp
    args: ["--config", ".linterrc"]
    env:
      LINTER_MODE: strict

  # Node package
  another-tool:
    command: node
    args: ["./tools/my-mcp-server/index.js"]

  # Python package
  py-tool:
    command: python
    args: ["-m", "my_tool.server"]

  # Remote HTTP
  internal-api:
    url: https://mcp.my-company.com
    auth:
      type: bearer
      token_env: INTERNAL_MCP_TOKEN
```

Save the file. Codebolt watches the file and starts any new servers automatically.

To verify: the MCP server or Tools management surface should show the new server within a few seconds, with state `running` and a list of provided tools.

### Field reference

| Field | Required | Meaning |
|---|---|---|
| `command` | for local | Binary or interpreter to run |
| `args` | optional | Arguments to pass |
| `env` | optional | Environment variables for the server process |
| `cwd` | optional | Working directory (defaults to project root) |
| `url` | for remote | Remote MCP endpoint |
| `auth` | optional | Auth block for remote servers |
| `auth.type` | | `bearer`, `basic`, `custom_header` |
| `auth.token_env` | | Env var to read the token from (never hard-code tokens) |
| `startup_timeout` | optional | How long to wait for the handshake (default 10s) |
| `restart_policy` | optional | `always`, `on_failure`, `never` (default `on_failure`) |

## 3. As part of a capability bundle

Capabilities can ship MCP servers. When you install a capability, its MCP servers are installed automatically as part of the bundle.

You see them in the MCP server or Tools management surface, marked as being provided by the capability bundle.

## Verifying an install

After any install:

1. The MCP server or Tools management surface should show `running`.
2. Expand the server — you should see a list of tools with descriptions.
3. **Test a tool** — click any tool and pick "Test". Enter sample arguments. You should get a structured response.

If the server is red (errored), expand the logs:

```
ERROR: spawn my-linter-mcp ENOENT
```

→ binary isn't on PATH. Fix the `command:` to be an absolute path, or add the binary to PATH.

```
ERROR: handshake timeout
```

→ the server is running but not speaking MCP. Either the wrong binary, a crashed startup, or a version mismatch.

```
ERROR: unauthorized (401)
```

→ remote server rejected auth. Check `token_env` points at a real env var.

## Security considerations

An MCP server you install runs code on your machine with your credentials. Treat it the same way you'd treat installing a shell tool or an npm package:

- **Check the source.** Marketplace entries show author and install count. Low-trust sources warrant extra caution.
- **Read the tools list.** A linter that wants `codebolt_fs.write_file + codebolt_git.push` is suspicious. A linter needs reads, not writes.
- **Prefer first-party servers** from the vendor of the service you're integrating. "Stripe's official MCP server" > "some person's Stripe MCP".
- **Use env-var auth for secrets.** Never hard-code tokens in `mcp-servers.yaml` — that file gets committed.
- **Start with a scoped allowlist.** Don't immediately add new tool families to every agent's `tools.allow`. Add them only to agents that need them.

## Troubleshooting

### "The server starts, tools appear, but my agent says 'tool not found'"
The agent's `tools.allow` doesn't include the new tool. Add it:

```yaml
# .codebolt/agents/my-agent/agent.yaml
tools:
  allow:
    - codebolt_fs.*
    - my-linter.*    # ← add this
```

Or use the agent picker to switch to an agent with a broader allowlist.

### "The server keeps restarting"
Check the server logs in the MCP management UI. Usually this is a crash loop from a missing dependency, a port conflict, or a config error.

### "Every new shell has to re-set the env var"
Put it in your shell profile (`.zshrc`, `.bashrc`) or use a secrets manager that your shell loads automatically.

### "The server is slow and blocks agents"
MCP servers can be slow — that's a property of the server, not Codebolt. Agents wait on tool calls. If a server is consistently slow:
- Check if the server is doing work it doesn't need to (e.g. re-initializing on every call).
- Look for a faster alternative or build a wrapper that caches results.
- Constrain which agents use the slow tool.

## Uninstalling

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the uninstall action in the MCP server or Tools management UI.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool-uninstall command from previous drafts.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
DELETE /api/tools/<name>
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.tools.uninstall('my-server');
```

</TabItem>
</Tabs>

The server is stopped, removed from `.codebolt/mcp-servers.yaml`, and its tools disappear from the namespace. Agents that referenced those tools will get `tool_not_found` errors on next use — update their allowlists to remove the stale entries.

Uninstalling does **not** delete historical runs that used the tool; those are still queryable via the event log.

## See also

- [Agent Extensions Overview](./01_overview.md)
- [Managing MCP servers](./07_managing-mcp-servers.md)
- [MCP Tools (for builders)](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [MCP & Tools (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/02_mcp-and-tools.md)
