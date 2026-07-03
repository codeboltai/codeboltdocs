---
sidebar_position: 4
title: Project Tools
description: Project tools — issue trackers, code review platforms, and knowledge bases — are a natural fit for agent automation
---

# Project Tool Integrations

Project tools — issue trackers, code review platforms, and knowledge bases — are a natural fit for agent automation. Agents can read issues from Linear, create pull requests on GitHub, update tickets in Jira, or write to Notion pages as part of their normal task flow.

## Integration approaches

There are two ways to connect agents to project tools:

![Project tool integration flow](/diagrams/project-tools-integration-flow.svg)

### 1. MCP servers (recommended)

The simplest path is an **MCP server** for the tool. MCP servers expose tool capabilities that agents can call directly — `create_issue`, `list_prs`, `update_page`, etc. Install the relevant MCP server and the agent gains access to the tool's API without any custom code.

See [Agent Extensions → MCP Server](../04b_agent-extensions/06_mcp-server.md) for setup instructions. Popular MCP servers include:

| Tool | MCP server |
|---|---|
| GitHub | `@modelcontextprotocol/server-github` |
| Linear | `linear-mcp-server` |
| Jira | `jira-mcp-server` |
| Notion | `@modelcontextprotocol/server-notion` |
| GitLab | `gitlab-mcp-server` |

### 2. Webhook-driven workflows

For event-driven integrations — where a tool event triggers an agent — use **webhooks**:

1. Create a Codebolt webhook endpoint (see [Automation → Webhooks](../08d_auto-interactivity/02_webhooks.md))
2. Configure the external tool to POST to that endpoint when events occur
3. The Routing Gateway delivers the payload to your agent

**Example — Linear issue created → agent picks it up:**

Configure the Linear webhook to POST to your Codebolt webhook URL. Set the webhook's `targetUrl` to the Linear API endpoint for adding comments, so the agent's reply is posted back to the issue automatically.

## Common patterns

### Auto-triage incoming issues

A Routing Gateway webhook receives new Linear or Jira issues, routes them to a triage agent, and the agent applies labels, sets priority, and adds an initial comment — all without human involvement.

### PR review on push

A GitHub webhook fires when a PR is opened. The agent reads the diff (via the GitHub MCP server), reviews it, and posts a review comment back to the PR.

### Daily standup from task data

A calendar event fires every morning. The agent queries Linear (via MCP) for in-progress issues, formats a standup summary, and posts it to a Slack channel (via a channel plugin).

### Issue-to-task sync

When a Linear issue moves to "In Progress", a webhook triggers an agent that creates a matching Codebolt task and spins up a sub-agent to begin work.

## Authentication

Most project tools use OAuth or personal access tokens. Store credentials as **environment variables** in your project's [Environment configuration](../08a_environments/02_configuring-environments.md) — they are encrypted at rest and injected into the agent process at runtime.

```
LINEAR_API_KEY=lin_api_...
GITHUB_TOKEN=ghp_...
JIRA_API_TOKEN=...
NOTION_API_KEY=secret_...
```

MCP servers read these environment variables automatically when they start.
