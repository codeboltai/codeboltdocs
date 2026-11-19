---
sidebar_position: 3
title: Database
description: Find the JSON stores and project files used by the standalone CodeBolt server.
---

# Application Storage

The standalone CodeBolt server uses JSON stores for application records. Older TypeORM entry points initialize the JSON stores for compatibility.

| Data | Location |
| --- | --- |
| Workspaces, projects, themes, and marketplace metadata | `config/` under the runtime user-data directory |
| Application records and app configuration | `data/` under the runtime user-data directory |
| Global settings | `~/.codebolt/settings.json` |
| Project policy profiles and project metadata | The project's `.codebolt/` directory |

Set `CODEBOLT_DATA_DIR` when starting the server to override the runtime user-data directory. It controls the location of the runtime's `config/` and `data/` stores. Global settings and project metadata use their own locations.

See [Backup and Restore](./07_backup-and-restore.md) for what to copy before moving or upgrading the runtime.
