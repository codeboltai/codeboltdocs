---
sidebar_position: 2
title: Local Models
description: Running LLMs on your own hardware instead of calling a remote API. Trades quality for privacy, offline capability, and fixed cost.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Local Models

Running LLMs on your own hardware instead of calling a remote API. Trades quality for privacy, offline capability, and fixed cost.

## When local makes sense

**Good fit:**
- You have code you don't want to send to a third party.
- You're offline (on a plane, air-gapped, unreliable network).
- You run a very high volume and remote costs dominate.
- You want to experiment with open-weight models.
- You're on a machine with enough hardware to run meaningful models.

**Bad fit:**
- You want the best possible results (remote flagships are better).
- Your machine is a laptop with 8GB RAM (most useful models need more).
- You value fast first-token latency (local models have cold-start overhead).
- You want Codebolt to "just work" without hardware tuning.

Don't use local models out of reflex. Use them when the tradeoff is worth it for your situation.

## Hardware requirements (rough guide)

| Model size | Min RAM | Realistic RAM | GPU helpful? |
|---|---|---|---|
| 3B params | 6 GB | 8 GB | Optional |
| 7B params | 10 GB | 16 GB | Strongly recommended |
| 13B params | 16 GB | 24 GB | Yes |
| 34B params | 32 GB | 48 GB | Required (24GB+ VRAM) |
| 70B params | 48 GB | 64 GB+ | Multi-GPU or a beefy Mac |
| 405B / flagship | — | — | Data center |

For coding tasks, the realistic bar is **13B+** — smaller models produce visibly worse code. The 7B tier works for utility tasks (summarisation, classification) but struggles on real code generation.

Apple Silicon (M-series Macs) punches above its weight because of unified memory. A 32GB M2/M3 can comfortably run 13-34B models that would need a dedicated GPU on a PC.

## Ollama — the easy path

Ollama is the simplest way to run local models. Install once, pull a model, done.

### Setup

1. **Install Ollama** from ollama.ai. Runs as a background service.
2. **Pull a model:**

```bash
ollama pull codellama:13b
ollama pull qwen2.5-coder:14b    # strong for coding
ollama pull deepseek-coder:33b   # larger but good
```

3. **Configure Ollama as a provider in Codebolt:**

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Providers → Add provider → Ollama.** The default URL is `http://localhost:11434`. Codebolt auto-detects the installed models. Click **Test**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the desktop settings UI to add Ollama as a provider. The current CLI does not expose the older Ollama-specific provider setup flow from previous drafts.

</TabItem>
<TabItem value="config" label="Config file">

```yaml
# ~/.codebolt/providers.yaml
providers:
  ollama:
    type: ollama
    base_url: http://localhost:11434
```

</TabItem>
</Tabs>

4. **Pick the model** in the model picker on a new tab. First call will be slow (warmup); subsequent calls are fast.

### Recommended models for coding

As of early 2026 (check for newer options):

- **qwen2.5-coder** — currently strong for general coding; multiple sizes available.
- **deepseek-coder** — good alternative, especially the larger variants.
- **codellama** — Meta's; widely available, reliable baseline.

Model quality moves fast. If this page is old, check a benchmark aggregator rather than trusting this list.

## llama.cpp — for control

If you want to run GGUF models directly without Ollama's wrapping:

1. Build or install `llama.cpp`.
2. Download a GGUF file from Hugging Face.
3. Run `llama-server --model /path/to/model.gguf --port 8080`.
4. In Codebolt, add a **Custom HTTP** provider pointing at `http://localhost:8080/v1`.

More control (exact quantization, KV cache settings, batch sizes), more fiddling. Use when Ollama's defaults aren't cutting it.

## LM Studio — GUI

LM Studio gives you a desktop UI for managing local models. It exposes an OpenAI-compatible API you can point Codebolt at. Good for non-technical users who still want local inference.

## vLLM / TGI — production serving

For running a local model as a shared service for a team:

- **vLLM** — high-throughput batched inference.
- **Text Generation Inference (TGI)** — Hugging Face's serving tool.

Both expose OpenAI-compatible APIs. Add them as **Custom HTTP** providers in Codebolt. This is the pattern for "self-hosted team instance + local model".

## Embeddings — also local

Codebolt uses embeddings for memory ingestion and vector search. Remote embeddings (OpenAI, Voyage) work fine, but you can also run them locally.

Ollama supports embedding models too:

```bash
ollama pull nomic-embed-text
```

Then in the provider settings UI, point embeddings at your Ollama instance and pick the embedding model.

Local embeddings are lower-quality than the best remote ones (Voyage, OpenAI text-embedding-3-large), but for most codebase search it's fine. The big win is that your code never leaves your machine.

## Warmup and cold start

Local models are slow on first call:

- **First call after server start** — loads the model into memory (seconds to minutes).
- **Subsequent calls** — fast, as long as the model stays loaded.
- **Switching models** — unloads old, loads new. Slow.

For interactive use, stick to one model per session if possible. For batch jobs, load the model once and let it stay warm.

Ollama automatically unloads models after a period of inactivity. Configure the keep-alive:

```bash
OLLAMA_KEEP_ALIVE=30m ollama serve
```

## Configuring limits

Local models have token budgets too, but the limiter is your hardware:

- **Context window** — local models often have smaller windows than remote flagships. Codebolt auto-detects from the model metadata.
- **Max output tokens** — set conservatively to avoid runaway generation that ties up your GPU.
- **Concurrency** — don't run multiple agent requests against a local model simultaneously unless your serving stack supports batching.

## Fallback to remote

A common setup: local by default, remote as a fallback for hard tasks.

In the provider settings UI:

```
Provider: ollama (primary)
  Fallback: anthropic-claude (for complex tasks)
```

You can also have different agents use different providers — a fast utility agent on local, a planner on remote flagship, a coder on local.

## Troubleshooting

### "Ollama not detected"
Make sure `ollama serve` is running. Check with `curl http://localhost:11434/api/tags`.

### "Out of memory"
Your model is too big for your RAM / VRAM. Try a smaller variant or a more aggressive quantization (`:q4` instead of `:q8`).

### "Slow tokens/sec"
- On CPU only? Expect ~1-5 tokens/sec on small models, worse on large.
- GPU not being used? Check `nvidia-smi` (or equivalent) while Ollama is running. If the GPU is idle, Ollama isn't picking it up — check CUDA / Metal installation.
- Apple Silicon? Make sure you're using the ARM build of Ollama, not x86 via Rosetta.

### "Quality is noticeably worse than my cloud model"
Expected. Local open-weight models are improving fast but still trail frontier closed models. If quality matters more than privacy, use remote. If both matter, use local for routine work and remote for hard tasks via a fallback chain.

### "First call takes forever"
Cold start loading the model. Once loaded, subsequent calls are fast. Increase `OLLAMA_KEEP_ALIVE` to keep the model warm longer.

## See also

- [LLM Providers](./01_llm-providers.md) — the general provider configuration
- [Model selection](../03_chat/06_model-selection.md)
- [Guide: connect a local model](../../03_guides/02_first-steps/connect-a-local-model.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/03_llm-and-inference.md)
