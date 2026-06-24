---
sidebar_position: 3
title: Connect a local model
description: Run an LLM on your own machine instead of calling a remote API. Covers Ollama (easiest) and the manual path. For the conceptual background, see Local models.
---

# Connect a local model

Run an LLM on your own machine instead of calling a remote API. Covers Ollama (easiest) and the manual path. For the conceptual background, see [Local models](../../02_using-codebolt/08_integrations/02_local-models.md).

**You'll need:** a machine with enough RAM for the model you want to run (see the [requirements table](../../02_using-codebolt/08_integrations/02_local-models.md#hardware-requirements-rough-guide)).

## The easy path: Ollama

Ollama is a background service that manages local LLMs. It exposes a simple API and handles model download, caching, and serving.

### Step 1 — install Ollama

Download from **ollama.com** and install. On macOS and Windows it runs as a menu-bar app; on Linux it installs as a systemd service.

Verify:

```bash
ollama --version
ollama list       # should work, will be empty
```

### Step 2 — pull a model

For coding work, start with one of these (as of early 2026 — check benchmarks for newer options):

```bash
ollama pull qwen2.5-coder:14b       # strong for code, moderate RAM
# or
ollama pull deepseek-coder:33b      # bigger, stronger, more RAM needed
# or
ollama pull codellama:13b           # widely available baseline
```

First download is large (5-20 GB). Subsequent pulls of related models share layers, so it gets faster.

Verify:

```bash
ollama run qwen2.5-coder:14b "Write a JavaScript function that reverses a string"
```

You should see a response streamed back. If it's slow, that's expected — see the performance section below.

### Step 3 — configure Codebolt

**Settings → Providers → Add provider → Ollama.**

Ollama's default URL is `http://localhost:11434`. Codebolt auto-detects the installed models. Click **Test** — you should see a successful completion.

If the test fails:
- `connection refused` → Ollama isn't running. Start it.
- `404` → URL is wrong. Check `curl http://localhost:11434/api/tags`.
- `model not found` → the model you specified isn't downloaded. Re-pull.

### Step 4 — pick the model in a chat tab

Open a new chat tab. Click the model picker and select your Ollama model. You should see it in the list alongside any remote models.

Send a test message. **The first turn will be slow** — Ollama loads the model into memory. Subsequent turns are fast (as long as the model stays loaded).

### Step 5 — set it as a default (optional)

**Settings → Agents → Default model → qwen2.5-coder:14b.** Now every new chat tab starts with the local model by default.

For even tighter control, set per-agent:

```yaml
model: ollama:qwen2.5-coder:14b
```

## Tuning: keep the model warm

Ollama unloads models after a period of inactivity (default 5 minutes). Every cold start is seconds to minutes of warmup.

To keep the model loaded longer:

```bash
# Linux/macOS
OLLAMA_KEEP_ALIVE=1h ollama serve

# Or in a systemd drop-in
[Service]
Environment="OLLAMA_KEEP_ALIVE=1h"
```

`1h` keeps the model in memory for an hour after the last request. Set it to `24h` if you work all day. Set to `-1` to never unload (use with care — that's RAM that stays reserved).

## Running embeddings locally

Memory ingestion and vector search use embeddings. Remote embedding providers (OpenAI `text-embedding-3-small`, Voyage) are common and cheap, but you can run embeddings locally too.

```bash
ollama pull nomic-embed-text
```

**Settings → Providers → Embeddings → Ollama** → pick `nomic-embed-text`.

Quality is lower than remote flagships but adequate for most codebase search. The privacy win is complete: no code (or code-derived vectors) ever leaves your machine.

**Important:** if you switch embedding models, the existing vector index uses the old model's vectors. Re-index:

After switching embedding models, re-index via **Settings → Indexing → Re-index full project**.

## The manual path: llama.cpp

For more control over quantization, KV cache, and batch sizes, run `llama.cpp` directly.

### Step 1 — install

```bash
# macOS
brew install llama.cpp

# Or build from source
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
```

### Step 2 — download a GGUF model

From Hugging Face, find a GGUF file for your chosen model and download it:

```bash
wget https://huggingface.co/<user>/<model>/resolve/main/model-q4_k_m.gguf
```

`q4_k_m` is a good quality/size tradeoff. `q8` is higher quality, larger. `q2` is smaller but noticeably worse.

### Step 3 — run the server

```bash
llama-server \
  --model ~/models/model-q4_k_m.gguf \
  --port 8080 \
  --ctx-size 8192 \
  --n-gpu-layers 99   # use all GPU layers if you have a GPU
```

`--ctx-size` is the context window in tokens. `--n-gpu-layers 99` pushes as many layers to GPU as will fit. Drop it to 0 for CPU-only.

### Step 4 — configure as Custom HTTP in Codebolt

**Settings → Providers → Add provider → Custom HTTP.**

```
Name: llama-local
Base URL: http://localhost:8080/v1
API key: any-string  (llama.cpp doesn't check it)
```

The `v1` suffix is important — `llama.cpp`'s server provides an OpenAI-compatible API at that path.

Test. Then add models manually (llama.cpp doesn't expose a model list):

```yaml
# .codebolt/providers/llama-local/providers.yaml
providers:
  llama-local:
    models:
      - id: local-coder
        display_name: "Local Coder"
        context_window: 8192
```

## Fallback chains: local + remote

A useful pattern: local by default, remote as fallback for hard tasks.

**Settings → Providers → Fallback chains → Add chain:**

```
Primary: ollama (qwen2.5-coder:14b)
Fallback on error: anthropic (claude-sonnet)
Fallback on timeout (>60s): anthropic (claude-sonnet)
```

Now most turns run on your local model; hard turns (that error or take too long) automatically escalate.

## Performance

Rough expectations:

| Hardware | Model | Tokens/sec |
|---|---|---|
| CPU only, consumer laptop | 7B q4 | 3-10 |
| CPU only, desktop | 13B q4 | 1-5 |
| Apple M1/M2 (16 GB) | 7B q4 | 15-30 |
| Apple M3 Max (64 GB) | 34B q4 | 10-20 |
| Nvidia RTX 4070 | 13B q4 | 40-80 |
| Nvidia RTX 4090 | 33B q4 | 30-60 |

For coding work, 20+ tokens/sec feels usable. Below 10 it's noticeably slow.

If you're CPU-only on a laptop, stick to 3B-7B models for anything interactive. Reserve larger models for batch / headless work.

## Troubleshooting

### "Model downloaded but Ollama says not found"

Check Ollama is using the expected model directory: `ls ~/.ollama/models`. If you pulled via `sudo`, ownership may be wrong.

### "Out of memory" during generation

Your model is too big. Drop to a smaller variant (`:7b` instead of `:13b`) or more aggressive quantization (`:q4` instead of `:q8`). Reduce `--ctx-size` if using llama.cpp directly.

### GPU not being used

- Check `nvidia-smi` (or `rocm-smi` for AMD) while the model runs. If GPU is idle, the runner isn't finding it.
- For Ollama: reinstall the GPU-specific build.
- For llama.cpp: ensure you built with `LLAMA_CUBLAS=1` (Nvidia) or `LLAMA_METAL=1` (macOS).

### First response extremely slow

Cold start. First call loads the model (10-60 seconds). Subsequent calls are fast if the model stays warm. Increase `OLLAMA_KEEP_ALIVE`.

### Quality noticeably worse than remote

Expected. Local open-weight models trail frontier closed models. Mitigate with:
- A larger local model (if you have the hardware).
- A fallback chain (local for routine work, remote for hard cases).
- More specific prompts (smaller models benefit more from tight prompting).

## See also

- [Local models (overview)](../../02_using-codebolt/08_integrations/02_local-models.md)
- [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md)
- [Model selection](../../02_using-codebolt/03_chat/06_model-selection.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/07b_subsystems/03_llm-and-inference.md)
