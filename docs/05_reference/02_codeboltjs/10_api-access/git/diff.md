---
name: diff
description: Retrieves the diff of changes for a specific commit in the local repository.
cbbaseinfo:
  description: Retrieves the diff of changes for a specific commit in the local repository.
data:
  name: diff
  category: git
  link: diff.md
---

# diff

```text
codebolt.git.diff(commitHash: string): Promise<GitDiffResponse>
```

Retrieves the diff of changes for a specific commit in the local repository.

## Parameters

- `commitHash` — The hash of the commit to retrieve the diff for.

## Returns

A promise that resolves with the response from the diff event.

## When to use it

Inspect what changed for a specific commit when reviewing a change or investigating when a behavior was introduced.
