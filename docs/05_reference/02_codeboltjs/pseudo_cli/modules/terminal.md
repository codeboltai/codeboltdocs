---
sidebar_label: "Terminal"
title: "Terminal Pseudo CLI"
description: "Pseudo CLI reference for the Terminal module."
---

Generated from `packages/codeboltjs/src/tools/pseudo-cli/commands.ts`. Edit the registry or rerun `node scripts/generate-pseudo-cli-docs.js` instead of updating this file by hand.

The `terminal` pseudo CLI module currently exposes 4 commands.

Related SDK docs: [Terminal](../../10_api-access/terminal/index.md)

## Commands At A Glance

| Action | Description | Required flags |
| --- | --- | --- |
| `exec` | Execute a shell command | `--command` |
| `list` | List active background terminal commands | - |
| `output` | Read recent output from a background command | `--process-id` |
| `stop` | Stop a background command | `--process-id` |

## `exec`

Execute a shell command

```text
codebolt terminal exec --command <string> [--mode auto|foreground|background] [--yield-ms <number>] [--timeout-ms <number>] [--background-on-yield]
```

| Name | Flag | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `command` | `--command` | `string` | Yes | Shell command string to execute. |
| `mode` | `--mode` | `auto | foreground | background` | No | Execution mode. Defaults to `auto`. Use `background` for known persistent commands. |
| `yieldMs` | `--yield-ms` | `number` | No | Milliseconds to wait before yielding to background in auto mode. |
| `timeoutMs` | `--timeout-ms` | `number` | No | Hard timeout in milliseconds. |
| `backgroundOnYield` | `--background-on-yield` / `--no-background-on-yield` | `boolean` | No | Whether auto mode should yield long-running commands to background. Defaults to true. |

## `list`

List active background terminal commands.

```text
codebolt terminal list
```

## `output`

Read recent output from a background command.

```text
codebolt terminal output --process-id <number> [--lines <number>] [--tail-bytes <number>]
```

| Name | Flag | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `processId` | `--process-id` | `number` | Yes | Process id returned by `terminal exec` when a command yields to background. |
| `lines` | `--lines` | `number` | No | Return only the last N lines. |
| `tailBytes` | `--tail-bytes` | `number` | No | Maximum bytes to read from the tail of the command log. |

## `stop`

Stop a background command.

```text
codebolt terminal stop --process-id <number>
```

| Name | Flag | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `processId` | `--process-id` | `number` | Yes | Process id for the command to stop. |
