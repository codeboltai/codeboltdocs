---
title: Features overview
sidebar_label: Features overview
sidebar_position: 0
slug: /features
description: Explore Codebolt capabilities with direct links to usage guides, platform controls, and developer documentation.
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Features overview

Explore what you can do with Codebolt. Each capability has one main guide, with related platform controls and developer guides alongside it. Follow those guides for setup, availability, and limitations.

New to Codebolt? Start with the [quickstart](../01_get-started/03_quickstart.md). For installation and platform navigation, see the [Desktop, CLI, and Cloud guides](02_surfaces/01_overview.md). For methods, types, and commands, use the [API and CLI reference](../05_reference/01_overview.md).

**Browse by capability:**

- [Coding and workspace](#coding-and-workspace)
- [Agents and execution](#agents-and-execution)
- [Tools and extensions](#tools-and-extensions)
- [Planning and tasks](#planning-and-tasks)
- [Multi-agent collaboration](#multi-agent-collaboration)
- [Context and memory](#context-and-memory)
- [Review and delivery](#review-and-delivery)
- [Automation and integrations](#automation-and-integrations)
- [Environments](#environments)
- [Evaluation and observability](#evaluation-and-observability)
- [Permissions and guardrails](#permissions-and-guardrails)
- [Developer capabilities](#developer-capabilities)

## Coding and workspace

| Feature | What you can do | Related guides |
|---|---|---|
| [Chat](02_surfaces/02_desktop-app/03_chat/01_overview.md) | Give agents tasks and follow their progress. | [Cloud](02_surfaces/06_cloud/04_running-agents/01_remote-chat.md) |
| [Conversation history](02_surfaces/02_desktop-app/03_chat/02_tabs-and-history.md) | Keep separate conversations and revisit earlier work. | [Threads](04_agents/08_thread-panel.md) |
| [Inline editing](02_surfaces/02_desktop-app/03_chat/05_inline-edit-and-ctrl-k.md) | Select code and request an edit in place. | — |
| [Code editor](02_surfaces/02_desktop-app/03b_code-and-terminal/02_code-editor.md) | Read and edit project files. | — |
| [Terminal](02_surfaces/02_desktop-app/03b_code-and-terminal/03_terminal.md) | Run shell commands inside your workspace. | — |
| [Git integration](08_integrations/03_git-and-shadow-git.md) | Manage source changes and track agent work. | [Desktop](02_surfaces/02_desktop-app/03b_code-and-terminal/04_git-panel.md) |
| [Application previews](02_surfaces/02_desktop-app/03b_code-and-terminal/05_preview-browser.md) | Open and inspect a running application. | — |
| [Browser control](08_integrations/04_browser-control.md) | Let agents interact with and inspect web pages. | — |

## Agents and execution

| Feature | What you can do | Related guides |
|---|---|---|
| [Run and monitor agents](04_agents/03_running-agents.md) | Start agent tasks and follow execution. | [Built-in agents](04_agents/02_built-in-agents.md) · [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/01_running-agents.md) |
| [Agent portfolios](04_agents/06_agent-portfolios.md) | Choose the set of agents available in a workspace. | [Install agents](04_agents/05_installing-an-agent.md) |
| [Model selection](02_surfaces/02_desktop-app/03_chat/06_model-selection.md) | Choose the model used by a conversation. | [Providers](08_integrations/01_llm-providers.md) · [Local models](08_integrations/02_local-models.md) |
| [Steps and steering](02_surfaces/02_desktop-app/03_chat/07_steps-steering.md) | Queue follow-up steps or send instructions during a run. | — |
| [Background agents](07a_parallel-agents/04_background-agent.md) | Start and monitor detached agent work. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/02_background-agents.md) |
| [Subagents](07a_parallel-agents/05_sub-agent.md) | Delegate a focused task to a child agent. | [Build](../04_build-on-codebolt/03_agent-extensions/08_subagents.md) |
| [Execution phases](../02_concepts/03_the-agent/04_execution-phase.md) | Label stages of agent work for hooks, guardrails, and context rules. | — |
| [Headless execution](02_surfaces/04_cli/03_cli-headless/03_headless-prompt.md) | Run a prompt from a script or terminal without the interactive interface. | [Server setup](02_surfaces/04_cli/03_cli-headless/02_headless-server.md) |
| [Third-party agents](../04_build-on-codebolt/02_creating-agents/04_third-party-agents.md) | Run an external CLI agent inside Codebolt. | — |

## Tools and extensions

| Feature | What you can do | Related guides |
|---|---|---|
| [Capabilities](04b_agent-extensions/02_capabilities.md) | Reuse versioned agent behavior with defined inputs and outputs. | [Build](../04_build-on-codebolt/03_agent-extensions/02_capabilities/01_overview.md) · [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/04_capabilities.md) |
| [Skills](04b_agent-extensions/03_skills.md) | Invoke reusable skills for focused tasks. | [Build](../04_build-on-codebolt/03_agent-extensions/03_skills/01_overview.md) |
| [Custom tools](04b_agent-extensions/07_custom-tools.md) | Give agents tools tailored to a workflow. | [Build](../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md) |
| [MCP tools and servers](04b_agent-extensions/06_mcp-server.md) | Connect MCP servers and make their tools available to agents. | [Build](../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md) |
| [Action blocks](04b_agent-extensions/04_action-blocks.md) | Run reusable code units alongside agent work. | [Build](../04_build-on-codebolt/03_agent-extensions/05_action-blocks/01_overview.md) · [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/05_action-block.md) |
| [Capability executors](04b_agent-extensions/05_executors.md) | Choose how a capability is executed. | [Build](../04_build-on-codebolt/03_agent-extensions/02_capabilities/06_executors.mdx) |
| [Plugins](07z_plugins/01_overview.md) | Extend Codebolt with providers, tools, channels, previews, and panels. | [Install](07z_plugins/02_installing-plugins.md) · [Build](../04_build-on-codebolt/05_plugins/01_overview.md) |
| [Marketplace](04_agents/04_the-marketplace.md) | Discover reusable agents and extensions. | [Plugins](07z_plugins/03_plugin-marketplace.md) · [Publish](02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md) |

## Planning and tasks

| Feature | What you can do | Related guides |
|---|---|---|
| [Roadmaps](06_planning/02_roadmap.md) | Organize product goals and planned work. | — |
| [Specifications](06_planning/03_specs.md) | Write and review technical specifications. | — |
| [UI flows](06_planning/04_ui-flow.md) | Sketch wireframes and interface flows. | — |
| [Requirement plans](06_planning/05_requirement-plan.md) | Combine specifications, UI flows, and execution plans. | — |
| [Action plans](06_planning/06_action-plan.md) | Break execution into task groups and track progress. | — |
| [Tasks](06_planning/07_tasks.md) | Create, assign, and track individual work items. | [Cloud](02_surfaces/06_cloud/04_running-agents/09_issues-and-tasks.md) |
| [Kanban board](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/03_kanban-board.md) | Manage agent tasks as board cards. | — |
| [Project structure](02_surfaces/02_desktop-app/03c_panels/04a_application-planning-features/07_project-structure.md) | Inspect the modeled structure of your application. | — |

## Multi-agent collaboration

| Feature | What you can do | Related guides |
|---|---|---|
| [Parallel agents](07a_parallel-agents/02_running-parallel-agents.md) | Run multiple agents concurrently. | — |
| [Chat canvas](07a_parallel-agents/03_chat-canvas.md) | Arrange and coordinate agent conversations visually. | — |
| [Swarms](07c_agent-coordination/05_swarm-management.md) | Organize agents into teams working toward a shared goal. | [Run a swarm](07_multi-agent-usage/02_running-a-swarm.md) · [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/07_swarm-management.md) |
| [Orchestrators](07c_agent-coordination/06_orchestrator-management.md) | Manage coordinators and their worker agents. | [Build](../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md) |
| [Agent flows](../04_build-on-codebolt/08_multi-agent-orchestration/04_agent-flows.md) | Define coordinated workflows across agents. | [Follow a flow](07_multi-agent-usage/03_reading-a-flow.md) |
| [Jobs](07c_agent-coordination/02_jobs.md) | Distribute work through a shared agent queue. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/06_jobs.md) |
| [Agent messaging](07c_agent-coordination/03_mail-inbox.md) | Exchange messages between agents and users. | — |
| [Deliberation](07c_agent-coordination/04_agent-deliberation.md) | Collect agent reasoning and decisions on a shared question. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/02_agent-deliberation.md) |
| [Pheromones](07d_stigmergic-coordination/02_pheromones.md) | Coordinate agents through shared signals. | [Build](../04_build-on-codebolt/08_multi-agent-orchestration/05_stigmergy-and-reputation.md) |
| [Locks and unlock requests](07d_stigmergic-coordination/03_locks-and-unlock-requests.md) | Coordinate exclusive access to shared resources. | — |
| [File update intents](07d_stigmergic-coordination/04_file-update-intents.md) | Make planned file changes visible to other agents. | — |
| [Drift detection](../04_build-on-codebolt/08_multi-agent-orchestration/06_drift-detection.md) | Detect when agent work moves away from its goal. | — |

## Context and memory

| Feature | What you can do | Related guides |
|---|---|---|
| [Context mentions](02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md) | Attach files and project information to a conversation. | — |
| [Context assembly](05d_memory/03_context-assembly.md) | Select and combine information for each model request. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/04_context-assembly.md) · [Build](../04_build-on-codebolt/07a_memory-management/02g_context-assembly.md) |
| [Context rules](05d_memory/04_context-rules.md) | Control what enters the assembled context. | — |
| [Context compaction](05b_guardrails-and-settings/02_context-compaction.md) | Manage context size during long-running conversations. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/05_context-compaction.md) |
| [Persistent memory](05d_memory/05_persistent-memory.md) | Define durable memory and retrieval behavior. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/02_persistent-memory.md) · [Build](../04_build-on-codebolt/07a_memory-management/02d_persistent-memory.md) |
| [Memory ingestion](05d_memory/06_memory-ingestion.md) | Capture and process information into memory stores. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/03_memory-ingestion.md) · [Build](../04_build-on-codebolt/07a_memory-management/02f_memory-ingestion.md) |
| [Working memory](05d_memory/02_memory-layers.md#working-memory) | Keep temporary information for the current turn. | — |
| [Episodic memory](05d_memory/02_memory-layers.md#episodic-memory) | Retain the history of a run. | — |
| [Key-value storage](05d_memory/02_memory-layers.md#kv-store) | Store persistent preferences, flags, and small values. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/09_kv-store.md) · [Build](../04_build-on-codebolt/07a_memory-management/02e_kv-store.md) |
| [JSON storage](05d_memory/02_memory-layers.md#json-store) | Keep structured records and configuration objects. | — |
| [Markdown notes](05d_memory/02_memory-layers.md#markdown-notes) | Keep persistent notes that people can read and edit. | — |
| [Knowledge collections](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/07_knowledge.md) | Manage source documents for retrieval. | [Build](../04_build-on-codebolt/07a_memory-management/02b_knowledge.md) |
| [Knowledge graphs](05d_memory/02_memory-layers.md#knowledge-graph) | Store entities and relationships for retrieval. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/08_knowledge-graph.md) · [Build](../04_build-on-codebolt/07a_memory-management/02c_knowledge-graph.md) |
| [Vector search](05d_memory/02_memory-layers.md#vector-store) | Retrieve information by semantic similarity. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04e_memory-features/06_vector-db.md) · [Build](../04_build-on-codebolt/07a_memory-management/02a_vector-db.md) |

## Review and delivery

| Feature | What you can do | Related guides |
|---|---|---|
| [Checkpoints and rollback](02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) | Inspect checkpoints and restore earlier changes. | — |
| [Review and merge requests](07_multi-agent-usage/04_review-and-merge.md) | Review agent changes before merging them. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/01_review-merge-requests.md) · [Cloud](02_surfaces/06_cloud/04_running-agents/06_review-merge-requests.md) · [Build](../04_build-on-codebolt/08_multi-agent-orchestration/07_review-and-merge-design.md) |
| [Change summaries](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/08_changes-summary.md) | Review changed files, explanations, and follow-up context. | — |
| [Project structure requests](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/07_update-project-structure-request.md) | Propose and review changes to the modeled project structure. | — |
| [Dispute resolution](../02_concepts/07_multi-agent/03_dispute-resolution.md) | Resolve conflicts through coordination, reviews, and deliberation. | — |
| [Artifacts](06b_deposition-features/01_artifact.md) | Open, preview, and share durable outputs from agent work. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/05_artifacts.md) · [Cloud](02_surfaces/06_cloud/04_running-agents/10_artifacts.md) |
| [Inbox](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/02_inbox.md) | Review agent escalations and items needing your attention. | [Cloud](02_surfaces/06_cloud/04_running-agents/08_inbox.md) |
| [Durable handoffs](../03_guides/03_loops-and-deposition-engineering/deposition-framework.md) | Record outputs and requests for later stages of work. | [Build](../03_guides/03_loops-and-deposition-engineering/custom-depositions.md) |

## Automation and integrations

| Feature | What you can do | Related guides |
|---|---|---|
| [Hooks](08d_auto-interactivity/04_hooks.md) | Trigger actions in response to runtime events. | — |
| [Webhooks](08d_auto-interactivity/02_webhooks.md) | Trigger agent actions from external HTTP requests. | — |
| [Schedules and calendar events](08d_auto-interactivity/03_calendar-events.md) | Trigger work at a chosen time or on a recurring schedule. | [Cloud](02_surfaces/06_cloud/04_running-agents/07_scheduled-tasks.md) · [Desktop](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/03_calendar.md) |
| [Message routing](08e_external-integrations/02_routing-gateway.md) | Route external messages and agent replies. | [Build](../04_build-on-codebolt/05_plugins/04_chat-gateway/01_overview.md) |
| [Chat integrations](08e_external-integrations/03_chat-platforms.md) | Connect messaging services through channel plugins. | [Discord](../04_build-on-codebolt/10_building-integrations/02_chat-integrations/04_discord.md) · [Slack](../04_build-on-codebolt/10_building-integrations/02_chat-integrations/05_slack.md) · [Telegram](../04_build-on-codebolt/10_building-integrations/02_chat-integrations/06_telegram.md) |
| [Project tool integrations](08e_external-integrations/04_project-tools.md) | Connect issue tracking and project workflows to agents. | [Build](../04_build-on-codebolt/10_building-integrations/04_project-tool-integration.md) |
| [CI/CD integration](../04_build-on-codebolt/10_building-integrations/03_cicd-integration.md) | Trigger agent work from pipeline events. | — |
| [HTTP agent gateway](../04_build-on-codebolt/10_building-integrations/06_api-gateway.md) | Expose agent runs to external systems through HTTP. | — |

## Environments

| Feature | What you can do | Related guides |
|---|---|---|
| [Environment management](08a_environments/02_configuring-environments.md) | Create, start, stop, and reconnect execution environments. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04d_agent-orchestrations/03_environments.md) · [Cloud](02_surfaces/06_cloud/04_running-agents/02_environments.md) |
| [Local child environments](08a_environments/environment-types/04_local-child-environments.md) | Isolate agent work in a child environment of your project. | — |
| [Cloud execution](08a_environments/environment-types/05_cloud-environments.md) | Run project work in cloud environments. | [Runtimes](02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md) |
| [Runner-hosted execution](08a_environments/environment-types/06_runner-hosted-environments.md) | Run work on machines connected as runners. | [Connect a runner](02_surfaces/06_cloud/04_running-agents/05_runner-nodes.md) |
| [Code synchronization](08a_environments/04_code-sync.md) | Move project changes between environments. | [Cloud](02_surfaces/06_cloud/04_running-agents/03_syncing-changes.md) |
| [Proxy execution](08b_proxy-execution.md) | Choose which operations run locally or through the execution gateway. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04d_agent-orchestrations/01_proxy-execution.md) |
| [Multi-environment orchestration](../04_build-on-codebolt/08a_multi-environment-orchestration/01_overview.md) | Coordinate agent work across execution environments. | — |

## Evaluation and observability

| Feature | What you can do | Related guides |
|---|---|---|
| [Evaluation tasks](05e_eval-and-optimization/02_eval-tasks.md) | Define the tasks and conditions used to measure agent quality. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/09_eval.md) |
| [Evaluators](05e_eval-and-optimization/03_evaluators.md) | Score outputs against defined criteria. | [Build](../04_build-on-codebolt/07_eval-and-optimization/03_writing-evals.md) |
| [Evaluation runs and comparisons](05e_eval-and-optimization/04_running-evals.md) | Run evaluations and compare scored results. | — |
| [Agent optimization](05e_eval-and-optimization/05_optimization.md) | Iteratively improve agents using evaluation results. | [Build](../04_build-on-codebolt/07_eval-and-optimization/04_optimization-loop.md) |
| [Memory evaluation](../04_build-on-codebolt/07a_memory-management/05_memory-evaluation.md) | Measure the usefulness of retrieval and ingestion. | — |
| [Automatic testing](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/04_auto-testing.md) | Inspect test suites, cases, runs, and logs. | — |
| [Agent debugging](04_agents/08_agent-debug.md) | Inspect agent logs and diagnose execution problems. | — |
| [AI request inspection](02_surfaces/02_desktop-app/03_chat/08_ai-requests.md) | Inspect model requests, responses, usage, and cost estimates. | [Debug console](04_agents/09_ai-debug-and-console.md) |
| [Application logs](06a_application-logs.md) | Inspect logs from the application. | — |
| [Event log](05d_memory/07_event-log.md) | Inspect recorded application events. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04c_deposition-framework-features/06_event-log.md) |
| [Execution tracing](07_multi-agent-usage/05_observability-and-tracing.md) | Follow the progress of coordinated agent work. | — |
| [Code maps](02_surfaces/02_desktop-app/03b_code-and-terminal/06_codemap.md) | Explore code structure and relationships. | [Desktop panel](02_surfaces/02_desktop-app/03c_panels/04a_application-planning-features/08_codemap.md) |
| [Narrative graphs](02_surfaces/02_desktop-app/03b_code-and-terminal/07_narrative-graph.md) | Explore decisions, tool calls, and outcomes in an agent run. | — |
| [Plugin debugging](08_integrations/07_plugin-debug.md) | Inspect plugin execution and diagnose integration issues. | — |

## Permissions and guardrails

| Feature | What you can do | Related guides |
|---|---|---|
| [Guardrails and approvals](05b_guardrails-and-settings/01_guardrails.md) | Set rules for permitted actions, tool access, and execution approvals. | [Desktop](02_surfaces/02_desktop-app/03c_panels/04b_agent-management-features/11_guardrails.md) |

## Developer capabilities

| Feature | What you can do | Related guides |
|---|---|---|
| [Custom agents](../04_build-on-codebolt/02_creating-agents/01_overview.md) | Create agents tailored to your project or workflow. | [Quickstart](../04_build-on-codebolt/02_creating-agents/02_quickstart.md) · [Agent Framework](../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md) · [codeboltjs](../04_build-on-codebolt/02_creating-agents/03_agent-types/level-1-codeboltjs.md) |
| [Agent remixing](../04_build-on-codebolt/02_creating-agents/03_agent-types/level-3-remix.md) | Customize an existing agent through configuration. | — |
| [Visual agent builder](../04_build-on-codebolt/02_creating-agents/03_agent-types/level-4-flow-visual.md) | Create agent workflows with a visual editor. | — |
| [Custom processors](../04_build-on-codebolt/02_creating-agents/07_processors/04_writing-a-custom-processor.md) | Customize processing stages in the agent loop. | [Built-in processors](../04_build-on-codebolt/02_creating-agents/07_processors/03_built-in-processors.md) |
| [Dynamic agent events](../04_build-on-codebolt/02_creating-agents/08_dynamic-agent-events.md) | Publish named events for hooks, plugins, and context rules. | — |
| [Side execution](../04_build-on-codebolt/03_agent-extensions/07_side-execution.md) | Run work alongside the main agent loop. | — |
| [Custom interfaces](../04_build-on-codebolt/04_custom-uis/01_overview.md) | Build an interface connected to the Codebolt server. | [Quickstart](../04_build-on-codebolt/04_custom-uis/06_build-your-first-custom-ui.md) · [Client SDK](../04_build-on-codebolt/04_custom-uis/02_client-sdk.md) |
| [Custom agentic applications](../04_build-on-codebolt/04b_custom-agentic-applications/01_overview.md) | Build applications that use Codebolt as their agent runtime. | [Standalone apps](../04_build-on-codebolt/04b_custom-agentic-applications/03_standalone-server-connected-apps.md) · [Plugin-backed apps](../04_build-on-codebolt/04b_custom-agentic-applications/04_plugin-backed-uis.md) |
| [Embedded chat](08_integrations/06_chat-widget.md) | Add a Codebolt agent chat interface to another application. | [Build](../04_build-on-codebolt/04_custom-uis/04_chat-widget.md) |
| [Dynamic panels](../04_build-on-codebolt/04_custom-uis/05_dynamic-panels.md) | Add interactive panels inside the Codebolt app. | [Quickstart](../04_build-on-codebolt/04_custom-uis/07_build-your-first-dynamic-panel.md) · [UI extensions](../04_build-on-codebolt/06_extending-codebolt/03_ui-extensions.md) |
| [Custom LLM providers](../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) | Register an additional model inference backend. | [Provider overview](../04_build-on-codebolt/05_plugins/06_custom-ai-providers/01_overview.md) |
| [Custom embedding providers](../04_build-on-codebolt/05_plugins/06_custom-ai-providers/03_custom-embedding-provider.md) | Register an embedding backend for vector-based retrieval. | [Provider overview](../04_build-on-codebolt/05_plugins/06_custom-ai-providers/01_overview.md) |
| [Custom execution providers](../04_build-on-codebolt/08a_multi-environment-orchestration/03_creating-a-custom-provider.md) | Implement an alternative execution backend. | [Quickstart](../04_build-on-codebolt/06_extending-codebolt/07_build-your-first-execution-backend.md) |
| [Custom channel plugins](../04_build-on-codebolt/05_plugins/04_chat-gateway/03_custom-channel-plugins.md) | Connect additional messaging services to agents. | [Guide](08e_external-integrations/05_building-a-channel-plugin.md) |
| [Persistent agent characters](../04_build-on-codebolt/05_plugins/04_chat-gateway/04_persistent-agent-characters.md) | Maintain an agent identity across channel conversations. | — |
| [Templates](../04_build-on-codebolt/05b_templates/overview.md) | Package reusable starting points for projects. | [Create](../04_build-on-codebolt/05b_templates/04_creating-a-template.md) · [Publish](../04_build-on-codebolt/05b_templates/05_publishing-templates.md) |
| [Themes](../04_build-on-codebolt/06_extending-codebolt/04_themes.md) | Customize the application's visual theme. | — |
