---
sidebar_position: 1
sidebar_label: Working with Projects
title: Workspace and Projects
description: "Use workspaces to group projects, then open a project folder to start working in the Desktop App."
---

# Workspace and Projects

Workspaces group related projects. A project is a folder you open from the Desktop App so Codebolt can show the code editor, chat, and other project tools for that codebase.

## The distinction

| Concept | What it is | Scope |
|---|---|---|
| **Workspace** | A top-level container for related projects | Per-user |
| **Project** | A folder or codebase you open in Codebolt | Inside a workspace |

Most people have one workspace and many projects inside it. Teams with several unrelated bodies of work may have multiple workspaces, one per domain.

## Project dashboard

After sign-in and onboarding, returning users land on the project dashboard. From there you can:

- open a project folder
- create a quick project
- create a project from a template
- switch between recent and workspace project lists
- switch between local and cloud workspaces when those options are available

## Opening a project

Click **Open project** and choose a folder. Codebolt creates or activates the project record, then opens the project in the development layout.

When a project opens, the default layout starts with the **Code** and **Chat** panels. Open more panels from the panel picker when you need terminal, git, preview, environment, settings, or debugging tools.

## Recent and workspace projects

The dashboard has project lists for recent projects and workspace projects. Click a project row to set it active and open it.

If you use cloud workspaces, the dashboard can show available cloud workspaces and the projects inside them.

## Creating projects

Use **Quick Create** for a fast new project flow, or **Create via Template** when you want to start from a template.

## Removing a project from the dashboard

The dashboard includes project actions for removing project entries from Codebolt. Removing a project entry from the dashboard is different from deleting your source folder.

## Workspace selection

The onboarding flow sets a default workspace location. The project dashboard can also show local and cloud workspace selectors when those are available for your account.

## Command line opening

If the CLI is installed, Codebolt can open a folder passed from the command line. Use **Settings -> Global Settings** to install or check the CLI setup.

## See also

- [Panels and layout](../02_panels-and-layout/02_using-panels.md)
- [Settings](../03_settings-and-profiles/02_settings-and-profiles.md)
- [Environments](../04_environments/02_environments.md)
