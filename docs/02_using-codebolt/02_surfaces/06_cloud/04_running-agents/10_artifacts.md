---
sidebar_position: 10
title: Artifacts
description: View, open, and preview outputs created by agents in Remote Chat threads.
---

# Artifacts

Artifacts are outputs created by an agent while it works. They can be generated from **Remote Chat** in the cloud portal or from the local desktop app, and they keep enough metadata for Codebolt to list, open, preview, and link them back to a thread, agent, runtime, or review merge request.

Common artifact examples are static sites, dynamic sites, images, videos, terminal apps, native apps, URLs, and individual files.

In the cloud portal, open artifacts from **Agents -> Remote Chat** by selecting a thread and clicking the **Artifacts** button in the chat header. In the desktop app, an **Artifact added** message includes an **Open** action that opens the docked **Artifacts** panel.

## Supported artifact types

Codebolt recognizes these artifact types:

| Type | Typical use |
|---|---|
| `static_site` | A generated static website or HTML bundle |
| `dynamic_site` | A web app served by a runtime command or preview provider |
| `image` | A generated image or image file |
| `video` | A generated video file |
| `native_application` | A native app output |
| `terminal_application` | A terminal-oriented app or command output |
| `url` | An external URL registered as an artifact |
| `file` | A single file or file output |
| `other` | Any output that does not fit a more specific type |

Artifacts move through these stored statuses: `created`, `updated`, `archived`, and `deleted`. Deleted artifacts are hidden from normal lists.

## What the Artifacts panel shows

The cloud portal's Remote Chat artifact drawer lists artifacts for the selected thread. Each artifact card can show:

| Field | Meaning |
|---|---|
| **Title** | The artifact title, or the artifact ID when no title is available |
| **Type** | The artifact type |
| **Files** | File count from the artifact metadata |
| **Status** | Current artifact status, when reported by the runtime |
| **Agent** | The agent name or ID that created the artifact |
| **Runtime** | The runtime that produced it, or `local` when no runtime ID is attached |
| **Entry** | The artifact entrypoint, when the runtime provides one |
| **Updated time** | The last updated or created timestamp |

If the thread has no generated outputs yet, the panel shows an empty state for that thread.

The desktop Artifact panel has a wider management view. It lists artifacts on the left, supports search and type filtering, and shows the selected artifact preview on the right. Search checks title, description, artifact ID, agent name, and thread ID.

## How artifacts load

When you open a thread, Remote Chat requests that thread's messages and artifacts over the cloud chat connection. When you open the Artifacts panel, the portal also refreshes the persisted artifact list for the active thread and then keeps it updated from live artifact events.

That means the panel can update while the agent is still working. New artifacts are added to the top of the list, updated artifacts are merged in place, and deleted artifacts are removed from the thread.

In the desktop app, the Artifact panel fetches artifacts from the local Codebolt server and then keeps the list live over the artifact socket. It receives initialization, list, get, created, updated, deleted, and preview-status events.

## How artifacts are stored locally

The local Codebolt server stores artifacts inside the active project:

```text
.codebolt/
  artifact/
    registry.json
    art-<id>/
      <artifact files>
```

`registry.json` stores artifact metadata. Each artifact gets its own folder for copied or generated files.

When an agent creates an artifact, the server can:

- copy files from a `sourcePath` inside the active project
- write provided file contents into the artifact folder
- store metadata such as agent ID, agent name, thread ID, parent agent instance, runtime, external provider, and review merge request ID
- link the artifact to a review merge request when `reviewMergeRequestId` is provided

Artifact file paths must be relative. Paths that escape the artifact folder are rejected, and `sourcePath` must stay inside the active project. URL artifacts require an absolute `http` or `https` URL, either as `externalUrl` or `runtime.url`.

## Entrypoints and preview URLs

The server chooses an artifact entrypoint in this order:

1. The explicit `entrypoint` provided by the creator.
2. `index.html` for a `static_site` artifact when that file exists.
3. The only file for single-file `image`, `video`, or `file` artifacts.
4. The first stored file.

The server builds a preview URL from the entrypoint. If the artifact has an external URL, that URL is used instead. If the artifact has `runtime.url`, the preview endpoint redirects to that runtime URL.

## Opening an artifact

Some artifacts already have a URL. The cloud portal chooses the open URL in this order:

1. The artifact's external URL.
2. The artifact runtime URL.
3. The artifact preview URL.

For `static_site` artifacts, the portal does not use the stored preview URL directly. Static sites are opened through an artifact preview provider so the correct preview environment can be started and tracked.

The desktop Artifact panel uses the same priority for preview URLs: external URL, runtime URL, then stored preview URL. Local stored preview URLs are resolved against the local server, so files under `.codebolt/artifact` can be shown in the app.

## Previewing an artifact

Click **Preview** on an artifact to start a preview. If the artifact type has compatible preview providers, the panel shows a provider selector before previewing.

The portal remembers your selected provider per artifact type in the browser, so the same type can reuse the same provider next time. Provider labels may include **built-in** for system providers; non-built-in providers are preferred when available.

Cloud preview sessions move through these states:

| Status | Meaning |
|---|---|
| `starting` | The preview provider request has been sent |
| `acknowledged` | The provider accepted the preview request |
| `ready` | A preview URL or preview result is available |
| `stopping` | The preview is being stopped |
| `stopped` | The preview session has ended |
| `error` | The provider failed to start or serve the preview |

When the preview becomes ready with a URL, the portal opens it in a new browser tab. If a popup blocker prevents that, the portal shows an **Open preview** link. Preview results without a URL are shown in the preview side panel with their status message.

In the desktop app, preview providers are registered by plugins. A provider declares the artifact types it supports. When a provider preview is ready, it returns either:

- a URL result, which Codebolt opens in a Browser panel
- a dynamic panel result, which Codebolt opens as a Dynamic Panel

If no provider is available, the desktop Artifact panel falls back to the built-in preview. Images render as images, videos render in a video player, and other previewable outputs render in an iframe.

## Stopping previews

Artifacts and preview environments are separate from execution runtimes. Stopping a preview tears down the preview session, but it does not stop the agent runtime that created the artifact.

You can stop previews from either place:

- **Remote Chat -> Artifacts** - stop the preview attached to a specific artifact.
- **Agents -> Environments -> Preview Environments** - stop any active preview session across your workspace.

The **Preview Environments** tab lists active preview sessions, including provider, status, URL, runtime or sandbox information, and the preview ID.

## When preview is unavailable

If the preview service is disconnected, Remote Chat shows a **Preview unavailable** warning. The artifact remains in the thread, and you can try again when the preview connection is restored.

If the artifact has a direct external URL, use **Open artifact externally** to open it without starting a preview provider.

## See also

- [Remote Chat](./01_remote-chat.md) - where artifacts are created and opened
- [Cloud Environments](./02_environments.md) - execution and preview environment organization
- [Runtimes & Providers](./04_runtimes-and-providers.md) - runtime lifecycle and provider setup
- [Desktop Artifacts](../../02_desktop-app/03c_panels/04c_deposition-framework-features/05_artifacts.md) - local Artifact panel behavior
