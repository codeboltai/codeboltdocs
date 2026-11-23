---
sidebar_position: 2
title: App & Project Settings
description: Find application defaults and edit the open project’s Codebolt app configuration.
---

# App & Project Settings

Use the desktop **System** menu to open **Settings** for application defaults or **App Settings** for the open project's app configuration.

## App Settings

**System → App Settings** opens an editor for the app configuration in the current project. It shows sections for app identity, technical information, secrets, execution phases, knowledge base, instructions, and usage. Use **Save** to write changes to the project configuration.

## Project Settings

Use App Settings for the configuration of a particular project's Codebolt app. Use [Global Settings](./07_appearance.md) for personal editor and appearance options, and [LLM Settings](./02_llm-settings.md) for the application's default model and providers.

### Agent Defaults

Choose an agent in the chat agent picker. Pin it if you want to keep it selected for new input in the current app session. Use [Agent Settings](./03_agent-settings.md) to assign model roles.

### Project Structure

Open **System → Project Structure** to view or edit package metadata such as routes, database tables, dependencies, run commands, and deployment settings. Codebolt stores this metadata in `.codebolt/projectStructure/metadata.json` under the project.

## Related settings

- [Agent Settings](./03_agent-settings.md)
- [Environment & Services](./04_environment-services.md)
- [Language Servers](./05_language-servers.md)
- [MCP Servers](./06_mcp-servers.md)
