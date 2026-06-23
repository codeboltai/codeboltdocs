---
sidebar_position: 0
title: Get Started
description: Install the Codebolt CLI, authenticate, configure a provider, and run your first agent task from the terminal.
---

import { Steps, Step } from '@site/src/components/Steps';

# CLI — Get Started

Get the Codebolt CLI installed and configured, then run your first agent task from the terminal. The CLI gives you the Codebolt server and `codebolt` command without the desktop shell.

> If you already have the desktop app installed, the CLI is already there — no separate install needed.

---

## 1. Install the CLI

The CLI requires **Node.js 18+**.

```bash
# npm (cross-platform)
npm install -g codebolt

# Homebrew (macOS / Linux)
brew install codebolt/tap/cli

# apt (Ubuntu / Debian)
curl -fsSL https://pkg.codebolt.ai/gpg | sudo gpg --dearmor -o /usr/share/keyrings/codebolt.gpg
echo "deb [signed-by=/usr/share/keyrings/codebolt.gpg] https://pkg.codebolt.ai/apt stable main" | sudo tee /etc/apt/sources.list.d/codebolt.list
sudo apt update && sudo apt install codebolt-cli

# dnf (Fedora / RHEL)
sudo dnf config-manager --add-repo https://pkg.codebolt.ai/rpm/codebolt.repo
sudo dnf install codebolt-cli
```

Verify the install:

```bash
codebolt --version
```

---

## 2. Authenticate

```bash
codebolt
```

Start Codebolt and complete any account or provider setup that your build prompts for.

For **CI / headless** environments, set the environment variable instead:

```bash
export CODEBOLT_AUTH_TOKEN=YOUR_TOKEN
codebolt --server
```

---

## 3. Configure an AI provider

```bash
codebolt command llm providers
```

Use the desktop settings UI for end-user provider setup, or update a key through the running server:

```bash
codebolt command llm update-key --provider openai --key sk-...
codebolt command llm set-default --provider openai --model gpt-5
```

---

## 4. Run an agent on a project

```bash
cd /path/to/your-project
codebolt
```

This starts the server and launches the TUI. For one-shot prompt execution:

```bash
codebolt --prompt "Explain this project" --agent generalist
```

You can point the prompt at a specific project:

```bash
codebolt --prompt "Summarize the repo" --project /path/to/project
```

---

## 5. Inspect the running server

Use `codebolt command ...` for server-backed inspection:

```bash
codebolt command system health
codebolt command agents list
codebolt command threads list
codebolt command git status
```

---

## 6. Review and roll back

Review changes with normal project tooling such as `git diff`. Checkpoint and rollback flows are currently product-surface features rather than a documented standalone CLI command set.

---

## Useful commands

```bash
codebolt                           # start server + TUI
codebolt --server                  # start server only
codebolt --connect 2719            # connect TUI to an existing server
codebolt --prompt "<task>"         # run a one-shot prompt
codebolt command agents list       # list installed agents
codebolt command threads list      # inspect chat threads
codebolt command git status        # inspect git state through the server
codebolt --help                    # full command reference
```

---

## Updating

```bash
npm update -g codebolt          # npm
brew upgrade codebolt-cli        # Homebrew
sudo apt upgrade codebolt-cli    # apt
```

---

## Uninstalling

```bash
npm uninstall -g codebolt        # npm
brew uninstall codebolt-cli      # Homebrew
sudo apt remove codebolt-cli     # apt
```

The uninstall removes binaries only — projects and data are not deleted.

**Next:** [CLI Overview](./01_overview.md) · [Agent Commands](./02_agent-commands.md)
