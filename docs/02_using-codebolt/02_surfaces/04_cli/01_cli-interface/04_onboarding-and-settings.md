---
sidebar_position: 4
title: Onboarding and Settings
description: The CLI interface includes a full onboarding flow plus in-app dialogs for defaults, providers, themes, and keybindings.
---

# Onboarding and Settings

The CLI interface includes a full onboarding flow plus in-app dialogs for defaults, providers, themes, and keybindings.

## When onboarding appears

On first launch, onboarding is shown when either of these is true:

- the user is not logged in
- there is no default model and no default agent configured

This logic comes from `packages/gotui/internal/app/app_model.go`.

## Onboarding flow

The onboarding flow is implemented in `packages/gotui/internal/flows/onboarding`.

The sequence is:

1. Login, if needed
2. Theme selection
3. Provider selection and key validation
4. Model selection
5. Agent selection

## Login behavior

When login is required, the CLI interface:

- creates a portal login token
- builds a Codebolt portal URL
- copies that URL to the clipboard
- attempts to open it in the browser
- polls for the completed login token
- creates or validates the local user against the running server

After successful login, the CLI interface fetches providers, models, and agents.

## Provider and model setup

During onboarding, provider configuration is not just cosmetic:

- provider API keys can be validated
- validated providers can return their available models
- the selected model is then stored as the default model on the server

## Application settings dialog

The application settings dialog currently has these categories:

| Category | Purpose |
|---|---|
| **Default Settings** | Change default model and default agent |
| **LLM Providers** | Review providers and save API keys |
| **Agents** | Change the default agent |
| **Appearance** | Change theme |
| **About** | Show project/server/interface metadata |

The Providers page supports inline API-key editing, and the About page exposes the active project and server identity details.

## Keybindings dialog

The keybindings dialog:

- lists bindings grouped by category
- includes leader-only chord actions in the displayed list
- lets you rebind the selected action with `Enter`
- lets you reset the selected binding to default with `D`

Overrides are persisted to the user config directory.

## Pickers and dialogs

The CLI interface codebase also includes dialogs and pickers for:

- agents
- models
- providers
- themes
- conversation tree navigation
- slash-command support
- steps and todo side panels

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Overview](./01_overview.md)
