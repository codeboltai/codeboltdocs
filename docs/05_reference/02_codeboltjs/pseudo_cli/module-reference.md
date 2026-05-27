---
sidebar_label: "Module Reference"
sidebar_position: 3
title: "Pseudo CLI Module Reference"
description: "Module inventory for the CodeboltJS pseudo CLI registry."
---

The pseudo CLI registry is defined in `packages/codeboltjs/src/tools/pseudo-cli/commands.ts`. It currently exposes 57 top-level modules.

Use this page as the index and use the per-module pages for the actual command reference. Each module page includes the command list, parameter tables, required flags, and command syntax generated from the registry source.

## Module Docs

| Module | Actions | Direct API docs |
| --- | ---: | --- |
| [`git`](./modules/git.md) | 11 | [SDK docs](../10_api-access/git/index.md) |
| [`fs`](./modules/fs.md) | 14 | [SDK docs](../10_api-access/fs/index.md) |
| [`terminal`](./modules/terminal.md) | 1 | [SDK docs](../10_api-access/terminal/index.md) |
| [`browser`](./modules/browser.md) | 12 | [SDK docs](../10_api-access/browser/index.md) |
| [`agent`](./modules/agent.md) | 4 | [SDK docs](../10_api-access/agent/index.md) |
| [`thread`](./modules/thread.md) | 10 | [SDK docs](../10_api-access/thread/index.md) |
| [`task`](./modules/task.md) | 7 | [SDK docs](../10_api-access/taskplaner/index.md) |
| [`llm`](./modules/llm.md) | 2 | [SDK docs](../10_api-access/llm/index.md) |
| [`chat`](./modules/chat.md) | 5 | [SDK docs](../10_api-access/chat/index.md) |
| [`memory`](./modules/memory.md) | 12 | [SDK docs](../10_api-access/memory/index.md) |
| [`dbmemory`](./modules/dbmemory.md) | 2 | [SDK docs](../10_api-access/dbmemory/index.md) |
| [`episodic`](./modules/episodic.md) | 8 | [SDK docs](../10_api-access/episodicMemory/index.md) |
| [`pmemory`](./modules/pmemory.md) | 6 | [SDK docs](../10_api-access/persistentMemory/index.md) |
| [`orchestrator`](./modules/orchestrator.md) | 8 | [SDK docs](../10_api-access/orchestrator/index.md) |
| [`job`](./modules/job.md) | 13 | [SDK docs](../10_api-access/job/index.md) |
| [`env`](./modules/env.md) | 14 | Not available |
| [`mcp`](./modules/mcp.md) | 6 | [SDK docs](../10_api-access/mcp/index.md) |
| [`project`](./modules/project.md) | 5 | [SDK docs](../10_api-access/project/index.md) |
| [`state`](./modules/state.md) | 5 | [SDK docs](../10_api-access/state/index.md) |
| [`todo`](./modules/todo.md) | 6 | [SDK docs](../10_api-access/todo/index.md) |
| [`calendar`](./modules/calendar.md) | 7 | [SDK docs](../10_api-access/calendar/index.md) |
| [`hook`](./modules/hook.md) | 7 | [SDK docs](../10_api-access/hook/index.md) |
| [`history`](./modules/history.md) | 2 | [SDK docs](../10_api-access/history/index.md) |
| [`search`](./modules/search.md) | 2 | [SDK docs](../10_api-access/search/index.md) |
| [`codemap`](./modules/codemap.md) | 5 | [SDK docs](../10_api-access/codemap/index.md) |
| [`capability`](./modules/capability.md) | 7 | [SDK docs](../10_api-access/capability/index.md) |
| [`kg`](./modules/kg.md) | 10 | [SDK docs](../10_api-access/knowledgeGraph/index.md) |
| [`kv`](./modules/kv.md) | 5 | [SDK docs](../10_api-access/kvStore/index.md) |
| [`eventlog`](./modules/eventlog.md) | 6 | [SDK docs](../10_api-access/eventLog/index.md) |
| [`swarm`](./modules/swarm.md) | 11 | [SDK docs](../10_api-access/swarm/index.md) |
| [`mail`](./modules/mail.md) | 7 | [SDK docs](../10_api-access/mail/index.md) |
| [`rmr`](./modules/rmr.md) | 11 | [SDK docs](../10_api-access/reviewMergeRequest/index.md) |
| [`tokenizer`](./modules/tokenizer.md) | 2 | [SDK docs](../10_api-access/tokenizer/index.md) |
| [`vectordb`](./modules/vectordb.md) | 3 | [SDK docs](../10_api-access/vectordb/index.md) |
| [`debug`](./modules/debug.md) | 2 | [SDK docs](../10_api-access/debug/index.md) |
| [`codeutils`](./modules/codeutils.md) | 3 | [SDK docs](../10_api-access/codeutils/index.md) |
| [`roadmap`](./modules/roadmap.md) | 7 | [SDK docs](../10_api-access/roadmap/index.md) |
| [`reqplan`](./modules/reqplan.md) | 5 | [SDK docs](../10_api-access/requirementPlan/index.md) |
| [`parse`](./modules/parse.md) | 5 | [SDK docs](../10_api-access/outputparsers/index.md) |
| [`eventqueue`](./modules/eventqueue.md) | 6 | Not available |
| [`agentExecutionPhase`](./modules/agent-execution-phase.md) | 3 | [SDK docs](../10_api-access/agentExecutionPhase/index.md) |
| [`deliberation`](./modules/deliberation.md) | 7 | [SDK docs](../10_api-access/agentDeliberation/index.md) |
| [`portfolio`](./modules/portfolio.md) | 5 | [SDK docs](../10_api-access/agentPortfolio/index.md) |
| [`actionblock`](./modules/actionblock.md) | 3 | [SDK docs](../10_api-access/actionBlock/index.md) |
| [`actionplan`](./modules/actionplan.md) | 8 | [SDK docs](../10_api-access/actionPlan/index.md) |
| [`testing`](./modules/testing.md) | 18 | [SDK docs](../10_api-access/autoTesting/index.md) |
| [`context`](./modules/context.md) | 5 | [SDK docs](../10_api-access/contextAssembly/index.md) |
| [`rule-engine`](./modules/rule-engine.md) | 7 | [SDK docs](../10_api-access/contextRuleEngine/index.md) |
| [`crawler`](./modules/crawler.md) | 5 | [SDK docs](../10_api-access/crawler/index.md) |
| [`file-intent`](./modules/file-intent.md) | 11 | [SDK docs](../10_api-access/fileUpdateIntent/index.md) |
| [`feedback`](./modules/feedback.md) | 7 | [SDK docs](../10_api-access/groupFeedback/index.md) |
| [`ingestion`](./modules/ingestion.md) | 11 | [SDK docs](../10_api-access/memoryIngestion/index.md) |
| [`proj-struct`](./modules/proj-struct.md) | 21 | [SDK docs](../10_api-access/projectStructure/index.md) |
| [`update-request`](./modules/update-request.md) | 14 | [SDK docs](../10_api-access/projectStructureUpdateRequest/index.md) |
| [`side-exec`](./modules/side-exec.md) | 5 | [SDK docs](../10_api-access/sideExecution/index.md) |
| [`panel`](./modules/panel.md) | 5 | Not available |
| [`utils`](./modules/utils.md) | 1 | [SDK docs](../10_api-access/utils/index.md) |
| [`bg-threads`](./modules/bg-threads.md) | 6 | Not available |
