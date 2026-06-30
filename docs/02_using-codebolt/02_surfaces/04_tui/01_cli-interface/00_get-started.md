---
sidebar_position: 0
title: Get Started
description: Install the Codebolt CLI interface, authenticate, configure a provider, and run your first agent task without leaving the terminal.
---

# CLI Interface - Get Started

Launch the Codebolt CLI interface, get it configured, and run your first agent task without leaving the terminal. The CLI interface is bundled with Codebolt and gives you a keyboard-driven full-screen interface inside your terminal.

---

## 1. Install the CLI interface

The CLI interface is bundled with Codebolt. It requires **Node.js 18+**.

```bash
# npm (cross-platform)
npm install -g codebolt

# Homebrew (macOS / Linux)
brew install codebolt/tap/cli
```

> If you already have the desktop app installed, the CLI interface is already there - no separate install needed.

---

## 2. Authenticate

```bash
codebolt
```

Start Codebolt and complete any account or provider setup that your build prompts for. For headless or CI use, set `CODEBOLT_AUTH_TOKEN` instead:

```bash
export CODEBOLT_AUTH_TOKEN=YOUR_TOKEN
```

---

## 3. Configure an AI provider

```bash
codebolt command llm providers
```

Use the desktop settings UI for end-user provider setup, or update keys through the running server:

```bash
codebolt command llm update-key --provider openai --key sk-...
codebolt command llm set-default --provider openai --model gpt-5
```

---

## 4. Launch the CLI interface

```bash
cd /path/to/your-project
codebolt
```

The full-screen CLI interface opens with panels for chat, file tree, diff view, and terminal output. It connects to the local server and attaches to the current directory.

---

## 5. Navigate the interface

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move between panels |
| `Enter` | Send message / confirm |
| `Esc` | Cancel / close dialog |
| `Ctrl+R` | Roll back last agent run |
| `Ctrl+P` | Open project picker |
| `Ctrl+Q` | Quit |
| `?` | Show all keybindings |

---

## 6. Send your first message

Focus the chat panel (`Tab` until the input box is highlighted). Type a task and press `Enter`:

```
Explain what this codebase does in 3 bullet points.
```

The agent's response streams into the chat panel. Tool calls (file reads, searches) appear as they happen.

Then try a task that writes something:

```
Add a .editorconfig with 2-space indentation for JS/TS.
```

When the agent finishes, the file tree updates to show the new file.

---

## 7. Review and roll back

Press `Ctrl+R` (or `c`) to open the checkpoint list and roll back to any previous state. Changes that haven't been rolled back persist on disk — commit them with git whenever you're ready.

```bash
# Switch to a regular terminal without quitting the CLI interface
git add .editorconfig && git commit -m "add editorconfig"
```

---

## Updating

```bash
npm update -g codebolt          # npm
brew upgrade codebolt-cli        # Homebrew
```

---

## Uninstalling

```bash
npm uninstall -g codebolt        # npm
brew uninstall codebolt-cli      # Homebrew
```

The uninstall removes binaries only — projects and data are not deleted.

**Next:** [Overview](./01_overview.md) · [Navigation & Keybindings](./02_navigation-and-keybindings.md)
