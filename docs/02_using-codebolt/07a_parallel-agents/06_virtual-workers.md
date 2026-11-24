---
title: Virtual Workers
description: Create a Virtual Worker, chat with it, configure where its agent runs, and trace how incoming messages reach a thread.
---

# Virtual Workers

A Virtual Worker gives people and integrations a named contact for an agent. For example, you can create a **Docs Reviewer**, select an agent with access to your repository, and return to the worker whenever you have a documentation question. The worker keeps its identity and configuration across requests. To launch several agent instances for a shared set of jobs, use [swarm workers](../07_multi-agent-usage/02_running-a-swarm.md).

## Create a worker

1. In the desktop bottom bar, open **System → Virtual Workers** and select **New**.
2. Enter a **Name**, such as `Docs Reviewer`. Under **Agent**, choose the agent that will answer requests. The picker can show installed, local, remix, and marketplace agents. Select an agent you can run in this project.
3. Leave **Execution location** set to **Current project on this computer (default)** for this example. The agent will work in the current project. You can also select a configured environment provider. [Environment providers](../08a_environments/03_environment-providers.md)
4. Select **Save revision**. The worker appears in the left-hand list with its revision number, and its chat opens.

## Send a request and inspect the work

Send a question that the selected agent can answer from the project. For example:

> Read the README and find the first command a new contributor is asked to run. Quote the command and name the section where you found it.

Read the reply in the worker conversation. Then send a follow-up such as “What prerequisite does that section mention?” The worker’s built-in chat routes follow-ups in the same conversation to the same work thread while its execution location stays the same.

Use **View work** in the chat header when you want to see the underlying CodeBolt thread. The button appears once a work thread is available. To inspect or edit the worker configuration, select the worker’s name above **View worker details**. Use **Back to chat** to return.

## Route messages from an integration

A routing profile tells CodeBolt which incoming messages belong together. In the worker details, **Routing Profiles → Change** controls which integration profiles this worker accepts. New workers accept all available profiles by default. Clear a profile to exclude it, then select **Save revision**. The worker’s built-in chat has its own profile and remains available.

For example, when a configured Slack integration sends messages to this worker using the **Slack conversations** profile, the profile groups environments by Slack workspace. Replies in the same Slack thread share a CodeBolt work thread. For messages without a Slack thread ID, the channel identifies the thread instead. Selecting a profile on the worker controls acceptance. Configure the integration to deliver messages to that worker, and edit the routing profile if you want different grouping. [Routing profiles](../08e_external-integrations/02_routing-gateway.md#routing-profiles)

## Change the execution location or memory

**Execution location** controls where the agent’s tools run. To move work from the current project to a provider, open the worker details, choose the provider, and select **Save revision**. Subsequent work uses a separate thread. Earlier threads are retained, so you can still inspect what happened in the previous location.

**Advanced → Additional memory definitions** lets you enter comma-separated IDs of existing Persistent Memory definitions. CodeBolt provisions shared memory for the worker in this project. Its built-in chat uses that memory by default. An integration can opt in when it sends a message. Use this setting when the worker needs access to stored information across conversations. [Persistent Memory](../05d_memory/05_persistent-memory.md)

## Trace an incoming message

Open **View worker details → Recent invocations** and find the incoming text. The panel shows up to 20 entries. Each entry connects a message to its routing decision and execution.

| If you want to know… | Look at |
|---|---|
| Which rule handled this message? | The routing profile name and revision, followed by the scope values received from the source. |
| Why did two requests share a conversation? | Compare their **CodeBolt thread** fields. Each entry shows whether the thread was created or reused. **Technical details** contains the exact thread ID. |
| Where did the agent run? | **Environment** shows the destination and whether it was created or reused. **Agent** identifies the agent selected for the work. |
| Did the agent answer? | Check the execution status, **Latest reply** when present, and any displayed error. **Technical details** includes message, dispatch, and execution IDs for tracing. |

If built-in chat works but an integration message is rejected, check that the worker accepts the integration’s profile, that the profile is enabled, and that the integration supplies its required scope values. A rejected message can fail these checks before an invocation appears in the panel.
