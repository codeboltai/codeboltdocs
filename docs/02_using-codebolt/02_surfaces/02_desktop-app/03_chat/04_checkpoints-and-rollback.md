---
sidebar_position: 4
title: Checkpoints and Rollback
description: Restore the workspace from a checkpoint attached to a chat message.
---

# Checkpoints and Rollback

CodeBolt uses a shadow Git repository to take snapshots of project files. When chat attaches a checkpoint to a message, the message can restore the workspace to that snapshot.

## What gets checkpointed

On the chat send path, CodeBolt attempts to create a checkpoint before sending the message. A message can still be sent if checkpoint creation fails.

## Rollback

1. Hover over the user message that has the checkpoint you want.
2. Select **Restore checkpoint**.
3. Review the project files after the restore.

The server takes a backup checkpoint of the current state before restoring the selected snapshot. The restore applies to the project snapshot as a whole. It does not undo work outside the snapshot, such as a push to a remote Git repository or an external API call.

On a message without an attached checkpoint, **Revert to this message** puts the message text back into the composer.

## See also

- [Git Panel](../03b_code-and-terminal/04_git-panel.md) for project Git operations.
- [Guardrails](../../../05b_guardrails-and-settings/01_guardrails.md) for reviewing tool requests before they run.
