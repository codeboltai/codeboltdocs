---
title: Mini Apps
description: Package a web interface and agent-callable tools into an installable CodeBolt app.
---

A Mini App bundles a web interface with server routes and tools that CodeBolt agents can call. Author it as a Nitro app with `@codebolt/miniapp`. The build produces a manifest that describes the app and its tool surface.

Publishing makes the app available in the registry. Installing it creates the runtime that users open and agents call. In CodeBolt Cloud, browse **Registry → MiniApps**, install the app, and open it from **Agents → Installed MiniApps**.

In the desktop app, open **Marketplace → MiniApps** to browse and install apps. Open **Memory → Mini Apps** in the panel selector to see available local and cloud Mini Apps.

For other ways to build a CodeBolt-connected app, see [Application Shapes](./02_application-shapes.md).
