---
sidebar_position: 4
title: API Reference
description: "Full API reference: Capability API"
---

# API Reference

The capability system is accessible through multiple interfaces. This page provides a quick overview of each — for full method signatures and examples, see the dedicated reference docs linked below.

---

## Codebolt JS SDK

The primary way agents interact with capabilities. Import the SDK and use `codebolt.capability.*`:

```ts
import codebolt from '@codebolt/codeboltjs';
```

### Available methods

| Method | Description |
|--------|-------------|
| `listCapabilities(filter?)` | List all capabilities, optionally filtered by type/tags/author |
| `listCapabilitiesByType(type)` | List capabilities of a specific type |
| `listSkills()` | List all skills |
| `listPowers()` | List all powers |
| `listTalents()` | List all talents |
| `getCapabilityDetail(name, type?)` | Get full detail for a capability |
| `getCapabilitiesByTag(tag)` | List capabilities with a specific tag |
| `getCapabilitiesByAuthor(author)` | List capabilities by author |
| `listExecutors()` | List all registered executors |
| `startCapability(name, type, params?, timeout?)` | Start a capability execution |
| `startSkill(name, params?, timeout?)` | Start a skill |
| `startPower(name, params?, timeout?)` | Start a power |
| `startTalent(name, params?, timeout?)` | Start a talent |
| `stopCapability(executionId)` | Stop a running execution |
| `getExecutionStatus(executionId)` | Check execution status |

> **Full API reference:** [Capability API](/docs/reference/codeboltjs/api-access/capability)

---

## Agent tools

The SDK also exposes capabilities as **agent tools** that LLMs can call directly:

| Tool name | Description | Required params |
|-----------|-------------|-----------------|
| `capability_list` | List all capabilities with optional filter | — |
| `capability_list_skills` | List all skills | — |
| `capability_list_powers` | List all powers | — |
| `capability_get_detail` | Get capability info (without executing) | `capabilityId` |
| `capability_detail` | Start a capability and return results | `capabilityId`, `capabilityType` |
| `skill_detail` | Start a skill and return results | `skillId` |
| `capability_get_status` | Get status of a running execution | `executionId` |
| `capability_stop` | Stop a running execution | `capabilityId` (execution ID) |

---

## REST API

All endpoints are under `/api/capability/`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/capability/list` | List capabilities (query: `type`, `tags`, `author`) |
| GET | `/api/capability/detail/:name` | Get capability detail (query: `type`) |
| GET | `/api/capability/types` | Get capability types in use |
| POST | `/api/capability/create` | Create a new capability |
| DELETE | `/api/capability/capability` | Delete a capability (body: `name`, `type`) |
| GET | `/api/capability/executors` | List all executors |
| POST | `/api/capability/executors/create` | Create a new executor |
| DELETE | `/api/capability/executor` | Delete an executor (body: `name`) |
| POST | `/api/capability/refresh` | Re-scan filesystem and refresh registry |
| GET | `/api/capability/stats` | Get registry stats (counts, types, initialized) |
| POST | `/api/capability/download` | Download capability from marketplace |
| POST | `/api/capability/download-executor` | Download executor from marketplace |

---

## WebSocket events

Connect to the capability WebSocket for real-time updates. On connection, the server sends an `initial` message with all current data.

### Server → Client

| Event type | When |
|-----------|------|
| `initial` | On connection — sends capabilities, executors, types, activeExecutions |
| `capabilityChanged` | Capability installed, removed, or updated |
| `executorChanged` | Executor installed, removed, or updated |
| `capabilityExecutionStarted` | Execution begins |
| `capabilityExecutionResult` | Execution completes or fails |
| `registryRefreshed` | Registry re-scanned |

### Client → Server

Send a JSON message with an `action` field:

| Action | Description |
|--------|-------------|
| `getCapabilities` | Get all capabilities (optional `filter`) |
| `getExecutors` | Get all executors |
| `getCapabilityTypes` | Get types in use |
| `refresh` | Re-scan and refresh registry |
| `getActiveExecutions` | Get currently running executions |

---

## See also

- [Capability API Reference](/docs/reference/codeboltjs/api-access/capability) — full SDK method docs
- [Side Execution API Reference](/docs/reference/codeboltjs/api-access/sideExecution) — side execution methods
- [Execution Flow](./03_activation.mdx)
- [Capability Executors](./06_executors.mdx)
- [Marketplace and Publishing](./05_publishing.md)
