---
sidebar_position: 4
title: Project Tool Integration
description: Follow a Linear agent session through the Linear Agent plugin and its worker.
---

# Project Tool Integration

The Linear Agent plugin connects Codebolt to a worker that receives Linear agent sessions. The worker delivers issue context to the plugin and sends progress and response activities back to the same Linear session.

## Connect the plugin

1. Start the `linear-agent-plugin` and open its configuration panel.
2. Enter the worker's WebSocket URL and app token. Save the settings and enable the connection.
3. Check the connection status in the panel. **Test Connection** checks whether the worker's health endpoint is reachable. A connected WebSocket is required to receive sessions.
4. Start a Linear agent session on a test issue. Look for plan updates and a response in that session.

## Follow a session in the code

In the plugin's `src/index.ts`, the worker client forwards new sessions and follow-up messages to the session handler. The following excerpt shows the two events to handle when modifying the integration.

```ts
workerClient.on('session:new', (event) => {
  handler.handleNewSession(event).catch(console.error);
});

workerClient.on('session:prompted', (event) => {
  handler.handlePrompted(event.sessionId, event.message).catch(console.error);
});
```

In `src/session/handler.ts`, the handler builds a prompt from the issue and sends it to Codebolt Chat. It reports progress through the worker. The final activity uses the session ID so that Linear can associate the response with the original request.

```ts
workerClient.sendActivity(sessionId, { type: 'response', body: agentResult });
workerClient.sendStateUpdate(sessionId, 'complete');
```

The handler can generate a fallback status message when Chat returns no reply text. A completed Linear session alone does not confirm that an agent performed work on the issue.

For integrations that route incoming messages to a selected agent and deliver replies through a registered channel, follow [Build a channel plugin](../05_plugins/04_chat-gateway/03_custom-channel-plugins.md).
