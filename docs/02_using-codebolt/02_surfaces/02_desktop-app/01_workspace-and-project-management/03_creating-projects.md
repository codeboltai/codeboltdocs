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

## Quick Create

Use **Quick Create** when you want an empty project folder.

The Desktop App checks that the project name is available, then creates the project inside the selected local workspace. During creation Codebolt:

- creates the project folder when needed
- creates `.codebolt/`
- writes `.gitignore` with `.codebolt`
- registers the project locally
- adds the project to the workspace
- sets the project active
- initializes project services such as chat, debug, git, and channels

After creation, the app opens the new project in the desktop workspace.

## Create Via Template

Use **Create via Template** when you want a starter project.

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

## Empty Template

The template modal also includes an **Empty** template fallback. In the current UI this points to the Codebolt blank template release ZIP:

```text
https://github.com/codebolttemplate/codebolt-blank-template/releases/download/1.0.0/default.git.zip
```

## Opening From CLI Or File Association

When the Desktop App receives a directory-open event from the CLI or host shell, it registers the selected folder in the default workspace when needed, sets it active, and opens it in the app.

## See Also

- [Creating a Template](./04_creating-a-template.md)
- [Publishing Templates](./05_publishing-templates.md)
