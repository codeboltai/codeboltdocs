---
sidebar_position: 2
title: Local Models
description: Connect Codebolt to a model server running on your machine.
---

# Local Models

Connect Codebolt to a model server running on your machine.

## Ollama

1. Start Ollama and pull a model you want to use.

   ```bash
   ollama pull qwen2.5-coder:14b
   ```

2. In Codebolt, open **Settings → LLMs → Providers → Add Provider → Local**. Select **Ollama**, review the API URL, and choose **Add Provider**. The usual local URL is `http://localhost:11434`.
3. In Chat, open **Select AI Model** and choose Ollama and the model. Send a short prompt to verify the setup.

If no model appears in Codebolt, these commands can confirm whether Ollama is running and lists your model.

```bash
ollama list
curl http://localhost:11434/api/tags
```

## LM Studio

Start the local model server in LM Studio. In **Settings → LLMs → Providers → Add Provider → Local**, select **LM Studio** and use the API URL shown in LM Studio. Choose the loaded model in **Select AI Model**.

## Embeddings

To configure the embedding model separately, use **Settings → Default Settings → Embedding Model**. The **Local** provider offers downloadable embedding models.

## See also

- [LLM Providers](./01_llm-providers.md)
- [Model selection](../02_surfaces/02_desktop-app/03_chat/06_model-selection.md)
- [LLM & Inference (internals)](../../04_build-on-codebolt/07b_subsystems/03_llm-and-inference.md)
