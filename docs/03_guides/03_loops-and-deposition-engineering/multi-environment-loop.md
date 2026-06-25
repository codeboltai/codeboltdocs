---
sidebar_position: 3
title: Multi Environment Loop
description: Validate agent work across local, preview, staging, and production-like environments
---

# Multi Environment Loop

A multi environment loop moves agent work through more than one runtime context. The agent may implement locally, validate in a preview environment, compare behavior against staging, and prepare production-safe changes.

**Use case:** the task depends on environment-specific configuration, data, integrations, or deployment behavior.

## The loop

1. **Identify environments.** Decide which environments are relevant: local, preview, staging, production-like, or self-hosted.
2. **Capture differences.** List configuration, secrets, data shape, service URLs, and feature flags.
3. **Implement locally.** Make the smallest change that satisfies the local acceptance criteria.
4. **Promote to preview.** Deploy or run the change in an isolated environment.
5. **Validate integrations.** Check APIs, queues, databases, providers, and external tools.
6. **Compare results.** Confirm behavior is consistent where it should be and intentionally different where required.
7. **Document rollout.** Record migration, rollback, and monitoring steps.

## When to use it

Use a multi environment loop when:

- A feature depends on cloud services or external integrations.
- Local behavior is not enough to prove correctness.
- Configuration changes must be tested safely.
- Rollout and rollback steps matter.

## Example prompt

```text
Implement this webhook retry change locally first, then prepare validation steps for preview and staging. Check environment variables, queue behavior, provider callbacks, and rollback requirements before marking it done.
```

## Environment checklist

- **Configuration:** required environment variables and feature flags.
- **Data:** seed data, migrations, fixtures, and production-like records.
- **Integrations:** provider credentials, callback URLs, and API limits.
- **Observability:** logs, traces, metrics, and alerts.
- **Safety:** rollback plan, migration reversibility, and guarded rollout.

## See also

- [Self-host for a team](../08_advanced/self-host-for-a-team.md)
- [Replay an agent run](../08_advanced/replay-an-agent-run.md)
