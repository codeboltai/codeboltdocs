---
sidebar_position: 2
title: Running the Server
description: Run the CodeBolt server for a local project without starting the terminal UI.
---

# Running the Server

With the CodeBolt CLI installed, start the server for a project:

```bash
codebolt --server --project /path/to/project --port 2719
```

Run this command from a terminal and use Ctrl+C to stop it. If you omit `--project`, CodeBolt uses the current directory. If you omit `--port`, the CLI finds an available port.

To attach the terminal UI from another terminal on the same machine:

```bash
codebolt --connect 2719
```

## Data location

Set `CODEBOLT_DATA_DIR` before starting the server to use a specific user-data directory. See [Application storage](./03_database.md) for the distinction between user data, global settings, and project data.

## See also

- [Headless CLI](../../02_using-codebolt/02_surfaces/04_cli/03_cli-headless/02_headless-server.md)
- [CLI root command](../../05_reference/06_codebolt-cli/02_root-command.md)
