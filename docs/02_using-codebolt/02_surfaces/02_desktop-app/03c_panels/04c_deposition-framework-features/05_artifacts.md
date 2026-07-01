---
sidebar_position: 6
title: Artifacts
description: Use artifacts as durable outputs that agents, users, review requests, and test runs can reopen later.
---

# Artifacts

The **Artifacts** panel stores agent-produced outputs such as files, generated apps, previews, images, videos, URLs, and runtime-backed results.

Open via: **Execution menu -> Artifacts**, from artifact widgets in chat, from Review Merge Requests, or from Auto Testing result links.

When an agent publishes an artifact, the chat shows an **Artifact added** widget. Click **Open** to open that artifact directly in the docked Artifacts panel.

## Supported artifact types

Artifacts use one of these types:

| Type | Typical output |
|---|---|
| `static_site` | HTML/static site bundle |
| `dynamic_site` | Runtime-backed web app |
| `image` | Image file |
| `video` | Video file |
| `native_application` | Native application output |
| `terminal_application` | Terminal application or command result |
| `url` | External URL |
| `file` | File artifact |
| `other` | Any other output |

Artifacts can be `created`, `updated`, `archived`, or `deleted`. Deleted artifacts are removed from the normal list.

## What gets deposited

- Artifact title, type, status, and description.
- Storage path, relative storage path, entrypoint, and file list.
- Preview URL, external URL, or runtime command metadata.
- Agent, agent instance, parent agent, and thread references.
- Review Merge Request linkage when the artifact supports a review.

The local server stores artifact metadata and files under the active project:

```text
.codebolt/
  artifact/
    registry.json
    art-<id>/
      <artifact files>
```

`registry.json` is the local artifact registry. Each `art-<id>` directory contains the files for one artifact. File paths must stay inside the artifact folder, and `sourcePath` inputs must stay inside the active project.

## Panel workflow

The panel has two main areas:

- **Artifact list** - search and filter artifacts by type. Search checks title, description, artifact ID, agent name, and thread ID.
- **Preview area** - shows the selected artifact, preview status, preview provider selector, **Preview**, and **Open** controls.

When the panel opens, it fetches the current artifact list from the local server and subscribes to live artifact events. Created and updated artifacts are inserted or refreshed in place; deleted artifacts are removed from the panel.

## Preview behavior

The panel chooses a preview URL in this order:

1. `externalUrl`
2. `runtime.url`
3. stored `previewUrl`

For stored files, the server serves the artifact entrypoint from `.codebolt/artifact`. If no entrypoint is provided, Codebolt infers one:

- `index.html` for static sites
- the only file for single-file image, video, or file artifacts
- the first stored file for other artifact types

Images render as images, videos render in a video player, and other previewable outputs render in an iframe. If the artifact has runtime command metadata, the command is shown at the bottom of the preview.

## Preview providers

Plugins can register artifact preview providers. A provider declares which artifact types it supports. When you click **Preview**, the panel starts the selected provider for the current artifact.

Provider preview sessions move through `starting`, `acknowledged`, `ready`, or `error`. A ready provider can return:

- a URL result, which opens in a Browser panel
- a dynamic panel result, which opens in a Dynamic Panel

If no compatible provider is available, the panel uses the built-in preview when the artifact has a preview URL.

## Pickup workflow

1. Open the artifact list.
2. Filter or search by type, title, agent, thread, or review context.
3. Select the artifact to preview or inspect metadata.
4. Use the artifact ID or linked review request as the handoff reference.

## See also

- [Review Merge Requests](./01_review-merge-requests.md)
- [Auto Testing](./04_auto-testing.md)
- [Cloud Artifacts](../../../06_cloud/04_running-agents/10_artifacts.md)
