---
sidebar_position: 5
title: Custom Depositions
description: Design deposition formats for your team's review, compliance, and handoff needs
---

# Custom Depositions

Custom depositions adapt the deposition framework to your team's workflow. Instead of using one generic handoff format, you define the fields, evidence, and acceptance criteria that matter for a specific type of work.

**Use case:** your team needs repeatable records for reviews, incidents, migrations, releases, or compliance-sensitive changes.

## Design the deposition

Start by choosing the purpose:

- **Review deposition:** explains code changes and verification evidence.
- **Incident deposition:** records timeline, impact, mitigation, and follow-up.
- **Migration deposition:** captures data changes, rollout, rollback, and validation.
- **Release deposition:** summarizes scope, risks, checks, and deployment state.
- **Research deposition:** preserves findings, sources, assumptions, and recommendations.

## Define required fields

A custom deposition should specify:

- **Required sections:** fields that must always be present.
- **Evidence standards:** what counts as proof for this workflow.
- **Approval rules:** who or what can accept the deposition.
- **Retention location:** where the record should live.
- **Follow-up format:** how open items are tracked.

## Example prompt

```text
Create a migration deposition for this database change. Include goal, affected tables, migration commands, rollback plan, validation queries, test evidence, deployment risks, and next actions.
```

## Example custom format

```markdown
## Migration summary

## Affected systems

## Commands run

## Validation evidence

## Rollback plan

## Approval status

## Follow-up items
```

## Practical tips

- **Keep formats short.** Long templates get skipped.
- **Make evidence explicit.** A claim without proof is not a deposition.
- **Use the same format repeatedly.** Consistency makes review faster.
- **Store depositions near the work.** Put records where future agents and humans can find them.

## See also

- [Deposition Framework](./deposition-framework.md)
- [Code review with an agent](../04_everyday-workflows/code-review-with-an-agent.md)
