---
sidebar_position: 5
title: Mail and Calendar
description: Codebolt includes project-local mail and calendar systems for agent coordination, scheduled events, reminders, and time-based agent workflows.
---

# Mail and Calendar

Codebolt includes built-in **Mail** and **Calendar** systems for coordinating agents, users, and scheduled work inside a project.

In the current application, Mail and Calendar are local Codebolt coordination systems stored inside the active project.

Use them when you need:

- agents to send asynchronous messages to users or other agents
- persistent threaded communication outside a single chat
- scheduled reminders and time-based work
- calendar events that notify participants when they are due
- agents to query triggered events and mark them complete
- file reservation messages for multi-agent coordination

![Mail and Calendar](/productImages/integrations/calender.png)

## Mail

Mail is a project-local threaded messaging system. It works like email at the product level, but messages stay inside Codebolt.

Open it from the Mail panel. Threads have a subject, participants, message history, unread state, and status.

Mail can be used for:

- agent-to-agent messages
- agent-to-user messages
- group threads
- reports or summaries sent asynchronously
- acknowledgements for important messages
- file references attached to a message
- file reservations and conflict checks between agents

### Agent mail actions

Agents can use mail through Codebolt's agent service layer. Common actions include:

- register or list mail agents
- create, find, list, update, or archive threads
- send or reply to messages
- fetch an agent inbox
- mark messages as read
- acknowledge messages
- search messages
- summarize a thread
- reserve files, release reservations, force reservations, and check conflicts

This makes Mail useful for multi-agent work where agents need to coordinate without sharing the same chat turn.

## Calendar

Calendar is a project-local scheduled event system. Events are stored inside the active project and can be created from the Calendar panel or by agents.

Calendar supports:

- one-time events
- instant events, where start and end time are the same
- duration-based events
- all-day events
- event types such as `generic`, `note`, `meeting`, `system-check`, and agent-oriented task events
- participants
- RSVP state
- reminders
- tags and search
- completion state
- triggered-event queries for agents

### How calendar works

At a high level:

1. A user or agent creates a calendar event.
2. Codebolt stores the event in the active project.
3. Codebolt updates the calendar index.
4. The calendar scheduler checks events every minute.
5. When a reminder is due, Codebolt sends a Mail message to the event participants.
6. When an event starts, Codebolt sends a Mail message, emits calendar events, and publishes an application event.

```text
<project>/.codebolt/calendar/
  calendar-index.json
  events/
```

### Agent calendar actions

Agents can use calendar through Codebolt's agent service layer. Common actions include:

- create an event
- update or delete an event
- get one event
- list events with filters
- get events in a date range
- get upcoming events
- get triggered events
- get triggered events and mark them complete
- mark one or more events complete
- RSVP to an event
- get scheduler status

## How mail and calendar work together

Calendar uses Mail for participant notifications.

When a reminder is due, the scheduler sends a Mail thread from **Calendar System**. When an event starts, it sends another Mail message to the creator and participants.

This means agents can use Mail as the human-readable record of calendar activity, while Calendar remains the structured source of scheduled events.

```text
Calendar event
  -> reminder becomes a Mail message
  -> event start becomes a Mail message
  -> event start emits an application event
  -> agents can query triggered events and mark them complete
```

## Current scope

This page covers Codebolt's built-in project-local Mail and Calendar systems. It does not describe external account sync or third-party mail/calendar providers.

Recurring fields and cron expressions are stored and validated, but the current calendar storage service does not generate recurring event instances by itself.

There is also a calendar gateway bridge for routing `agent-task` calendar events into the routing gateway, but the bridge must be started by server startup code to be active.

## See also

- [Mail & Inbox](../07c_agent-coordination/03_mail-inbox.md)
- [Calendar & Scheduled Events](../08d_auto-interactivity/03_calendar-events.md)
- [Custom Tools](../04b_agent-extensions/07_custom-tools.md)
- [Communication Internals](../../04_build-on-codebolt/07b_subsystems/11_communication.md)
- [Hooks](../08d_auto-interactivity/04_hooks.md)
