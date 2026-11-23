---
sidebar_position: 4
title: Project Tools
description: Connect project tools through configured MCP servers and webhooks.
---

# Project Tool Integrations

Connect an issue tracker, source-control service, or knowledge base with an MCP server or a webhook integration.

## MCP servers

Install a server that provides the actions your agent needs, such as listing issues or adding a comment. Configure the credentials that the server requires in its MCP configuration. Tool names and permissions depend on the server you install. See [MCP Server](../04b_agent-extensions/06_mcp-server.md) for setup.

## Webhook-driven workflows

Send events to [Routing Gateway → Webhooks](../08d_auto-interactivity/02_webhooks.md) from a sender that can attach Codebolt's shared-secret header.

For example, use an integration to forward a new issue to a triage agent. Include the issue ID and the requested action in the message. To let the agent update the issue, give it access to a configured issue-tracker tool. A webhook **Target URL** receives Codebolt's signed callback envelope. An adapter can translate that envelope into the issue tracker's API request and supply its credentials.

## Scheduled summaries

Create a [scheduled automation](../08d_auto-interactivity/01_overview.md) that starts an agent with a summary instruction. The agent can read project status through a configured MCP server. Set up a channel integration separately if your workflow needs to post the result to a chat platform.
