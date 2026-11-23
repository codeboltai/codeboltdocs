---
sidebar_position: 2
title: Structure and Schema
description: "Capabilities and executors live inside a .codebolt/capabilities/ directory at each source level:"
---

# Structure and Schema

## Directory layout

Capabilities and executors live inside a `.codebolt/capabilities/` directory at each source level:

```text
.codebolt/
  capabilities/
    skill/                        # type subdirectory
      my-skill/
        capability.yaml           # required config
        index.js                  # implementation
        SKILL.md                  # optional — YAML frontmatter + markdown
    power/
      my-power/
        capability.yaml
        index.js
    talent/
      my-talent/
        capability.yaml
        index.js
    executors/
      my-executor/
        executor.yaml             # required config
        dist/
          index.js                # entry point
```

Each capability type gets its own subdirectory. Individual capabilities are sub-folders within the type directory.

### Source-level paths

| Source | Capabilities path | Executors path |
|--------|-------------------|----------------|
| Built-in | `<appRoot>/.codebolt/capabilities/<type>/` | `<appRoot>/.codebolt/capabilities/executors/` |
| Global | `~/.codebolt/capabilities/<type>/` | `~/.codebolt/capabilities/executors/` |
| Project | `<project>/.codebolt/capabilities/<type>/` | `<project>/.codebolt/capabilities/executors/` |

### External skills folders

Skills are also discovered from these paths (treated as `type: skill`, `source: project`):

```text
<project>/.claude/skills/<skill-name>/SKILL.md
<project>/.agents/skills/<skill-name>/SKILL.md
~/.gemini/antigravity/skills/<skill-name>/SKILL.md
```

---

## capability.yaml

The configuration file for a capability. Both `.yaml` and `.yml` extensions are accepted.

```yaml
name: frontend-refactor           # required — unique name
type: skill                       # required — capability type
version: 1.0.0                    # semver (default: 1.0.0)
description: Refactor React components to team conventions
author: acme-team
tags:
  - react
  - refactoring
inputs:
  - name: file
    type: string
    required: true
    description: Path to the file to refactor
    default: null
  - name: dryRun
    type: boolean
    required: false
    description: Preview changes without writing
    default: false
outputs:
  - name: changedFiles
    type: string[]
    description: List of files that were modified
```

### Field reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Unique capability name |
| `type` | string | yes | Capability type (`skill`, `power`, `talent`, or custom) |
| `version` | string | no | Semver string (default `1.0.0`) |
| `description` | string | no | Human-readable description |
| `author` | string | no | Author name |
| `tags` | string[] | no | Tags for filtering and discovery |
| `inputs` | InputDef[] | no | Input parameter definitions |
| `outputs` | OutputDef[] | no | Output definitions |

**InputDef fields:** `name` (string), `type` (string), `required` (boolean), `description` (string), `default` (any)

**OutputDef fields:** `name` (string), `type` (string), `description` (string)

---

## executor.yaml

The configuration file for an executor. Both `.yaml` and `.yml` extensions are accepted.

```yaml
name: skill-executor              # required — unique name
version: 1.0.0
description: Executes skill-type capabilities
supportedTypes:                   # required — at least one type
  - skill
entryPoint: dist/index.js         # default: dist/index.js
author: codebolt
```

### Field reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Unique executor name |
| `version` | string | no | Semver string (default `1.0.0`) |
| `description` | string | no | Human-readable description |
| `supportedTypes` | string[] | yes | Capability types this executor can handle |
| `entryPoint` | string | no | Main JS file (default `dist/index.js`) |
| `author` | string | no | Author name |

---

## SKILL.md format

For skills discovered from `.claude/skills`, `.agents/skills`, or `~/.gemini/antigravity/skills`, the configuration comes from YAML frontmatter in a `SKILL.md` file:

```markdown
---
name: extract-component
version: 1.0.0
description: Extract a React component into its own file
tags: [react, refactoring]
---

Additional description in markdown body.
If the frontmatter has no `description` field, the markdown body is used.
```

The frontmatter parser handles YAML with a fallback to line-by-line parsing when values contain characters that break standard YAML parsing (like `: ` in descriptions).

---

## Validation rules

### Capability validation

A capability directory is **valid** if:
- The path exists and is a directory
- If `capability.yaml` exists, it can be parsed without errors

Warnings (non-blocking):
- `capability.yaml` is missing the `name` field (directory name is used as fallback)
- No `capability.yaml` found (directory name and defaults are used)

### Executor validation

An executor directory is **valid** if:
- The path exists and is a directory
- `executor.yaml` exists and can be parsed
- `executor.yaml` has a `name` field
- `executor.yaml` has at least one entry in `supportedTypes`

Warnings (non-blocking):
- `entryPoint` is missing (defaults to `dist/index.js`)
- Entry point file does not exist yet (may need to be built)

---

## Registry discovery process

On initialisation, the `CapabilityRegistry`:

1. Creates directory structures at global and project levels if they don't exist
2. Registers built-in executors from `<appRoot>/.codebolt/capabilities/executors/`
3. Scans for capabilities in order: built-in → global → project (later sources override earlier ones)
4. Scans for skills from `.claude/skills`, `.agents/skills`, `~/.gemini/antigravity/skills`
5. Scans for executors: global → project (project overrides global; built-in preserved unless overridden)
6. Builds a type-to-executor mapping for runtime lookup

Calling `refresh()` re-runs steps 2–5 without reinitialising.

## See also

- [Execution Flow](./03_activation.mdx)
- [API Reference](./04_bundling-skills-and-tools.md)
