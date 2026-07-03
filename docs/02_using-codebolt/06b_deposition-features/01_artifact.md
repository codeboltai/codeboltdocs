---
sidebar_position: 1
title: Artifacts
description: Artifacts are durable outputs from agent work that can be opened, previewed, reviewed, and shared across Codebolt surfaces.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Artifacts

Artifacts are durable outputs created by agents, action blocks, testing flows, or runtime previews. They are the things Codebolt keeps after work is done so a user or another agent can inspect the result later.

An artifact is not only a file. It can be a generated website, a running app preview, a screenshot, a video recording, a report, a test evidence bundle, a terminal app, a native app package, or a link to an externally hosted result.

Use artifacts when an output should survive beyond a chat message.

For a phase-by-phase workflow, see [Artifact Management](../../03_guides/07a_multi-step-phase/0_artifact-management).

## What Is an Artifact?

An artifact is a saved result from a task. Codebolt stores enough information about that result to reopen it, preview it, associate it with the thread that produced it, and pass it into later review or collaboration flows.

For example:

- An agent builds a small static website and publishes it as a `static_site` artifact.
- A testing action block records browser verification and publishes the recording as an artifact.
- A remote runtime starts a web app and registers the preview URL as an artifact.
- A review agent creates a report or evidence file and attaches it to a review request.
- A generated image, video, or document is saved so the next agent can inspect it.

Locally, Codebolt stores artifact records and files inside the active project under `.codebolt/artifact/`. The registry tracks artifact metadata, while each artifact folder stores copied or generated files.

## Why Artifacts Matter

Artifacts make agent work reusable and reviewable. Without an artifact, an agent can say it created or tested something, but the output may only exist as text in the conversation. With an artifact, the result becomes a concrete object that can be opened later.

This matters most when work crosses time, agents, or platforms:

- **Review:** A user can inspect the generated output before accepting it.
- **Verification:** A test recording, screenshot, report, or static preview can prove what was checked.
- **Continuation:** Another agent can use the artifact as evidence or input for the next task.
- **Collaboration:** A review/merge request can link to generated outputs next to code changes.
- **Cloud handoff:** A result created in a remote runtime can appear in the cloud portal thread.
- **Repeatability:** The same artifact can be reopened without asking the original agent to regenerate it.

Example workflow:

1. Agent A is assigned a UI task.
2. Agent A finishes the implementation and creates a static-site or video artifact showing the result.
3. The user opens the artifact from the Artifact panel or cloud portal.
4. Agent B or a reviewer uses that artifact to verify the work, compare behavior, or decide what to do next.

## How To Create Artifacts

Artifacts can be created from a prompt, through a discovered artifact tool, or directly from CodeboltJS.

<details>
<summary><strong>Create an artifact with a prompt</strong></summary>

Ask the agent to publish the output as an artifact when you want the result to be reusable.

Examples:

```text
Create a static site artifact for the generated report folder.
```

```text
After testing the page, publish the browser recording as an artifact so I can review it.
```

```text
Build the demo app and create an artifact that opens the running preview.
```

The agent should create or identify the output, place file-backed outputs inside the active project, and then publish the result as an artifact.

</details>

<details>
<summary><strong>Create an artifact with the artifact tool</strong></summary>

Agents and action blocks can discover the artifact creation tool before using it. This is the preferred tool-driven flow because it works through the same tool routing system as other Codebolt capabilities.

The expected flow is:

1. Search for the artifact creation tool with a query like `artifact_create artifact static_site`.
2. Use the discovered tool, usually `artifact_create` or `codebolt--artifact_create`.
3. Pass the artifact type, title, source path or files, and entrypoint.
4. Use the returned artifact ID or preview URL in the final response.

For file-backed artifacts, the source path should be inside the active project. For URL artifacts, provide an absolute `http` or `https` URL.

</details>

<details>
<summary><strong>Create an artifact with CodeboltJS</strong></summary>

Custom agents and action blocks can create artifacts through CodeboltJS.

```ts
const result = await codebolt.artifact.create({
  type: 'static_site',
  title: 'Verification Recording',
  description: 'Browser recording from the verification run.',
  sourcePath: 'artifacts/verification-recording',
  entrypoint: 'index.html',
  threadId,
});
```

You can also create artifacts from inline files:

```ts
const result = await codebolt.artifact.create({
  type: 'static_site',
  title: 'Generated Demo',
  entrypoint: 'index.html',
  files: [
    {
      path: 'index.html',
      content: '<!doctype html><html><body><h1>Demo</h1></body></html>',
      encoding: 'utf8',
    },
  ],
});
```

Use CodeboltJS when you are authoring an agent, action block, or plugin-backed workflow that needs to publish outputs programmatically.

</details>

## Where You Can View Artifacts

After creation, artifacts can appear in several Codebolt surfaces. The surface you use depends on whether you are working locally, reviewing the output from chat, or checking artifacts from a remote cloud run.

<Tabs groupId="artifact-view-surface">
<TabItem value="desktop" label="Desktop App" default>

Open the **Artifacts** panel in the desktop app when you want the full local artifact browser. The panel lists available artifacts on the left, supports search and type filters, and shows the selected artifact preview on the right.

![Artifacts panel in the desktop app](/productImages/planning/artifact.png)

Use this view to inspect generated static sites, screenshots, recordings, reports, terminal outputs, or runtime-backed previews without leaving the app. The selected artifact view can show its title, artifact ID, type, stored path, description, and preview controls.

From the desktop Artifact panel you can:

- search across saved artifacts,
- filter by artifact type,
- preview the selected artifact with a built-in preview or a compatible preview provider,
- open the artifact externally when it has a direct URL,
- refresh the list after an agent or action block creates a new artifact,
- use the artifact as review evidence for follow-up work.

For local work, this is usually the best place to open an artifact because it preserves the local project context, preview provider choice, and artifact metadata.

</TabItem>
<TabItem value="chat" label="Chat">

Artifact-created messages can appear directly in the chat stream. These messages summarize the output and include an **Open** action that opens the artifact in the desktop Artifact panel.

Use chat artifacts when you want to move from the agent's completion message to the generated output without hunting through project files. The chat message is useful for handoff because it keeps the artifact next to the task, agent response, and any follow-up instructions.

Chat is the right surface when:

- an agent just finished a task and published an artifact,
- you want to open the result from the completion message,
- another agent needs a visible reference to the output,
- the artifact is part of the conversation history for later review.

The chat message is a pointer, not the artifact storage itself. Opening it takes you to the artifact viewer where Codebolt can load the preview, metadata, and available actions.

</TabItem>
<TabItem value="cloud" label="Cloud Portal">

In the cloud portal, open **Remote Chat**, select a thread, and use the **Artifacts** sidebar. The portal shows artifacts scoped to the selected thread, so outputs stay connected to the remote conversation, agent, and runtime that produced them.

When you open the Artifacts sidebar, the portal first loads artifacts for the active thread from the cloud API and then requests the latest thread artifacts over the cloud chat socket. This means the initial list can load quickly, and new artifact events can update the sidebar while the remote conversation is still running.

The cloud portal artifact sidebar includes:

- a thread-scoped artifact count,
- loading and empty states,
- one card per artifact,
- artifact title or ID,
- artifact type,
- file count,
- status,
- description,
- agent name or agent ID,
- runtime ID,
- entrypoint,
- updated time,
- preview controls,
- direct external links when the artifact has one.

Cloud artifact cards can start and stop preview sessions. If compatible preview providers are available for the artifact type, the portal shows a preview provider selector. Providers are filtered by artifact type, sorted so non-built-in providers are preferred, and the selected provider is remembered per artifact type in the browser.

When you click **Preview**, the portal connects to the artifact preview socket and sends an `artifactPreview.start` request with the artifact, selected provider, workspace, and preview ID. The preview session moves through statuses such as `starting`, `acknowledged`, `ready`, `stopping`, `stopped`, or `error`. When the provider returns a URL, the portal opens it in a preview window or shows it in the preview side panel with an option to open it externally.

The portal also listens for live artifact updates:

- `syncThreadArtifacts` replaces the artifact list for a thread,
- `artifactEvent` adds, updates, or removes a single artifact,
- `artifactPreview.event` updates preview session status and ready URLs.

If the preview service is disconnected, the artifact still remains in the sidebar, but starting or stopping a preview shows a preview-unavailable warning. If an artifact has a direct external URL, the portal can open that URL even when no preview provider is selected.

Use the cloud portal view when artifacts are created by remote agents, remote runtimes, cloud preview providers, or collaborative review flows tied to a cloud thread.

</TabItem>
<TabItem value="review" label="Review & Testing">

Review and testing flows can link artifacts as evidence. Review/merge requests can include artifact IDs so reviewers can open generated outputs next to code changes. Auto Testing can link screenshots, browser recordings, snapshots, reports, or other verification artifacts.

Use this path when the artifact is proof of what was built or tested. A review artifact lets a reviewer inspect the generated UI, test recording, screenshot, log, or report instead of relying only on the agent's text summary.

Typical review and testing artifact uses include:

- screenshot evidence for a UI change,
- browser recordings from an automated verification run,
- static HTML reports,
- generated documentation previews,
- logs or output bundles from a test command,
- app previews attached to a review or merge request.

This is the preferred surface when a later reviewer, user, or agent needs to verify the result independently.

</TabItem>
<TabItem value="local" label="Local Project">

File-backed artifacts are stored in the active project under:

```text
.codebolt/artifact/
```

The local artifact directory contains the artifact registry and file-backed artifact folders. A typical local layout looks like:

```text
.codebolt/artifact/
  registry.json
  <artifact-id>/
    index.html
    ...
```

Use the local folder when you need to inspect the stored files directly, archive an output, or debug what an agent produced. For example, a `static_site` artifact may store an `index.html` entrypoint and supporting assets under its artifact folder.

The UI should still be the default way to open, preview, and review artifacts because it preserves thread, agent, type, entrypoint, provider, and preview-session context. The local folder is the raw storage view.

</TabItem>
</Tabs>

## Types of Artifacts

Choose the type based on what the output represents.

| Type | Use it for |
|---|---|
| `static_site` | Static HTML/CSS/JS output, reports, browser recordings wrapped in an HTML page, generated docs previews. |
| `dynamic_site` | A web app served by a runtime, command, or preview provider. |
| `image` | Screenshots, generated images, diagrams, visual evidence. |
| `video` | Browser recordings, demos, walkthroughs, rendered video output. |
| `native_application` | Desktop or platform-specific app builds. |
| `terminal_application` | CLI tools, terminal apps, or command-driven outputs. |
| `url` | A hosted result that already exists at an external URL. |
| `file` | A single document, archive, report, log, or other file output. |
| `other` | Outputs that do not fit a more specific type. |

When in doubt, use the type that best matches how the user will open or review the result.

## How Codebolt Shares Artifacts With Cloud

Codebolt shares artifacts across the desktop app and cloud portal through artifact records, thread association, and live events.

In the desktop app, the local server stores the artifact and sends artifact events to the UI. The Artifact panel updates when artifacts are created, changed, deleted, or when a preview session changes state.

In the cloud portal, Remote Chat loads artifacts for the active thread and listens for live artifact events. When a new artifact arrives for that thread, the portal adds it to the thread's Artifacts sidebar. When an artifact is updated or removed, the sidebar updates without requiring a full page refresh.

This is why attaching artifacts to the correct thread matters. The thread is the bridge that lets a generated output appear next to the conversation and runtime that produced it.

## Artifact Preview Providers

Preview providers are plugins or managed services that know how to open a particular artifact type.

A preview provider can:

- serve a static-site artifact over HTTP,
- start a sandbox or runtime for a dynamic app,
- open a URL in a browser preview,
- return a dynamic panel result,
- report preview lifecycle status back to Codebolt.

The preview lifecycle usually looks like:

1. The user clicks **Preview**.
2. Codebolt selects a compatible provider for that artifact type.
3. The provider acknowledges the request.
4. The provider starts or prepares the preview environment.
5. Codebolt receives a ready URL or dynamic panel result.
6. The user opens, reviews, or stops the preview.

The cloud portal also has Preview Provider Settings for choosing and managing providers. Managed providers can use remote sandbox backends such as E2B, Daytona, Runloop, or similar runtime services when configured.

See also:

- [Cloud Artifact previews](../02_surfaces/06_cloud/04_running-agents/10_artifacts.md)
- [Preview Provider Settings](../02_surfaces/06_cloud/05_settings/06_preview-provider-settings.md)
- [Artifact Management guide](../../03_guides/07a_multi-step-phase/0_artifact-management)
- [Build plugins](../../04_build-on-codebolt/05_plugins/01_overview.md)

## How To Use Artifacts

After an artifact is created, the useful next step depends on who is using it and what needs to happen next.

<Tabs groupId="artifact-use-audience">
<TabItem value="user" label="By User" default>

Users use artifacts to preview, verify, compare, and approve agent work. Instead of trusting only the chat summary, open the artifact and inspect the actual output.

Common user actions:

- **Preview the result:** Open the artifact from the desktop Artifact panel, chat message, cloud Artifacts sidebar, or review flow.
- **Choose a preview provider:** For web, app, terminal, or runtime-backed artifacts, click **Preview** and select a compatible provider when more than one is available.
- **Verify the output:** Check that the artifact contains what the agent claimed, such as the generated UI, screenshot, test recording, report, or app preview.
- **Compare against the request:** Review the artifact against the original task, acceptance criteria, design, bug report, or review comment.
- **Open externally:** Use **Open** or the external link when you need a larger browser window, a shareable preview, or direct access to a hosted result.
- **Use it as evidence:** Link or reference the artifact in review/merge requests, testing notes, or follow-up instructions.
- **Stop preview resources:** Stop the preview session after review when the artifact uses a runtime or managed preview provider.

Example user workflow:

1. The agent finishes a UI task and publishes a `static_site` artifact.
2. Open the artifact from chat or the Artifact panel.
3. Click **Preview** and inspect the generated page.
4. Check screenshots, recordings, reports, or app behavior against the task.
5. Approve the work, request fixes, or attach the artifact to a review.

For a generated app or static site, preview it first. For a screenshot, video, or report, open it and verify that it contains the expected evidence. For a review flow, attach the artifact so another reviewer can evaluate the output alongside the code changes.

</TabItem>
<TabItem value="agent" label="By Agent">

Agents use artifacts as durable context. An artifact can tell the next agent what was built, what was verified, what failed, and what should happen next.

An agent can use an artifact to:

- **Review previous work:** Open a static site, screenshot, report, or recording before deciding whether the task is complete.
- **Verify the result:** Inspect the artifact against the user's request, test plan, acceptance criteria, or linked review.
- **Continue unfinished work:** If the artifact shows missing behavior, broken UI, failed tests, or incomplete output, use it as context for the next implementation step.
- **Avoid repeating work:** Reuse the artifact instead of asking the previous agent to regenerate the same output.
- **Create a follow-up plan:** Convert artifact findings into concrete next steps, bug fixes, or verification tasks.
- **Assign or hand off work:** Reference the artifact when assigning the task to another agent so the next agent has evidence and context.
- **Produce a new artifact:** After making fixes, create a new artifact that shows the updated result or verification evidence.

Example agent workflow:

1. Agent A completes a task and publishes a preview artifact.
2. Agent B opens the artifact and checks whether it satisfies the user's request.
3. If the artifact proves the task is complete, Agent B reports the verification result.
4. If the artifact shows problems, Agent B starts fixing the issue or assigns a focused follow-up task to another agent.
5. After the follow-up work, the agent creates a new artifact with updated evidence.

When an agent reviews an artifact, it should report what it inspected, what passed, what failed, and whether the artifact is enough evidence to close the task. If the artifact is incomplete or outdated, the agent should say that clearly and continue from the current project state.

</TabItem>
</Tabs>

Artifacts are most valuable when they turn "the agent says it is done" into something the user or another agent can actually open, review, verify, and use for the next step.
