---
sidebar_position: 8
title: Guardrails
description: How Codebolt keeps a single agent run from going off the rails — allow, rewrite, deny, pause.
unlisted: true
---

import GuardrailFlow from '@site/src/components/diagrams/GuardrailFlow';

# Guardrails

Guardrails keep a *single* agent run from going off the rails. They catch bad actions as they're about to happen, before any damage is done. (The offline counterpart — measuring quality across many runs — is [Evals and Optimization](./09_evals-and-optimization.md).)

<GuardrailFlow />

## What a guardrail is

A **guardrail** is a rule enforced at a specific phase of the agent loop. It inspects what the agent is about to do and returns one of four verdicts:

| Verdict | Meaning |
|---|---|
| **Allow** | Proceed as-is |
| **Rewrite** | Proceed, but with modified arguments (a path clamped, a secret scrubbed) |
| **Deny** | Stop the action and surface a reason to the agent |
| **Pause for human** | Halt and wait for manual approval |

Guardrails are implemented as [hooks](./05_hooks-and-processors.md); the "guardrail" label is about *intent* — enforcing a constraint, not just observing.

## Declarative and programmatic

Most guardrails are one-liners in `guardrails.yaml`:

```yaml
guardrails:
  - name: no-commits-to-main
    phase: before_tool_call
    match: { tool: codebolt_git.commit }
    when: { branch_matches: ["main", "master"] }
    verdict: deny
    reason: "Commits to protected branches require manual review."
```

When declarative isn't enough — dynamic logic, external lookups — drop down to a programmatic hook with the same four-verdict contract.

## Why `rewrite` matters

`rewrite` is the quietest and often most useful verdict:

- **Secret redaction** — replace an API key with `<REDACTED>` in a prompt before it leaves
- **Path clamping** — silently redirect a write outside the project back into scope
- **Argument normalization** — trim, canonicalize, normalize — cheaper than deny-and-retry

Rewrites keep the agent moving while still enforcing the invariant.

## Guardrails vs permissions

- **Permissions** (in the manifest) gate *what an agent can ever attempt* — design-time, a coarse fence.
- **Guardrails** gate *what the agent does right now* based on runtime context — a fine filter.

You want both.

## Budget limits

A special class of guardrail, set on the manifest and enforced by the runtime:

```yaml
limits:
  max_tool_calls: 40
  max_wall_time_seconds: 600
  max_tokens_in: 150000
  max_tokens_out: 20000
```

When a budget trips, the run ends with status `budget_exhausted`. Partial output isn't discarded — the event log captures everything up to that point.

![Guardrails settings](/productImages/guardrails/guardrails.png)

→ **Read the full concept page: [Guardrails](../../02_concepts/06_quality/01_guardrails.md)**

## See also

- [Evals and Optimization](./09_evals-and-optimization.md)
- [Hooks and Processors](./05_hooks-and-processors.md)
