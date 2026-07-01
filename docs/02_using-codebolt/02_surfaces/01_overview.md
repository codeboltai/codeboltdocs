---
sidebar_position: 1
title: Platform Overview
description: Codebolt is the same agent runtime no matter how you talk to it
---

# Platform Overview

Codebolt is the same agent runtime no matter how you talk to it. The **client** is the part you actually install and use.

## Pick your client

| Client | Best for | Trade-off |
|---|---|---|
| **[Desktop app](./02_desktop-app/00_get-started.md)** | Daily coding work, multi-panel context, visual diffs, rich chat | Heaviest install, single machine |
| **[CLI](./04_cli/01_cli-interface/00_get-started.md)** | Interactive terminal interface, command mode, headless server, one-shot prompts, CI, remote SSH | Terminal-first, less visual than the desktop app |
| **[Cloud](./06_cloud/00_get-started.md)** | Browser-based access, managed sandboxes, driving your machine from anywhere | Needs a network connection; lighter affordances than the desktop app |

The same project, the same agents, the same memory — only the client differs. (Cloud is a bit different — it controls *where the agent runs* rather than being a client you install, but the same runtime and plugin system apply.)

## What stays the same across clients

- **Agents and tools** — the same allowlists, the same MCP servers, the same capabilities
- **Memory** — shadow git, episodic memory, vector store, KG all live in the project, not the UI
- **Settings and profiles** — config is per-project (and per-user), surface-agnostic
- **The event log** — every surface writes to the same append-only log

## What varies

- **Chat ergonomics** — multi-tab in the desktop, interactive or one-shot in the CLI, browser-based in Cloud. See [Chat](./02_desktop-app/03_chat/01_overview.md).
- **Context affordances** — `@mentions`, panel pickers, and inline previews are desktop-only.
- **Inline editing** — Ctrl+K-style inline edits are desktop-only.
- **Multi-pane diffs** — visual diffs are richest in the desktop app.

## About this section

The pages under **Clients** are **reference catalogs** for each client — what panels, commands, or navigation keys exist on that client. For **how to do a specific thing** (install an MCP server, switch models, manage chat tabs) use the feature sections below (Chat, Agents, Tools & MCP, etc.) — those pages show all clients side by side via tabs.

## See also

- [Get Started](../../01_get-started/03_quickstart.md)
- [Desktop App](./02_desktop-app/00_get-started.md)
- [CLI](./04_cli/01_cli-interface/00_get-started.md)
- [Command Mode](./04_cli/02_cli-commands/01_overview.md)
- [Headless CLI](./04_cli/03_cli-headless/01_overview.md)
- [Cloud](./06_cloud/00_get-started.md)
