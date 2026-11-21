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

If you use Codebolt Desktop, you can install the CLI from **Review Settings → Open From Terminal → Install** during [onboarding](../../02_desktop-app/01_onboarding.md), or from [Settings → Global Settings → CLI Setup](../../02_desktop-app/Settings/07_appearance.md#cli-setup) afterward.

In a new terminal, check that the command is available.

```bash
codebolt --version
```

You should see a version number. If your shell can't find `codebolt`, check that the installation completed and the install location is on your `PATH`.

## 2. Open your project

Replace `/path/to/project` with the path to an existing project.

```bash
codebolt --project /path/to/project
```

The terminal interface opens after the local server starts. Follow any prompts to sign in and finish model or agent setup. For provider flags and environment variables, see [Root Command](../../../../05_reference/06_codebolt-cli/02_root-command.md).

## 3. Send a first task

In the **Chat** tab, enter this prompt and send it.

```text
Explain how this project starts and name the main files I should read. Do not modify files.
```

Look for the agent's answer in Chat and check that the files it names are in your project.

If you already have a Codebolt server running on the same machine, you can attach with `codebolt --connect 2719`. Replace `2719` with its port.

**Next:** [Overview](./01_overview.md) · [Navigation & Keybindings](./02_navigation-and-keybindings.md)
