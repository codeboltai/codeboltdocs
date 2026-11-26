---
sidebar_position: 3
title: Calendar & Scheduled Events
description: View project events and scheduled automation occurrences in the desktop Calendar.
---

# Calendar & Scheduled Events

![Calendar panel with the date navigation, event filters, and schedule](/img/desktop/calendar-events.webp)

Open **Tools → Calendar** to view project events and scheduled automation occurrences.

## Creating an event

Select a time slot or use the add button. Set a title and start time. Choose **Generic**, **Note**, **Meeting**, or **System Check**. Add a duration, agenda for a meeting, tags, or reminder details if needed.

The action can notify a recipient or reference an existing automation. For manual calendar events, those actions run when a client processes due events through the Calendar API and marks them complete.

## Recurring events

The event editor can store a cron expression with a recurring event. To run an agent or Action Block automatically on a recurring schedule, create an enabled **Schedule** in [Automations](./01_overview.md).

## Calendar views

Switch between **Month**, **Week**, **Day**, **Hour**, and **Schedule**. Use the search box and event-type filter to narrow the results. Scheduled automations appear when their calendar display option is enabled.

For a hosted schedule, see [Cloud Scheduled Tasks](../02_surfaces/06_cloud/04_running-agents/07_scheduled-tasks.md).
