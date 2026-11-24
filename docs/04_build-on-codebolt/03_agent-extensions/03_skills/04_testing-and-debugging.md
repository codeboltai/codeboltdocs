---
sidebar_position: 4
title: Testing And Debugging
description: Check skill discovery, refresh the registry, and diagnose configuration errors.
---

# Testing And Debugging

## Testing workflow

1. Create the skill in your project (`.codebolt/capabilities/skill/<name>/`)
2. Call it from a test agent or via the API
3. Inspect the result and trace
4. Tighten the schema if the agent calls it incorrectly

## Validation rules

The capability registry validates skills on discovery. Understanding these rules helps debug why a skill might not appear:

| Check | Result if failed |
|---|---|
| Path does not exist | **Error** — skill excluded |
| Path is not a directory | **Error** — skill excluded |
| `capability.yaml`/`.yml` has unparseable YAML | **Error** — skill excluded |
| `capability.yaml` missing `name` field | **Warning** — directory name used as fallback |
| No `capability.yaml` found at all | **Warning** — directory name used as skill name, version defaults to `1.0.0` |
| `SKILL.md` frontmatter parse fails | Falls back to line-by-line manual parser |

Invalid capabilities are logged and excluded from the registry. Check server logs for `[CapabilityRegistry]` messages.

## Refreshing the registry

If your skill doesn't appear after creation, force a registry refresh:

```
POST /capability/refresh
```

After refreshing, query the running server for locally discovered skills.

```http
GET /capability/list?type=skill
```

## Debugging checklist

- **Skill not discovered?** Verify the directory is in a scanned location (see [Overview](./01_overview.md#how-skills-are-loaded)).
- **Name collision?** Skills are keyed by `type:name`. A project-level skill overrides a global one with the same name.
- **Config not loading?** Ensure `capability.yaml` is valid YAML. Test with `yaml.load()` or a YAML linter.
- **SKILL.md not parsed?** Check that frontmatter is between `---` delimiters. Quote descriptions containing a colon followed by a space. The discovery parser has a fallback, but the built-in executor parses the frontmatter as YAML when the skill runs.

## Quality checklist

- The name makes the intent obvious
- The description differentiates it from neighboring skills
- Required inputs are actually required
- Outputs are structured enough for downstream composition
- Failure messages are descriptive and recoverable

## Registry stats

Check overall registry health:

```
GET /capability/stats
```

Returns capability and executor counts to verify your skills are loaded.

Use [Testing and debugging](../../02_creating-agents/09_testing-and-debugging.md) when you need full trace/replay.
