---
sidebar_position: 6
title: Security Hardening
description: Review runtime access, plugin permissions, and policy scope before hosting a CodeBolt server.
---

# Security Hardening

Start with the [server launch instructions](./02_running-the-server.md) and confirm which project the running server can access. If you host the runtime, control who can reach it through your host or network configuration. Use TLS on any shared entry point.

## Plugin access

CodeBolt launches plugins as child processes. A plugin runs with the permissions of the runtime account and receives an environment from the runtime. Install plugins you trust and limit the account's access to files and credentials. Use a separate OS account or an isolated runtime when your deployment requires that boundary.

## Agent and tool access

Open the [Guardrails panel](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md) and review the project's default policy profile and the profile selected for the thread. Configure permissions for the tools the workflow needs. Test the expected allow, deny, and approval decisions before relying on them.

Choose the [execution environment](../../02_using-codebolt/08a_environments/01_overview.md) and model provider with the task's data access in mind. A connected integration can send data to its service.

## Logs and recovery

Review what your workflow actually records before using it as an audit source. [Event Log](../../02_using-codebolt/05d_memory/07_event-log.md) provides queries over recorded events. Test your recovery procedure with a copy of the data you intend to restore. See [Backup and Restore](./07_backup-and-restore.md).
