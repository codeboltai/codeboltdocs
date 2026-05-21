---
sidebar_position: 4
title: Hooks
description: Hooks are event-driven automation rules that react to system events and trigger actions — run an agent, fire an action block, or execute a shell command
---

# Hooks

Hooks are event-driven automation rules that react to system events and trigger actions — run an agent, fire an action block, or execute a shell command. They implement a simple **when → then** pattern: when this event happens, do this.

Open via: **Agents dropdown → Hooks**

## Trigger events

| Category | Events |
|---|---|
| **File** | `fileCreated`, `fileUpdated`, `fileDeleted` |
| **Git** | `gitCommit`, `gitPush` |
| **Thread** | `threadCreated`, `threadCompleted` |
| **Agent** | `agentStarted`, `agentCompleted` |
| **Event** | `dynamicAgentEvent` |

File triggers support **glob patterns** to match specific paths (e.g., `src/**/*.ts`). Git triggers support **branch filters**. Thread and agent triggers support filtering by creator (`user` / `agent` / `any`) and agent type (`main` / `sub` / `any`). Dynamic agent event triggers can filter by `eventName`.

## Actions

| Action type | What happens |
|---|---|
| `runAgent` | Starts an agent with an optional instruction |
| `runActionBlock` | Fires an action block as a side execution |
| `runCommand` | Executes a shell command |
| `sendToGateway` | Sends an event to the routing gateway |

## Hook configuration

Hooks are stored as `.hook` files in `.codebolt/hooks/`. Each hook has a `when` block and a `then` block:

```yaml
name: lint-on-save
description: Run linter whenever a TypeScript file is saved
enabled: true
version: 1.0.0
when:
  type: fileUpdated
  patterns:
    - "src/**/*.ts"
then:
  type: runActionBlock
  actionBlockId: lint-changed-files
```

```yaml
name: review-on-commit
description: Start a reviewer agent after every git commit
enabled: true
version: 1.0.0
when:
  type: gitCommit
  branches:
    - main
    - "release/*"
then:
  type: runAgent
  agentId: reviewer-agent
  instruction: "Review the latest commit and flag any issues."
  runInSameThread: false
```

Setting `runInSameThread: true` runs the triggered agent inside the same conversation thread as the event source — giving it full context of what was happening when the event fired.

## The Hooks panel

The Hooks panel lists all configured hooks with:

- Name and description
- Trigger type (with icon for file / git / thread / agent category)
- Action type
- Enabled / disabled toggle
- Last execution time and status (`success` / `error` / `timeout`)
- Error message if the last run failed

### Creating a hook

Click **+ New Hook**. The create dialog guides you through:
1. Choosing a trigger type
2. Configuring patterns, branches, or filters for that trigger
3. Choosing an action type
4. Configuring the agent, action block, or command to run

### Enabling and disabling

Toggle any hook on or off without deleting it. Disabled hooks are shown greyed out and will not fire.

## Execution timeout

Hooks time out after 30 seconds by default. If a hook's action doesn't complete in time, the run is marked `timeout` and logged in the panel.

## Common patterns

**Auto-format on save**
```yaml
when: { type: fileUpdated, patterns: ["**/*.py"] }
then: { type: runCommand, command: "black ." }
```

**Post-completion review**
```yaml
when: { type: agentCompleted, agentTypeFilter: main }
then: { type: runAgent, agentId: reviewer, runInSameThread: true }
```

**React to a custom agent event**
```yaml
when:
  type: dynamicAgentEvent
  eventName: plan.ready
then:
  type: runAgent
  agentId: reviewer
  instruction: "Review the plan emitted by the agent."
  runInSameThread: true
```

**Update docs on commit**
```yaml
when: { type: gitCommit }
then: { type: runAgent, agentId: doc-updater, instruction: "Update docs for the latest changes." }
```
