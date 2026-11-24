---
title: MiniApps
description: Install a MiniApp, open it in Codebolt Desktop or Cloud, and choose which tools agents can use.
---

A MiniApp is an installable web app that can expose tools to Codebolt agents.

## Use a MiniApp on desktop

1. Open **Marketplace → MiniApps → All MiniApps**. Search for an app and select **Install** on its card.
2. From the bottom bar, open **Context → MiniApps**. The panel lists local and cloud apps. Select **Refresh** if the app you just installed is missing.
3. On the app card, select **Preview in Browser panel** to use it inside Codebolt, or **Open externally** to open it in your browser.

If the app exposes tools, use the checkbox beside each tool to enable or disable it for agents. Local apps also have a **Reload MiniApp** control.

## Use a MiniApp in Codebolt Cloud

1. Sign in and open **Registry → MiniApps → All MiniApps**. Find the app and select **Install**.
2. Open **Agents → Tools → Installed MiniApps** to find the installation in your workspace.
3. Select **Open** to launch the app in a new tab. This button becomes available when the installation has a runtime URL. To remove the installation, select **Uninstall** and confirm.

To find apps you’ve published, open **Registry → MiniApps → My MiniApps**.

## Build a MiniApp

Author a MiniApp as a Nitro app with `@codebolt/miniapp`. The build produces a manifest describing the app and the tools it exposes. For other ways to build a Codebolt-connected application, see [Application Shapes](./02_application-shapes.md).
