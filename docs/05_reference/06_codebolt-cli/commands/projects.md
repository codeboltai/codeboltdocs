---
title: "Project Gateway Commands"
---

Use `codebolt command project` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `get-editor-status` | Retrieves the current editor file status. Returns information about files currently open or modified in the editor. | None | `codebolt command project get-editor-status --help` |
| `get-path` | Retrieves the path of the current project. Returns the absolute file system path where the project is located. | None | `codebolt command project get-path --help` |
| `get-repo-map` | Retrieves the repository map for the current project. Returns a structured representation of the project repository, optionally filtered by the provided message parameter. | None | `codebolt command project get-repo-map --help` |
| `get-settings` | Retrieves the project settings from the server. Returns configuration and settings information for the current project. | None | `codebolt command project get-settings --help` |
| `run` | Runs the current project. Executes the project run command configured for the project. | None | `codebolt command project run --help` |
