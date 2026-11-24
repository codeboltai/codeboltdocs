---
sidebar_position: 4
title: Publish an action block
description: Publish an action block from Codebolt Marketplace or the CLI.
---

# Publish an action block

Build and test your block, then check the name, version, and entry point in `actionblock.yml`. You can publish an action block on its own.

## Publish from Codebolt

1. Sign in to Codebolt and open **Marketplace**.
2. Select **ActionBlock** and click the **Publish ActionBlock** upload button.
3. Choose your local action block from the dropdown and check its ID and version.
4. Click **Publish**. The success message shows the published ID.

## Publish from the CLI

If your action block folder is outside the locations listed in the dialog, pass its path directly:

```bash
codebolt action actionblock publish --path ./my-action-block
```

To list published action blocks:

```bash
codebolt action actionblock list
```

See [Authoring an action block](./03_authoring.md) for the build and invocation example.
