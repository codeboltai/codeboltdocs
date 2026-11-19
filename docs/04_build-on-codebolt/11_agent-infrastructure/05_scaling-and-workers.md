---
sidebar_position: 5
title: Scaling and Workers
description: Choose how to run more agent work locally or across execution environments.
---

# Scaling and Workers

For more work on one machine, use [Local Scaling](../../01_get-started/04_core-concepts/06_local-scaling.md). Run independent tasks in separate threads, use [Background Agents](../../02_using-codebolt/07a_parallel-agents/04_background-agent.md) for tracked background work, and use jobs to coordinate shared work. Monitor agent runs and environment activity from the desktop app.

Use [Virtual Workers](../../02_using-codebolt/07a_parallel-agents/06_virtual-workers.md) when you need a persistent identity that routes messages to an agent, thread, and execution environment.

When work needs a separate machine or sandbox, use a supported [environment provider](../../02_using-codebolt/08a_environments/03_environment-providers.md) or the [Cloud runtime workflow](../../01_get-started/04_core-concepts/07_cloud-scaling.md).

## Log ingestion

The repository's Cloud log-ingest worker accepts log batches over HTTP and forwards them to a Cloudflare Pipeline. The standalone server's Cloudflare log provider uses that endpoint when configured.
