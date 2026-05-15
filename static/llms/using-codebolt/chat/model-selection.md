# Model Selection

> Every chat tab uses one model at a time. Picking the right one matters for both quality and cost. This page covers how to pick and when to switch.

![Model Selection](/productImages/chat/model_selection.gif)

Every chat tab uses one model at a time. Picking the right one matters for both quality and cost. This page covers how to pick and when to switch.

## Where the model comes from

When you start a new tab, the model is resolved in this order:

1. **Your explicit pick** — the model picker in the tab toolbar.
2. **Agent default** — `default_model` from the agent's `agent.yaml`.
3. **Project default** — `.codebolt/settings.yaml`.
4. **Workspace default**.
5. **User default** — your preference for new tabs.
6. **Global fallback** — a safe default the app ships with.

Most of the time, defaults do the right thing. You only reach for the model picker when you want to override for this specific tab.

## Picking a model

Codebolt currently exposes model selection in two places:

- **In chat**: use the model picker in the chat input toolbar to change the active provider and model.
- **In Settings**: open the LLM settings to choose the default application LLM and the default embedding model.

In Settings, the app lets you:

- add and configure providers
- search the available models for the selected provider
- set a default chat model
- set a default embedding provider and embedding model
- download supported local embedding models when the provider offers them

## When the model picker is greyed out

Reasons:

- **No providers configured.** Open the LLM settings and add a provider first.
- **The current view has not loaded provider data yet.** Wait for the picker to populate, then try again.
- **A turn is already in progress.** Finish or stop the current request before changing models.

## What the LLM actually receives

The model picker just changes which provider endpoint the agent calls. The **assembled prompt** is the same regardless of model — same system prompt, same context rules, same memory, same tool schemas.

What does vary by model:

- **Tool calling format.** Each provider has a different wire format; the inference adapter handles it.
- **Context window size.** Older models have smaller windows, so compression kicks in earlier.
- **Streaming behaviour.** Some models stream token-by-token, some emit chunks.

None of these are things you manage — they're handled by [`llmService`](../../04_build-on-codebolt/09_internals/03_subsystems/03_llm-and-inference.md).

## See also

- [Chat Overview](./01_overview.md)
- [LLM Providers](../08_integrations/01_llm-providers.md)
- [Local models](../08_integrations/02_local-models.md)
- [LLM & Inference internals](../../04_build-on-codebolt/09_internals/03_subsystems/03_llm-and-inference.md)
