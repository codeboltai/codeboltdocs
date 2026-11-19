---
title: "Agent Gateway Commands"
---

Use `codebolt command agent` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `details` | Retrieves details of specific agents. | None | `codebolt command agent details --help` |
| `find` | Finds agents suitable for a given task. | `--task` | `codebolt command agent find --help` |
| `list` | Lists all available agents. | None | `codebolt command agent list --help` |
| `start` | Starts an agent with a specific task. | `--agent-id`, `--task` | `codebolt command agent start --help` |
