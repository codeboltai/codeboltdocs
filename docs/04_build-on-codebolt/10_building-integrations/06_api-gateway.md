---
sidebar_position: 6
title: API Gateway
description: Expose Codebolt agent runs over HTTP so external systems, scripts, and services can trigger agents without knowing the WebSocket protocol.
---

# API Gateway

Expose Codebolt agent runs over HTTP so external systems, scripts, and services can trigger agents without knowing the WebSocket protocol.

## When to Use

- You need a simple REST endpoint that triggers an agent run.
- External services need to call Codebolt from a webhook or script.
- You want to wrap Codebolt behind custom authentication.
- You're building a backend service that orchestrates agent runs.

## Approach: REST API

The Codebolt server exposes a full REST API. External systems can call it directly to manage agents, tasks, projects, and more.

### Start an agent

```bash
curl -X POST http://localhost:2719/agent/startAgent \
  -H "Content-Type: application/json" \
  -d '{
    "agentName": "code-reviewer"
  }'
```

### Send a prompt to an agent

For a Chat request, use Codebolt Client CLI with the installed agent’s ID:

```bash
codebolt-client -p 2719 chat send --agent "$AGENT_ID" --message "Review the latest changes"
```

### Search tasks

```bash
curl 'http://localhost:2719/tasks/search?status=pending&limit=10'
```

### Get project info and Git status

```bash
curl http://localhost:2719/project/
curl -X POST http://localhost:2719/git/status \
  -H 'Content-Type: application/json' \
  -d '{"projectPath":"/absolute/path/to/project"}'
```

To commit selected files, send their paths and a message with the project path.

```bash
curl -X POST http://localhost:2719/git/commit \
  -H 'Content-Type: application/json' \
  -d '{"projectPath":"/absolute/path/to/project","filePaths":["README.md"],"message":"Update README"}'
```

To inspect the open project, use the Client SDK’s `projects.getRoot()`.

## Approach: Client SDK Wrapper

Build a custom API server that wraps the Client SDK and adds your own auth, routing, or business logic.

```typescript
import express from 'express';
import { CodeBoltClient } from '@codebolt/client-sdk';

const app = express();
const client = new CodeBoltClient({ host: 'localhost', port: 2719 });

app.use(express.json());

const gatewayKey = process.env.API_KEY;
if (!gatewayKey?.trim()) throw new Error('Set API_KEY before starting the gateway');

// Require the configured credential on every request.
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== gatewayKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Start the named agent
app.post('/api/run', async (req, res) => {
  const { agentName } = req.body ?? {};
  if (typeof agentName !== 'string' || !agentName.trim()) {
    return res.status(400).json({ error: 'agentName is required' });
  }
  const upstream = await fetch('http://localhost:2719/agent/startAgent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentName }),
  });
  res.status(upstream.status).send(await upstream.text());
});

// Get tasks
app.get('/api/tasks', async (req, res) => {
  const result = await client.tasks.search({ limit: 50 });
  res.json(result);
});

app.listen(3000, () => console.log('API gateway on :3000'));
```

This gives you:
- Custom authentication (API keys, OAuth, etc.)
- Route different requests to different agents.
- Rate limiting, logging, and monitoring.
- A clean public API that hides Codebolt internals.

## Approach: Channel Plugin

For event-driven integrations (webhooks from external services), build a channel plugin:

1. Receive the webhook in your plugin.
2. Route to an agent via `plugin.gateway.routeMessage()`.
3. Handle the reply via `plugin.gateway.onReply()`.
4. Post the result back to the external service.

See [Project Tool Integration](./04_project-tool-integration.md) for this pattern.

## See Also

- [Client SDK](../04_custom-uis/02_client-sdk.md) — full API reference
- [Chat Integrations](./02_chat-integrations/01_overview.md) — channel plugin pattern
- [Headless Prompt](../../02_using-codebolt/02_surfaces/04_cli/03_cli-headless/03_headless-prompt.md#ci-and-automation) — run a Codebolt prompt from a pipeline job
