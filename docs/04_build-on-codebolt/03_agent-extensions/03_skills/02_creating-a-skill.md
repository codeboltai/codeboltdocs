---
sidebar_position: 2
title: Creating A Skill
description: Create a skill from a Marketplace template or add SKILL.md to a project.
---

# Creating a Skill

## Creating from the Codebolt UI

1. Open **Marketplace**, select **Skill**, and click **Create Skill** (the plus button).
2. Select an available template, enter a **Name** and **Target Path**, then click **Create skill**. You can also set a unique ID and description.
3. Open the directory shown in the success message. Edit `SKILL.md` to describe what the agent should do. If the template did not create this file, add it.

## Creating via API

Create a skill programmatically using the REST API:

```
POST /capability/create
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

Add `SKILL.md` beside the generated files. The built-in executor reads this file when an agent invokes the skill.

## Creating manually

You can also create a skill by hand — just create the directory and config file in one of the [discovery locations](./01_overview.md#how-skills-are-loaded):

1. Create a directory: `.codebolt/capabilities/skill/<skill-name>/`
2. Add a `SKILL.md` with a name, description, and instructions.
3. Optionally add `capability.yaml` for registry metadata.
4. Refresh the registry: `POST /capability/refresh`

## Configuration formats

### Registry metadata in `capability.yaml`

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

### Instructions in `SKILL.md`

Place this file in the skill directory. Codebolt also discovers skills in `.claude/skills/`, `.agents/skills/`, or `~/.gemini/antigravity/skills/` directories. Each skill is a subdirectory containing a `SKILL.md` file.

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

Refactor $ARGUMENTS. Explain the pattern you applied and summarize the changes.
```

**Fallback behavior:** If the YAML parser fails (e.g., description contains `: `), a line-by-line fallback parser handles simple `key: value` pairs.

## Directory structure examples

**Standard capability path:**
```
<project>/.codebolt/capabilities/skill/
├── refactor-to-pattern/
│   ├── capability.yaml
│   └── SKILL.md
└── generate-tests/
    ├── capability.yaml
    └── SKILL.md
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
- Put the steps the agent should follow in the body of `SKILL.md`.
- If a `capability.yaml` exists alongside a `SKILL.md`, the YAML config takes precedence but missing fields fall back to the frontmatter.
