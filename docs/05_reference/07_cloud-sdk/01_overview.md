---
title: Cloud SDK
description: Connect CodeBolt runtimes and integrations to CodeBolt Cloud.
---

`@codebolt/cloud-sdk` provides clients for cloud connections, runtime identity, artifact uploads, and preview providers. The SDK exposes separate entry points for each workflow.

| Entry point | Use it to |
| --- | --- |
| `@codebolt/cloud-sdk/proxy` | Register a runtime with the cloud proxy gateway and exchange messages. |
| `@codebolt/cloud-sdk/artifacts` | Upload artifacts and their files to CodeBolt Cloud. |
| `@codebolt/cloud-sdk/preview` | Register a preview provider and respond to requests for artifact previews. |

## Preview providers

Use `createPreviewProvider` from `@codebolt/cloud-sdk/preview` to register the provider and declare the artifact types it supports. Handle incoming preview requests with `onPreviewRequest`. A request can be acknowledged, completed with a preview URL, or marked as failed.

See [Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md) for how runtimes and providers appear in the cloud portal.
