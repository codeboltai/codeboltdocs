---
title: "Task Gateway Commands"
---

Use `codebolt command task` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `assign` | Assigns an agent to a task. | `--task-id`, `--agent-id` | `codebolt command task assign --help` |
| `create` | Creates a new task. | `--title` | `codebolt command task create --help` |
| `delete` | Deletes a task. | `--task-id` | `codebolt command task delete --help` |
| `execute` | Executes a task with a specific agent. | `--task-id`, `--agent-id` | `codebolt command task execute --help` |
| `get` | Retrieves details of a specific task. | `--task-id` | `codebolt command task get --help` |
| `list` | Retrieves a list of all tasks. | None | `codebolt command task list --help` |
| `update` | Updates an existing task. | `--task-id` | `codebolt command task update --help` |
