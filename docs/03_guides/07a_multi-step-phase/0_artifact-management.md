---
sidebar_position: 1
title: Artifact Management
description: Use artifacts to preserve, preview, verify, and hand off outputs across multi-step phases.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Artifact Management

Artifacts are the durable outputs of a phase: generated apps, static sites, screenshots, recordings, reports, terminal outputs, evidence bundles, or hosted URLs. In a multi-step workflow, they are how one phase leaves proof for the next phase.

Use this guide when a task has more than one step and each step needs a visible result, verification record, or handoff point.

For the complete artifact reference, see [Artifacts](../../02_using-codebolt/06b_deposition-features/01_artifact).

## When To Use Artifacts

Create an artifact whenever a phase produces something that should be opened, verified, reused, or reviewed later.

Good artifact checkpoints include:

- after an agent builds a UI or app preview,
- after a test run produces screenshots, recordings, logs, or reports,
- before handing work from one agent to another,
- before asking a user to approve a result,
- before closing a review or merge request,
- when a cloud runtime produces a preview URL,
- when a generated output should survive beyond the chat message.

Do not rely only on "done" messages for multi-step work. A phase is easier to trust when the output exists as an artifact that someone can open.

## Basic Phase Pattern

Use this pattern when a task is split into planning, implementation, verification, and review phases.

| Phase | Artifact action |
|---|---|
| Plan | Decide which output should become evidence. |
| Implement | Create or update the output files, app, report, or preview. |
| Publish | Create an artifact with a title, type, description, source path or URL, and entrypoint. |
| Verify | Open the artifact and check it against the task requirements. |
| Handoff | Reference the artifact in the next prompt, review, task, or agent assignment. |
| Close | Keep the artifact as evidence or create a follow-up artifact if more work was needed. |

The artifact should answer: what was produced, where it came from, how to open it, and whether it proves the phase is complete.

## Create Artifacts During a Phase

You can ask for an artifact directly in the prompt, let an agent use the artifact tool, or create one from CodeboltJS inside an agent or action block.

<Tabs groupId="artifact-management-create">
<TabItem value="prompt" label="Prompt" default>

Use a prompt when you want the agent to decide the correct artifact details.

Example prompts:

```text
After implementing this UI change, create a static site artifact that I can preview.
```

```text
Run the verification flow and publish the screenshots and report as an artifact.
```

```text
When this phase is complete, create an artifact with enough evidence for the next agent to review.
```

```text
Build the settings page, run a browser check, and publish an artifact named "Settings Page Verification" with the static preview and screenshots.
```

```text
Fix the failing checkout flow. When done, create a video or report artifact that shows the checkout path passing from cart to confirmation.
```

The agent should identify the output, save file-backed artifacts inside the active project, and publish the artifact with a useful title and description.

</TabItem>
<TabItem value="tool" label="Tool">

Use the artifact tool when an agent or action block needs a deterministic creation flow.

The expected flow is:

1. Search for the artifact creation tool.
2. Select the artifact tool that matches the environment, usually `artifact_create` or `codebolt--artifact_create`.
3. Provide the artifact type, title, description, source path or URL, and entrypoint.
4. Capture the returned artifact ID.
5. Mention the artifact ID or preview path in the phase result.

Use this route for reusable action blocks, validation phases, and workflows where the artifact must always be created.

Example tool payload for a static-site verification artifact:

```json
{
  "type": "static_site",
  "title": "Settings Page Verification",
  "description": "Static preview and screenshots showing the updated settings page after Phase 2.",
  "sourcePath": "artifacts/settings-page-verification",
  "entrypoint": "index.html",
  "threadId": "thread-123"
}
```

Example tool payload for a hosted runtime preview:

```json
{
  "type": "url",
  "title": "Checkout Flow Preview",
  "description": "Hosted preview for the checkout flow validation phase.",
  "externalUrl": "https://preview.example.com/checkout-flow",
  "threadId": "thread-123"
}
```

</TabItem>
<TabItem value="codeboltjs" label="CodeboltJS">

Use CodeboltJS when the artifact is created inside a custom agent, action block, or plugin-backed workflow.

```ts
const result = await codebolt.artifact.create({
  type: 'static_site',
  title: 'Phase 2 Verification',
  description: 'Static preview and screenshots from the implementation phase.',
  sourcePath: 'artifacts/phase-2-verification',
  entrypoint: 'index.html',
  threadId,
});
```

Example for publishing a test report from generated files:

```ts
const result = await codebolt.artifact.create({
  type: 'static_site',
  title: 'Checkout Test Report',
  description: 'HTML report, screenshots, and trace output from checkout verification.',
  sourcePath: 'artifacts/checkout-test-report',
  entrypoint: 'index.html',
  threadId,
});

console.log(`Created artifact ${result.artifact?.id}`);
```

Example for publishing an externally hosted preview:

```ts
await codebolt.artifact.create({
  type: 'url',
  title: 'Remote App Preview',
  description: 'Cloud runtime preview for the latest implementation phase.',
  externalUrl: previewUrl,
  threadId,
});
```

Use this route when the workflow already knows the artifact source path, type, and phase metadata programmatically.

</TabItem>
</Tabs>

## End-To-End Examples

These examples show how artifacts fit into real multi-step phase work.

<Tabs groupId="artifact-management-examples">
<TabItem value="ui" label="UI Implementation" default>

Use this pattern when an agent changes a screen and another user or agent needs visual evidence.

**Task**

```text
Update the settings page so users can configure context compaction rules. Add validation for empty profiles and publish an artifact for review.
```

**Expected artifact**

```json
{
  "type": "static_site",
  "title": "Context Compaction Settings Review",
  "description": "Preview of the settings page with validation states for context compaction profiles.",
  "sourcePath": "artifacts/context-compaction-settings-review",
  "entrypoint": "index.html"
}
```

**Verification**

- Open the artifact from the desktop Artifact panel or chat message.
- Preview the static site.
- Confirm the profile selector, validation state, save action, and empty-profile warning are visible.
- If the artifact is correct, approve the phase.
- If the artifact is missing a state, ask the agent to fix the UI and create a new artifact.

**Handoff prompt**

```text
Review the artifact "Context Compaction Settings Review". Verify the empty-profile validation and save behavior. If the artifact does not show those states, continue the implementation and publish a replacement artifact.
```

</TabItem>
<TabItem value="testing" label="Testing Evidence">

Use this pattern when a phase should prove that behavior passed.

**Task**

```text
Run browser verification for the checkout flow and publish the result as an artifact.
```

**Expected artifact**

```json
{
  "type": "static_site",
  "title": "Checkout Flow Verification",
  "description": "Browser screenshots, trace summary, and pass/fail report for cart, payment, and confirmation.",
  "sourcePath": "artifacts/checkout-flow-verification",
  "entrypoint": "index.html"
}
```

**Verification**

- Open the report artifact.
- Check that it includes cart, payment, and confirmation evidence.
- Confirm failures are visible instead of hidden in logs.
- Attach the artifact to the review or mention it in the next agent prompt.

**Follow-up prompt when the artifact shows a failure**

```text
The artifact "Checkout Flow Verification" shows the payment step failing with a validation error. Fix that issue, rerun the verification, and publish a new artifact with the updated report.
```

</TabItem>
<TabItem value="handoff" label="Agent Handoff">

Use this pattern when one agent finishes a phase and another agent needs to continue from its evidence.

**Agent A result**

```text
I created artifact "Dashboard Phase 1 Preview". It contains the static preview for the dashboard layout and screenshots for desktop and mobile.
```

**Artifact metadata**

```json
{
  "type": "static_site",
  "title": "Dashboard Phase 1 Preview",
  "description": "Desktop and mobile preview of the dashboard layout after Phase 1.",
  "sourcePath": "artifacts/dashboard-phase-1-preview",
  "entrypoint": "index.html"
}
```

**Agent B prompt**

```text
Open and review the artifact "Dashboard Phase 1 Preview". If the desktop and mobile layouts satisfy the request, start Phase 2 and implement the chart interactions. If not, fix the layout first and publish a corrected preview artifact.
```

**Agent B verification response**

```text
I reviewed "Dashboard Phase 1 Preview". Desktop layout passes, but mobile cards overflow at 390px width. I will fix the mobile card layout before starting chart interactions, then publish a replacement artifact.
```

</TabItem>
<TabItem value="cloud" label="Cloud Runtime">

Use this pattern when a remote runtime or preview provider produces the result.

**Task**

```text
Run the app in the cloud runtime, verify the generated page, and publish the remote preview as an artifact.
```

**Expected artifact**

```json
{
  "type": "url",
  "title": "Remote Runtime Preview",
  "description": "Cloud runtime preview for the generated app after implementation.",
  "externalUrl": "https://preview.example.com/runtime/app",
  "threadId": "remote-thread-123"
}
```

**Verification**

- Open the cloud portal.
- Select the Remote Chat thread.
- Open the **Artifacts** sidebar.
- Click **Preview** or **Open** for the artifact.
- Confirm the runtime result matches the task.
- Stop the preview session after review if the provider keeps runtime resources active.

</TabItem>
</Tabs>

## Use Artifacts For Verification

Verification should inspect the artifact, not just the agent message.

For a user:

- open the artifact from chat, the desktop Artifact panel, the cloud Artifacts sidebar, or a review flow,
- click **Preview** for web, app, terminal, or runtime-backed artifacts,
- compare the result with the original request,
- check screenshots, recordings, reports, or logs for the expected evidence,
- approve the phase or request a follow-up change.

For an agent:

- open or inspect the artifact before deciding that the phase passed,
- compare the artifact with the task requirements,
- report what was inspected and what passed,
- identify missing behavior or failed evidence,
- continue implementation if the artifact proves the phase is incomplete.

A good verification response names the artifact, states what was checked, and explains whether it is enough evidence to move to the next phase.

Example user verification note:

```text
Reviewed "Checkout Flow Verification". The artifact includes screenshots for cart and payment, but does not show the confirmation page. Please rerun the flow and publish a new artifact that includes confirmation evidence.
```

Example agent verification note:

```text
I inspected "Settings Page Verification". The preview shows profile selection, validation, and save states. The artifact is sufficient evidence for this phase, so the next phase can focus on cloud sync.
```

## Hand Off Work With Artifacts

Artifacts are most useful when another user or agent can use them without reconstructing the previous phase from memory.

When handing off, include:

- artifact ID or title,
- artifact type,
- what the artifact is expected to prove,
- known limitations or failures,
- next action for the receiver.

Example handoff prompt:

```text
Review the artifact "Phase 2 Verification". It should show the updated settings UI and passing screenshot evidence. If anything is missing, continue from the current project state and create a new artifact with the corrected result.
```

If the next agent confirms the artifact is complete, it can close the phase. If it finds a gap, it can start work from the artifact findings and publish a new artifact after the fix.

## Manage Artifacts Across Surfaces

<Tabs groupId="artifact-management-surface">
<TabItem value="desktop" label="Desktop" default>

Use the desktop Artifact panel for local project work. It is the best surface for opening file-backed artifacts because it keeps project path, artifact type, entrypoint, and preview provider context together.

Use desktop artifacts when:

- the output was produced locally,
- you need to inspect generated files directly,
- you want to preview a static site or app without leaving the project,
- the artifact is evidence for a local review or follow-up task.

</TabItem>
<TabItem value="cloud" label="Cloud">

Use the cloud portal when artifacts were created by remote agents, remote runtimes, cloud preview providers, or collaborative review flows.

In Remote Chat, select the thread and open the **Artifacts** sidebar. Artifacts are scoped to the active thread, so the outputs stay tied to the cloud conversation and runtime that produced them.

The cloud sidebar can show artifact type, file count, status, agent, runtime, entrypoint, updated time, preview controls, and external links. When a compatible preview provider is available, use **Preview** to start a preview session and **Stop** when review is done.

</TabItem>
<TabItem value="review" label="Review">

Use review-linked artifacts when the artifact is evidence for a merge request, testing run, or approval decision.

Attach artifacts that prove the result:

- screenshots for UI changes,
- recordings for browser flows,
- reports for test or analysis runs,
- static previews for generated docs or apps,
- logs for command-driven validation.

Reviewers should evaluate the artifact alongside the code change instead of relying only on a chat summary.

</TabItem>
</Tabs>

## Practical Checklist

Before ending a multi-step phase, check:

- The artifact has a clear title.
- The artifact type matches how it should be opened.
- File-backed artifacts have a valid source path.
- Static artifacts have an entrypoint such as `index.html`.
- The description explains what the artifact proves.
- The artifact is attached to the correct thread, review, or handoff.
- Someone has previewed or inspected it.
- Runtime-backed previews are stopped after review when they are no longer needed.

## Common Mistakes

| Mistake | Better approach |
|---|---|
| Saying "done" without an artifact | Publish a preview, screenshot, report, or recording artifact. |
| Creating an artifact with no description | Explain what phase it belongs to and what it proves. |
| Using the wrong type | Pick the type that matches how the output should be opened. |
| Forgetting the entrypoint | Set the entrypoint for static-site artifacts. |
| Not verifying the artifact | Open it and compare it against the request. |
| Leaving runtime previews running | Stop preview sessions after review. |
| Handing off without context | Include artifact ID, expected evidence, known gaps, and next action. |

## Next Steps

- Read the artifact reference: [Artifacts](../../02_using-codebolt/06b_deposition-features/01_artifact)
- Use artifacts in review flows: [Review & Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge)
- Understand desktop artifact viewing: [Desktop App](../../02_using-codebolt/02_surfaces/02_desktop-app/01_overview)
