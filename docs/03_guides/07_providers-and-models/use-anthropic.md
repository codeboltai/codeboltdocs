---
sidebar_position: 2
title: Use Anthropic
description: Setting up Claude (Anthropic) as your LLM provider in Codebolt.
---

# Use Anthropic

Setting up Claude (Anthropic) as your LLM provider in Codebolt.

**You'll need:** an Anthropic API account and an API key from console.anthropic.com.

## Step 1 — get a key

1. Sign in to console.anthropic.com.
2. Settings → API Keys → Create Key.
3. Copy the key — store it securely.

## Step 2 — add to Codebolt

**Settings → Providers → Add provider → Anthropic.** Paste the key. Click Test.

## Step 3 — pick a model

Claude model tiers (as of early 2026; check Anthropic docs for the latest):

- **Opus** family — flagship, best reasoning, most expensive. Good for planning, complex refactors, deep analysis.
- **Sonnet** family — mid-tier, workhorse. Excellent for coding. Usually the right default.
- **Haiku** family — fast and cheap. Good for utility tasks, summarisation, classification.

In a new chat, the model picker shows installed Claude models.

## Step 4 — set as default

**Settings → Providers → Set default → Anthropic.**

For agent-specific defaults, set the model in the agent's configuration.

## Using Claude effectively

Claude has a few properties worth knowing:

- **Long context** — modern Claude models support very long contexts (200k+ tokens). Good for loading whole files or large codemaps.
- **Tool calling** — Claude's tool calling is reliable; it rarely hallucinates tool names.
- **Instruction following** — Claude tends to follow explicit instructions closely. Vague instructions → vague output.
- **Refusal behaviour** — Claude sometimes refuses to generate code that looks dangerous (even when it's not). A system prompt that sets context ("you are working in an authorised security engagement") helps.

## Budget

Opus is roughly 5x the cost of Sonnet per token. For most coding work, Sonnet is enough. Reserve Opus for:

- Planning stages of plan-execute-review flows.
- Hard debugging.
- Deep code review.

Set per-agent cost awareness by monitoring usage via **Settings → Usage**.

## Rate limits

Anthropic's rate limits are tier-dependent. Codebolt handles 429s with backoff. If you're hitting them:

- Upgrade your tier.
- Use a fallback to OpenAI or a local model.
- Reduce agent concurrency.

## Using Claude via AWS Bedrock or GCP Vertex

If your team uses cloud-hosted Claude through Bedrock or Vertex, those are separate providers with their own configuration. See [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md).

Advantages of cloud-hosted:
- IAM-based auth instead of static keys.
- Your data stays in your cloud.
- Integrated billing.

Disadvantages:
- More complex setup.
- Sometimes lags Anthropic-direct on new model releases.

## Claude for review agents

A common pattern: use Claude for execution, use a different family (OpenAI, Google) for review. Same-family models correlate their mistakes; mixing gives real independence.

See [Plan-Execute-Review](../../04_build-on-codebolt/08_multi-agent-orchestration/03_patterns/plan-execute-review.md).

## Troubleshooting

### 401 unauthorized
Bad key. Check for whitespace.

### 429 rate limited
Tier limit hit. Wait, upgrade, or use a fallback.

### "Model not found"
Model name mismatch. Anthropic updates model names periodically; use the picker to see what's available.

### Very long responses getting cut off
Set a higher `max_tokens` for that specific call or agent. Anthropic has generous limits but respects your cap.

## See also

- [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md)
- [Model selection](../../02_using-codebolt/03_chat/06_model-selection.md)
- [Use OpenAI](./use-openai.md)
- [Bring your own provider](./byo-provider.md)
