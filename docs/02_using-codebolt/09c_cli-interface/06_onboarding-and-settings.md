---
sidebar_position: 6
title: Onboarding and Settings
description: gotui includes a built-in onboarding wizard and a drill-down settings dialog for configuring models, agents, providers, themes, and defaults.
---

# Onboarding and Settings

The CLI interface is not configured purely through flags. `gotui` includes both a first-run onboarding flow and an in-app settings dialog.

## When onboarding appears

Onboarding starts when the current server state is incomplete. The main checks are:

- no known username
- no configured model and no configured agent

If either of those conditions blocks a usable session, the onboarding flow takes over the entire terminal screen.

## What onboarding covers

The onboarding flow handles:

- login
- theme selection
- provider selection
- model selection
- agent selection

It is a guided flow, not a loose collection of screens.

## Login behavior

The login path can interact with the local environment rather than staying purely in the terminal:

- it can open the browser
- it can copy values to the clipboard
- it polls for login completion through the server

That is important context if you are using the CLI interface over SSH or in a constrained terminal setup.

## Settings dialog

![Application settings dialog showing the current provider configuration page](/productImages/cliinterface/settings.png)

After onboarding, the main control surface is the application settings dialog. The dialog is structured into categories:

- `Default Settings`
- `LLM Providers`
- `Agents`
- `Appearance`
- `About`

This is a drill-down UI:

- level 0 shows the category list
- level 1 shows the active category details

## What you can configure

The settings dialog can open workflows for:

- changing the default provider
- changing the default model
- changing the default agent
- entering or saving provider API keys
- opening the theme picker

It also shows application state information rather than acting only as an action launcher.

## Providers

The provider page is where CLI users configure or update provider credentials. This is significant because it means the terminal UI is not limited to environment variables or external config files for provider setup.

In practice, the provider page is where you handle:

- provider availability
- provider key status
- provider API URL data when needed

## Appearance

Theme selection is built into the interface. The available presets include:

- `Midnight Amber`
- `Ocean Night`
- `Moss Grove`

Changing theme updates the active UI and also emits a system message confirming the new theme.

## Default model and default agent

Defaults can be changed through the settings flow, but those are distinct from the currently active conversation's state.

That separation matters:

- **conversation state** controls the thread you are in now
- **default state** controls what future conversations start with

## Keybindings customization

Keybindings are part of the broader settings story. The shared keymap can persist overrides to:

`$XDG_CONFIG_HOME/codebolt/keybindings.json`

On systems without a custom XDG path, this resolves through the OS user config directory.

## About the settings model

The CLI interface uses a mix of:

- runtime server state
- shared local stores
- persisted application defaults

That means settings changes are not just cosmetic. They can influence new conversations, model selection behavior, and provider-backed workflows.

## See also

- [CLI Interface](./01_overview.md)
- [Conversations and Tabs](./02_conversations-and-tabs.md)
- [Keybindings and Layout](./07_keybindings-and-layout.md)
