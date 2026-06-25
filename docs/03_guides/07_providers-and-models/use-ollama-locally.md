---
sidebar_position: 3
title: Use Ollama Locally
description: Running LLMs on your own machine via Ollama. Free, private, offline-capable.
---

# Use Ollama Locally

Running LLMs on your own machine via Ollama. Free, private, offline-capable.

For the full local-model guide with hardware requirements, tuning, and alternatives, see [Connect a local model](../02_first-steps/connect-a-local-model.md). This page is the focused Ollama-specific version.

## Step 1 — install Ollama

Download from **ollama.com**. Runs as a background service.

Verify:

```bash
ollama --version
```

## Step 2 — pull a model

For coding, pick something from the coder-tuned list:

```bash
ollama pull qwen2.5-coder:14b          # strong, moderate RAM
# or
ollama pull deepseek-coder:33b         # larger, better, needs more RAM
# or
ollama pull codellama:13b              # reliable baseline
```

First pull is 5-20 GB; subsequent pulls of related models share layers.

## Step 3 — configure in Codebolt

**Settings → Providers → Add provider → Ollama.**

Default URL is `http://localhost:11434`. Codebolt auto-detects installed models. Click Test.

Or via **Settings → Providers → Add provider → Ollama**.

## Step 4 — use it

In a chat tab, pick your Ollama model from the model picker. First turn will be slow (model loads into memory); subsequent turns are fast.

## Keep models warm

Ollama unloads models after inactivity (default 5 minutes). To keep them warm longer:

```bash
# Linux/macOS
export OLLAMA_KEEP_ALIVE=1h
```

Or in a systemd drop-in. 24h / unlimited if your RAM can spare it.

## Embedding models

Codebolt uses embeddings for memory ingestion and vector search. Run them locally too:

```bash
ollama pull nomic-embed-text
```

**Settings → Providers → Embeddings → Ollama.**

After switching embedding models, re-index:

After switching embedding models, re-index via **Settings → Indexing → Re-index full project**.

## Fallback chain: local + remote

A common setup: local by default, remote for hard tasks.

**Settings → Providers → Fallback chains:**

```
Primary: ollama (qwen2.5-coder:14b)
Fallback on error: anthropic (claude-sonnet)
Fallback on timeout: anthropic (claude-sonnet)
```

Most runs stay local; only the hard ones escalate.

## Tuning

### GPU acceleration

If you have an Nvidia GPU or Apple Silicon, Ollama uses it automatically. Check with `nvidia-smi` (or activity monitor on Mac) while Ollama runs — the GPU should be busy.

If GPU isn't being used:
- Ensure you installed the GPU-enabled Ollama build.
- Check CUDA / Metal install.
- On Linux, might need `nvidia-container-toolkit` if running under Docker.

### Quantization

Smaller, faster, slightly worse: `:q4_k_m` (the default for most Ollama models).
Larger, slower, slightly better: `:q8_0` or `:fp16`.
Tiny, noticeably worse: `:q2_k`.

For coding, `q4_k_m` is usually right. Experiment if you have RAM to spare.

### Context window

Local models often have smaller context windows than remote flagships. Check the model's metadata:

```bash
ollama show qwen2.5-coder:14b
```

If the context is too small for your project, compression kicks in earlier — either accept it or move to a remote provider for that task.

## Troubleshooting

### "Connection refused"
Ollama isn't running. Start it: `ollama serve` (or launch the app).

### "Model not found"
You didn't pull it, or the name is wrong. `ollama list` shows installed models.

### "Out of memory"
Model too big. Use a smaller variant or more aggressive quantization.

### Extremely slow generation
- CPU-only? Expected. Use smaller models or get a GPU.
- GPU idle? Driver / install issue. See GPU acceleration above.
- First call? Cold start. Subsequent calls will be faster.

### Lower quality than expected
Local open-weight models trail frontier closed models. For hard tasks, use a fallback to a remote provider.

## See also

- [Connect a local model (full guide)](../02_first-steps/connect-a-local-model.md)
- [Local models (reference)](../../02_using-codebolt/08_integrations/02_local-models.md)
- [LLM Providers](../../02_using-codebolt/08_integrations/01_llm-providers.md)
