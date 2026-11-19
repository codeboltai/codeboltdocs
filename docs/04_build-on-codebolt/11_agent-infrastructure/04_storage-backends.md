---
sidebar_position: 4
title: Storage Backends
description: Find application files, checkpoint storage, and environment-owned data.
---

# Storage Backends

The standalone server uses JSON files for application records. See [Application Storage](./03_database.md) for the runtime directories and project data locations.

[Chat checkpoints](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) use a shadow Git repository. Their storage belongs to the runtime that created them. Keep the runtime directory with the project when taking a [backup](./07_backup-and-restore.md).

For files and artifacts created in another execution environment, use that environment's [provider](../../02_using-codebolt/08a_environments/03_environment-providers.md) and sync workflow to access the output.
