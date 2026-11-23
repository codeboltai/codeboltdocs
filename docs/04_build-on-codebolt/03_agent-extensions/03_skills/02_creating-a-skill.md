---
sidebar_position: 2
title: Creating A Skill
description: The Codebolt desktop app provides a Capability Panel where you can browse and manage skills
---

# Creating A Skill

## Creating from the Codebolt UI

The Codebolt desktop app provides a **Capability Panel** where you can browse and manage skills. To access it, open **Settings → Extensions** or use the Capability Panel in the sidebar.

From the UI you can:
- **Browse installed skills** — the Installed tab lists all locally discovered capabilities with type badges and source indicators
- **Install from the marketplace** — the Marketplace tab lets you search, filter, and install published skills directly (see [The Marketplace](../../../02_using-codebolt/04_agents/04_the-marketplace.md))
- **Manage extensions** — enable/disable installed extensions from the Extensions panel (see [App and Project Settings](../../../02_using-codebolt/02_surfaces/02_desktop-app/Settings/02_app-and-project-settings.md))

There is no visual skill builder in the UI — to create a new skill from scratch, use the API or manual method below.

## Creating via API

Create a skill programmatically using the REST API:

```
POST /api/capability/create
```

With a JSON body matching the `CapabilityConfig` schema:

```json
{
  "name": "refactor-to-pattern",
  "type": "skill",
  "version": "1.0.0",
  "description": "Refactor a file to a named code pattern",
  "author": "your-name",
  "tags": ["refactoring", "patterns"],
  "inputs": [
    { "name": "file", "type": "string", "required": true, "description": "Path to the file" }
  ],
  "outputs": [
    { "name": "diff", "type": "string", "description": "The generated diff" }
  ]
}
```

This creates a directory under `.codebolt/capabilities/skill/<name>/` containing:

```
.codebolt/capabilities/skill/refactor-to-pattern/
├── capability.yaml
└── index.js          # placeholder with execute() stub
```

## Creating manually

You can also create a skill by hand — just create the directory and config file in one of the [discovery locations](./01_overview.md#how-skills-are-loaded):

1. Create a directory: `.codebolt/capabilities/skill/<skill-name>/`
2. Add a `capability.yaml` (see format below)
3. Add your handler code (e.g., `index.js`)
4. Refresh the registry: `POST /api/capability/refresh`

## Configuration formats

### `capability.yaml` (primary)

Used for skills in `.codebolt/capabilities/skill/` directories. This is the full-featured format.

```yaml
name: refactor-to-pattern
type: skill
version: 1.0.0
description: Refactor a file so it follows a named code pattern
author: your-name
tags: [refactoring, patterns]
inputs:
  - name: file
    type: string
    required: true
    description: Path to the file to refactor
  - name: pattern
    type: string
    required: true
    description: Target pattern name
outputs:
  - name: diff
    type: string
    description: The generated diff
  - name: summary
    type: string
    description: Human-readable summary
```

**Required fields:** `name`, `type`, `version`, `description`

**Optional fields:** `author`, `tags`, `inputs`, `outputs`

Each input supports: `name`, `type`, `required`, `description`, `default`.

Each output supports: `name`, `type`, `description`.

Both `capability.yaml` and `capability.yml` extensions are recognized.

### `SKILL.md` (alternative)

Used for skills in `.claude/skills/`, `.agents/skills/`, or `~/.gemini/antigravity/skills/` directories. Each skill is a subdirectory containing a `SKILL.md` file.

```
.claude/skills/refactor-to-pattern/
└── SKILL.md
```

The file uses YAML frontmatter:

```markdown
---
name: refactor-to-pattern
version: 1.0.0
description: Refactor a file to a named code pattern
tags: [refactoring, patterns]
---

Extended description goes here. If the `description` field is missing
from frontmatter, the markdown body is used as the description instead.
```

**Fallback behavior:** If the YAML parser fails (e.g., description contains `: `), a line-by-line fallback parser handles simple `key: value` pairs.

## Directory structure examples

**Standard capability path:**
```
<project>/.codebolt/capabilities/skill/
├── refactor-to-pattern/
│   ├── capability.yaml
│   └── index.js
└── generate-tests/
    ├── capability.yaml
    └── index.js
```

**SKILL.md path:**
```
<project>/.claude/skills/
├── refactor-to-pattern/
│   └── SKILL.md
└── generate-tests/
    └── SKILL.md
```

## Best practices

- Design the schema first. Most bad skills fail because the name is vague or the input/output contract is weak.
- Use `capability.yaml` when you need typed inputs/outputs for downstream composition.
- Use `SKILL.md` for lightweight skills where a description is sufficient.
- If a `capability.yaml` exists alongside a `SKILL.md`, the YAML config takes precedence but missing fields fall back to the frontmatter.
