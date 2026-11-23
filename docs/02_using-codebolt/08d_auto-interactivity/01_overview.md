---
sidebar_position: 1
title: Automation Overview
description: Run reusable actions manually, at scheduled times, or in response to events.
---

# Automation

Automations run reusable actions such as sending a notification, starting an agent, or running an action block. Start them manually, schedule them, or have them respond to events.

## How it works

Open **Automations** in the desktop panel selector. Each automation has a **Trigger** that determines when it runs and an **Action** that determines what it does.

## Tools in this section

| Tool | What triggers it | What happens |
|---|---|---|
| [Webhooks](./02_webhooks.md) | Incoming HTTP POST to a unique URL | Gateway routes the payload to an agent |
| [Calendar & Scheduled Events](./03_calendar-events.md) | Calendar entries and scheduled automation occurrences | Displays project events and scheduled work |
| [Hooks](./04_hooks.md) | A configured lifecycle event | Runs the hook handler for that event |

## Manual & Scheduled Automations

Choose **Manual** as the trigger for an automation you start on demand with **Run**. Choose **Schedule** to run it once at a set time, at a repeating interval, or on a cron schedule. Save the trigger and action, then enable the automation for scheduled execution. For hosted runs, see [Cloud Scheduled Tasks](../02_surfaces/06_cloud/04_running-agents/07_scheduled-tasks.md).

## Event Triggers

Choose **Event** as the trigger and select the event that should start the automation. Save and enable it to run the configured action when that event occurs. See [Hooks](./04_hooks.md#trigger-events) for lifecycle events that can trigger hooks.

## The Routing Gateway

For incoming messages such as webhooks, the Routing Gateway can decide:

- **Which agent** receives the message (based on source configuration)
- **Which thread** to use — a new thread per message, a shared thread per user, a single global thread, or an existing thread
- **How to reply** — if a webhook provides a `targetUrl`, the agent's response is POSTed back to it

See [External Integrations → Routing Gateway](../08e_external-integrations/02_routing-gateway.md) for gateway configuration.
