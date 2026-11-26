---
sidebar_position: 3
title: Creating Projects
description: "Create empty projects, open existing folders, or create a project from a template in the Desktop App."
---

# Creating Projects

Choose a project action from the Codebolt Desktop dashboard.

![Project dashboard buttons for Open project, Quick Create, and Create via Template](/img/desktop/project-actions.png)

| Action | What it does |
|---|---|
| **Open project** | Opens an existing folder and registers it as a Codebolt project. |
| **Quick Create** | Creates a new empty project in the selected workspace. |
| **Create via Template** | Creates a new project, then downloads a selected template archive into that project folder. |

## Open Project

Click **Open project**, then select an existing folder. Codebolt registers it as a project and opens it in the desktop workspace.

## Quick Create

To start with an empty folder, select a **Local workspace** on the dashboard and click **Quick Create**.

![Quick Create dialog showing the project title field and the Create Project button](/img/desktop/quick-create.png)

Enter a project name and click **Create Project**.

The new folder includes Codebolt's local project metadata so the app can remember the project and keep agent state separate from your source files.

## Create Via Template

Use **Create via Template** when you want a starter project.

To prepare your own starter project, see [Creating a Template](/docs/04_build-on-codebolt/05b_templates/04_creating-a-template.md).

![Template picker with Templates and My Templates tabs, a search field, and the Create Project form](/img/desktop/template-picker.png)

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

- [Creating a Template](../../../../04_build-on-codebolt/05b_templates/04_creating-a-template.md)
- [Publishing Templates](../../../../04_build-on-codebolt/05b_templates/05_publishing-templates.md)
