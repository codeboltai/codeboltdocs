---
sidebar_position: 8
title: Upgrade a CodeBolt Runtime
description: Back up runtime state and verify an upgrade before replacing a working installation.
---

# Upgrade a CodeBolt Runtime

1. Record the installed CLI version with `codebolt --version` and note which project and data directory the runtime uses.
2. Stop the runtime and [back up its state](./07_backup-and-restore.md).
3. Test the new version with an isolated copy of the project and runtime data. Open the project and verify that settings and project records load.
4. Start the upgraded runtime with the working project after the copy passes verification.

If you need to return to an earlier version, test it against the pre-upgrade copy of the data before restoring a working runtime.
