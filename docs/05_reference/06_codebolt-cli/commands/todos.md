---
title: "Todo Gateway Commands"
---

Use `codebolt command todo` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `add` | Adds a new todo item to the todo list. You can specify a title, priority level, and optional tags for organization. | `--title` | `codebolt command todo add --help` |
| `export` | Exports todos in the specified format. Supports JSON and markdown formats. You can filter by list ID and status. | None | `codebolt command todo export --help` |
| `import` | Imports todos from the specified format. Supports JSON and markdown formats. You can choose to replace existing todos or merge with them. | `--data` | `codebolt command todo import --help` |
| `list` | Retrieves the todo list. You can optionally provide filters to narrow down the results. | None | `codebolt command todo list --help` |
| `list-incomplete` | Retrieves all incomplete todo items. This returns todos that are not yet marked as completed or cancelled. | None | `codebolt command todo list-incomplete --help` |
| `update` | Updates an existing todo item. You can modify the title, status, priority, and tags. At least one field to update should be provided along with the todo ID. | `--id` | `codebolt command todo update --help` |
