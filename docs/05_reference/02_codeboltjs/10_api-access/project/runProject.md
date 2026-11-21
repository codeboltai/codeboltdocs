---
name: runProject
description: Sends the run-project event to Codebolt.
cbbaseinfo:
  description: Sends the run-project event to Codebolt.
data:
  name: runProject
  category: project
  link: runProject.md
---

# runProject

```text
codebolt.project.runProject(): void
```

Sends the run-project event to Codebolt. This method returns immediately.

## When to use it

Send a project run request to the connected application. Use the terminal API for commands whose output or exit status you need to inspect.
