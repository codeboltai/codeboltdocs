---
sidebar_position: 5
title: Publish a skill
description: Publish a skill from Codebolt Marketplace or the CLI.
---

# Publish a skill

Keep your instructions in `SKILL.md`. Set `unique_id`, `name`, and `version` in its YAML frontmatter. If the folder also contains `codeboltskill.yaml`, put the publishing metadata there because the publisher reads that file first.

## Publish from Codebolt

1. Sign in to Codebolt and open **Marketplace**.
2. Select **Skill** and click the **Publish Skill** upload button.
3. Choose your local skill from the dropdown and check its ID and version.
4. Click **Publish**. The success message shows the published ID.

## Publish from the CLI

If your skill folder is outside the locations listed in the dialog, pass its path directly:

```bash
codebolt action skill publish --path ./review-change
```

To list published skills:

```bash
codebolt action skill list
```

To install a published skill, open **Marketplace**, select **Skill**, and find it on the **Marketplace** tab. The **Installed** tab shows installed skills.
