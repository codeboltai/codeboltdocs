---
sidebar_position: 6
title: Onboarding and Settings
description: Set up the Codebolt terminal interface and change your default model, agent, theme, and keybindings.
---

# Onboarding and Settings

Set up your account, model, and agent when you first launch the terminal interface. Use **Settings** later to change your defaults.

## When onboarding appears

Onboarding opens at startup if you’re signed out or if neither a default model nor a default agent is configured.

## Onboarding flow

1. Sign in if prompted.
2. Choose a theme.
3. Select a provider and configure access if prompted.
4. Choose a model.
5. Choose an agent.

## Login behavior

Complete sign-in in your browser, then return to the terminal. If the browser fails to open, copy the sign-in URL shown in the terminal and open it manually.

## Provider and model setup

For a provider that requires an API key, enter the key when prompted and wait for validation. Select one of the available models to save it as the default.

## Application settings dialog

In Chat, press `Ctrl+P`, select `/settings`, and press `Enter`.

| Category | Purpose |
|---|---|
| **Default Settings** | Change the default model and agent |
| **LLM Providers** | Review providers, save API keys, or sign in and out for supported provider plugins |
| **Agents** | Change the default agent |
| **Appearance** | Change the theme |
| **About** | View the active project and server details |

For a one-off change in your current conversation, use [`/models` or `/agents`](./07_conversations-and-slash-commands.md#switch-models-and-agents).

## Keybindings dialog

Press `Ctrl+O` to open **Keybindings**. Select an action and press `Enter` to rebind it, or `D` to restore its default. Your changes are saved in your user config directory.

## Pickers and dialogs

Use the [Command Palette](./07_conversations-and-slash-commands.md#open-the-command-palette) to open the model, agent, theme, and guardrail pickers from Chat. Press `Ctrl+E` to open **Conversations**.

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Overview](./01_overview.md)
