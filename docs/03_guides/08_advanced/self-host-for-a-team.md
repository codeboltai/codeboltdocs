---
sidebar_position: 3
title: Run a CodeBolt Runtime for a Team
description: Start a CodeBolt runtime in a project and select a team workspace for cloud synchronization.
---

# Run a CodeBolt Runtime for a Team

With the CLI installed and the runtime signed in to the appropriate CodeBolt account, start a project runtime scoped to the team's cloud workspace:

```bash
codebolt --server --project /path/to/project --team my-team --port 2719
```

Replace `my-team` with the team workspace username. On the same machine, attach the terminal interface with `codebolt --connect 2719`.

See [Running the Server](../../04_build-on-codebolt/11_agent-infrastructure/02_running-the-server.md) for standalone startup and [Cloud Scaling](../../01_get-started/04_core-concepts/07_cloud-scaling.md) for remote execution workflows.
