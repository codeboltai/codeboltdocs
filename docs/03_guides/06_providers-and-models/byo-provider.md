---
sidebar_position: 4
title: Bring Your Own Provider
description: Using an LLM provider Codebolt doesn't natively support. Two paths depending on whether the provider is OpenAI-compatible or genuinely different.
---

# Bring Your Own Provider

Using an LLM provider Codebolt doesn't natively support. Two paths depending on whether the provider is OpenAI-compatible or genuinely different.

## Path 1 — OpenAI-compatible (no code needed)

Most providers offer an OpenAI-compatible API. If yours does, use the Custom HTTP provider:

**Settings → Providers → Add provider → Custom HTTP.** Enter the base URL and API key.

Works for any provider that:
- Accepts `POST /chat/completions` with OpenAI's request shape.
- Returns OpenAI-shape responses.
- Handles tool calls in OpenAI format (or doesn't need tool calls).

Known OpenAI-compatible hosts:

- Groq
- Together
- Fireworks
- OpenRouter
- Replicate (some models)
- vLLM, llama.cpp server
- LM Studio
- Azure OpenAI (with minor config differences)
- AWS Bedrock (via a compatibility layer)

For these, just point at their base URL and you're done.

## Adding models to a custom provider

Custom HTTP providers don't auto-list their models. Declare them:

```yaml
# .codebolt/providers/my-provider/providers.yaml
providers:
  my-provider:
    models:
      - id: model-small
        display_name: "My Small Model"
        context_window: 8192
        supports_tools: true
      - id: model-large
        display_name: "My Large Model"
        context_window: 32768
        supports_tools: true
```

Or via the UI: Settings → Providers → My Provider → Models → Add.

## Path 2 — genuinely custom (write a plugin)

If your provider isn't OpenAI-compatible — different wire format, different auth, different tool-call shape — write a custom LLM provider plugin.

Full walkthrough: [Custom LLM Provider](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md).

Short version:

1. Create a Node package implementing the `LLMProvider` interface.
2. Handle: `chat`, `chatStream`, `listModels`, `testConnection`.
3. Translate between your provider's format and Codebolt's canonical format.
4. Publish as npm or install locally.
5. Configure in Settings → Providers.

## Authentication patterns

### Static API key

Enter the API key when adding the provider in **Settings → Providers**. The key is stored encrypted.

### Env var

```yaml
# .codebolt/providers/my-provider/providers.yaml
providers:
  my-provider:
    api_key_env: MY_PROVIDER_KEY
```

Keeps the key out of the config file. Set in your shell or via your secrets manager.

### OAuth / IAM (cloud providers)

For cloud providers like AWS Bedrock or GCP Vertex, Codebolt can use IAM / workload identity instead of static keys. Configure in the provider's advanced settings.

## Testing

After adding, click **Test** in **Settings → Providers**. Errors tell you what's wrong:

- **401** — auth failure. Re-check credentials.
- **404** — wrong base URL, wrong model name, or endpoint path mismatch.
- **SSL error** — certificate issue; often means the provider needs an HTTP proxy configuration.
- **Unexpected response shape** — not OpenAI-compatible; use the custom plugin path.

## Cost tracking

For Codebolt to compute cost, add per-token rates:

```yaml
providers:
  my-provider:
    pricing:
      model-small:
        input_per_million: 0.50
        output_per_million: 1.50
      model-large:
        input_per_million: 5.00
        output_per_million: 15.00
```

Costs show up in Settings → Usage and AI Requests.

## Fallback from custom to native

Custom providers can be part of fallback chains alongside native ones:

```
Primary: my-custom-provider
Fallback: openai (gpt-4...)
```

Useful when your custom provider is an experimental one you want to test, with a reliable fallback for production.

## See also

- [LLM Providers (reference)](../../02_using-codebolt/08_integrations/01_llm-providers.md)
- [Custom LLM Provider (for builders)](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/07b_subsystems/03_llm-and-inference.md)
