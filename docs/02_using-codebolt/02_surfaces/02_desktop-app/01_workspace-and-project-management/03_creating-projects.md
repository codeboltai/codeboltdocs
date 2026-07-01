---
sidebar_position: 3
title: Creating Projects
description: "Create empty projects, open existing folders, or create a project from a template in the Desktop App."
---

# Creating Projects

The project dashboard exposes three project entry points:

| Action | What it does |
|---|---|
| **Open project** | Opens an existing folder and registers it as a Codebolt project. |
| **Quick Create** | Creates a new empty project in the selected workspace. |
| **Create via Template** | Creates a new project, then downloads a selected template archive into that project folder. |

## Open Project

Use **Open project** when you already have a project folder on disk.

![Open project](/img/open-project.png)

Select the folder you want to open. Codebolt registers it as a project and opens it in the desktop workspace.

## Quick Create

Use **Quick Create** when you want an empty project folder.

![Quick Create](/img/quick-create.png)

Enter a project name, choose the workspace, and create the project.

The new folder includes Codebolt's local project metadata so the app can remember the project and keep agent state separate from your source files.

## Create Via Template

Use **Create via Template** when you want a starter project.

To prepare your own starter project, see [Creating a Template](/docs/04_build-on-codebolt/05b_templates/04_creating-a-template.md).

![Create via Template](/img/template.png)

The modal has two tabs:

| Tab | Source |
|---|---|
| **Templates** | Templates from the shared template catalog. |
| **My Templates** | Your published templates from the hosted template list. |

When you submit the form, the app:

1. checks that the project name is available
2. creates the project in the selected local workspace
3. downloads the selected template URL
4. extracts the template into the new project folder
5. opens the new project

Codebolt downloads the URL as a ZIP file and extracts it into the destination project folder.

## See Also

- [Creating a Template](04_creating-a-template.md)
- [Publishing Templates](05_publishing-templates.md)
