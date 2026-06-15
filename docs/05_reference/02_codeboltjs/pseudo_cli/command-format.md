---
sidebar_label: Command Format
sidebar_position: 2
title: Pseudo CLI Command Format
description: Syntax and parsing rules for CodeboltJS pseudo CLI commands.
---

Pseudo CLI commands use a registry format rather than shell parsing.

## Base Syntax

```text
codebolt <module> <action> [--param value ...] [--flag] [--no-flag]
```

The parser splits the command into:

- `module`: the top-level registry entry such as `fs`, `git`, `terminal`, or `mcp`
- `action`: the command within that module such as `read`, `status`, `exec`, or `execute`
- `params`: named flags converted into a key-value object

## Supported Parameter Forms

| Form | Example | Parsed value |
| --- | --- | --- |
| String flag | `--path "./src/index.ts"` | `path: "./src/index.ts"` |
| Boolean true | `--recursive` | `recursive: true` |
| Boolean false | `--no-recursive` | `recursive: false` |
| Number | `--max 5` | `max: 5` |
| JSON object | `--data {"status":"done"}` | `data: { status: "done" }` |
| JSON array | `--paths ["a.ts","b.ts"]` | `paths: ["a.ts", "b.ts"]` |

## Parsing Rules

- Single and double quoted strings are supported.
- Backslash escaping inside quoted strings is supported.
- JSON blobs starting with `{` or `[` are tokenized as a single value and then `JSON.parse()` is attempted.
- Literal `true` and `false` are converted to booleans.
- Numeric tokens matching `-?\d+(\.\d+)?` are converted to numbers.
- Positional arguments after `<action>` are ignored. Use named flags instead.

## Examples

### Filesystem

```text
codebolt fs read --path "./package.json"
codebolt fs list --path "./src" --recursive
codebolt fs read-many --paths ["package.json","tsconfig.json"]
```

### Git

```text
codebolt git status
codebolt git commit --message "docs: add pseudo cli reference"
codebolt git clone --url "https://github.com/example/repo.git" --path "./repo"
```

### Terminal

```text
codebolt terminal exec --command "npm run build"
codebolt terminal exec --command "npm run dev" --mode background
codebolt terminal list
codebolt terminal output --process-id 1234 --lines 100
codebolt terminal stop --process-id 1234
```

Pseudo CLI itself does not interpret shell syntax like pipes or redirects. If you need actual shell behavior, pass the full shell command as the `--command` value to `terminal exec`.

### Browser

```text
codebolt browser navigate --url "https://example.com"
codebolt browser click --element "Login"
codebolt browser scroll --direction "down" --pixels 800
```

### Task And Thread Operations

```text
codebolt task create --title "Write docs" --description "Document pseudo cli"
codebolt thread create-start --task "Review the generated docs" --agent "agent-id"
codebolt task update --id "task-123" --data {"status":"completed"}
```

## Help Behavior

The pseudo CLI source includes help generation for these patterns:

```text
codebolt help
codebolt help <module>
codebolt <module>
```

Intended behavior:

- `codebolt help` lists all registered modules
- `codebolt help fs` shows commands available for the `fs` module
- `codebolt fs` shows module help when no action is provided

## Validation And Errors

Before execution, the registry checks required flags from each command definition.

Common failure cases:

- Unknown module: the module is not in `commandRegistry`
- Unknown action: the module exists but the action does not
- Missing required parameter: a required `--flag` is absent
- Execution failure: the underlying SDK module throws or returns an error-shaped response

Formatter behavior:

- Successful results are returned as `llmContent` plus a shortened `returnDisplay`
- Missing params and unknown commands are marked as `INVALID_TOOL_PARAMS`
- Execution failures are marked as `EXECUTION_FAILED`

## Interception Note

The terminal tool only bypasses real shell execution when `isCodeboltCommand()` matches the command string. In the current source, that matcher checks for `codeboltcmd `, while the parser and help text use `codebolt ...`. Keep that distinction in mind when testing end-to-end interception.
