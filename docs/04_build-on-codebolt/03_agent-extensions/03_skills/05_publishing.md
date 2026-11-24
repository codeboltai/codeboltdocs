---
sidebar_position: 5
title: Publishing
description: "Publish a skill using the extension service REST API:"
---

# Publishing

## Publish via API

Publish a skill using the extension service REST API:

```
POST /extensions/publish
```

Send the skill directory as `folderPath` and set `type` to `skill`.

## Install from marketplace

Users can install published skills from the Codebolt marketplace in two ways:

**From the UI:** Open the Capability Panel's **Marketplace** tab or go to **Settings → Marketplace** to browse, search, and install skills directly. See [The Marketplace](../../../02_using-codebolt/04_agents/04_the-marketplace.md) for details.

**Via API:**

```
POST /capability/download
```

Send the marketplace ID as `capabilityId` and set `capabilityType` to `skill`.

Downloaded skills are extracted as zip archives into the project's `.codebolt/capabilities/skill/` directory and picked up on the next registry refresh.

## Standalone vs. bundled

Publish standalone if the skill is useful on its own. If it only makes sense together with prompts, tools, and conventions, ship it inside a [capability](../02_capabilities/01_overview.md).

## Common mistakes

- A skill that is really just one tool call — use a tool instead
- A skill so broad it becomes a second system prompt — break it down
- Unstructured outputs where downstream callers need fields — define typed outputs in `capability.yaml`
- Missing `type: skill` in `capability.yaml` — the registry uses directory structure to infer type, but being explicit avoids confusion
