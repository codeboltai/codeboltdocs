---
sidebar_position: 1
title: LLM Providers
description: How to configure which LLMs Codebolt uses. You can have as many providers configured simultaneously as you like; different agents or tabs can use different ones
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Providers

How to configure which LLMs Codebolt uses. You can have as many providers configured simultaneously as you like; different agents or tabs can use different ones.

## Supported providers

Remote (require API keys):

- **OpenAI** — GPT models
- **Anthropic** — Claude models
- **Google** — Gemini models
- **Azure OpenAI** — OpenAI models hosted in Azure
- **AWS Bedrock** — Anthropic, Meta, and others via AWS
- **Groq** — fast inference for open models
- **Together, Fireworks, Replicate, OpenRouter** — various third-party hosts

Local:

- **Ollama** — the easiest local runner
- **llama.cpp** — raw GGUF models
- **LM Studio** — GUI local runner
- **vLLM, TGI** — production-grade local serving

BYO:

- **Custom HTTP endpoints** — any OpenAI-compatible API
- **Custom providers** — see [Build on Codebolt → Custom LLM Provider](../../04_build-on-codebolt/06_remote-env-providers/01_llm-provider.md)

See [Local models](./02_local-models.md) for local setup.

## Configuring a provider

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Providers → Add provider.** Pick from the list, fill in the credential fields shown below for the provider, click **Test**, then **Save**.

![LLM Providers](/productImages/applicationfeatures/billing.png)

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older end-user provider setup commands from previous drafts.

What it does expose through a running server is:

```bash
codebolt command llm providers
codebolt command llm models
codebolt command llm get-models --provider openai
codebolt command llm update-key --provider openai --key sk-...
codebolt command llm set-default --provider openai --model gpt-5
```

</TabItem>
<TabItem value="config" label="Config file">

`~/.codebolt/providers.yaml` (or `.codebolt/providers.yaml` in a project):

```yaml
providers:
  openai:
    type: openai
    api_key_env: OPENAI_API_KEY
  anthropic:
    type: anthropic
    api_key_env: ANTHROPIC_API_KEY
  azure:
    type: azure-openai
    endpoint: https://my.openai.azure.com
    deployment: gpt-4-deployment
    api_key_env: AZURE_OPENAI_KEY
```

Use `_env` suffixes to read secrets from environment variables instead of hard-coding.

</TabItem>
<TabItem value="api" label="HTTP API">

```http
POST /api/providers
{
  "type": "anthropic",
  "name": "anthropic",
  "credentials": { "api_key": "sk-ant-..." }
}

POST /api/providers/:name/test
```

</TabItem>
</Tabs>

### Provider field reference

The fields each provider needs:

### OpenAI

```
API key: sk-...
Organization (optional): org_...
Base URL (optional): https://api.openai.com/v1
```

### Anthropic

```
API key: sk-ant-...
Base URL (optional): https://api.anthropic.com
```

### Google

```
API key: your-google-key
Project ID (for Vertex): my-gcp-project
Location (for Vertex): us-central1
```

### Azure OpenAI

```
API key: your-azure-key
Endpoint: https://<resource>.openai.azure.com
Deployment name: gpt-4-deployment
API version: 2024-08-01-preview
```

### AWS Bedrock

```
Access key ID: AKIA...
Secret access key: ...
Region: us-east-1
```

(Or use IAM role / AWS profile if the server is on EC2.)

### Custom HTTP (OpenAI-compatible)

```
Name: my-provider
Base URL: https://my-endpoint.example.com/v1
API key: any-string
```

Good for any service that mimics the OpenAI API — Groq, Together, Fireworks, OpenRouter, a local vLLM server.

## Testing

Every provider has a **Test** button. Click it. Codebolt sends a one-token completion and shows the response. If the test fails, you get a specific error:

- **401 / 403** — bad key or wrong organization.
- **404** — wrong base URL or deployment name.
- **429** — rate limit or quota exceeded.
- **Network error** — can't reach the endpoint; check firewall.
- **SSL error** — certificate issue, usually with a self-hosted proxy.

Don't skip the test. A provider that "should work" might have a typo in the key that only fails when you're running a real agent.

## Key storage

API keys are stored encrypted at rest in the Codebolt DB. Key encryption uses the server's master key, which itself is stored in the OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service).

For headless / CI environments where no keychain exists, provide the master key via env var:

```bash
export CODEBOLT_MASTER_KEY=...
```

See [Self-hosting → Security hardening](../../04_build-on-codebolt/10_self-hosting/01_overview.md) for the full key management story.

## Per-scope configuration

Like other settings, providers are layered:

1. **Project** — provider specific to this project (rare; useful for "this customer project uses their own Azure deployment").
2. **Workspace** — most common.
3. **User** — your personal keys across all workspaces.
4. **Server** — shared keys on self-hosted instances.

Use user-level keys for your personal development. Use workspace-level for client-specific work. Use server-level if you're self-hosting and want a shared team key (with usage tracking per user).

## Rate limits and retries

Every provider has rate limits. Codebolt handles common cases automatically:

- **Transient 429s** → exponential backoff with jitter, up to N retries.
- **Concurrent request caps** → the LLM path has a per-provider semaphore.
- **Hard quota errors** → surfaced to the user immediately; no retry.

If you're hitting rate limits often:
- Lower the max concurrency in the provider's advanced settings.
- Use a cheaper / higher-quota tier.
- Add a second provider and let Codebolt fall back.

## Fallback chains

You can configure a provider to fall back to another on failure:

```
Provider: openai-primary
  Fallback: anthropic-claude
    Fallback: ollama-local
```

If `openai-primary` returns an error (or exceeds a budget), the request retries against `anthropic-claude`. If that also fails, it tries `ollama-local`.

Fallbacks are useful for:
- **Resilience** — remote outages don't stop you from working.
- **Cost** — a cheap local fallback for tasks that don't need flagship quality.
- **Rate limit relief** — fall back when you hit quota, rather than stopping.

Be aware: different models give different results. Falling back mid-run can cause visible behaviour changes. Codebolt surfaces a fallback marker in the trace.

## Usage tracking

**Settings → Providers → Usage** shows per-provider usage:

- Tokens consumed (input + output, per model).
- Estimated cost (based on your configured per-token rates).
- Request count.
- Failure rate.
- 30-day history.

For self-hosted team instances, usage is tracked per user — handy for chargeback or quota enforcement.

Usage numbers come from the event log (every LLM call is logged), so they're accurate to the last call. They may lag actual provider bills by a bit because provider invoicing rounds and batches differently.

## Default provider

When a new tab or a new agent doesn't pick a provider explicitly, Codebolt uses the **default** set in:

1. The agent's `default_model` (mapped to a provider).
2. The workspace default.
3. The user default.

Set your user default to the provider you use most; set workspace defaults when a specific project has different needs.

## Removing a provider

**Settings → Providers → Remove.** This:

- Deletes the stored key.
- Marks any agent or tab that was using this provider.
- Does **not** delete historical usage data.

Agents bound to the removed provider fall back to their next-best option, or fail with "no provider" if none is available.

## See also

- [Local models](./02_local-models.md)
- [Model selection](../03_chat/06_model-selection.md)
- [Custom LLM Provider (for builders)](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/03_llm-and-inference.md)
