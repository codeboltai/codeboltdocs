---
sidebar_position: 0
title: Get Started
description: Install the Codebolt CLI, launch the terminal interface, and run your first agent task.
---

# CLI Interface Quickstart

## 1. Install and verify

With Node.js and npm available, install the standalone CLI from your terminal.

```bash
npm install -g codebolt
```

To open a folder in Desktop with `codebolt .`, install the Desktop folder launcher from **Review Settings → Open From Terminal → Install** during [onboarding](../../02_desktop-app/01_onboarding.md), or from [Settings → Global Settings → CLI Setup](../../02_desktop-app/Settings/07_appearance.md#cli-setup) afterward.

In a new terminal, check that the command is available.

```bash
codebolt --version
codebolt --help
```

The standalone CLI prints a version number and lists `--server` and `--connect` in its help. If the help only describes opening a directory in Desktop, your shell found the folder launcher. Put npm’s global executable directory earlier in your `PATH`, open a new terminal, and check again. If your shell can't find `codebolt`, check that the installation completed and the install location is on your `PATH`.

## 2. Open your project

Replace `/path/to/project` with the path to an existing project.

```bash
codebolt --project /path/to/project
```

The terminal interface opens after the local server starts. Follow any prompts to sign in and finish model or agent setup. For provider flags and environment variables, see [Root Command](../../../../05_reference/06_codebolt-cli/02_root-command.md).

## 3. Send a first task

In the **Chat** tab, type this prompt and press `Enter`.

```text
Explain how this project starts and name the main files I should read. Do not modify files.
```

Check the agent's answer against your project. Open **Files** from the top bar to preview a file it names. To refer to that file in a follow-up, type `@` in Chat and choose the file from the suggestions.

If you already have a Codebolt server running on the same machine, you can attach with `codebolt --connect 2719`. Replace `2719` with its port.

See [Chat, Attachments & Approvals](./06_chat-attachments-and-approvals.md) for more ways to work with the agent, or open the [Terminal Interface Overview](./01_overview.md) for a tour.
