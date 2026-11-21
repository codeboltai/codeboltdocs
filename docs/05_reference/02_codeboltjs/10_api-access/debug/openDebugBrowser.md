---
name: openDebugBrowser
description: Requests to open a debug browser at the specified URL and port.
cbbaseinfo:
  description: Requests to open a debug browser at the specified URL and port.
data:
  name: openDebugBrowser
  category: debug
  link: openDebugBrowser.md
---

# openDebugBrowser

```text
codebolt.debug.openDebugBrowser(url: string, port: number): Promise<OpenDebugBrowserResponse>
```

Requests to open a debug browser at the specified URL and port.

## Parameters

- `url` — The URL where the debug browser should be opened.
- `port` — The port on which the debug browser will listen.

## Returns

A promise that resolves with the response from the open debug browser event.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Open debug browser with custom configuration
  const customResult = await codebolt.debug.openDebugBrowser("http://localhost:8080", 9223);
  console.log("Debug browser opened:", customResult.success); // true (if successful)
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Error handling
  try {
    const browserResult = await codebolt.debug.openDebugBrowser("http://localhost:4000", 9224);

    if (browserResult.success) {
      console.log("Debug browser opened successfully");
      console.log("Access debug tools at:", browserResult.url);
      console.log("Debug port:", browserResult.port);
    } else {
      console.error("Failed to open debug browser:", browserResult.error);
    }
  } catch (error) {
    console.error("Error opening debug browser:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Multiple debug sessions
  const debugSessions = [
    { url: "http://localhost:3000", port: 9222 },
    { url: "http://localhost:3001", port: 9223 },
    { url: "http://localhost:3002", port: 9224 }
  ];

  for (const session of debugSessions) {
    const result = await codebolt.debug.openDebugBrowser(session.url, session.port);
    console.log(`Debug session for ${session.url}: ${result.success ? 'opened' : 'failed'}`);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Development workflow
  const devUrl = "http://localhost:3000";
  const devPort = 9222;

  const debugBrowser = await codebolt.debug.openDebugBrowser(devUrl, devPort);

  if (debugBrowser.success) {
    console.log("Debug browser ready for development");
    console.log("Connect your debugger to:", debugBrowser.url);
    console.log("Debug port:", debugBrowser.port);

    // Continue with development workflow
  } else {
    console.error("Failed to start debug browser:", debugBrowser.error);
  }
});
```
