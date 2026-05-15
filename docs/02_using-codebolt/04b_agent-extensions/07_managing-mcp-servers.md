---
sidebar_position: 7
title: Managing MCP Servers
description: Once MCP servers are installed, there are five ways to manage them — desktop app, CLI, TUI, HTTP API, and the Plugin SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Managing MCP Servers

Once MCP servers are installed, the mental model is the same across surfaces: a server is a supervised process with a lifecycle, config, logs, and resource limits.

:::tip Pilot page
This page is the pilot for our **feature-first + tabbed surfaces** pattern. The conceptual explanation is shared; the surface-specific commands live in tabs. If this reads well to you, the rest of *Using Codebolt* will follow the same shape.
:::

## What you manage

Every installed MCP server has:

- **Name and version**
- **State** — `running` / `stopped` / `crashed` / `starting`
- **Tools provided** — the list of tool functions the server exposes
- **Resource usage** — CPU, memory (when the server reports it)
- **Last activity** — when a tool from this server was last called
- **Logs** — everything the server wrote to stderr

`PluginProcessManager` supervises all servers and handles restarts, health checks, and resource enforcement. How you *view* and *control* this varies by surface; what's being controlled does not.

## Start · stop · restart

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the MCP server or Tools management surface exposed by your build to inspect state and control the server lifecycle.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool lifecycle commands from previous drafts.

</TabItem>
<TabItem value="tui" label="TUI">

Press `t` to open the tools pane, select a server with `↑/↓`, then:

- `s` — start
- `x` — stop
- `r` — restart

The state column updates live.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/tools/:name/start
POST /api/tools/:name/stop
POST /api/tools/:name/restart
GET  /api/tools               # list all + state
```

All endpoints accept an optional `X-Codebolt-Token` header for auth when the server isn't local.

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
import codebolt from '@codebolt/codeboltjs';

await codebolt.tools.start('my-server');
await codebolt.tools.stop('my-server');
await codebolt.tools.restart('my-server');
const servers = await codebolt.tools.list();
```

</TabItem>
</Tabs>

Servers normally start automatically when the Codebolt server boots — you only touch this manually when debugging, recovering from a crash, or testing a new server.

## Auto-restart policy

Every server runs under a restart policy:

- **`always`** — restart on any exit (clean or crashed).
- **`on_failure`** *(default)* — restart only on non-zero exit.
- **`never`** — let it die and stay dead.

Under `on_failure`, a crashing server is retried with exponential backoff (1s, 5s, 15s, 60s) and **circuit-breaks after 5 consecutive failures**. At that point it's marked errored and needs manual intervention — restart policies don't rescue a fundamentally broken server.

The policy is set in the server's config; see [Installing MCP Servers](./06_installing-mcp-servers.md).

## Viewing logs

Everything a server writes to **stderr** is captured as logs. (Stdout is reserved for the MCP protocol itself.) When a server crashes, the cause is almost always in the last few log lines.

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the logs view in the MCP server or Tools management UI.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool log commands from previous drafts.

</TabItem>
<TabItem value="tui" label="TUI">

In the tools pane, select the server and press `L` to open the log viewer. `/` filters, `f` toggles follow mode.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/tools/:name/logs?tail=100
GET /api/tools/:name/logs?follow=true   # SSE stream
```

The follow mode returns a Server-Sent Events stream.

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
const logs = await codebolt.tools.logs('my-server', { tail: 100 });
// Or stream:
for await (const line of codebolt.tools.logStream('my-server')) {
  console.log(line);
}
```

</TabItem>
</Tabs>

## Updating a server

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the update action in the MCP server or Tools management UI when your build exposes one.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool update commands from previous drafts.

</TabItem>
<TabItem value="tui" label="TUI">

In the tools pane with the server selected, press `u`. Pins the running version as a rollback target, then swaps.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/tools/:name/update
POST /api/tools/:name/update  { "version": "2.0.0" }
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.tools.update('my-server');
await codebolt.tools.update('my-server', { version: '2.0.0' });
```

</TabItem>
</Tabs>

Every update path does the same thing: download the new version, verify its signature, stop the old version, swap files, start the new version, **and restore the old version if the new one fails to start**. For manually-configured servers (not from a registry), update by editing `.codebolt/mcp-servers.yaml` yourself.

## Disabling vs uninstalling

Two very different operations:

- **Disable** — keep the server installed but don't start it. Reversible with one flag.
- **Uninstall** — remove files, config entries, and registered tools. Not reversible without reinstalling.

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the disable or uninstall actions in the MCP server or Tools management UI when your build exposes them.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older runtime tool disable, enable, or uninstall commands from previous drafts.

</TabItem>
<TabItem value="tui" label="TUI">

`d` to disable/enable, `Shift+D` with confirmation to uninstall.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST   /api/tools/:name/disable
POST   /api/tools/:name/enable
DELETE /api/tools/:name
```

</TabItem>
<TabItem value="sdk" label="Plugin SDK">

```ts
await codebolt.tools.disable('my-server');
await codebolt.tools.enable('my-server');
await codebolt.tools.uninstall('my-server');
```

</TabItem>
</Tabs>

Disable is also editable directly in config:

```yaml
# .codebolt/mcp-servers.yaml
servers:
  my-server:
    command: /usr/local/bin/my-server
    enabled: false
```

## Health checks

Codebolt pings each server periodically. A non-responsive server is marked **unhealthy** and subsequent tool calls to it **fail fast** instead of hanging. Configure per server:

```yaml
# .codebolt/mcp-servers.yaml
servers:
  my-server:
    health_check_interval_seconds: 30
    health_check_timeout_seconds: 5
```

State (`healthy` / `unhealthy`) appears in the management surface your build exposes, as well as API and SDK responses where available.

## Resource limits

Per-server caps keep a buggy server from eating your machine:

```yaml
# .codebolt/mcp-servers.yaml
servers:
  my-server:
    command: ...
    limits:
      memory_mb: 512
      cpu_shares: 512
      open_files: 256
```

On Linux these map to **cgroups**; on macOS/Windows they're enforced via soft process monitoring. A server exceeding its limits is **killed and restarted** (subject to the circuit breaker).

## User-wide vs project-local servers

By default, MCP server configs live in the project (`.codebolt/mcp-servers.yaml`) so each project can have its own set. For servers you want everywhere, use the **user-level** config:

```yaml
# ~/.codebolt/mcp-servers.yaml
servers:
  my-common-server:
    command: my-common-server-binary
```

The runtime merges user-level + project-local (project wins on conflicts) before handing the list to `PluginProcessManager`.

## Debugging a broken server

The same 5-step flowchart, regardless of surface:

1. **Is it running?** Check the state. If not `running`, start it.
2. **If crashed, why?** Tail the last 50 log lines. Look for the last error before exit.
3. **If running but tools don't work:** invoke the tool directly (bypassing the agent) and see what it returns.
4. **If the direct call fails:** the issue is inside the server's tool implementation. Check the server's own application logs.
5. **If the direct call works but the agent still can't use it:** check the agent's `tools.allow` list — the tool might not be granted.

<Tabs groupId="surface">
<TabItem value="cli" label="CLI" default>

The current CLI does not expose the older direct MCP runtime debugging commands. Use the management UI and any deployment-specific APIs your build exposes.

</TabItem>
<TabItem value="desktop" label="Desktop">

1. Tools panel → state column.
2. Tools panel → server → Logs tab → tail 50.
3. Tools panel → server → Tools tab → pick a tool → **Try it** button (opens a form for its input schema).

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET  /api/tools
GET  /api/tools/:name/logs?tail=50
POST /api/tools/:server/:tool/call  { "args": {} }
```

</TabItem>
</Tabs>

## Auditing which servers are doing what

Audit tool usage through the observability surfaces exposed by your build or self-hosted deployment. Older event-query CLI examples are not part of the current `packages/cli` implementation.

## See also

- [Agent Extensions Overview](./01_overview.md)
- [Installing MCP Servers](./06_installing-mcp-servers.md)
- [Agent Tools](../05a_tools-and-mcp/01_overview.md)
- [CLI reference](../02_surfaces/03_cli/01_overview.md) — current CLI surface overview
- [MCP & Tools (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/02_mcp-and-tools.md)
