---
sidebar_position: 3
title: Tool Schema
description: "The contract between your tool and the LLM. A tool schema has four parts: name, description, input schema, and output shape"
---

# Tool Schema

The contract between your tool and the LLM. A tool schema has four parts: **name**, **description**, **input schema**, and **output shape**. Getting each right is the difference between a tool the agent uses correctly and one it ignores or misuses.

## The four parts

### 1. Name

Namespaced, underscore-separated, lowercase. Pattern: `<server>.<tool>` (MCP) or `<family>_<tool>` (Codebolt built-in).

Good: `greet.hello`, `stripe.create_charge`, `codebolt_fs.read_file`
Bad: `doThing`, `tool1`, `helper`

The server prefix prevents name collisions when multiple tools are installed. Within your server, use short, verb-led names: `search`, `fetch`, `analyze`, not `perform_search_operation`.

**Naming convention for local tools:** Local project tools (from `.codebolt/tools/`) use the `uniqueName` from `codebolttool.yaml` as the server prefix. Built-in Codebolt tools are prefixed with `codebolt--` internally.

### 2. Description

The single most important thing about a tool. The LLM decides whether to call your tool based on this string. Bad descriptions → wrong tool choices → bad agent behaviour.

A good description answers three questions:

1. **What does this tool do?** In one sentence.
2. **When should the LLM call it?** What situation?
3. **When should the LLM NOT call it?** Where does it get confused with other tools?

Example:

```
Read the full contents of a single file from the project. Use when
you already know the exact path and need the full contents. Do not
use this to search for text — use codebolt_fs.search for that. Do
not use for files larger than 1000 lines — use
codebolt_fs.read_many_files instead, which handles streaming.
```

That's three sentences. Each one does work: the first states the action, the second is the trigger, the third is the negative condition that steers the LLM away from misuse.

**Rules of thumb:**

- **Specific verbs.** "Fetch the latest price" > "Get data".
- **Contrast with siblings.** If you have `search` and `read_file`, each description should reference the other so the LLM knows the split.
- **Mention preconditions.** "Only works for US-listed equities" — tells the LLM when to try a different approach.
- **Keep it short.** 2-4 sentences. Long descriptions bury the useful bits.

### 3. Input schema

JSON Schema. The LLM reads this to construct its tool call.

Minimal:

```json
{
  "type": "object",
  "properties": {
    "symbol": { "type": "string" }
  },
  "required": ["symbol"]
}
```

Good:

```json
{
  "type": "object",
  "properties": {
    "symbol": {
      "type": "string",
      "description": "A stock ticker symbol (e.g. AAPL, MSFT). Must be uppercase. US equities only.",
      "pattern": "^[A-Z]{1,5}$",
      "examples": ["AAPL", "MSFT"]
    },
    "include_history": {
      "type": "boolean",
      "description": "Include a 30-day price history in the response. Default false.",
      "default": false
    }
  },
  "required": ["symbol"]
}
```

Notice what the good version adds:

- **Per-field descriptions** explaining what the field is and constraints.
- **Patterns / enums** where the value is constrained.
- **Examples** so the LLM has a concrete anchor.
- **Defaults** for optional fields.
- **Explicit `required`** — don't rely on implicit behaviour.

### 4. Output shape

Not formally part of the MCP schema (MCP tools return content arrays), but in practice the LLM needs to know what to expect. Document the output shape in the description or examples:

```
Returns an object with:
  - price: current price in USD
  - timestamp: ISO timestamp of the quote
  - change_percent: percentage change from yesterday's close
  - history: array of daily closes (only if include_history was true)
```

For tools that return data the LLM will read as text, structure matters. `{"price": 178.23, "currency": "USD"}` is easier for the LLM to parse than `"Price: $178.23"`.

## Schema patterns for common shapes

### Enum choice

```json
{
  "style": {
    "type": "string",
    "enum": ["formal", "casual", "technical"],
    "description": "Tone of the response.",
    "default": "casual"
  }
}
```

### Optional with default

```json
{
  "limit": {
    "type": "integer",
    "description": "Max items to return.",
    "minimum": 1,
    "maximum": 100,
    "default": 20
  }
}
```

### Array of strings

```json
{
  "tags": {
    "type": "array",
    "items": { "type": "string" },
    "description": "Filter results to items matching any of these tags.",
    "minItems": 1,
    "maxItems": 10
  }
}
```

### Path with constraints

```json
{
  "path": {
    "type": "string",
    "description": "Path relative to the project root. Must not start with / or ../",
    "pattern": "^[^/].*$"
  }
}
```

### One-of alternatives

```json
{
  "oneOf": [
    {
      "properties": {
        "id": { "type": "string" }
      },
      "required": ["id"]
    },
    {
      "properties": {
        "query": { "type": "string" }
      },
      "required": ["query"]
    }
  ]
}
```

Use for "either give me an ID or a search query" cases. The LLM handles `oneOf` reasonably well in practice.

## What NOT to put in a schema

- **Sensitive info as examples.** Real API keys, real user data, real PII.
- **Huge description blocks.** If your description is a paragraph, rewrite it as three sentences.
- **Vague types.** Prefer `string` with a pattern over a catch-all `any`.
- **Fields the LLM can't realistically know.** A `request_id: uuid` field the LLM is supposed to invent is confusing. Generate it server-side.

## Steering the LLM with descriptions

You can customize tool descriptions per-agent without changing the tool itself:

```yaml
# in the agent's UnifiedAgent config
toolDescriptions: {
  "codebolt_fs.read_file": "Read a file. For this agent, ONLY read files under src/. Never touch config/ or secrets/.",
}
```

This is one of the most underused levers in Codebolt. A generalist tool can be given agent-specific guidance that reshapes its behaviour without forking.

## Testing schemas

Two failure modes to test for:

1. **The LLM can produce valid arguments.** Open a test run and see if the agent uses the tool correctly. If it passes wrong shapes, your schema isn't clear enough.

2. **The LLM reaches for the tool at appropriate times.** Send prompts that should trigger the tool and verify it does. Send prompts that shouldn't and verify it doesn't.

For automated testing, record traces where the tool is used correctly and replay them.

## Evolving a schema

Breaking changes to a schema break consumers. Rules:

- **Adding an optional field** — safe, minor version.
- **Adding a required field** — breaking, major version.
- **Removing a field** — breaking, major version.
- **Renaming a field** — breaking. Accept both for a deprecation period.
- **Changing a field's type** — breaking.
- **Tightening a constraint** (e.g. adding a max length) — potentially breaking. Major.
- **Loosening a constraint** — safe, minor.
- **Changing the description** — safe, patch.

For tool families you maintain over time, version them: `greet.v2.hello` alongside `greet.hello` during migration. Document the migration path.

## See also

- [Parameter validation](./03_tool-schema.md)
- [Error handling](./06_error-handling.md)
- [Custom Tools Overview](./01_overview.md)
- [Built-in Tools](../../../02_using-codebolt/04b_agent-extensions/07_custom-tools.md#built-in-tools) — examples of good schemas
