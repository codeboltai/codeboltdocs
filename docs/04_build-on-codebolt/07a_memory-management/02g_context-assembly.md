---
sidebar_position: 2.7
title: Context Assembly
description: Context Assembly orchestrates the read path for memory in Codebolt
---

# Context Assembly

Context Assembly orchestrates the **read path** for memory in Codebolt. It evaluates rules, executes multiple persistent memory pipelines in parallel, merges the results, enforces token budgets, and returns assembled context ready for the LLM.

![Context Assembly](/productImages/memorycontext/contextAssemblyEngine.png)

The system comprises two sub-systems:

- **Context Rule Engine** — determines which memories to activate based on the current scope and conditions.
- **Context Assembly Service** — executes the resolved memory pipelines and merges their output.

## Storage

| Component | Location |
|---|---|
| Rule engine definitions | `{projectPath}/.codebolt/context-rule-engines/{id}.json` |
| Assembly service | No dedicated storage — reads from Persistent Memory definitions and storage layers at runtime |

---

## Context Assembly Request

Every assembly call begins with a request object:

```typescript
{
  scope_variables: ScopeVariables,          // supply the scopes your definitions use
  additional_variables?: AdditionalVariables, // phase, query, custom
  input?: { text?: string },                // semantic search text
  explicit_memory?: string[],               // specific memory type IDs to include
  constraints?: { max_tokens?: number },
  rule_engine_ids?: string[]                // which rule engines to evaluate
}
```

### Scope Variables (8 Scopes, Hierarchical)

Scope variables describe the current execution context. Eight scopes are supported:

| Scope | Fields |
|---|---|
| **SwarmScopeVars** | `swarm_id`, `swarm_name` |
| **ProjectScopeVars** | `project_id`, `project_path` |
| **AgentScopeVars** | `agent_id`, `agent_name`, `agent_type` |
| **ThreadScopeVars** | `thread_id` |
| **TaskScopeVars** | `task_id`, `task_type` |
| **UserScopeVars** | `user_id` |
| **OrgScopeVars** | `org_id` |
| **OrchestratorScopeVars** | `orchestrator_id` |

The internal helper `flattenVariables()` merges all scope and additional variables into a flat `Record<string, any>` for use by the rule engine and pipeline execution.

---

## Assembly Execution Flow

The assembly process runs through seven sequential stages:

```
1. validateRequest(request)
   ├─ Check scope_variables present
   ├─ Verify explicit memories exist
   ├─ Validate constraints
   └─ Check rule engines exist

2. resolveMemories(request)
   ├─ Start with explicit_memory list
   ├─ Load enabled rule engines (or specific rule_engine_ids)
   ├─ evaluateRules() against flattened variables
   ├─ Merge: explicit memories + rule-matched memories (deduplicated)
   └─ Build trace: which memories from explicit vs rules

3. Execute pipelines IN PARALLEL
   ├─ For each resolved memory: load PersistentMemory definition
   ├─ Call persistentMemoryPipelineService.executePipeline(memoryId, intent, threadId)
   ├─ Collect ContextItem[] from each pipeline
   └─ Emit 'contextAssembly:pipelineComplete' per pipeline

4. mergeResults(allItems)
   ├─ Deduplicate by content hash (MD5 or string equality)
   └─ Return unique ContextItem[]

5. applyContributionRules(items)
   ├─ Group items by their memory's contribution.section
   ├─ Within each section: sort by priority weight
   ├─ Apply max_items limit per memory type
   └─ Return Record<string, ContextItem[]> keyed by section

6. enforceBudget(sections, constraints)
   ├─ If max_tokens set: estimate tokens per section
   ├─ Add items in section order until the next item exceeds the budget
   └─ Return { sections, truncated: boolean, tokenEstimate }

7. Return AssembledContext
   ├─ context: Record<string, ContextItem[]>
   ├─ trace: { memory_calls, rules_applied, variables_used, missing_variables }
   └─ meta: { token_estimate, total_items, truncated, duration_ms }
```

### Context Sections and Ordering

Sections appear in this fixed order in assembled context:

| Order | Section |
|---|---|
| 1 | `state` |
| 2 | `warnings` |
| 3 | `constraints` |
| 4 | `knowledge` |
| 5 | `history` |
| 6 | `suggestions` |
| 7 | `working_memory` |

Within each section, items are sorted by priority weight:

| Priority | Weight |
|---|---|
| `critical` | 4 |
| `high` | 3 |
| `medium` | 2 |
| `low` | 1 |

### Token Budget Enforcement

- **Estimation**: `estimateTokens()` uses a simple heuristic of `string length / 4`.
- **Truncation**: When a `max_tokens` constraint is set and the assembled context exceeds it, assembly stops at the first item that would exceed the budget. That item and all later items are omitted, even if a later item would fit.
- **Metadata**: When truncation occurs, the response `meta` object sets `truncated: true`.

---

## Context Rule Engine

The rule engine decides which persistent memories to activate for a given assembly request.

### Rule Engine Definition

```typescript
{
  id: string,
  name: string,
  description: string,
  enabled: boolean,
  rules: ContextRule[]
}
```

### Rule Structure

```typescript
{
  id: string,
  name: string,
  priority: number,              // higher = evaluated first
  when: ContextRuleCondition[],  // ALL must match (AND logic)
  then: { add_memories: string[] } // memory type IDs to include
}
```

Each rule has a set of `when` conditions that use AND logic — all conditions must match for the rule to fire. When a rule matches, its `then.add_memories` list is added to the set of memories to assemble.

### Rule Evaluation

`evaluateRules(request, ruleEngines)` proceeds as follows:

1. Build variable lookup: a flat map with prefixes `scope.`, `addVar.`, `input.`.
2. For each engine (if enabled):
3. Sort rules by priority (descending).
4. For each rule: evaluate ALL conditions.
5. If all conditions match: add the rule's memories to the matched set.
6. Collect: `matchedMemories[]`, `engineResults[]`, `variablesUsed[]`.

### Condition Operators

The rule engine supports 14 condition operators:

| Operator | Description |
|---|---|
| `exists` | Field has a value (not null/undefined) |
| `not_exists` | Field is null/undefined |
| `eq` | Strict equality |
| `neq` | Not equal |
| `in` | Value is in array |
| `not_in` | Value is not in array |
| `contains` | String contains substring |
| `starts_with` | String starts with prefix |
| `ends_with` | String ends with suffix |
| `gt` | Greater than (numeric) |
| `gte` | Greater than or equal |
| `lt` | Less than |
| `lte` | Less than or equal |
| `regex` | Regular expression match |

### Variable Lookup Building

`buildVariableLookup(request)` creates a flat map from the request:

- From `scope_variables`: `scope.swarm.swarm_id`, `scope.agent.agent_name`, etc.
- From `additional_variables`: `addVar.phase`, `addVar.query`, `addVar.{custom}`
- From `input`: `input.text`

### Variable Extraction

Two helpers support UI integration and validation:

**`extractPossibleVariables(ruleEngines, memories)`**
- Scans all rule conditions for referenced variable fields.
- Scans all memory definitions for `inputs_scope` and `additional_variables`.
- Returns `PossibleVariable[]` for populating UI dropdowns.

**`getRequiredVariables(memories)`**
- Extracts required scope variables from memory `inputs_scope`.
- Extracts required additional variables.
- Returns what the caller must provide in the request.

### Rule Engine CRUD

| Operation | Behavior |
|---|---|
| **Create** | Generates IDs for rules without IDs, saves JSON to disk |
| **Update** | Merges updates, generates IDs for new rules |
| **Delete** | Removes the JSON file |
| **AddRule** | Adds a rule to an existing engine |
| **UpdateRule** | Updates a specific rule by ID |
| **DeleteRule** | Removes a specific rule by ID |

---

## WebSocket Events

Assembly progress is reported via WebSocket events:

| Event | Description |
|---|---|
| `contextAssembly:started` | Assembly begins |
| `contextAssembly:rulesEvaluated` | Rules evaluated, memories resolved |
| `contextAssembly:pipelineComplete` | One pipeline finished |
| `contextAssembly:complete` | Full assembly done with result |
| `contextAssembly:error` | Assembly failed |

---

## REST API

### Context Assembly Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/context-assembly/assemble` | Main assembly endpoint (accepts `x-thread-id` header) |
| POST | `/context-assembly/validate` | Validate a request without executing |
| GET | `/context-assembly/memory-types` | Returns simplified list of available memory types |
| POST | `/context-assembly/evaluate-rules` | Evaluate rules without performing full assembly |
| POST | `/context-assembly/required-variables` | Get required variables for a set of memories |

### Context Rule Engine Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/context-rule-engine` | List all rule engines |
| POST | `/context-rule-engine` | Create a new rule engine |
| GET | `/context-rule-engine/:id` | Get a specific rule engine |
| PUT | `/context-rule-engine/:id` | Update a rule engine |
| DELETE | `/context-rule-engine/:id` | Delete a rule engine |
| POST | `/context-rule-engine/:id/evaluate` | Evaluate a specific engine |
| POST | `/context-rule-engine/evaluate` | Evaluate all enabled engines |
| GET | `/context-rule-engine/variables` | Get possible variables for UI |

---

## SDK Reference

### Context Assembly

```typescript
// Assemble context for the current scope
const request = {
  scope_variables: { thread: { thread_id: threadId } },
  explicit_memory: [memoryId],
  constraints: { max_tokens: 8000 }
};
const result = await codebolt.contextAssembly.getContext(request);
if (result.success) console.log(result.data.context.trace);

// Validate a request before executing
const validation = await codebolt.contextAssembly.validate(request);

// List available memory types
const types = await codebolt.contextAssembly.listMemoryTypes();

// Evaluate rules without full assembly
const ruleResults = await codebolt.contextAssembly.evaluateRules(request);

// Get required variables for a set of memories
const required = await codebolt.contextAssembly.getRequiredVariables(memoryIds);
```

### Context Rule Engine

```typescript
// Create a rule engine
const engine = await codebolt.contextRuleEngine.create({
  name: "Planning Phase Rules",
  description: "Activate architecture memories during planning",
  enabled: true,
  rules: [
    {
      name: "Include architecture docs in planning",
      priority: 10,
      when: [
        { field: "addVar.phase", operator: "eq", value: "planning" }
      ],
      then: { add_memories: [memoryId] }
    }
  ]
});

// Update an existing engine
await codebolt.contextRuleEngine.update(engineId, { enabled: false });

// Evaluate a rule engine against current variables
const evaluation = await codebolt.contextRuleEngine.evaluate({
  scope_variables: { /* ... */ },
  additional_variables: { phase: "planning" }
});

// Get all possible variables for UI dropdowns
const variables = await codebolt.contextRuleEngine.getPossibleVariables();
```
