# Codebolt documentation plan

Codebolt documentation will support five reader activities: getting started, using the product, building extensions and applications, configuring deployments, and looking up technical contracts. A Resources menu will collect examples, release information, and supporting material.

This is the proposed navigation and migration plan. The [Features overview](docs/02_using-codebolt/01_features-overview.md) is implemented as the first page under Using Codebolt, with entry links from Get Started, the quickstart, and Build on Codebolt. The remaining top-level navigation migration is still proposed. The [page inventory](planning/PAGE_INVENTORY.md) accounts for existing Markdown and MDX content. Full product coverage requires checking that inventory against the application, CLI, SDKs, and supported extensions.

## Navigation

```text
Get Started | Using Codebolt | Build on Codebolt | Configuration | Reference | Resources
```

Each main tab owns a sidebar. Search and Open Codebolt are utility actions. Resources is a dropdown with links to examples and recipes, changelog, migration guides, glossary, blog, support, and documentation for agents.

Concepts belong beside the topics they explain. Tutorials belong beside the feature they teach and can also appear in the Resources index. Plugins initially remain within Using and Build; administration remains within Configuration.

### Get Started

- Introduction: what Codebolt does, supported use cases, and the relationship between clients, server, agents, and environments.
- Choose a platform: Desktop, interactive CLI, headless CLI, or Cloud; describe prerequisites and differences.
- First run: install or open the client, authenticate, connect a model, open a project, run a task, and review the result.
- Essential concepts: agent execution, tools, context, permissions, and checkpoints, with links to deeper explanations.
- Next steps: everyday workflows, builder quickstarts, and setup troubleshooting.

Keep this a short path to a completed task. The Get Started landing now introduces the first-task path and links to the shared Features overview. Advanced local scaling, cloud scaling, and customization should link to their owning sections.

### Using Codebolt

1. **Features overview**: a capability catalog with one primary entry per feature and related usage, platform, configuration, and builder links. Installation, navigation, administration, and architecture stay in their owning guides.
2. **Workspace and coding**: projects, workspaces, panels, layout, editor, terminal, Git, previews, inline edits, chat history, mentions, model selection, steering, and AI requests.
3. **Agents and execution**: agent selection, profiles, portfolios, running and background agents, subagents, execution status, and cancellation or resumption where supported.
4. **Planning and tasks**: roadmaps, specifications, UI flows, requirement plans, action plans, tasks, kanban, and project structure.
5. **Tools and extensions**: using skills, capabilities, custom tools, MCP connections, action blocks, executors, and installed plugins.
6. **Context, memory, and knowledge**: instructions, context assembly and compaction, ingestion, persistent memory, knowledge, knowledge graphs, vector storage, and key-value storage.
7. **Multi-agent collaboration**: choosing an approach, parallel execution, chat canvas, jobs, mail and inbox, swarms, orchestrators, messaging, and deliberation. Nest file-update intents, locks, unlock requests, and pheromones under advanced coordination.
8. **Review and merge**: checkpoints, rollback, review and merge requests, change summaries, conflict resolution, and project-structure update requests.
9. **Artifacts and previews**: artifact creation, inspection, lifecycle, previewing, and outputs from multi-step execution.
10. **Automation and routing**: schedules, calendar, automatic interactions, routing, and proxy execution, with setup links to Configuration.
11. **Evaluation and optimization**: evaluation tasks, evaluators, automatic testing, runs, scoring, comparison, and optimization.
12. **Environments**: choosing where a task runs, switching execution context, remote sessions, and reviewing or syncing remote changes. Provisioning belongs in Configuration.
13. **Monitoring and debugging**: application logs, event logs, code maps, narrative graphs, execution views, replay, and stalled runs.
14. **Integrations**: everyday use of Git, browser control, mail, calendar, chat widgets, and external services. Connection setup links to Configuration.
15. **Platforms**: Desktop-specific controls, interactive and headless CLI workflows, Cloud portal and registry, remote chat, inbox, and platform-specific limitations.
16. **Troubleshooting**: symptom-based entry points that link to the relevant feature's fixes.

Keep groups collapsed where useful. Platform pages describe differences in interaction; shared behavior has one feature home. Existing panel pages are migration candidates, not automatically redundant.

### Build on Codebolt

1. **Start building**: links to the developer categories in the shared Features overview, extension decision guide, architecture for builders, SDK selection, and minimal runnable examples.
2. **Create agents**: remixing, Agent Framework, codeboltjs, third-party agents, creation levels, agent types, execution loops, and raw WebSocket integration.
3. **Extend agents**: capabilities, skills, custom tools, MCP servers, action blocks, agent blocks, executors, side execution, hooks, processors, and templates.
4. **Execution loops and deposition framework**: single-agent, multi-agent, extension, multi-environment, and custom deposition workflows. Define this product terminology and link to the user-visible outcomes.
5. **Build plugins and gateways**: plugin lifecycle, UI extensions, commands, themes, custom LLM providers, chat gateway, LLM gateway, proxy-execution gateway, testing, and debugging.
6. **Build applications**: Client SDK, custom interfaces, embedded chat, custom agentic applications, events, and server communication.
7. **Build integrations**: external services, chat applications, IDEs, project tools, and CI/CD.
8. **Memory and context engineering**: context processing, ingestion, retrieval, persistent memory, knowledge and vector interfaces, storage, and optimization.
9. **Multi-agent orchestration**: manager-worker, pipeline, map-reduce, debate, and plan-execute-review patterns; flows, coordination, reputation, stigmergy, drift detection, dispute resolution, and review/merge design.
10. **Environment providers**: provider architecture, lifecycle, creation, execution chaining, communication, and multi-environment orchestration.
11. **Evaluation and optimization**: evaluator authoring, quality measurement, testing, and optimization logic.
12. **Templates and publishing**: reusable scaffolds, packaging, registry and marketplace publishing, compatibility, and upgrades.
13. **Deployment**: agent infrastructure, hosting custom applications, remote services, scaling, and operational integration. Link to operator instructions in Configuration.
14. **Architecture and internals**: server/client boundaries, data-flow walkthroughs, inference, tools, memory, knowledge, narrative engine, planning hierarchy, guardrails, workspaces, communication, persistence, and event logs.

Each builder path starts with Overview → Quickstart → Core concepts → How-to guides → Examples → Troubleshooting → Reference. Architecture is available as needed rather than a prerequisite for every quickstart.

### Configuration

- Application and project settings: file locations, precedence, scope, defaults, and platform differences.
- Models and inference: hosted providers, local models, credentials, model routing, and provider settings.
- Agent behavior: profiles, defaults, execution settings, and extension configuration.
- Permissions and guardrails: approvals, tool access, execution restrictions, and policies.
- Environments and services: local execution, containers, sandboxes, remote servers, runtime providers, runner nodes, and preview providers.
- Integrations: Git, MCP servers, connectors, browser services, mail, calendar, and chat services.
- Interface settings: appearance, themes, language servers, and keyboard controls.
- Collaboration and review: workflow settings, review policies, and automation configuration where supported.
- Accounts and teams: authentication, login tokens, team and account settings, subscriptions, billing, and usage.
- Deployment and operations: self-hosting, headless servers, network setup, logging, monitoring, and upgrades.
- Troubleshooting: invalid configuration, credentials, provider connections, environment services, and settings that do not apply.

Document only supported settings. Unknown scopes, precedence, defaults, and policy behavior remain verification tasks until confirmed in the implementation.

### Reference

- Reference overview and SDK selection.
- codeboltjs: API access, MCP/tool access, utility functions, pseudo-CLI interfaces, and types.
- Agent Framework: agent loop, processors, tools, coordination, and types.
- Plugin SDK: hooks, UI, gateways, providers, and types.
- Client SDK: methods, events, payloads, and types.
- Codebolt CLI: server commands, action commands, flags, and errors.
- Configuration reference: supported keys, scopes, defaults, and environment variables.
- Manifest and file schemas: agents, plugins, skills, capabilities, blocks, executors, and environments where schemas exist.
- Protocol and event reference: WebSocket/HTTP contracts, lifecycle events, and error formats.

The last three groups require an inventory of existing contracts before adding pages. Retain the complete existing reference bundles; use curated package introductions and collapsed symbol trees. Check generation provenance before editing a reference page.

## Capability-based feature overview

The [Claude feature overview](https://platform.claude.com/docs/en/build-with-claude/overview) gives individual features and related subfeatures their own linked names and descriptions, organized into category tables. Apply this pattern to one canonical Codebolt Features overview covering all documented product capabilities. Readers must be able to discover a feature and open its documentation directly from this page.

Place the overview at the start of Using Codebolt and link to it from Get Started and Build on Codebolt. Builder entry pages may link to anchors within the overview. The top tabs and sidebars still organize the detailed documentation; the overview links across those boundaries.

The overview must meet these requirements:

- Use these twelve capability categories: coding and workspace; agents and execution; tools and extensions; planning and tasks; multi-agent collaboration; context and memory; review and delivery; automation and integrations; environments; evaluation and observability; permissions and guardrails; developer capabilities.
- Include user-visible capabilities and developer extension points. Platform names, installation, onboarding, panel navigation, account administration, and architecture are documentation topics rather than feature entries. Workspace management belongs in platform guides; coding capabilities such as inline editing, terminal access, Git, and previews belong in the catalog.
- Give every documented feature a row with a clickable feature name and a short description. A category link alone does not account for its individual features.
- Give distinct subfeatures separate linked rows beneath their parent. For example, memory ingestion, context assembly, compaction, knowledge graphs, vector storage, and key-value storage must remain directly discoverable under the memory/context category.
- Link each name to its canonical detailed page or a stable section anchor. A subfeature does not need a separate page if its parent page explains it clearly.
- Add Use, Build, Configure, or Reference links where a feature has distinct audience-specific documentation. Reuse the canonical pages rather than duplicating their explanations.
- Give each capability one primary row. Add Desktop, Cloud, and developer links in its Related guides column rather than repeating the capability in separate platform or builder sections. Keep distinct subfeatures separately discoverable.
- Include only working destinations. Record a missing destination in the migration ledger and complete its documentation before counting the feature as covered; do not publish empty links or placeholders.
- Preserve a page contents list with category anchors so readers can jump through a long catalog.
- List product capabilities and extension surfaces; keep individual SDK methods and types in Reference.
- Check the final catalog against the feature-level verification ledger. The generated page inventory is a migration aid, not the reader-facing feature overview.

Example rows using existing documentation destinations (the final catalog must extend beyond these examples):

| Feature | Description |
|---|---|
| [Checkpoints and rollback](docs/02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md) | Review and restore earlier changes. |
| [Skills](docs/02_using-codebolt/04b_agent-extensions/03_skills.md) | Use reusable capabilities for recurring tasks. |
| [Parallel agents](docs/02_using-codebolt/07a_parallel-agents/02_running-parallel-agents.md) | Run multiple agents and follow their progress. |
| [Memory ingestion](docs/02_using-codebolt/02_surfaces/02_desktop-app/03c_panels/04e_memory-features/03_memory-ingestion.md) | Bring information into the memory system. |
| [Knowledge graph](docs/02_using-codebolt/02_surfaces/02_desktop-app/03c_panels/04e_memory-features/08_knowledge-graph.md) | Work with relationships between stored knowledge. |
| [Custom execution providers](docs/04_build-on-codebolt/08a_multi-environment-orchestration/03_creating-a-custom-provider.md) | Implement an alternative execution backend. |

A catalog entry summarizes the feature guide. Include platform availability only after verification, and record previews, beta status, prerequisites, and limits on the owning page. Do not imply identical availability across Desktop, CLI, and Cloud.

The public catalog is curated for discovery; the page inventory remains exhaustive for maintenance. Removing a setup or architecture page from the catalog does not remove that page or its sidebar entry. Product completeness still requires the verification audit below.

### Roadmap documentation backlog

Keep planned capabilities out of the available-feature catalog. The following existing pages explicitly describe planned work; retain them for roadmap documentation without promising delivery dates:

| Planned capability | Existing documentation |
|---|---|
| Custom commands | [Status and alternatives](docs/04_build-on-codebolt/06_extending-codebolt/05_custom-commands.md) |
| IDE integration | [Status and alternatives](docs/04_build-on-codebolt/10_building-integrations/05_ide-integration.md) |

## Ownership and overlap

| Topic | Using Codebolt | Build on Codebolt | Configuration | Reference |
|---|---|---|---|---|
| Agents | Run and monitor | Create and extend | Defaults and permissions | Methods and types |
| Plugins | Install and use | Develop and publish | Plugin settings | SDK and manifest |
| MCP | Use tools | Implement tools and servers | Connections and access | Contracts and schemas |
| Memory | Manage knowledge | Implement processing and retrieval | Storage settings | Memory interfaces |
| Environments | Select and run | Implement providers | Provision services | Provider contracts |
| Multi-agent work | Operate and review | Design orchestration | Execution and review policies | Coordination APIs |
| Evals | Run and compare | Author evaluators | Runtime configuration | Evaluation interfaces |
| Artifacts | Inspect and preview | Create artifact integrations | Preview providers | Artifact contracts |

Every page has one canonical home. Related sections link to that home. Preserve distinct user, builder, and platform instructions when they answer different questions. Consolidation decisions require reading the pages, not matching their titles alone.

## Coverage and verification

The generated [page inventory](planning/PAGE_INVENTORY.md) maps each non-reference Markdown/MDX page to a proposed destination and migration action, groups every reference page into its existing bundle, and lists excluded authoring files. The generator fails if an existing page has no destination. Directory-based mappings are a first review pass; proposed broad destinations must be refined to final pages during migration.

Track feature-level coverage using these fields:

```text
Feature ID and name
Product implementation or contract evidence
Supported platforms and versions
Audience and canonical documentation home
Overview entry and usage page
Configuration and builder guide where applicable
Reference and runnable example where applicable
Troubleshooting and known limitations
Status, reviewer, and verification date
```

Use these statuses:

- **Needs verification**: a page or feature has been identified but accuracy and completeness have not been established. This is the initial status of the page inventory.
- **Covered**: implementation, documentation, availability, links, and applicable examples have been verified.
- **Partial**: the feature is verified but required documentation is incomplete.
- **Missing**: the feature is verified and its required documentation does not exist.
- **Duplicate**: content overlap is confirmed and a canonical destination is selected.
- **Not applicable**: a particular field, such as builder reference for a UI-only preference, does not apply; record the reason.

Do not report 100% feature coverage from file counts. Complete two audits:

1. **Documentation audit**: account for every existing page, assess content, merge confirmed duplicates, repair links, and assign final navigation ownership.
2. **Product audit**: compare application menus and settings, CLI commands, SDK exports, registered tools, plugin extension points, event contracts, and environment providers against the feature inventory. Confirm behavior and supported platforms with the implementation and runnable examples.

Configuration schemas, manifest schemas, platform availability, migrations, release information, and undocumented product features are explicit audit tasks rather than assumed omissions or assumed coverage.

## Existing issues to resolve

- The Get Started landing has been corrected and the linked Features overview added. Continue checking the detailed onboarding journey against supported clients.
- Concepts and guides overlap with the usage and builder sections; their content needs canonical homes.
- Multi-agent topics are split across several adjacent categories; consolidate their entry points while preserving advanced topics.
- Desktop panel pages and shared planning, memory, coordination, and evaluation pages need comparison before merging.
- CLI command guides overlap with the CLI reference; separate tutorials from exact command contracts.
- `docs/agent/` and `docs/1_index.md` are outside the six configured autogenerated sidebar roots. Decide how readers and agents should discover them.
- The guide overview contains links using older numbered directories, such as `03_everyday-workflows`, while the current directory is `04_everyday-workflows`. Repair these during content migration.
- Reference is disabled in the development sidebar and its route family is excluded from local search indexing. Validate the production navigation and plan package-level search or a dedicated reference index rather than assuming dev behavior represents production.
- Empty alternative directory structures such as `docs/features/` and `docs/configuration/` are not evidence of published coverage. Choose final destinations before adding duplicate content there.

## Migration sequence

### 1 Inventory and ownership

Regenerate the page inventory, read each proposed group, and record final destinations and merge decisions in a separately maintained migration ledger. Keep verification evidence outside the generated inventory so regeneration cannot erase it. Assign a reviewer and status per feature. Complete product verification before claiming complete coverage.

### 2 Entry pages and catalogs

Write the onboarding landing and first-task path, the complete shared Features overview, the builder entry and SDK decision guide, and the Configuration and Reference introductions. Reuse accurate existing content and give every feature and distinct subfeature a working destination in its category table.

### 3 Navigation migration

Update `docusaurus.config.ts` and `sidebars.ts` to the proposed tabs. Use explicit editorial groups for authored guides and retain generated reference subtrees. Change navigation ownership before moving physical files where possible. Preserve document IDs, slugs, and public URLs; if any URL changes, add a tested redirect. Remove old top-level Concepts and Guides only once every retained page is reachable in its new home.

### 4 Content reconciliation

Merge confirmed duplicates, move tutorials beside features, replace stale links, normalize product terminology, and add verified missing content. Keep platform-specific details and advanced coordination discoverable. Update search and machine-readable documentation indexes to match the final structure.

### 5 Validation and release

- Every inventoried page is retained, redirected after consolidation, or explicitly retired with a recorded reason.
- Every verified product feature and distinct subfeature has a directly clickable entry in its category on the shared Features overview and a canonical page or stable section anchor; applicable setup, reference, examples, and troubleshooting are linked.
- All catalog links, sidebar entries, cross-links, and migration redirects resolve.
- A production build completes; authored navigation and content introduce no new broken links. Track pre-existing generated-reference anchor issues separately.
- Search finds core features and SDK package entry pages without overwhelming readers with inherited type members.
- Desktop and mobile navigation retain the active section and expand the current topic.
- A new reader can complete a first task, create an agent, create a plugin, build a custom application, and configure a remote run from the documentation.
- Product owners confirm platform availability, configuration behavior, and advanced features before release.

## Maintaining the plan

Run `python3 scripts/generate-documentation-inventory.py` after adding or reorganizing source pages. Review its diff for unexpected new topics or count changes. Update the editorial plan and feature verification ledger when the product adds a capability. Keep authored pages near their task-oriented home and regenerate SDK reference from its source.
