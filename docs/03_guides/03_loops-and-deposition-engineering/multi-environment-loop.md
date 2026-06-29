---
sidebar_position: 3
title: Multi Environment Loop
description: Validate agent work by starting threads across local, preview, staging, and remote environments
---

import MultiEnvironmentLoopDiagram from '@site/src/components/diagrams/MultiEnvironmentLoopDiagram';

# Multi Environment Loop

A multi environment loop moves agent work through more than one runtime context. The main agent can work locally, then start a new thread in another environment to validate the same task in isolation.

**Use case:** the task depends on environment-specific configuration, data, integrations, or deployment behavior.



## The loop

1. **Identify environments.** Decide which environments are relevant: local, preview, staging, production-like, or self-hosted.
2. **Capture differences.** List configuration, secrets, data shape, service URLs, and feature flags.
3. **Implement or inspect locally.** Make the smallest change that satisfies the local acceptance criteria.
4. **Start a new thread in another environment.** Run the same task, validation, or review in preview, staging, or a remote sandbox.
5. **Validate integrations.** Check APIs, queues, databases, providers, and external tools in that environment.
6. **Compare results.** Confirm behavior is consistent where it should be and intentionally different where required.
7. **Loop if needed.** Start another environment thread when a new configuration or provider needs separate validation.
8. **Document rollout.** Record migration, rollback, and monitoring steps.

## Starting another environment

Use a new thread when the agent needs its own messages, file changes, and execution context in another environment.

```ts
import codebolt from '@codebolt/codeboltjs';

const result = await codebolt.thread.createAndStartThread({
  agentId: 'preview-validator',
  userMessage: 'Validate the webhook retry change in the preview environment.',
  parentId: currentThreadId,
  groupId: 'webhook-validation',
});
```

For background or remote environment work, start the thread in the background:

```ts
await codebolt.thread.createThreadInBackground({
  agentId: 'remote-validator',
  userMessage: 'Run integration checks in a remote sandbox.',
  parentId: currentThreadId,
  groupId: 'integration-checks',
  remoteEnv: true,
  environmentProvider: { id: 'e2b-sandbox' },
  environmentName: 'integration-sandbox',
});
```

The parent thread remains the coordinator. The environment thread handles isolated validation and reports back with results.

## When to use it

Use a multi environment loop when:

- A feature depends on cloud services or external integrations.
- Local behavior is not enough to prove correctness.
- Configuration changes must be tested safely.
- Rollout and rollback steps matter.
- You need to start a separate thread in a remote or isolated environment.

## Environment checklist

- **Configuration:** required environment variables and feature flags.
- **Data:** seed data, migrations, fixtures, and production-like records.
- **Integrations:** provider credentials, callback URLs, and API limits.
- **Observability:** logs, traces, metrics, and alerts.
- **Safety:** rollback plan, migration reversibility, and guarded rollout.

## See also

- [Self-host for a team](../08_advanced/self-host-for-a-team.md)
- [Replay an agent run](../08_advanced/replay-an-agent-run.md)
- [Subagents](../../04_build-on-codebolt/03_agent-extensions/08_subagents.md)
- [Multi-Environment Orchestration](../../04_build-on-codebolt/08a_multi-environment-orchestration/01_overview.md)
