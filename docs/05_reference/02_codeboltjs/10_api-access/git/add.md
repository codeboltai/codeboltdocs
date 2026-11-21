---
name: addAll
description: Adds changes in the local repository to the staging area at the given path.
cbbaseinfo:
  description: Adds changes in the local repository to the staging area at the given path.
data:
  name: addAll
  category: git
  link: add.md
---

# addAll

```text
codebolt.git.addAll(): Promise<AddResponse>
```

Adds changes in the local repository to the staging area at the given path.

## Returns

A promise that resolves with the response from the add event.

## When to use it

Use this when the whole working tree is ready to stage. Inspect status first because this operation stages changes across the repository.
