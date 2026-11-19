---
sidebar_label: "Agent"
title: "Agent CLI"
description: "Reference for the codebolt action agent command group."
---

Manage agent extensions

These commands manage CodeBolt extensions. Most of them create a temporary local server context through `executeAction()` before calling the extension endpoints.

## Subcommands

| Subcommand | Description | Args | Options |
| --- | --- | ---: | ---: |
| `create` | Create a new agent from a template | 0 | 9 |
| `publish` | Publish an agent to the CodeBolt registry | 0 | 2 |
| `list` | List all published agents | 0 | 0 |
| `create-remote` | Create a remote agent (self-executed or CodeBolt-executed) | 0 | 5 |

## `create`
Create a new agent from a template
```text
codebolt action agent create [options]
```
### Arguments
This command takes no positional arguments.
### Options
| Flags | Required | Description |
| --- | --- | --- |
| `--name <name>` | No | Name for the new agent |
| `--path <path>` | No | Target directory |
| `--project <path>` | No | Project directory for server context |
| `--template <name>` | No | Template to use |
| `--id <id>` | No | Unique identifier |
| `--description <text>` | No | Description of the agent |
| `--skip-install` | No | Skip npm install after creation |
| `--remix` | No | Create a remix of an existing agent (interactive) |
| `--framework` | No | Create a framework agent using the agent template |

## `publish`
Publish an agent to the CodeBolt registry
```text
codebolt action agent publish [options]
```
### Arguments
This command takes no positional arguments.
### Options
| Flags | Required | Description |
| --- | --- | --- |
| `--path <path>` | No | Path to agent directory |
| `--project <path>` | No | Project directory for server context |

## `list`
List all published agents
```text
codebolt action agent list
```
### Arguments
This command takes no positional arguments.
### Options
This command takes no options.

## `create-remote`
Create a remote agent (self-executed or CodeBolt-executed)
```text
codebolt action agent create-remote [options]
```
### Arguments
This command takes no positional arguments.
### Options
| Flags | Required | Description |
| --- | --- | --- |
| `--name <name>` | Yes | Name for the remote agent |
| `--execution-mode <mode>` | Yes | Execution mode: selfExecuted or codeboltExecuted |
| `--remote-path <path>` | No | Absolute path to the remote agent (required for codeboltExecuted) |
| `--description <text>` | No | Description of the agent |
| `--project <path>` | No | Project directory for server context |
