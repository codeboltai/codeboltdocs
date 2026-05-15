---
sidebar_position: 4
title: Environments
description: "An environment is a per-project runtime: the Node version, Python venv, Ruby version, container, or VM your project expects"
---

# Environments

An **environment** is a per-project runtime: the Node version, Python venv, Ruby version, container, or VM your project expects. Codebolt manages these so agents run commands against the right runtime without you configuring it per command.

## Why environments matter

Without environment management, every agent-run shell command would have to guess: which Python? Which Node? Which PATH? Different projects need different versions; different commands within the same project may need different runtimes.

Codebolt's `environmentsServices` detects and manages these per project, so `codebolt_fs.execute_command` always runs in the right one.

## Auto-detection

When you open a project, Codebolt detects the runtime from standard signals:

| Signal | Detected environment |
|---|---|
| `package.json` + `.nvmrc` | Node (nvm version) |
| `package.json` + `engines.node` | Node (engines version) |
| `pyproject.toml` / `requirements.txt` + `.python-version` | Python (pyenv version) |
| `Gemfile` + `.ruby-version` | Ruby |
| `go.mod` | Go |
| `Cargo.toml` | Rust |
| `Dockerfile` + `.codebolt/use-container` | Docker container |

Detected environments appear in **Project → Environments**. Usually auto-detection is correct; override when needed.

## Manually configuring

`.codebolt/environments.yaml`:

```yaml
environments:
  default:
    kind: node
    version: 20.11.0
    setup:
      - npm install
    env:
      NODE_ENV: development

  python:
    kind: python
    version: 3.11
    venv: .venv
    setup:
      - pip install -r requirements.txt

  docker:
    kind: docker
    image: my-project-dev:latest
    setup:
      - docker build -t my-project-dev .
```

Multiple environments in one project are fine — agents can switch between them:

```bash
codebolt_fs.execute_command --environment python --command "pytest"
```

## Environment lifecycle

`environmentRestartService` tracks the state of each environment:

- **Not initialised** — detected but setup hasn't run.
- **Ready** — setup complete, can run commands.
- **Stale** — dependency files changed since last setup; needs rebuild.
- **Broken** — last setup failed.

When you (or an agent) run a command, Codebolt checks the environment state first. A stale environment triggers re-setup automatically.

## Manual operations

Use the environment management surface your build exposes for listing, setting up, restarting, or entering environments. Older project-environment CLI examples from previous drafts are not part of the current `packages/cli` implementation.

## Container environments

For projects with a Dockerfile where you want everything to happen inside the container:

```yaml
environments:
  default:
    kind: docker
    image: my-project-dev:latest
    build_from: Dockerfile
    mount_project: /workspace
    workdir: /workspace
```

Codebolt builds the image on first open, runs a long-lived container, and executes every shell command inside it. Your local machine doesn't need Node/Python/Ruby installed at all.

Downside: per-command latency is higher than native. For interactive workflows, native is faster. For "I want the agent to touch as little of my machine as possible", containerised is cleaner.

## Environments and remote execution

Environments and [remote execution](../../../04_build-on-codebolt/10_remote-execution.md) are orthogonal:

- **Environments** decide *what runtime* commands run in.
- **Remote execution** decides *where the agent process itself* runs.

You can have a local agent running commands in a Docker environment, a remote agent running commands natively, or any combination.

## See also

- [Workspace and Projects](./01_workspace-and-projects.md)
- [Project & Workspace (internals)](../../../04_build-on-codebolt/09_internals/03_subsystems/10_project-and-workspace.md)
- [Remote execution](../../../04_build-on-codebolt/10_remote-execution.md)
