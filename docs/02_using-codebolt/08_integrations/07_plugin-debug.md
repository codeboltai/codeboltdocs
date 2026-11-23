---
sidebar_position: 7
title: Plugin Debug
description: Inspect plugin instances and Action Block execution logs in Codebolt.
---

# Plugin and Action Block Debugging

## Plugin Debug

Open **Debug → Plugin Debug**. Use the status filter to find a recorded plugin instance. Select it to inspect its output in the terminal pane and check its status, start time, and log count.

If a plugin fails to start, look for the first error in its output and check its configuration under **Agents → Plugins**.

## ActionBlock Debug

Open **Debug → ActionBlock Debug** after the block runs. Pick its session to see the execution status and available logs. Use **Refresh sessions** if a recent run has not appeared yet.

For example, if a block fails while processing an input, choose its failed session and read the output before retrying it.

## See also

- [Action Blocks](../04b_agent-extensions/04_action-blocks.md)
- [Installing Plugins](../07z_plugins/02_installing-plugins.md)
- [Application Logs](../06a_application-logs.md)
