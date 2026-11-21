---
title: API Reference
sidebar_position: 1
---

# Client SDK — API Reference

All modules exposed by `@codebolt/client-sdk` via `CodeBoltClient`.

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient({ baseUrl: 'http://localhost:3000' });
```

## Modules

| Module | Class | Methods | Description |
|---|---|---|---|
| [ActionBlocks](./actionBlocks/) | ActionBlocksApi | 7 | Action Blocks API |
| [ActionPlans](./actionPlans/) | ActionPlansApi | 6 | Action Plans API |
| [AgentDebugApi](./agentDebugApi/) | AgentDebugApi | 10 | Agent Debug API |
| [AgentDeliberation](./agentDeliberation/) | AgentDeliberationApi | 13 | Agent Deliberation API |
| [AgentExecution](./agentExecution/) | AgentExecutionApi | 6 | Agent Execution API |
| [AgentExecutionPhases](./agentExecutionPhases/) | AgentExecutionPhasesApi | 6 | Agent Execution Phases API |
| [AgentFlow](./agentFlow/) | AgentFlowApi | 5 | Agent Flow API |
| [AgentPortfolioApi](./agentPortfolioApi/) | AgentPortfolioApi | 14 | Agent Portfolio API |
| [Agents](./agents/) | AgentsApi | 26 | Agents API - agent management |
| [Application](./application/) | ApplicationApi | 17 | Application API |
| [Apps](./apps/) | AppsApi | 9 | Apps API |
| [AutoTesting](./autoTesting/) | AutoTestingApi | 18 | Auto Testing API |
| [BackgroundAgents](./backgroundAgents/) | BackgroundAgentsApi | 5 | Background Agents API |
| [Browser](./browser/) | BrowserApi | 5 | Browser API - browser automation |
| [Calendar](./calendar/) | CalendarApi | 14 | Calendar API |
| [Canvas](./canvas/) | CanvasApi | 3 | Canvas API |
| [Capability](./capability/) | CapabilityApi | 8 | Capability API |
| [Chat](./chat/) | ChatApi | 38 | Chat API - thread management, messaging, steps, and steering |
| [CodebaseIndex](./codebaseIndex/) | CodebaseIndexApi | 4 | Codebase Index API |
| [CodeboltTools](./codeboltTools/) | CodeboltToolsApi | 10 | Codebolt Tools API |
| [Codemap](./codemap/) | CodemapApi | 5 | Codemap API |
| [ContextAssembly](./contextAssembly/) | ContextAssemblyApi | 5 | Context Assembly API |
| [ContextRuleEngine](./contextRuleEngine/) | ContextRuleEngineApi | 8 | Context Rule Engine API |
| [Controllk](./controllk/) | ControllkApi | 1 | Controllk API |
| [EditorApi](./editorApi/) | EditorApi | 2 | Editor API |
| [EnvironmentDebugApi](./environmentDebugApi/) | EnvironmentDebugApi | 9 | Environment Debug API |
| [Environments](./environments/) | EnvironmentsApi | 26 | Environments API |
| [EventLog](./eventLog/) | EventLogApi | 8 | Event Log API |
| [File](./file/) | FileApi | 4 | File API |
| [FileRead](./fileRead/) | FileReadApi | 6 | File Read API |
| [FileUpdateIntents](./fileUpdateIntents/) | FileUpdateIntentsApi | 11 | File Update Intents API |
| [Git](./git/) | GitApi | 16 | Git API - git operations |
| [History](./history/) | HistoryApi | 1 | History API |
| [Hooks](./hooks/) | HooksApi | 8 | Hooks API |
| [IconView](./iconView/) | IconViewApi | 3 | Icon View API |
| [Inbox](./inbox/) | InboxApi | 5 | Inbox API |
| [Jobs](./jobs/) | JobsApi | 29 | Jobs API |
| [Knowledge](./knowledge/) | KnowledgeApi | 16 | Knowledge API |
| [KnowledgeGraph](./knowledgeGraph/) | KnowledgeGraphApi | 28 | Knowledge Graph API |
| [KvStore](./kvStore/) | KvStoreApi | 10 | KV Store API |
| [LanguageServer](./languageServer/) | LanguageServerApi | 3 | Language Server API |
| [Llm](./llm/) | LlmApi | 15 | LLM API - language model operations |
| [LocalModels](./localModels/) | LocalModelsApi | 7 | Local Models API |
| [Mail](./mail/) | MailApi | 22 | Mail API |
| [Mcp](./mcp/) | McpApi | 15 | MCP API |
| [Memory](./memory/) | MemoryApi | 37 | Memory API |
| [MemoryIngestion](./memoryIngestion/) | MemoryIngestionApi | 14 | Memory Ingestion API |
| [Orchestrator](./orchestrator/) | OrchestratorApi | 5 | Orchestrator API |
| [PersistentMemory](./persistentMemory/) | PersistentMemoryApi | 12 | Persistent Memory API |
| [Planner](./planner/) | PlannerApi | 8 | Planner API |
| [Profile](./profile/) | ProfileApi | 2 | Profile API |
| [Projects](./projects/) | ProjectsApi | 29 | Projects API - project management |
| [ProjectStructure](./projectStructure/) | ProjectStructureApi | 9 | Project Structure API |
| [RequirementPlan](./requirementPlan/) | RequirementPlanApi | 4 | Requirement Plan API |
| [ReviewMerge](./reviewMerge/) | ReviewMergeApi | 27 | Review Merge API |
| [Roadmap](./roadmap/) | RoadmapApi | 20 | Roadmap API |
| [ShadowGit](./shadowGit/) | ShadowGitApi | 7 | Shadow Git API |
| [Specs](./specs/) | SpecsApi | 5 | Specs API |
| [Swarm](./swarm/) | SwarmApi | 49 | Swarm API |
| [System](./system/) | SystemApi | 3 | System API |
| [TaskActivity](./taskActivity/) | TaskActivityApi | 14 | Task Activity API |
| [Tasks](./tasks/) | TasksApi | 19 | Tasks API - task management |
| [Templates](./templates/) | TemplatesApi | 2 | Templates API |
| [TerminalProcesses](./terminalProcesses/) | TerminalProcessesApi | 3 | Terminal Processes API |
| [Themes](./themes/) | ThemesApi | 10 | Themes API |
| [Threads](./threads/) | ThreadsApi | 25 | Threads API - thread CRUD |
| [ThreadSteps](./threadSteps/) | ThreadStepsApi | 18 | Thread Steps API |
| [Todos](./todos/) | TodosApi | 14 | Todos API |
| [UpdateRequests](./updateRequests/) | UpdateRequestsApi | 14 | Update Requests API |
| [Users](./users/) | UsersApi | 5 | Users API |
| [VectorDb](./vectorDb/) | VectorDbApi | 15 | Vector DB API |
| [Workspace](./workspace/) | WorkspaceApi | 5 | Workspace API |
