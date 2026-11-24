---
title: AI Routing
---

Open **System → Settings → AI Routing** to choose a provider and model for routed inference requests.

1. Select **Routing** to enable routing. Choose **Single** to configure one target or **Fallback** to show a second target.
2. Choose the execution preference. For example, to use a cloud provider, select **Cloud**.
3. Under **Primary target**, select the execution location, provider, and model. For the cloud example, choose **Cloud** here as well. If the provider has no model list, enter the model identifier.
4. If you selected **Fallback**, fill in the **Fallback target**. Select **Save**.

For **Cloud** and **Cloud then Local**, Codebolt looks for the first configured cloud target, starting with the primary target. To turn routing off, select **Direct** and save.

See [LLM Settings](../../02_using-codebolt/02_surfaces/02_desktop-app/Settings/02_llm-settings.md) to configure a provider or change the default application model.
