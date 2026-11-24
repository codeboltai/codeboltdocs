---
sidebar_label: API Overview
sidebar_position: 1
---

# Direct API Access

Use the default export from `@codebolt/codeboltjs` to call Codebolt APIs from a JavaScript or TypeScript agent. The SDK opens a connection to Codebolt when it is imported.

The signatures on these pages follow the CodeBoltJS 5.1.51 source.

## Quick start

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const result = await codebolt.fs.readFile('README.md', { offset: 1, limit: 30 });
  if (result.success && typeof result.content === 'string') {
    return result.content;
  }
  return 'Could not read README.md.';
});
```

`onMessage` waits for the connection before registering the handler. The reference uses `onReady` for examples that make a request as soon as the SDK connects. See [Client and lifecycle](./client/index.md).

Use [MCP](./mcp/index.md) to find and configure MCP servers. Use [Runtime Tools](./tools/index.md) to discover and call the tools those servers and other sources expose. See [Package exports](./client/index.md#package-exports) for the runtime entry points.

## API modules

### Projects and development

- [`project`](./project/index.md) — Read project settings, paths, sibling directories, and editor file status.
- [`fs`](./fs/index.md) — Read, write, edit, list, and search files in the workspace.
- [`git`](./git/index.md) — Run Git operations against the current repository.
- [`terminal`](./terminal/index.md) — Run commands, stream output, or inspect and stop managed processes.
- [`browser`](./browser/index.md) — Interact with Codebolt browser instances and their pages.
- [`computerUse`](./computerUse/index.md) — Send desktop interaction requests to the current Codebolt environment.
- [`environment`](./environment/index.md) — Inspect and manage environments, providers, and environment runtimes.
- [`codeutils`](./codeutils/index.md) — Collect source files as Markdown and use the SDK’s code matcher endpoints.
- [`codebaseSearch`](./codebaseSearch/index.md) — Run semantic codebase search and search for MCP tools.
- [`codemap`](./codemap/index.md) — Create, read, and edit codemaps.
- [`projectStructure`](./projectStructure/index.md) — Read and edit the project structure model.
- [`projectStructureUpdateRequest`](./projectStructureUpdateRequest/index.md) — Submit and review proposed changes to the project structure.
- [`fileUpdateIntent`](./fileUpdateIntent/index.md) — Record intended file edits and detect overlapping work.
- [`reviewMergeRequest`](./reviewMergeRequest/index.md) — Create and manage requests to review and merge changes.

### Agents, threads, and planning

- [`agent`](./agent/index.md) — Find, inspect, start, and message agents.
- [`thread`](./thread/index.md) — Create and start threads, send messages, and retrieve context and file changes.
- [`backgroundChildThreads`](./backgroundChildThreads/index.md) — Track background child threads and wait for their completion.
- [`agentEvents`](./agentEvents/index.md) — Emit an event from the current agent or thread.
- [`agentEventQueue`](./agentEventQueue/index.md) — Consume pending agent events and subscribe to new ones.
- [`agentExecutionPhase`](./agentExecutionPhase/index.md) — Set, retrieve, and list phases in agent execution.
- [`asyncTask`](./asyncTask/index.md) — List asynchronous tasks and send task control commands.
- [`agentDeliberation`](./agentDeliberation/index.md) — Create and manage collaborative agent deliberations.
- [`agentPortfolio`](./agentPortfolio/index.md) — Read and update agent portfolios, testimonials, and karma.
- [`actionBlock`](./actionBlock/index.md) — Find Action Blocks and start one by name.
- [`capability`](./capability/index.md) — Register, find, and manage capabilities.
- [`swarm`](./swarm/index.md) — Manage swarms, teams, roles, and agent membership.
- [`job`](./job/index.md) — Manage jobs, dependencies, assignments, locks, bids, and pheromones.
- [`task`](./taskplaner/index.md) — Create, assign, execute, and inspect tasks.
- [`todo`](./todo/index.md) — Track todo items and their progress.
- [`executionPlan`](./executionPlan/index.md) — Create structured execution plans and coordinate work through readiness checks and leases.
- [`featurePlan`](./featurePlan/index.md) — Create and maintain feature plan documents and their sections.
- [`roadmap`](./roadmap/index.md) — Manage roadmap phases, features, and related planning records.
- [`calendar`](./calendar/index.md) — Create and manage Codebolt calendar events and query upcoming events.
- [`autoTesting`](./autoTesting/index.md) — Manage test suites, cases, steps, and runs.
- [`sideExecution`](./sideExecution/index.md) — Start and stop side executions and query their status.

### Communication and interface

- [`chat`](./chat/index.md) — Send messages to the Codebolt chat UI and request user input or confirmation.
- [`userMessage`](./user-message-utilities/index.md) — Read the active user message, attachments, mentions, flags, and session data.
- [`conversations`](./conversations/index.md) — Create conversations, manage members, and send or list conversation messages.
- [`mail`](./mail/index.md) — Send and manage messages within Codebolt’s agent mail service.
- [`recipients`](./recipients/index.md) — List, inspect, and validate recipients for automation actions.
- [`namedTag`](./namedTag/index.md) — List named tags and send a message to a named recipient.
- [`dynamicPanel`](./dynamicPanel/index.md) — Open, update, and close HTML panels in Codebolt.
- [`artifact`](./artifact/index.md) — Create, list, update, and delete artifacts.
- [`canvas`](./canvas/index.md) — Create canvases and manage their content and artifact links.
- [`note`](./note/index.md) — Create, search, and edit notes.
- [`flags`](./flags/index.md) — Manage user, project, and thread flags.
- [`chatrules`](./chatrules/index.md) — Resolve initial and full chat prompts for a chat rule selection.
- [`notify`](./notify/index.md) — Emit progress and lifecycle notifications across SDK modules.

### Models, memory, and context

- [`llm`](./llm/index.md) — Run model inference and inspect or configure model roles.
- [`tokenizer`](./tokenizer/index.md) — Tokenize text and count tokens.
- [`chatSummary`](./history/index.md) — Summarize chat message arrays.
- [`dbmemory`](./dbmemory/index.md) — Store and retrieve values in the application memory database.
- [`persistentMemory`](./persistentMemory/index.md) — Create and query persistent memory stores.
- [`episodicMemory`](./episodicMemory/index.md) — Store and retrieve episodes and their events.
- [`knowledgeGraph`](./knowledgeGraph/index.md) — Manage graph records and query relationships.
- [`contextAssembly`](./contextAssembly/index.md) — Assemble context for an application request.
- [`contextRuleEngine`](./contextRuleEngine/index.md) — Manage context rules and evaluate conditions.
- [`contextCompaction`](./contextCompaction/index.md) — Inspect and update compaction state and related context.
- [`cbstate`](./cbstate/index.md) — Read application, agent, and project state and update state values.
- [`kvStore`](./kvStore/index.md) — Manage key-value stores and entries.
- [`eventLog`](./eventLog/index.md) — Create event streams and append or query events.
- [`vectordb`](./vectordb/index.md) — Add and query vector database items.

### Tools, search, and integrations

- [`mcp`](./mcp/index.md) — Discover and configure Model Context Protocol servers.
- [`tools`](./tools/index.md) — Discover and invoke callable tools through the runtime gateway.
- [`marketplace`](./marketplace/index.md) — Find items and manage their installation, configuration, and operation status.
- [`automations`](./automations/index.md) — Manage automation definitions and inspect their runs.
- [`hooks`](./hook/index.md) — Create hooks and manage their enabled state.
- [`searchableAssets`](./searchableAssets/index.md) — Search registered assets and register agent-local runtime tools.
- [`docs`](./docs/index.md) — Search Codebolt documentation and retrieve SDK specifications and knowledge entries.
- [`webFetch`](./webFetch/index.md) — Fetch the content of a web page.
- [`crawler`](./crawler/index.md) — Send crawl start, navigation, scroll, and screenshot events, and await click results.
- [`outputparsers`](./outputparsers/index.md) — Parse structured output formats.
- [`debug`](./debug/index.md) — Send debug messages to the application.

For web queries, use the built-in [Web Search tool](./webSearch/index.md) through `codebolt.tools`.

### Requests without a default server handler

These SDK requests are unavailable through the default agent connection.

- [`memory`](./memory/index.md) — JSON, Markdown, and todo record requests.
- [`groupFeedback`](./groupFeedback/index.md) — Structured feedback requests.
- [`memoryIngestion`](./memoryIngestion/index.md) — Ingestion pipeline requests.
- [`utils`](./utils/index.md) — AI-assisted diff requests.

### Legacy SDK entries

- [`search`](./search/index.md) — Returns placeholder strings.
- [`rag`](./rag/index.md) — Exposes method names with no-op implementations.
