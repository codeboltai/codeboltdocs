---
sidebar_label: Overview
sidebar_position: 1
title: Gateway Commands
---

The CLI registers commands from the built-in gateway tool registry. Start the CodeBolt server, then use `codebolt command --help` to list the namespaces available in your CLI. Use `--cli-connect-port` to select the server port, `--host` for the gateway host, or `--json` for raw output.

The low-level API is available through `codebolt command api --help`.

| Namespace | Subcommands |
| --- | ---: |
| `actionBlock` | 3 |
| `admin` | 1 |
| [`agent`](./agents.md) | 4 |
| `agentDeliberation` | 8 |
| `agentEventQueue` | 3 |
| `agentPortfolio` | 14 |
| `artifact` | 5 |
| `asyncTask` | 2 |
| `autoTesting` | 18 |
| `backgroundChildThreads` | 4 |
| `browser` | 33 |
| `calendar` | 8 |
| `canvas` | 9 |
| `capability` | 8 |
| `codebaseSearch` | 2 |
| `codemap` | 7 |
| `codeutils` | 4 |
| `completion` | 1 |
| `context` | 5 |
| `contextAssembly` | 5 |
| `contextCompaction` | 6 |
| `contextRuleEngine` | 7 |
| `dbmemory` | 2 |
| `debug` | 2 |
| `docs` | 7 |
| `environment` | 15 |
| `episodicMemory` | 11 |
| `eventLog` | 9 |
| `executionPlan` | 34 |
| `featurePlan` | 9 |
| `flags` | 13 |
| `fs` | 17 |
| [`git`](./git.md) | 11 |
| `groupFeedback` | 7 |
| `history` | 2 |
| [`job`](./jobs.md) | 13 |
| `knowledge` | 12 |
| `knowledgeGraph` | 28 |
| `kvStore` | 3 |
| [`llm`](./llm.md) | 7 |
| `mail` | 23 |
| `mcp` | 4 |
| `memory` | 21 |
| `memoryIngestion` | 2 |
| `note` | 10 |
| `outputparsers` | 6 |
| `persistentMemory` | 8 |
| `planning` | 15 |
| [`project`](./projects.md) | 5 |
| `projectStructureUpdateRequest` | 14 |
| `rag` | 2 |
| `review` | 8 |
| `reviewMergeRequest` | 16 |
| `roadmap` | 3 |
| `search` | 2 |
| `state` | 5 |
| [`task`](./tasks.md) | 7 |
| `terminal` | 7 |
| [`thread`](./threads.md) | 16 |
| [`todo`](./todos.md) | 6 |
| `tokenizer` | 2 |
| `tools` | 2 |
| `utils` | 1 |
| `vectordb` | 4 |
| `webFetch` | 1 |
| `webSearch` | 2 |
