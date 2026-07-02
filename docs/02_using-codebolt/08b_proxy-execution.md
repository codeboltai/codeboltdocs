---
sidebar_position: 7.81
title: Proxy Execution
description: Proxy Execution lets you choose which Codebolt capabilities run locally and which are forwarded through the Execution Gateway.
---

# Proxy Execution


Proxy Execution controls where selected Codebolt capabilities are handled when an agent asks the runtime to do work. By default, agent messages are handled locally by the Codebolt server. When Proxy Execution is enabled for a capability, matching messages are forwarded to the **Execution Gateway**, where a plugin can claim the request, handle it externally, and return the result to the agent.

![Proxy Execution Settings](/productImages/guardrails/proxy-execution.png)

## When to use it

Use Proxy Execution when you need selected actions to run through a controlled bridge instead of the active local runtime.

- Send LLM inference to another runtime or provider while keeping file and terminal actions local.
- Route sensitive capabilities through a plugin that applies extra policy, logging, or isolation.
- Mirror local execution events to another service without taking over the request.
- Coordinate desktop, cloud, and remote runtime setups where only some capabilities should cross the boundary.

## How it works

Each agent message has a message type, and many messages also have an action. Proxy Execution rules match those values and resolve the message to one of two paths:

- **Local**: the Codebolt server handles the request normally and returns the result to the agent.
- **Proxy**: the server forwards the request to the Execution Gateway. The plugin that has claimed the gateway handles the request and sends a reply back to the server.

If a request is handled locally, subscribed plugins can still receive an `executionGateway.notification` after the result is produced. If a request is proxied, the claiming plugin receives an `executionGateway.request` and must answer with `executionGateway.reply`.

Only one plugin can claim the Execution Gateway at a time. If a rule is set to proxy but no plugin has claimed the gateway, Codebolt falls back to local execution and logs a warning. If the claiming plugin disconnects, the claim is cleared.



## Build with Proxy Execution

For plugin authors, Proxy Execution is powered by the plugin SDK's `executionGateway` module. A gateway plugin can claim execution requests, handle proxied messages, send replies, or subscribe to notifications from locally handled actions.

- [Proxy Execution Gateway](../04_build-on-codebolt/05_plugins/08_proxy-execution-gateway/01_overview.md)
- [Plugin SDK lifecycle](../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md)
- [ExecutionGateway API reference](../05_reference/03_plugin-sdk/02_api-reference/executionGateway/index.md)
