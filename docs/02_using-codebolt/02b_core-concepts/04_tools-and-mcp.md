---
sidebar_position: 4
title: Tools and MCP
description: How agents act on the world — built-in tools and external MCP servers sharing one model.
---

import McpTopology from '@site/src/components/diagrams/McpTopology';
import CapabilityStack from '@site/src/components/diagrams/CapabilityStack';

# Tools and MCP

Tools are the capabilities an agent can call — reading files, running terminal commands, searching the web, hitting external APIs. Codebolt's tool layer is powered by **MCP** (Model Context Protocol), so built-in tools and external MCP servers share the same model and are gated by the same allowlist.

<McpTopology />

## Built-in tools

Every agent gets access to a set of built-in tools — the filesystem, terminal, git, chat, browser, and more. These are always available (subject to the manifest allowlist) and require no setup.

## MCP servers

An **MCP server** is a process that exposes tools, resources, and prompts over the Model Context Protocol. Install one and its tools become callable by any agent whose manifest permits them. MCP is what lets you extend Codebolt with anything from a database client to a third-party API without writing framework code.

## Capabilities

A **capability** is a packaged unit of behaviour — a bundled set of tools, prompts, and sometimes skills that an agent can be granted. Capabilities are how you give an agent a coherent ability (e.g. "can browse the web and read PDFs") instead of granting tools one by one.

<CapabilityStack />

![Install an MCP server](/productImages/agent_extensions/install_mcp_server.png)

→ **Read the full concept pages: [Tools and MCP](../../02_concepts/03_the-agent/02_tools-and-mcp.md) · [Capabilities](../../02_concepts/03_the-agent/03_capabilities.md)**

## See also

- [Agents](./03_agents.md)
- [Hooks and Processors](./05_hooks-and-processors.md)
