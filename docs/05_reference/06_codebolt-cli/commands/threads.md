---
title: "Thread Gateway Commands"
---

Use `codebolt command thread` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `add-context` | Replaces the current context memory messages for a thread, preserving the previous context in history. | `--thread-id` | `codebolt command thread add-context --help` |
| `create` | Creates a new thread with the specified options. | `--options` | `codebolt command thread create --help` |
| `create-background` | Creates a thread in the background and resolves when the agent starts or fails. | `--task`, `--selected-agent` | `codebolt command thread create-background --help` |
| `create-start` | Creates and immediately starts a new thread for an agent task. Use this tool directly whenever the user wants an agent to perform a task in an environment. To reuse an existing environment, provide environment or environmentId. When a remote environment does not exist yet, set remoteEnv to true and provide environmentProvider so this tool creates it automatically before starting the thread. Do not call environment_create first for the same task. If this tool creates a remote environment for a child job, the parent agent owns its lifecycle and must call environment_merge_and_close with the environment ID after the child finishes. | `--task` | `codebolt command thread create-start --help` |
| `delete` | Deletes a thread by its ID. | `--thread-id` | `codebolt command thread delete --help` |
| `get` | Retrieves detailed information about a specific thread. | `--thread-id` | `codebolt command thread get --help` |
| `get-context` | Retrieves the structured context memory record for a thread. | `--thread-id` | `codebolt command thread get-context --help` |
| `get-context-compacted` | Retrieves the compacted context placeholder or stored compacted context for a thread. | `--thread-id` | `codebolt command thread get-context-compacted --help` |
| `get-context-summary` | Retrieves the stored context summary for a thread. | `--thread-id` | `codebolt command thread get-context-summary --help` |
| `get-messages` | Retrieves messages for a specific thread with optional pagination. | `--thread-id` | `codebolt command thread get-messages --help` |
| `get-raw-conversations` | Retrieves raw conversation records for a thread from the thread message store. | `--thread-id` | `codebolt command thread get-raw-conversations --help` |
| `list` | Retrieves a list of threads with optional filtering. | None | `codebolt command thread list --help` |
| `start` | Starts a thread by its ID. | `--thread-id` | `codebolt command thread start --help` |
| `update` | Updates an existing thread with the specified changes. | `--thread-id`, `--updates` | `codebolt command thread update --help` |
| `update-status` | Updates the status of a thread. | `--thread-id`, `--status` | `codebolt command thread update-status --help` |
| `wait-for-completion` | Compatibility wrapper that waits for a previously started thread through async_task_control. The wait is bounded. | `--thread-id` | `codebolt command thread wait-for-completion --help` |
