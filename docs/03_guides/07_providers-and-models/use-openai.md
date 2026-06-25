---
sidebar_position: 1
title: Use OpenAI
description: Setting up OpenAI as your LLM provider in Codebolt.
---

# Use OpenAI

Setting up OpenAI as your LLM provider in Codebolt.

**You'll need:** an OpenAI API account and an API key from platform.openai.com.

## Step 1 — get a key

1. Sign in to platform.openai.com.
2. Go to API keys → Create new secret key.
3. Copy the key — you won't see it again.

Store it somewhere safe (password manager). Never commit it to git.

## Step 2 — add the provider in Codebolt

**Settings → Providers → Add provider → OpenAI.** Paste the key. Click Test.

Test should succeed within a few seconds.

## Step 3 — pick a model

In a new chat tab, the model picker shows every OpenAI model your account has access to. For coding, start with a recent mid-tier GPT (GPT-4 class or whatever is current). Flagship models are better but more expensive.

As of early 2026:
- **GPT-5** family — flagship, best reasoning
- **GPT-4** family — mid-tier, workhorse
- **GPT-4 mini** — fast and cheap, for high-volume

Check OpenAI's docs for the current list and pricing.

## Step 4 — set as default (optional)

**Settings → Providers → Set default → OpenAI.** New chat tabs and new agents default to this provider.

For per-agent defaults, set the model in each agent's configuration.

## Organization and project scopes

If your key is tied to a specific OpenAI organization or project, configure them in **Settings → Providers → OpenAI → Advanced**.

## Usage and cost

**Settings → Providers → OpenAI → Usage** shows:
- Tokens consumed
- Estimated cost (based on OpenAI's published rates)
- Request count
- 30-day history

OpenAI also has its own usage dashboard at platform.openai.com/usage — the two should roughly agree (with some lag on provider side).

## Rate limits

OpenAI enforces per-minute and per-day rate limits tied to your tier. Codebolt handles transient 429s with exponential backoff. If you hit them consistently:

- Upgrade your OpenAI tier.
- Use a fallback chain to fall back to another provider when limited.
- Reduce concurrency in your agent manifests.

## Custom endpoints (Azure OpenAI, compatible proxies)

If you're using Azure OpenAI or an OpenAI-compatible proxy, add a **Custom HTTP** provider in **Settings → Providers** pointing to your proxy's base URL.

See [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md) for the full list of compatible providers.

## Troubleshooting

### 401 unauthorized
Bad key. Re-paste. Watch for trailing whitespace.

### 429 rate limited
You've hit your tier's limit. Wait, upgrade, or add a fallback.

### 404 model not found
The model name is wrong or your account doesn't have access to that model. Check the model picker for what's actually available.

### Timeouts on long contexts
Very large contexts can time out on some models. Either use a model with a larger context window, or compress context more aggressively in your agent's processors.

## See also

- [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md)
- [Model selection](../../02_using-codebolt/03_chat/06_model-selection.md)
- [Use Anthropic](./use-anthropic.md)
- [Bring your own provider](./byo-provider.md)
