---
sidebar_position: 1
title: Guardrails
description: How Codebolt keeps a single agent run from going off the rails
---

import GuardrailFlow from '@site/src/components/diagrams/GuardrailFlow';

# Guardrails

How Codebolt keeps a *single* agent run from going off the rails. Guardrails are the runtime half of agent quality — they catch bad actions as they're about to happen, before any damage is done. The offline counterpart is [Evals and Optimization](./02_evals-and-optimization.md), which measures and improves the agent across many runs.

<GuardrailFlow />

## What a guardrail is

A **guardrail** is a rule enforced at a specific phase of the agent loop. Every guardrail sits on a named hook point — `before_tool_call`, `before_llm_call`, `before_finalize`, `on_error` — and inspects what the agent is about to do. It then returns one of four verdicts:

- **Allow** — proceed as-is
- **Rewrite** — proceed, but with the arguments modified (e.g. a path clamped, a secret scrubbed)
- **Deny** — stop the action and surface a reason to the agent
- **Pause for human** — halt and wait for manual approval

Guardrails are implemented as hooks (see [Hooks and Processors](../04_runtime/01_hooks-and-processors.md)) and share the same execution model. The "guardrail" label is about *intent*: a guardrail hook exists to enforce a constraint, not just to observe.

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

  - name: scope-edits-to-src
    phase: before_tool_call
    match: { tool: codebolt_fs.write }
    when: { path_outside: ["src/", "tests/"] }
    verdict: deny
```

When declarative isn't enough — logic, external lookups, dynamic scope — drop down to a programmatic hook:

```ts
export default {
  phase: "before_tool_call",
  match: { tool: "codebolt_terminal.exec" },
  handler: async (ctx) => {
    if (/rm\s+-rf\s+\//.test(ctx.args.command)) {
      return { verdict: "deny", reason: "Catastrophic command blocked." };
    }
    return { verdict: "allow" };
  },
};
```

Same four-verdict contract. The runtime doesn't care how the guardrail is implemented.

## Common guardrails

Most projects use some combination of these:

| Guardrail | Catches | Typical verdict |
|---|---|---|
| **Tool allowlist** | Agent calling a tool it wasn't granted | deny |
| **Path scope** | File edits outside allowed directories | deny / rewrite |
| **Protected branches** | Commits or pushes to `main` / `release/*` | deny / pause |
| **Budget caps** | Run exceeding max tool calls, wall time, or tokens | deny (terminal) |
| **Loop detection** | Same tool with same args N times in a row | deny |
| **Secret redaction** | Credentials, tokens, PII in outgoing LLM prompts | rewrite |
| **Rate limits** | Expensive tools invoked too frequently | pause |
| **Destructive-command filter** | `rm -rf`, `DROP TABLE`, `git push --force` | deny / pause |
| **Outbound network scope** | HTTP calls to hosts not on an allowlist | deny |

None of these are hypothetical — all ship as either defaults or examples.

## Why `rewrite` matters

Most people think of guardrails as deny-or-nothing, but the rewrite verdict is often the quietest and most useful. Examples:

- **Secret redaction.** The agent puts an API key in a prompt. A `before_llm_call` guardrail rewrites the prompt to replace the key with `<REDACTED>`. The agent doesn't even know it happened.
- **Path clamping.** The agent tries to write to `../other-project/file.ts`. A guardrail rewrites the path to the project root and lets the write proceed, silently keeping the agent inside its scope.
- **Argument normalization.** Trimmed whitespace, canonicalized URLs, normalized line endings — all cheaper as a rewrite than as a deny-and-retry loop.

Rewrites keep the agent moving while still enforcing the invariant.

## `pause for human` — the escape hatch

Some actions are too important to decide automatically but too common to ban outright. For those, the verdict is `pause for human`: the run stops, the proposed action surfaces in the UI (or via the CLI / an API), and a person approves or rejects.

Typical uses:
- First-ever production deploy
- Schema-breaking database migrations
- Destructive shell commands when the agent's reasoning is uncertain
- Any commit to a protected branch

The pause is recorded in the event log like any other decision; approvals and rejections become training signal for future eval runs.

## Guardrails vs. permissions

A guardrail and a permission check look similar but serve different purposes:

- **Permissions** live in the manifest and gate *what the agent can ever attempt*. If a tool isn't in the allowlist, the agent can't even propose it. This is design-time.
- **Guardrails** gate *what the agent does right now* based on runtime context. The allowed tool `codebolt_terminal.exec` can still be denied for a specific command, on a specific branch, in a specific project phase.

Permissions are a coarse fence; guardrails are a fine filter. You want both.

## Budget limits

A special class of guardrail worth calling out: budgets. Set on the agent manifest, enforced by the runtime:

```yaml
limits:
  max_tool_calls: 40
  max_wall_time_seconds: 600
  max_tokens_in: 150000
  max_tokens_out: 20000
```

When a budget trips, the run ends with status `budget_exhausted`. No partial output is discarded — the event log captures everything up to that point, so the partial work is still inspectable and can feed into the next attempt.

Budgets are your last line of defence against a runaway loop that somehow slipped past loop-detection.

## Where guardrails fit in the planes

Guardrails are the entire purpose of the [**guardrails plane**](../02_foundation/01_architecture.md) in Codebolt's five-plane architecture. Every action the executive plane proposes passes through the guardrails plane before it touches the bus & storage plane. No bypass.

## What guardrails are *not*

- **Not a substitute for evals.** Guardrails catch individual bad actions; they can't tell you if the agent's *overall* behaviour is getting better or worse. That's what [Evals and Optimization](./02_evals-and-optimization.md) is for.
- **Not a substitute for guardrail-aware prompts.** A well-prompted agent rarely triggers deny verdicts. Guardrails are the safety net, not the primary control.
- **Not free.** Every hook adds latency. Keep them cheap and declarative when you can.

## See also

- [Evals and Optimization](./02_evals-and-optimization.md) — the offline counterpart
- [Hooks and Processors](../04_runtime/01_hooks-and-processors.md) — the underlying mechanism
- [Guardrails and Eval subsystem (internals)](../../04_build-on-codebolt/07b_subsystems/09_guardrails-and-eval.md)
- [Hooks overview (build)](../../04_build-on-codebolt/05_plugins/01_overview.md)
