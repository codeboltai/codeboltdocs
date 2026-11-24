---
title: Custom Commands
sidebar_position: 5
description: Register a named command from a Codebolt plugin.
---

# Custom Commands

Register a command when your plugin starts. This example registers a text command and checks whether the server accepted it.

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async () => {
  const registration = await plugin.pluginCommands.registerCommand({
    name: 'project-status',
    title: 'Project status',
    description: 'Display a project status message.',
    run: { kind: 'text', text: 'Project tools are available.' },
  });
  if (!registration.success) throw new Error(registration.error || 'Registration failed');
});
```

Use `registerCommands([firstCommand, secondCommand])` to register several definitions together. Each definition needs a name. The `run` field selects its behavior, such as returning text, invoking a tool, or starting an action block.
