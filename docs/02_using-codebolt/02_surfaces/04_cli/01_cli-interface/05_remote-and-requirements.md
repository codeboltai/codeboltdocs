---
sidebar_position: 5
title: Remote Use, Direct gotui, and Requirements
description: "If you want the interactive CLI interface on a remote machine, the simplest path is still:"
---

# Remote Use, Direct `gotui`, and Requirements

## Remote and SSH workflows

If you want the interactive CLI interface on a remote machine, the simplest path is still:

```bash
codebolt
```

Run that on the remote box after connecting over SSH.

If you already have a running Codebolt server, you can connect the CLI interface to it:

```bash
codebolt --connect 2719
```

That tells Codebolt to launch the CLI interface against an existing server instead of starting a new one.

## Running `gotui` directly

The direct binary is useful mostly for development, debugging, or custom launch flows.

Examples:

```bash
gotui
gotui -host localhost -port 2719
gotui -host remote-server -port 3001
```

Important detail:

- when launched directly, `gotui` itself defaults to `localhost` and port `12345`
- when launched through `codebolt`, the CLI overrides connection settings by passing `AGENT_SERVER_HOST` and `AGENT_SERVER_PORT`

## Project path handoff

When Codebolt launches the CLI interface, it also passes `CURRENT_PROJECT_PATH`. The CLI interface prefers that environment value over other fallbacks when choosing the active project path.

## Terminal requirements

The `gotui` README recommends:

- a terminal of at least roughly `50x15`
- a terminal type like `xterm-256color`
- a terminal that supports alternate screen and mouse events

The CLI interface also forces true-color mode where possible and uses the alternate screen for the full-screen interface.

## Troubleshooting signals

If the CLI interface fails to render or exits unexpectedly, the implementation writes debug logs to the OS temp directory:

- `gotui-debug.log`
- `gotui-channels.log`

These are the first places to inspect for terminal rendering or startup issues.

## Practical limitations

The current CLI interface focuses on terminal-native surfaces:

- Chat
- Logs
- Git
- Files
- dialogs and pickers around those areas

If you need the fullest panel ecosystem or richer visual UI affordances, the desktop app remains the broader surface.

## See also

- [Command Mode Overview](../02_cli-commands/01_overview.md)
- [Headless CLI](../03_cli-headless/01_overview.md)
- [Desktop App](../../02_desktop-app/01_workspace-and-project-management/01_overview.md)
