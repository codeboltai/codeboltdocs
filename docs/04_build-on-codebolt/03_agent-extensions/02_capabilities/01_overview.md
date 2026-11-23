---
sidebar_position: 1
title: Capabilities
description: A capability is a versioned, self-contained unit of agent functionality in Codebolt's unified extensibility framework
---

# Capabilities

A **capability** is a versioned, self-contained unit of agent functionality in Codebolt's unified extensibility framework. Capabilities bundle prompts, skills, MCP tools, configuration, and optional hooks into a single installable package.

The system has two core concepts:

| Concept | Role |
|---------|------|
| **Capability** | Defines *what* to do — the logic, prompts, and configuration |
| **Executor** | Defines *how* to run a capability of a given type |

---

## Capability types

Every capability has a `type` field. The type system is **fully extensible** — any string is a valid type:

```ts
type CapabilityType = 'skill' | 'power' | 'talent' | string;
```

### Built-in types

Codebolt ships with three built-in types. These are **semantic categories** — the system treats all types identically at the execution level. The distinction helps developers organise capabilities by intent:

#### Skill

**Purpose:** Task-oriented capabilities that perform concrete actions.

Skills are the most common type. They represent focused, executable tasks like code generation, refactoring, file analysis, or test execution. A skill typically takes input parameters, does work, and returns a result.

```yaml
# capability.yaml
name: extract-component
type: skill
version: 1.0.0
description: Extract a React component into its own file
inputs:
  - name: filePath
    type: string
    required: true
    description: Path to the source file
  - name: componentName
    type: string
    required: true
    description: Name of the component to extract
outputs:
  - name: newFilePath
    type: string
    description: Path to the newly created component file
```

Skills are also discovered from external directories:
- `<project>/.claude/skills/` (Claude Code skills)
- `<project>/.agents/skills/` (Agent skills)
- `~/.gemini/antigravity/skills/` (Gemini skills)

**SDK usage:**
```ts
const skills = await codebolt.capability.listSkills();
const result = await codebolt.capability.startSkill('extract-component', {
  filePath: 'src/App.tsx',
  componentName: 'Header'
});
```

#### Power

**Purpose:** Extended agent abilities that augment what an agent can do.

Powers represent broader capabilities that enhance an agent's overall ability rather than performing a single task. Think of powers as agent-level enhancements — deep analysis, autonomous decision-making, multi-step workflows, or access to specialised external systems.

```yaml
# capability.yaml
name: deep-code-analysis
type: power
version: 1.0.0
description: Perform deep static analysis across the entire codebase
inputs:
  - name: scope
    type: string
    required: false
    description: Analysis scope (full, changed, or directory path)
    default: changed
outputs:
  - name: findings
    type: object
    description: Analysis findings with severity levels
```

**SDK usage:**
```ts
const powers = await codebolt.capability.listPowers();
const result = await codebolt.capability.startPower('deep-code-analysis', {
  scope: 'full'
});
```

#### Talent

**Purpose:** Specialised domain knowledge or behaviour.

Talents represent domain expertise — knowledge about specific frameworks, languages, architectures, or business domains. A talent makes an agent smarter about a particular area rather than giving it a new action to perform.

```yaml
# capability.yaml
name: react-patterns
type: talent
version: 1.0.0
description: Knowledge of React best practices, hooks patterns, and performance optimization
inputs:
  - name: context
    type: string
    required: false
    description: Additional context about the codebase
outputs:
  - name: recommendations
    type: object
    description: Pattern recommendations and suggestions
```

**SDK usage:**
```ts
const talents = await codebolt.capability.listTalents();
const result = await codebolt.capability.startTalent('react-patterns', {
  context: 'Converting class components to hooks'
});
```

### Custom types

The type system accepts any string, so you can define your own types:

```yaml
# A custom type
name: my-pipeline
type: pipeline
version: 1.0.0
description: CI/CD pipeline capability
```

Custom types work exactly like built-in types. You need an executor with `supportedTypes` that includes your custom type.

### How types are used

Types serve three purposes in the system:

| Purpose | How |
|---------|-----|
| **Organisation** | Capabilities are stored in type-specific directories (`.codebolt/capabilities/skill/`, `.codebolt/capabilities/power/`, etc.) |
| **Filtering** | List or search capabilities by type via API or SDK (`listCapabilitiesByType('skill')`) |
| **Executor routing** | The type determines which executor runs the capability. Each executor declares `supportedTypes: ['skill', 'power']` |

Types do **not** affect:
- How the capability is executed (all types use the same execution pipeline)
- What APIs are available to the capability
- Validation or security rules
- How results are returned

---

## Source levels and priority

Capabilities are discovered from multiple locations. When the same capability name and type exist at more than one level, the higher-priority source wins:

| Priority | Source | Path |
|----------|--------|------|
| 1 (highest) | Project | `<project>/.codebolt/capabilities/<type>/` |
| 2 | Global | `~/.codebolt/capabilities/<type>/` |
| 3 (lowest) | Built-in | `<appRoot>/.codebolt/capabilities/<type>/` |

Skills are also discovered from external skill folders:

- `<project>/.claude/skills/`
- `<project>/.agents/skills/`
- `~/.gemini/antigravity/skills/`

---

## How it works

1. The **CapabilityRegistry** scans all source directories on initialisation and builds an in-memory registry of capabilities and executors.
2. When an agent calls `startCapability()`, the **CapabilityManager** locates the correct executor for the capability's type.
3. The executor runs via **SideExecutionManager** in the same thread as the parent agent, with full access to the conversation context.
4. Results and events are emitted in real time over WebSocket.

---

## Using capabilities from an agent

Agents interact with capabilities through the **Codebolt JS SDK** (`codeboltjs`):

```ts
import codebolt from '@codebolt/codeboltjs';

// List available skills
const skills = await codebolt.capability.listSkills();

// Start a skill with parameters
const result = await codebolt.capability.startSkill(
  'extract-component',
  { file: 'src/App.tsx' }
);

// Start any capability by name and type
const result = await codebolt.capability.startCapability(
  'frontend-refactor',
  'skill',
  { file: 'src/App.tsx' },
  30000  // timeout (optional)
);

// Check execution status or stop
const status = await codebolt.capability.getExecutionStatus(result.executionId);
await codebolt.capability.stopCapability(result.executionId);
```

The SDK also provides convenience methods: `startSkill()`, `startPower()`, `startTalent()`, `listPowers()`, `listTalents()`, and filtering by tag or author. See the [API Reference](./04_bundling-skills-and-tools.md#codebolt-js-sdk) for the full SDK documentation.

---

## In this section

- [Structure and Schema](./02_structure-and-schema.md) — directory layout, `capability.yaml`, `executor.yaml`
- [Execution Flow](./03_activation.mdx) — lifecycle, statuses, thread context, error handling
- [API Reference](./04_bundling-skills-and-tools.md) — REST endpoints, WebSocket events, CLI actions, SDK
- [Marketplace and Publishing](./05_publishing.md) — browsing, installing, creating, publishing
- [Capability Executors](./06_executors.mdx) — what executors are, how they work, how to write one

## See also

- [Skills](../03_skills/01_overview.md)
- [MCP Tools](../04_mcp-tools/01_overview.md)
- [Side Execution](../07_side-execution.md)
- [Agent Extensions Overview](../01_overview.md)
