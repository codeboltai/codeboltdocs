---
sidebar_position: 7
title: Backup and Restore
description: Back up the files that the CodeBolt runtime and project use.
---

# Backup and Restore

Stop the runtime before taking a filesystem copy of its state. Copy the runtime user-data directory, `~/.codebolt/`, and the projects you need to retain. Include each project's `.codebolt/` files when copying project data.

CodeBolt keeps areas such as source repositories, runtime state, and cloud resources separately. Back up each source repository using its normal Git workflow and retain any cloud data using the controls for its provider.

To validate a copy, restore it into an isolated test runtime and open the project from the copy. Check that expected projects, settings, and project records appear before using it to replace a working installation.

See [Application storage](./03_database.md) for the locations used by the server.
