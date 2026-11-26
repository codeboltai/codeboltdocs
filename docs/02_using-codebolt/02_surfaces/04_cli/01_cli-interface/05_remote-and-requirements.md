---
sidebar_position: 7
title: Remote Use and Requirements
description: Run the Codebolt terminal interface over SSH or connect it directly to an existing server.
---

# Remote Use and Requirements {#remote-use-direct-gotui-and-requirements}

## Remote and SSH workflows

Connect over SSH and run Codebolt on the machine that holds your project checkout. This gives the terminal interface access to the repository for the **Git** tab.

```bash
codebolt --project /path/to/project
```

If a Codebolt server is already running on that machine, attach to its port from the SSH session.

```bash
codebolt --connect 2719
```

`codebolt --connect` uses localhost on the machine where you run the command. Replace `2719` with the server’s port.

## Connect to a server by host and port {#running-gotui-directly}

If you have the standalone `gotui` executable, pass a host and port to connect to an existing Codebolt server.

```bash
gotui -host localhost -port 2719
gotui -host remote-server -port 3001
```

The direct binary defaults to `localhost:12345`. If set, `AGENT_SERVER_HOST` and `AGENT_SERVER_PORT` take precedence over the flags. Set `AGENT_SERVER_PROTOCOL=https` for a server using HTTPS.

## Project path handoff

Codebolt passes the project path in `CURRENT_PROJECT_PATH`. When launched directly, the terminal interface uses that variable if set, then the server’s project path if available, then the current directory.

The **Files** tab reads from the connected server. The **Git** tab runs Git at the project path on the machine running the terminal interface. If you connect directly to a remote server and want to inspect a local checkout, set `CURRENT_PROJECT_PATH` to that checkout.

## Terminal requirements

Use a terminal that supports the alternate screen and mouse input. A size of `50×15` characters or larger and a terminal type such as `xterm-256color` are recommended.

If your terminal intercepts a shortcut, use a tab icon or an available [leader chord](./02_navigation-and-keybindings.md#leader-key).

## Troubleshooting signals

If the interface is open, check the **Logs** tab for connection and server messages. For startup or rendering failures, look for these files in the operating system’s temp directory.

- `gotui-debug.log`
- `gotui-channels.log`

When the `codebolt` launcher starts a local server, it also writes `.codebolt.log` in the project directory.

## Practical limitations

On a narrow terminal, switch to **Single Chat** with `Ctrl+T` to give the conversation more room. For scripts and CI, use [Command Mode](../02_cli-commands/01_overview.md) or [Headless CLI](../03_cli-headless/01_overview.md).

## See also

- [Command Mode Overview](../02_cli-commands/01_overview.md)
- [Headless CLI](../03_cli-headless/01_overview.md)
- [Desktop App](../../02_desktop-app/01_workspace-and-project-management/01_overview.md)
