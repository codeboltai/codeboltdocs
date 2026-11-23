---
sidebar_position: 99
title: Publishing
description: Share your agent with others by publishing it to the CodeBolt registry, or keep it local to your project.
---

# Publishing an Agent

Share your agent with others by publishing it to the CodeBolt registry, or keep it local to your project.

## Three ways to share an agent

### 1. Local to your project

No publishing needed. The agent lives in `.codebolt/agents/` and is committed to your repo. Anyone who opens the project gets the agent automatically.

- **Remix agents** go in `.codebolt/agents/remix/` as `.md` files.
- **Framework agents** go in `.codebolt/agents/<agent-name>/` as full packages.

### 2. Publish to the CodeBolt registry

```bash
codebolt action agent publish --path /path/to/your/agent
```

This publishes the agent folder to the public CodeBolt registry. If `--path` is omitted, the current directory is used.

On success, you get a unique ID:

```
Publishing agent from /path/to/your/agent...
Published successfully! ID: my-agent-unique-id
```

### 3. Create a remote agent

For agents that run outside of Codebolt's process manager:

```bash
# Self-executed: you start the process yourself
codebolt action agent create-remote \
  --name "My Remote Agent" \
  --execution-mode selfExecuted \
  --description "An agent I run from my own terminal"

# CodeBolt-executed: Codebolt starts the process from a path you provide
codebolt action agent create-remote \
  --name "My Remote Agent" \
  --execution-mode codeboltExecuted \
  --remote-path /absolute/path/to/agent
```

`--remote-path` is required when using `codeboltExecuted` mode.

## Before you publish

Checklist:

- [ ] `codeboltagent.yaml` has a clear `title`, `description`, and `unique_id`.
- [ ] Version is set in `codeboltagent.yaml`.
- [ ] The agent builds cleanly (`npm run build`).
- [ ] The agent has been tested against a real project.
- [ ] `dist/` contains the compiled output (most agents bundle with webpack).
- [ ] No secrets or credentials in the published files.

## CLI reference

### codebolt action agent create

Scaffold a new agent from a template:

```bash
# Create from the default template
codebolt action agent create --name my-agent

# Create a framework agent (uses the Agent template)
codebolt action agent create --name my-agent --framework

# Create a remix interactively (select an agent to remix)
codebolt action agent create --remix
```

Options:

| Flag | Description |
|---|---|
| `--name <name>` | Name for the new agent |
| `--path <path>` | Target directory |
| `--template <name>` | Template to use |
| `--id <id>` | Unique identifier |
| `--description <text>` | Description |
| `--skip-install` | Skip npm install after creation |
| `--framework` | Use the framework agent template |
| `--remix` | Interactive remix of an existing agent |

### codebolt action agent publish

Publish an agent to the CodeBolt registry:

```bash
codebolt action agent publish --path /path/to/agent
```

| Flag | Description |
|---|---|
| `--path <path>` | Path to agent directory (default: current directory) |

### codebolt action agent list

List all published agents:

```bash
codebolt action agent list
```

### codebolt action agent create-remote

Create a remote agent:

```bash
codebolt action agent create-remote --name "Agent Name" --execution-mode selfExecuted
```

| Flag | Description |
|---|---|
| `--name <name>` | Name for the remote agent (required) |
| `--execution-mode <mode>` | `selfExecuted` or `codeboltExecuted` (required) |
| `--remote-path <path>` | Absolute path to the agent (required for `codeboltExecuted`) |
| `--description <text>` | Description |

## Creating a remix via CLI

The `--remix` flag launches an interactive flow:

1. Fetches the agent list from the CodeBolt API.
2. Prompts you to select an agent to remix.
3. Asks for a name, description, and custom instructions.
4. Writes a `.md` file to `.codebolt/agents/remix/` in your project.

```bash
codebolt action agent create --remix --project /path/to/project
```

The resulting file looks like:

```markdown
---
name: My Custom Reviewer
description: Reviews PRs for our conventions.
remixedFromId: reviewer
remixedFromTitle: Reviewer
version: 1.0.0
type: remix
createdAt: '2025-01-15T10:00:00.000Z'
updatedAt: '2025-01-15T10:00:00.000Z'
---

You are a code reviewer for the Acme project.
Focus on runtime bugs and convention violations.
```

## See also

- [agent.yaml](./05_agent-anatomy/agent-yaml.md) — manifest reference
- [Testing and debugging](./09_testing-and-debugging.md)
- [Level 0 — Remix](./03_agent-types/level-3-remix.md)
- [Level 1 — Framework](./03_agent-types/level-2-framework.md)
