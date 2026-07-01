---
sidebar_position: 3
title: Workspace
description: In Codebolt, a workspace is a folder you choose as the root for a group of projects
---

# Workspace

In Codebolt, a workspace is a folder you choose as the root for a group of projects. It gives the landing page a default location for creating projects and a place to scan for existing Codebolt projects.

## What a workspace does

- Stores a root folder path that Codebolt treats as your current working area.
- Lets you switch between multiple saved workspace folders from the landing page.
- Controls where **Create via Template** creates new projects.
- Powers the **Workspace Projects** tab on the landing page.

Adding a workspace does **not** copy files, move projects, or create a new directory structure for you. Codebolt simply saves the folder you selected and marks it as the active workspace.

## Add a workspace

On the landing page, use the workspace selector in the top-right corner and choose **Add Workspace**.

Codebolt opens a folder picker. After you select a folder:

- The folder is saved as a workspace if it has not been added before.
- If the folder already exists in Codebolt's saved workspace list, Codebolt reuses it.
- That workspace becomes your active workspace immediately.

The workspace name shown in the selector is the last segment of the folder path.

## Switch workspaces

Use the same workspace selector to switch to any saved workspace.

When you switch:

- Codebolt updates your active workspace in your default profile.
- The landing page refreshes the current workspace name and path.
- The project lists are reloaded for the new workspace context.

Switching workspaces does not move projects between folders. It only changes which workspace is active.

## Recent Projects vs Workspace Projects

The landing page shows two project lists:

| Tab | What it shows |
|---|---|
| **Recent Projects** | Projects Codebolt already knows about and has opened before |
| **Workspace Projects** | Top-level folders inside the active workspace that contain a `.codeboltconfig.yaml` file |

This distinction matters:

- A folder can open successfully as a project and appear in **Recent Projects**.
- It will only appear in **Workspace Projects** if it is physically inside the selected workspace folder and has a `.codeboltconfig.yaml` file.
- The workspace scan is top-level only. Codebolt does not recursively search nested folders in the workspace tree from this screen.

## Creating and opening projects with a workspace

### Create via Template

**Create via Template** creates a new project inside the active workspace. The backend resolves the destination as:

```text
<workspace folder>/<project name>
```

Codebolt checks that the project name is available in the selected workspace before creating it.

### Open project

**Open project** lets you pick any existing folder from disk. This is useful when the project is outside your current workspace or when you want to open an existing repository directly.

Opening a project:

- registers it with Codebolt if it is not already known
- sets it as the active project
- adds the internal `.codebolt` folder if needed

Opening a project from outside the workspace does not make it a workspace-scanned project automatically.

## What Codebolt persists

When a workspace is active, Codebolt stores:

- the active workspace id in your default profile
- the workspace folder path
- the derived workspace name shown in the UI

That active workspace is then used by the landing page and project creation flows.

## Current behavior to know

- The landing page supports adding and switching workspaces.
- The workspace selector is folder-based, not team-based.
- Workspace discovery currently depends on `.codeboltconfig.yaml`.
- Workspace Projects is a lightweight scanner for the selected root folder, not a full project indexer.

## See also

- [Teams](./02_teams.md)
- [Usage and Billing](./03_usage-and-billing.md)
- [Desktop Layout](../02_surfaces/02_desktop-app/02_application-navigation/02_layout.md)
