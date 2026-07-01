---
sidebar_position: 6
title: Artifacts
description: Use artifacts as durable outputs that agents, users, review requests, and test runs can reopen later.
---

# Artifacts

The **Artifacts** panel stores agent-produced outputs such as files, generated apps, previews, images, videos, URLs, and runtime-backed results.

Open via: **Execution menu -> Artifacts**, from artifact widgets in chat, from Review Merge Requests, or from Auto Testing result links.

## What gets deposited

- Artifact title, type, status, and description.
- Storage path, relative storage path, entrypoint, and file list.
- Preview URL, external URL, or runtime command metadata.
- Agent, agent instance, parent agent, and thread references.
- Review Merge Request linkage when the artifact supports a review.

## Pickup workflow

1. Open the artifact list.
2. Filter or search by type, title, agent, thread, or review context.
3. Select the artifact to preview or inspect metadata.
4. Use the artifact ID or linked review request as the handoff reference.

## See also

- [Review Merge Requests](./01_review-merge-requests.md)
- [Auto Testing](./04_auto-testing.md)
