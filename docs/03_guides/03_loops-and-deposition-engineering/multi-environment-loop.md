---
sidebar_position: 3
title: Multi Environment Loop
description: Validate agent work by starting agents or threads across local, preview, staging, and remote environments
---

import MultiEnvironmentLoopDiagram from '@site/src/components/diagrams/MultiEnvironmentLoopDiagram';

# Multi Environment Loop

A multi environment loop moves agent work through more than one runtime context. The main agent can work locally, then start a new agent or another thread in a different environment to validate the same task in isolation.

**Use case:** the task depends on environment-specific configuration, data, integrations, or deployment behavior.


## Starting a new agent in another environment

Use a new agent when another specialist should own validation, review, or execution in a different environment.

```ts
const result = await plugin.environment.startAgentInEnvironment(
  'preview-environment-id',
  'Validate the webhook retry change and report only failures, risks, and required fixes.',
  'preview-validator',
  currentThreadId,
);
```

The main agent keeps ownership of the final decision. The agent running in the other environment returns its findings to the main agent.

## Starting another thread in another environment

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

The parent thread remains owned by the main agent. The environment thread handles isolated validation and reports back with results.

## When to use it

Use a multi environment loop when:

- A feature depends on cloud services or external integrations.
- Local behavior is not enough to prove correctness.
- Configuration changes must be tested safely.
- Rollout and rollback steps matter.
- You need to start a separate agent or thread in a remote or isolated environment.

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
