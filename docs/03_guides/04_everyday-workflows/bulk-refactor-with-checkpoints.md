---
sidebar_position: 2
title: Bulk Refactor with Checkpoints
description: Review a refactor in batches and restore the project if the changes need to be undone.
---

# Bulk Refactor with Checkpoints

Ask an agent to inspect the project and propose a plan. Apply the refactor in batches that you can review and test. Use the stop control in chat if you need to interrupt a run.

After each batch, inspect the changed files and run the project's tests. Commit any reviewed work you want to keep in Git.

If you need to undo a batch, hover over the user message that has the earlier checkpoint and select **Restore checkpoint**. This restores the project snapshot. To keep other changes while undoing a single edit, review that file's diff and edit it separately.

See [Checkpoints and Rollback](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) for the restore flow.
