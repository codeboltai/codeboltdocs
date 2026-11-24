---
sidebar_position: 5
title: Publish a capability
description: Publish a capability from Codebolt Marketplace or the CLI.
---

# Publish a capability

Keep your runtime `capability.yaml` in the package. Add `codeboltcapability.yaml` at the package root with a publishing ID (`unique_id`), a name, and a version.

## Publish from Codebolt

1. Sign in to Codebolt and open **Marketplace**.
2. Select **Capability** and click the **Publish Capability** upload button.
3. Choose your local capability from the dropdown and check its ID and version.
4. Click **Publish**. The success message shows the published ID.

## Publish from the CLI

If your capability folder is outside the locations listed in the dialog, pass its path directly:

```bash
codebolt action capability publish --path ./frontend-refactor
```

To list published capabilities:

```bash
codebolt action capability list
```

For the files that make up a capability, see [Structure and Schema](./02_structure-and-schema.md). For scaffold commands and options, see the [Capability CLI reference](/docs/reference/codebolt-cli/actions/capability).
