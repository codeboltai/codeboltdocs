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
- calendar events with a recipient or an associated automation
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
- desktop event types `generic`, `note`, `meeting`, and `system-check`
- participants
- RSVP state
- reminders
- tags and search
- completion state
- triggered-event queries for agents

### How calendar works

Calendar stores manual events in the project. Agents can use the [Calendar API](../../05_reference/02_codeboltjs/10_api-access/calendar/index.md) to list events, query ones that are due, and process them. When a due event is processed and marked complete, Codebolt can run the linked automation or deliver the event instruction to its configured recipient.

For automatic scheduled runs, create a schedule in [Automations](../08d_auto-interactivity/01_overview.md). Calendar can also show occurrences of scheduled automations configured for calendar display.

## See also

- [Mail & Inbox](../07c_agent-coordination/03_mail-inbox.md)
- [Calendar & Scheduled Events](../08d_auto-interactivity/03_calendar-events.md)
- [Communication Internals](../../04_build-on-codebolt/07b_subsystems/11_communication.md)
