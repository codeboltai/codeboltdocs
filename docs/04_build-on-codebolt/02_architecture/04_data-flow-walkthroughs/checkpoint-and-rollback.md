---
sidebar_position: 4
title: Checkpoint and rollback
description: How the desktop chat attaches and restores Shadow Git checkpoints.
---

# Checkpoint and rollback

The desktop chat send path attempts to create a Shadow Git checkpoint. If the server returns a commit hash, the application attaches it to the user message. Chat can still send the message when checkpoint creation fails.

## Restore flow

1. The message's **Restore checkpoint** control sends the commit hash to the server's Shadow Git restore route.
2. The controller resolves the active project's Shadow Git repository.
3. The service validates the target hash, computes the changed file names, and creates a backup checkpoint of the current workspace.
4. The service resets the Shadow Git working tree to the selected commit and returns the changed files.

The restore request takes a commit hash and applies a project snapshot. The operation is implemented in `packages/server/src/controllers/shadowGitController.ts` and `packages/server/src/services/shadowGitService.ts`.

See [Checkpoints and Rollback](../../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) for the desktop steps.
