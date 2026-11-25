---
displayed_sidebar: getStartedSidebar
sidebar_position: 9
title: Event Log
description: Understand the structured activity recorded in a CodeBolt Event Log instance.
---

# Event Log

An Event Log instance holds structured events for a project. Use it to inspect activity that an agent or workflow recorded. Entries can include a payload, timestamp, stream ID, and metadata.

Open **Context → Event Log** from the desktop bottom bar. Select an instance and expand the events you want to inspect. To fetch events from code, use the [structured query API](../../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md).

To compare behavior after changing an agent, [repeat the original prompt](../../03_guides/08_advanced/replay-an-agent-run.md) and compare the two runs.
