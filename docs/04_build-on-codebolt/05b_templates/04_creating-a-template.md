---
sidebar_position: 4
title: Creating a Template
description: "Prepare a folder and archive it so it can be used as a Codebolt project template."
---

# Creating a Template

Create a project template from a working starter project.

A project template is a downloadable ZIP archive. The Desktop App stores the template metadata, and project creation uses the template's `url` field as the archive source.

Codebolt does not currently upload the project template archive for you. Package the template, host the ZIP somewhere the Desktop App can download it, then publish a portal listing that points to that URL.

## Prepare The Folder

1. Start from a clean project folder.
2. Remove generated folders and local-only files.
3. Add setup instructions to `README.md`.
4. Add `.env.example` if users need environment variables.
5. Run the project's normal checks before packaging it.

The final folder should look like the project you want users to receive after Codebolt extracts the template.

## Package The Template

Create a ZIP archive with the project files at the archive root.

Example:

```text
template-source/
|-- README.md
|-- package.json
|-- src/
|   `-- ...
`-- ...
```

Archive the contents of `template-source`, not the parent folder, if you want the extracted project root to contain `README.md`, `package.json`, and `src/` directly.

Avoid wrapping everything in an extra top-level folder unless you want users to see that folder inside the new project. Codebolt extracts the ZIP as-is into the project destination.

## What Codebolt Adds

Before downloading the template, Codebolt creates and registers the project. Codebolt creates:

```text
<project>/
|-- .codebolt/
`-- .gitignore
```

The generated `.gitignore` includes:

```gitignore
.codebolt
```

Template files are then extracted into the same project folder.

## Recommended Files

Include the files a developer needs to start immediately:

| File or folder | Purpose |
|---|---|
| `README.md` | Explain the stack, setup, run commands, and expected next steps. |
| package or dependency files | Include `package.json`, `requirements.txt`, `pyproject.toml`, or equivalent for the stack. |
| source folders | Put starter code where the framework expects it. |
| sample env file | Use `.env.example`, not real secrets. |
| tests or examples | Include a minimal check so users know the template works. |

Do not include generated dependency folders such as `node_modules`, build outputs, local caches, real credentials, or machine-specific files.

## Host The Archive

Upload the ZIP somewhere Codebolt can download directly. The Desktop App template flow expects a URL that points to a downloadable ZIP archive.

The portal template form stores this URL in the template listing. It can upload the listing thumbnail image, but it does not upload or store the template ZIP archive itself.

Common choices:

| Host | Notes |
|---|---|
| GitHub release asset | Good for versioned templates. |
| Object storage | Good for private or controlled distribution. |
| Internal artifact URL | Works when the user environment can reach it. |

The built-in empty template uses this pattern:

```text
https://github.com/codebolttemplate/codebolt-blank-template/releases/download/1.0.0/default.git.zip
```

## Validate Locally

Before publishing the template listing:

1. download the ZIP into a temporary folder
2. extract it
3. confirm files land at the expected root level
4. run the setup command documented in `README.md`
5. create a project from the template in Codebolt and verify it opens

## See Also

- [Creating Projects](03_creating-projects.md)
- [Publishing Templates](05_publishing-templates.md)
