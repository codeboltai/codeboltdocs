---
sidebar_position: 2
title: Workspaces
description: "How local and cloud workspace selectors work on the Desktop App project dashboard."
---

# Workspaces

A workspace is the local folder Codebolt treats as the root for creating and discovering related projects.

## What A Workspace Controls

| Area | Behavior |
|---|---|
| **Quick Create** | Creates a project folder inside the selected local workspace. |
| **Create via Template** | Creates a project inside the selected local workspace, then extracts the selected template URL into it. |
| **Workspace Projects** | Scans the selected local workspace folder for Codebolt project folders. |
| **Default profile** | Stores the selected workspace so the dashboard can restore it later. |

Adding a workspace does not copy or move files. It records the selected folder path and makes that folder the active local workspace.

## First-Time Workspace Selection

During onboarding, Codebolt prompts for a default workspace. The current UI starts with the Desktop folder when the host provides it. You can choose another folder with **Browse**.

When you continue, Codebolt saves the selected folder as your active local workspace.

The server derives the workspace display name from the last path segment.

## Adding A Workspace

On the project dashboard:

1. open the **Local workspace** selector
2. choose **Add Workspace**
3. select a folder

If Codebolt already has a workspace with that path, it reuses it. Otherwise it inserts a new workspace record and makes it the default workspace for the active user.

## Switching Local Workspaces

The **Local workspace** selector lists saved local workspaces. Choosing one switches the active local workspace to the selected saved folder.

After the workspace changes, the dashboard refreshes:

- recent projects for the selected workspace
- workspace-scanned projects for the selected folder
- the active workspace name/path in local UI state

Switching workspaces does not move projects between folders.

## Recent Projects Vs Workspace Projects

The dashboard has two project lists:

| Tab | What it shows |
|---|---|
| **Recent Projects** | Projects registered in Codebolt for the selected workspace. |
| **Workspace Projects** | Top-level folders inside the selected workspace folder that contain `.codeboltconfig.yaml`. |

Codebolt scans the active local workspace folder for project folders.

The server only checks direct child folders. It does not recursively scan nested folders.

## Opening A Workspace Project

Clicking a project from either list opens it as the active project. Opening a folder from outside the selected workspace can still register and open that folder, but it will not appear in **Workspace Projects** unless it is physically inside the selected workspace folder and has `.codeboltconfig.yaml`.

## Local And Cloud Workspace Selectors

The project dashboard has two selectors:

| Selector | Purpose |
|---|---|
| **Cloud workspace** | Chooses personal or team cloud workspace context for cloud-backed operations. |
| **Local workspace** | Chooses the local folder used for creating and discovering projects. |

Choosing **Personal** in the cloud selector clears the stored cloud workspace config. Choosing a team workspace stores its workspace id for cloud operations. This does not change the local workspace folder.

## Stored Workspace Data

Codebolt stores:

- workspace id
- workspace folder path
- workspace display name
- the active workspace id on the user's default profile
- project ids attached to a workspace when projects are created through workspace flows

## See Also

- [Creating Projects](./03_creating-projects.md)
- [Creating a Template](04_creating-a-template.md)
- [Publishing Templates](05_publishing-templates.md)
