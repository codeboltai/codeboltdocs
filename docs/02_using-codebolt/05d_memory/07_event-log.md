---
sidebar_position: 7
title: Event Log
description: Inspect, append, and query structured events in a project log instance.
---

# Event Log

Open **Context → Event Log** from the desktop bottom bar. Select an instance to inspect the events recorded there.

## What it shows

Events have a type and creation time. A stream ID can group events together. Expand an event to read its payload and metadata.

## Querying events

Click **Filters**, enter an **Event type** or **Stream ID**, and click **Apply**. For advanced queries and reduce operations, use the [structured query API](../../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md).

To record a test event, select **Add event**, enter its type and payload, and click **Append Event**. Expand the new entry to confirm its contents.

## Relation to memory pipelines

A [Persistent Memory pipeline](./05_persistent-memory.md) can query an Event Log instance with a `log_search` step. Choose the instance that contains the records you want to retrieve.
