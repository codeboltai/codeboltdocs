---
sidebar_position: 8
title: Shadow Git and Checkpoints
description: How Codebolt makes agent edits safely reversible without touching your real git history.
---

# Shadow Git and Checkpoints

CodeBolt uses a separate Git repository to save checkpoints for project files. A checkpoint attached to a user message identifies a snapshot you can restore from chat.

## Restore a checkpoint

Use **Restore checkpoint** on a message that has one. CodeBolt creates a backup checkpoint of your current project files and restores the selected workspace snapshot. Review the resulting changes using the Git panel.

The restore changes files on disk. Its scope is project files captured in the checkpoint. Your regular Git history is managed through the Git panel or your Git commands.

See [Checkpoints and Rollback](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) for the desktop workflow and [Git and Shadow Git](../../02_using-codebolt/08_integrations/03_git-and-shadow-git.md) for the two repositories.
