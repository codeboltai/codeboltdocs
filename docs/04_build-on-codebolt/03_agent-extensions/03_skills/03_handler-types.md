---
sidebar_position: 3
title: How Skills Run
description: How the built-in skill executor loads SKILL.md and prepares instructions for an agent.
---

# How Skills Run

When an agent starts a skill, Codebolt looks up the skill by name and selects the registered executor for the `skill` capability type. The built-in executor reads the instructions from the skill’s `SKILL.md` file and returns a prompt for the agent. You can change what the skill asks the agent to do by editing that file.

## Pass arguments to a skill

For a skill named `review-change`, put these instructions in `SKILL.md`:

```markdown
---
name: review-change
description: Review a proposed change for compatibility issues.
---

Review $ARGUMENTS. Identify any compatibility issues and explain who would be affected.
```

Start it from an agent:

```ts
import codebolt from '@codebolt/codeboltjs';

const response = await codebolt.capability.startSkill('review-change', {
  arguments: 'the changes in src/settings.ts',
});
```

The executor replaces `$ARGUMENTS` with `the changes in src/settings.ts`, adds the skill’s base directory to the prompt, and returns the prepared instructions. If the executor cannot find `SKILL.md`, it reports the paths it searched.

See [Creating a skill](./02_creating-a-skill.md) for the project layout and [Executors](../02_capabilities/06_executors.mdx) for custom executor development.
