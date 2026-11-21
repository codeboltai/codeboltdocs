---
name: checkout
description: Checks out a branch or commit in the local repository at the given path.
cbbaseinfo:
  description: Checks out a branch or commit in the local repository at the given path.
data:
  name: checkout
  category: git
  link: checkout.md
---

# checkout

```text
codebolt.git.checkout(branch: string): Promise<GitCheckoutResponse>
```

Checks out a branch or commit in the local repository at the given path.

## Parameters

- `branch` — The name of the branch or commit to check out.

## Returns

A promise that resolves with the response from the checkout event.

## When to use it

Switch to a known branch before working on or reviewing it. Inspect pending changes before switching.
