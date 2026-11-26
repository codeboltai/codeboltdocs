---
title: Build a MiniApp
description: Build a local Nitro MiniApp, open it in Codebolt Desktop, and add a tool an agent can call.
---

# Build a MiniApp

Create a small web app that opens in Codebolt Desktop. Then add a tool an agent can call. You’ll need an open Codebolt project, Node.js 22.12 or later, and npm.

## 1. Create the MiniApp files

From your project root, create a MiniApp inside `.codebolt/miniapps`.

```bash
mkdir -p .codebolt/miniapps/hello-miniapp/public
cd .codebolt/miniapps/hello-miniapp
```

Add `package.json` in that folder.

```json title="package.json"
{
  "name": "hello-miniapp",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nitro build"
  },
  "dependencies": {
    "@codebolt/miniapp": "0.1.2",
    "nitro": "3.0.260610-beta"
  }
}
```

Register the app with the Codebolt Nitro module. The `id` identifies the MiniApp and its tools. The `title` appears in Codebolt, and `route` is the path Codebolt opens for the UI.

```ts title="nitro.config.ts"
import { defineConfig } from 'nitro';
import { codeboltMiniApp, resolveTarget } from '@codebolt/miniapp/nitro';

export default defineConfig({
  ...resolveTarget(),
  compatibilityDate: '2026-07-24',
  serverDir: 'server',
  modules: [
    codeboltMiniApp({
      id: 'hello-miniapp',
      title: 'Hello MiniApp',
      version: '0.1.0',
      route: '/',
    }),
  ],
});
```

Add the page Codebolt will display.

```html title="public/index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hello MiniApp</title>
  </head>
  <body>
    <h1>Hello MiniApp</h1>
    <p>This app is running in your Codebolt project.</p>
  </body>
</html>
```

## 2. Build and open it in Codebolt

From the MiniApp folder, install its dependencies and run the build.

```bash
npm install
npm run build
```

The local build writes `.output/codebolt/miniapp.manifest.json`. Codebolt uses the manifest to discover the app, open its UI, and register the tools it exposes.

In Codebolt Desktop, open **Context → MiniApps** from the bottom bar. Select **Refresh**, then choose **Preview in Browser panel** on the **Hello MiniApp** card. If the card is missing, check that the build produced the manifest inside `.codebolt/miniapps/hello-miniapp` in the open project.

## 3. Add a tool for agents

Create `server/tools/greet.ts` inside the MiniApp folder. The `inputSchema` defines what an agent passes to the tool. The handler returns the result.

```ts title="server/tools/greet.ts"
import { defineTool } from '@codebolt/miniapp';

export default defineTool<{ name: string }>({
  name: 'greet',
  description: 'Return a greeting for the supplied name.',
  inputSchema: {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1 },
    },
  },
  handler(_context, { name }) {
    return { message: `Hello, ${name}!` };
  },
});
```

Run `npm run build` again, then choose **Reload MiniApp** on its card. Enable **greet** with the checkbox beside the tool if it’s off. The local tool is registered as `miniapp.hello-miniapp.greet`.

In Chat, use an agent with access to MiniApp tools and ask it to call **greet** from **Hello MiniApp** with the name **Sam**. The tool should return `Hello, Sam!`.

For installation and tool controls in Desktop and Cloud, see [Using MiniApps](./05_mini-apps.md).
