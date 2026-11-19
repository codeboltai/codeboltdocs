---
sidebar_position: 0
title: Get Started
description: Launch the terminal UI in your project and send an agent a task.
---

# CLI Interface Quickstart

With `codebolt` on your PATH, launch it from your project directory.

```bash
codebolt --project /path/to/project
```

Follow the account and provider setup shown by the terminal interface when prompted. For provider flags and environment variables, see [Root Command](../../../../05_reference/06_codebolt-cli/02_root-command.md).

Open the chat input, enter a task such as “Summarize this project,” and send it. Review any file changes in the project before committing them.

To attach the interface to a server you already started on the same machine, use `codebolt --connect 2719`, replacing the port as needed.

**Next:** [Overview](./01_overview.md) · [Navigation & Keybindings](./02_navigation-and-keybindings.md)
