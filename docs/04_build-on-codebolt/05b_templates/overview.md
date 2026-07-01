---
sidebar_position: 1
title: Overview
description: "Build reusable project starters that users can select from the Desktop App or portal."
---

# Templates

Templates are reusable project starters for Codebolt. They let you package a working folder structure, publish a listing for it, and make it available in the **Create via Template** flow in the Desktop App.

A project template has two parts:

| Part | Purpose |
|---|---|
| **Template archive** | A ZIP file containing the files that should be extracted into the new project. |
| **Template listing** | Metadata shown in Codebolt: title, description, thumbnail, type, and the downloadable archive URL. |

The Desktop App creates the project folder first, then downloads and extracts the template archive into that folder. Because extraction happens from the listing URL, the archive must be hosted somewhere the app can download directly.


Published user templates appear in the **My Templates** tab. Shared templates appear in the **Templates** tab. Both tabs render the same listing fields.

Keep the archive and listing separate:

- Put project files, starter code, README content, and examples inside the ZIP archive.
- Put display name, description, thumbnail image, type, and download URL in the portal template listing.
- Do not expect a file inside the ZIP to override the name, image, or description shown in the Desktop App template picker.

## When To Use Templates

Use a template when you want to standardize how new projects start:

- starter apps for a framework or stack
- internal project skeletons
- sample integrations
- app templates for demos or onboarding
- repeatable project layouts with setup instructions

Templates are best for project files and starter code. Use agents, plugins, skills, capabilities, or action blocks when you want to package executable behavior instead of a starter project.

## Current Publishing Model

Project template publishing is handled through the Codebolt portal. The portal stores the template listing and can upload the listing image, but the project ZIP itself must already be hosted at the URL you enter.

The current CLI does not publish or upload project template archives. CLI publishing is available for supported extension types such as agents, plugins, skills, action blocks, capabilities, and providers.

## Template Lifecycle

1. Create a clean starter project folder.
2. Remove generated files, local caches, machine-specific files, and secrets.
3. Add setup documentation and sample environment files.
4. Package the folder contents as a ZIP archive.
5. Host the ZIP at a direct download URL.
6. Create a template listing in the portal.
7. Use the template from the Desktop App project dashboard.

## See Also

- [Creating a Template](./04_creating-a-template.md)
- [Publishing Templates](./05_publishing-templates.md)
- [Create Projects From Templates](../../02_using-codebolt/02_surfaces/02_desktop-app/01_workspace-and-project-management/03_creating-projects.md)
