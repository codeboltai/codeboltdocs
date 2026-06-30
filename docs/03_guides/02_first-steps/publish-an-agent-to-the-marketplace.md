---
sidebar_position: 2
title: Publish an Agent to the Marketplace
description: Take an agent from your project and make it installable by anyone.
---

# Publish an Agent to the Marketplace

Take an agent from your project and make it installable by anyone.

**You'll need:** a working custom agent, a Codebolt account with publisher access.

## Pre-publish checklist

- [ ] Version bumped in `codeboltagent.yaml`
- [ ] Description is specific and one sentence
- [ ] `tools.allow` is tight — no blanket wildcards
- [ ] README covers: what it does, tools required, known limits

## Publishing

```bash
cd .codebolt/agents/my-agent
codebolt agent publish
```

The dry-run validates everything without actually publishing. Real publish requires confirmation.

## Metadata for the marketplace

Fill in `metadata` in `codeboltagent.yaml`:

```yaml
metadata:
  icon: ./icon.png
  screenshots:
    - ./screenshots/example.png
  readme: ./README.md
  categories: [code-review, typescript]
  keywords: [review, security, bugs]
  homepage: https://github.com/me/my-agent
  repository: https://github.com/me/my-agent.git
```

The icon is a square PNG, at least 256x256. Screenshots show the agent working.

## What gets published

Everything in the agent's directory except:
- `node_modules/`
- `tests/` (by default — include with `--include-tests`)
- Files matching `.codebolt-ignore` patterns

The manifest is validated, the bundle is signed, and it's uploaded.

## After publishing

Verify by installing your own agent fresh:

```bash
codebolt agent install marketplace/my-agent --version 0.1.0
```

Confirm it works in a clean environment.

## See also

- [Publishing (full guide)](../../04_build-on-codebolt/02_creating-agents/99_publishing.md)
- [Custom Agents Quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md)
- [The Marketplace](../../02_using-codebolt/04_agents/04_the-marketplace.md)
