---
sidebar_position: 4
title: Review and Merge
description: Review agent changes, record feedback, and merge approved requests.
---

# Review and Merge

Open **Review Merge Request** from the desktop panel selector. A request can include a summary, linked jobs, artifacts, and agent or user feedback.

## Reviewing a merge request

1. Open the request and inspect its changes and supporting material. Supported local Git requests can also open a review environment.
2. Record your feedback. Use the status selector to mark the request approved, request changes, or reject it as appropriate.
3. When an eligible request is approved or its review is complete, select **Merge** to apply the changes. Approval and merge are separate actions in this flow.

For review-and-merge requests, use **Check Conflicts** to inspect merge conflicts before merging.

## The review policy

Project **Merge Config** contains two settings for different workflows:

| Setting | What it controls |
| --- | --- |
| **Merge Strategy** | For incoming provider PRs, choose manual review or auto-merge when conflict-free. |
| **Child Agent Review** | For a child-agent handoff, let the parent agent review and merge, or require approval from an independent agent before the parent merges. |

## See also

- [Linked jobs and artifacts](../02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/01_review-merge-requests.md)
- [Review & Merge Design](../../04_build-on-codebolt/08_multi-agent-orchestration/07_review-and-merge-design.md)
