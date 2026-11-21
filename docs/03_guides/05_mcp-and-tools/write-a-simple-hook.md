---
sidebar_position: 3
title: Write a Simple Hook
description: Create and test a JSON hook from the desktop Hooks panel.
---

# Write a Simple Hook

Create a hook that returns a message after a tool call. This example uses the `node` executable, which must be on the CodeBolt runtime's PATH.

## Create the hook

Save the following JSON as `.codebolt/hooks/tool-finished.hook` in the project.

```json
{
  "name": "Tool finished",
  "enabled": true,
  "event": "postToolUse",
  "handler": {
    "type": "command",
    "command": "node",
    "args": [
      "-e",
      "console.log(JSON.stringify({systemMessage: 'Tool hook ran'}))"
    ]
  }
}
```

Reopen the project to load the file, then open **Agents → Hooks** in the desktop bottom bar. You can also create the same hook with **New Hook** in the panel.

## Test the handler

Find **Tool finished** in the list. Click **Test**, then **Run** with the sample input. **HookOutput** should contain the message `Tool hook ran`.

To exercise the event path, ask an agent to read a file. After the tool finishes, open **History** in the Hooks panel and look for the `postToolUse` invocation. Add a tool-name matcher if you want the hook to run for specific tools.

See [Hooks](../../02_using-codebolt/08d_auto-interactivity/04_hooks.md) for supported events and handlers.
