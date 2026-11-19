---
title: Virtual Workers
description: Give an agent a persistent identity and route work to it across threads and environments.
---

A Virtual Worker gives an agent a persistent identity and execution configuration. A worker accepts messages through its built-in chat or integrations. Its [routing profiles](../08e_external-integrations/02_routing-gateway.md#routing-profiles) determine when messages share a thread or environment and when each stream of work gets its own.

## Create a worker

1. Open **Virtual Workers** from the desktop panel selector and choose **New**.
2. Name the worker and select the agent that should handle its work.
3. Choose where the worker runs. The default is the current project on your computer. Select an environment provider if the work should run in a provisioned environment.
4. Review the available **Routing Profiles**, then select **Save revision**.

Select the worker to open its chat. In the worker details, **Recent invocations** shows the routing profile, selected environment and thread, dispatch status, and latest reply for each incoming message.
