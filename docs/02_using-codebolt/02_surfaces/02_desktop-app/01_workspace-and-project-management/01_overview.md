---
sidebar_position: 1
sidebar_label: Overview
title: Workspace and Project
description: "Use workspaces to group projects, create new projects, and start projects from templates in the Desktop App."
---

# Workspace and Project Management

Workspaces group related projects. A project is a folder you open from the Desktop App so Codebolt can show the code editor, chat, and other project tools for that codebase.

## The distinction

| Concept | What it is | Scope |
|---|---|---|
| **Workspace** | A top-level container for related projects | Per-user |
| **Project** | A folder or codebase you open in Codebolt | Inside a workspace |

Most people have one workspace and many projects inside it. Teams with several unrelated bodies of work may have multiple workspaces, one per domain.

See [Workspaces](./02_workspaces.md) for adding, switching, scanning, and local/cloud workspace behavior.

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

Use **Quick Create** for a fast new project flow, or **Create via Template** when you want Codebolt to create the project folder and then download template contents into it.

See [Creating Projects](./03_creating-projects.md) for the full flow.

## Project templates

Project templates are downloadable archives registered in the template marketplace.

See:

- [Workspaces](./02_workspaces.md)
- [Creating a Template](04_creating-a-template.md)
- [Publishing Templates](05_publishing-templates.md)

## Removing a project from the dashboard

The dashboard includes project actions for removing project entries from Codebolt. Removing a project entry from the dashboard is different from deleting your source folder.

## Workspace selection

The onboarding flow sets a default workspace location. The project dashboard can also show local and cloud workspace selectors when those are available for your account.

## Command line opening

If the CLI is installed, Codebolt can open a folder passed from the command line. Use **Settings -> Global Settings** to install or check the CLI setup.

## See also

- [Application Navigation](../02_application-navigation/01_panels.md)
- [Settings](../Settings/01_overview.md)
- [Environments](../04_environments/02_environments.md)
