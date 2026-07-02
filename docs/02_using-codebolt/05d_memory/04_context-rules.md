---
sidebar_position: 4
title: Context Rules
description: Context rules give you declarative control over what gets included in — or excluded from — the assembled context window. They live in
---

# Context Rules

Context rules give you declarative control over what gets included in — or excluded from — the assembled context window. They live in `.codebolt/ContextRuleEngine/` as JSON files and are evaluated every turn before memory retrieval begins.

## Rule structure

A rule is a condition → action pair:

```json
{
  "name": "include-architecture-on-refactor",
  "condition": {
    "field": "task.text",
    "op": "contains",
    "value": "refactor"
  },
  "action": {
    "include": "markdown://architecture-decisions"
  }
}
```

If the condition matches, the action fires. Rules are evaluated in the order they appear in the file; the first matching rule for a given memory reference wins.

## Condition operators

| Operator | Matches when… |
|---|---|
| `contains` | Field string contains the value (case-insensitive) |
| `startsWith` | Field string starts with the value |
| `endsWith` | Field string ends with the value |
| `matches` | Field matches a regular expression |
| `equals` | Field equals the value exactly |
| `not_equals` | Field does not equal the value |
| `in` | Field value is one of a set |
| `not_in` | Field value is not in a set |
| `gt` | Field numeric value is greater than |
| `lt` | Field numeric value is less than |
| `gte` | Field numeric value is greater than or equal |
| `lte` | Field numeric value is less than or equal |
| `exists` | Field is present and non-null |

Multiple conditions in one rule combine with AND logic — all must match for the rule to fire.

```json
{
  "condition": [
    { "field": "task.text", "op": "contains", "value": "payment" },
    { "field": "task.text", "op": "not_contains", "value": "refund" }
  ],
  "action": { "include": "vector://payment-architecture" }
}
```

## Condition fields

| Field path | What it refers to |
|---|---|
| `task.text` | The current user message / task description |
| `task.type` | Task type if set (`bug`, `feature`, `refactor`, etc.) |
| `agent.name` | The name of the running agent |
| `project.name` | The current project name |
| `session.turnCount` | How many turns have elapsed this session |
| `memory.source` | The memory source being evaluated (for per-source cap rules) |

## Action types

### include

Adds a memory reference to the assembly regardless of whether a retrieval pipeline would have fetched it:

```json
{ "action": { "include": "kv://user-preferences" } }
{ "action": { "include": "markdown://coding-standards" } }
{ "action": { "include": "json://project-config" } }
```

### exclude

Suppresses a memory reference even if a retrieval pipeline returns it:

```json
{ "action": { "exclude": "vector://test-history" } }
```

Useful when a source is relevant in general but noisy for a specific task type.

### cap

Limits how many tokens a source can contribute to the context window:

```json
{
  "condition": { "field": "task.text", "op": "contains", "value": "quick question" },
  "action": { "cap": { "source": "vector://", "tokens": 512 } }
}
```

### setPriority

Moves a section's effective priority up or down relative to the default order:

```json
{ "action": { "setPriority": { "section": "history", "value": "high" } } }
```

## Rule files

Rules can be split across multiple files in `.codebolt/ContextRuleEngine/`. Files are loaded alphabetically and concatenated before evaluation. Naming files with numeric prefixes gives you explicit ordering:

```
.codebolt/ContextRuleEngine/
  01_base-rules.json
  02_project-rules.json
  03_agent-overrides.json
```

## Common patterns

### Always include a style guide

```json
{
  "name": "always-style-guide",
  "condition": { "field": "task.text", "op": "exists" },
  "action": { "include": "markdown://style-guide" }
}
```

### Suppress test files during production refactors

```json
{
  "name": "suppress-tests-on-refactor",
  "condition": [
    { "field": "task.text", "op": "contains", "value": "refactor" },
    { "field": "task.text", "op": "not_contains", "value": "test" }
  ],
  "action": { "exclude": "vector://test-suite-history" }
}
```

### Limit history on quick questions

```json
{
  "name": "short-history-for-quick-questions",
  "condition": { "field": "task.type", "op": "equals", "value": "question" },
  "action": { "cap": { "section": "history", "tokens": 1000 } }
}
```

### Inject agent-specific context

```json
{
  "name": "code-agent-context",
  "condition": { "field": "agent.name", "op": "equals", "value": "code-agent" },
  "action": { "include": "json://code-agent-config" }
}
```

## Testing rules

Rules are evaluated on every turn. To verify a rule is firing:

1. Open the **assembly trace** panel in the Codebolt UI after a turn
2. Look for the `contextRules` section — it lists which rules matched and what action each took
3. Check the `included` and `excluded` lists to confirm the expected memory references are present

## See also

- [Context assembly](./03_context-assembly.md) — where rules fit in the pipeline
- [Persistent memory](./05_persistent-memory.md) — defining what gets retrieved before rules apply
