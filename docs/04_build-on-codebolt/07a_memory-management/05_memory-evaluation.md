---
sidebar_position: 5
title: Memory Evaluation
description: Evaluating memory means measuring whether agents are retrieving the right information at the right time and whether the pipeline that writes to storage is.
---

# Memory Evaluation

Evaluating memory means measuring whether agents are retrieving the right information at the right time and whether the pipeline that writes to storage is producing quality embeddings and knowledge graph entries. Codebolt's eval system can evaluate both — and then run an optimizer to improve the configuration automatically.

## The eval model

The eval system has four composable primitives:

| Primitive | What it represents |
|---|---|
| **Subject** | The thing being evaluated — an agent, an action block |
| **Task** | A test case: input instructions + one or more evaluators |
| **Suite** | A collection of subjects × tasks |
| **Run** | An execution of a suite; produces scored results |

Memory-focused evals treat **retrieval quality** and **context relevance** as the metrics. You design tasks that probe specific retrieval scenarios, run them against the subject agent, and score the output.

---

The examples below call the `/evals` HTTP API on a running Codebolt server. Define this helper once. It returns the JSON envelope from the controller.

```js
async function evalRequest(path, method = 'GET', body) {
  const response = await fetch('http://localhost:2719/evals' + path, {
    method, headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
```

## Evaluator types

### `expected-output`

Compare the agent's response against a reference answer. Match modes:

| Mode | Matches when… |
|---|---|
| `exact` | Response equals expected exactly |
| `contains` | Response includes the expected substring |
| `regex` | Response matches a regular expression |
| `semantic` | Response is semantically equivalent (embedding similarity) |

```typescript
const { task } = await evalRequest('/tasks', 'POST', {
  name: 'What database do we use for the knowledge graph?',
  subjectType: 'agent',
  instruction: { type: 'text', textPrompt: 'What database do we use for the knowledge graph?' },
  environment: { type: 'local' },
  evaluators: [{
    id: 'ev-kg-answer',
    name: 'KG answer check',
    type: 'expected-output',
    weight: 1,
    expectedOutput: 'Kuzu',
    matchMode: 'contains'
  }]
});
```

Use `semantic` mode to test memory recall without requiring word-for-word matches:

```typescript
{
  type: 'expected-output',
  expectedOutput: 'The knowledge graph uses an embedded Kuzu database.',
  matchMode: 'semantic'
}
```

### `agent-judge`

A separate judge agent evaluates the output against a rubric. Best for nuanced memory quality questions.

```typescript
{
  type: 'agent-judge',
  judgeAgentId: 'quality-judge',
  judgePrompt: `Score 0-100: Did the agent's answer correctly use recalled memory rather than hallucinating? 
  Agent answer: {{output}}
  Provide a score and one-sentence reasoning.`
}
```

### `script`

The evaluator exposes the subject’s response in the `EVAL_OUTPUT` environment variable. Print a JSON object with a score from 0 to 100 and a reason.

```js
const scriptEvaluator = {
  id: 'mentions-db', name: 'Mentions database', type: 'script', weight: 1,
  script: `node -e 'const match = process.env.EVAL_OUTPUT.includes("Kuzu"); console.log(JSON.stringify({ score: match ? 100 : 0, reasoning: "Database name check" }))'`,
};
```

### `deliberation`

Multiple judge agents discuss the output and vote on a score. Use when a single judge may be biased.

```typescript
{
  type: 'deliberation',
  deliberationAgentIds: ['judge-a', 'judge-b', 'judge-c'],
  deliberationRounds: 2
}
```

---

## Designing memory eval tasks

The key is to write tasks that exercise specific retrieval paths, then check whether the agent's answer shows evidence of using recalled memory (not just LLM knowledge).

### Test vector recall

```typescript
await evalRequest('/tasks', 'POST', {
  name: 'Summarise the decisions we made about the payment module in the last sprint.',
  subjectType: 'agent',
  instruction: { type: 'text', textPrompt: 'Summarise the decisions we made about the payment module in the last sprint.' },
  environment: { type: 'local' },
  evaluators: [{
    id: 'recall-check', name: 'Recall check', weight: 1,
    type: 'agent-judge',
    judgeAgentId: 'memory-judge',
    judgePrompt: 'Did the answer reference specific decisions from memory? Score 0-100.'
  }]
});
```

### Test knowledge graph recall

```typescript
await evalRequest('/tasks', 'POST', {
  name: 'Which functions call processPayment?',
  subjectType: 'agent',
  instruction: { type: 'text', textPrompt: 'Which functions call processPayment?' },
  environment: { type: 'local' },
  evaluators: [{
    id: 'recall-check', name: 'Recall check', weight: 1,
    type: 'expected-output',
    expectedOutput: 'chargeStripe',
    matchMode: 'contains'
  }]
});
```

### Test context rule injection

```typescript
await evalRequest('/tasks', 'POST', {
  name: 'Create a PR for the auth changes following our coding standards.',
  subjectType: 'agent',
  instruction: { type: 'text', textPrompt: 'Create a PR for the auth changes following our coding standards.' },
  environment: { type: 'local' },
  evaluators: [{
    id: 'recall-check', name: 'Recall check', weight: 1,
    type: 'agent-judge',
    judgeAgentId: 'style-judge',
    judgePrompt: 'Did the PR description follow the style guide? Score 0-100.'
  }]
});
```

---

## Running an eval suite

```typescript
// Use the task ID returned by POST /evals/tasks and an installed agent’s ID.
const { suite } = await evalRequest('/suites', 'POST', {
  name: 'Memory recall', taskIds: [task.id],
});
const { run } = await evalRequest('/runs', 'POST', {
  suiteId: suite.id,
  subjects: [{ type: 'agent', referenceId: agentId, name: 'Memory agent' }],
});
await evalRequest(`/runs/${run.id}/start`, 'POST');

// Run this again to check progress. Results belong to the run.
const { run: latest } = await evalRequest(`/runs/${run.id}`);
console.log(latest.status, latest.results);
```

## Optimization loop

Once you have eval tasks, the optimizer can automatically improve the agent's memory configuration by adjusting its instructions, context rules, or ingestion pipeline parameters.

```typescript
// Configure optimization on a task
await evalRequest(`/tasks/${task.id}`, 'PUT', {
  optimization: {
    enabled: true,
    optimizerType: 'agent',
    optimizerAgentId: 'memory-optimizer',
    targets: ['instructions', 'config'],
    maxIterations: 10,
    targetScore: 85,
    improvementThreshold: 2,
    strategy: 'greedy'
  }
});
```

### Optimization strategies

| Strategy | How it works | Best for |
|---|---|---|
| `greedy` | Accept any improvement, continue from best | Fast convergence on a clear optimum |
| `best-of-n` | Try N variations in parallel, keep the best | Avoiding local optima |
| `annealing` | Accept some regressions early, tighten later | Complex parameter spaces |

### Optimization targets

| Target | What the optimizer modifies |
|---|---|
| `instructions` | Agent system prompt / instructions |
| `prompts` | LLM prompts used inside retrievers |
| `tools` | Which tools the agent is allowed to use |
| `config` | Agent configuration parameters |
| `code` | Agent source code (advanced) |

For memory optimization, `config` is the most useful target — the optimizer adjusts parameters like `topK`, `minScore`, and `chunkSize` based on which values produce better eval scores.

### Reading optimization history

```typescript
const { run: current } = await evalRequest(`/runs/${run.id}`);
for (const result of current.results) {
  if (result.optimization) {
    console.log(result.taskId, result.optimization.bestScore, result.optimization.iterations);
  }
}
```

## Evaluating action blocks directly

The eval system also supports `action-block` as a subject type:

```typescript
const { subject } = await evalRequest('/subjects', 'POST', {
  type: 'action-block', referenceId: 'memory-summarizer', name: 'Memory summarizer',
});
const { task: blockTask } = await evalRequest('/tasks', 'POST', {
  name: 'Summarize a known memory', subjectType: 'action-block',
  instruction: { type: 'text', textPrompt: JSON.stringify({ memoryId }) },
  environment: { type: 'local' },
  evaluators: [{ id: 'topic', name: 'Mentions the topic', type: 'expected-output',
    weight: 1, expectedOutput: 'database', matchMode: 'contains' }],
});
const { run: blockRun } = await evalRequest('/runs', 'POST', {
  taskId: blockTask.id, subjects: [subject],
});
await evalRequest(`/runs/${blockRun.id}/start`, 'POST');
```

## Viewing results in the UI

The **Eval** panel in the Codebolt desktop app shows:

- Pass/fail and score per task per run
- Per-evaluator breakdown with reasoning
- Score trend across optimization iterations
- Diff of what the optimizer changed between iterations

Use the evaluator reasoning column to understand *why* a retrieval failed — whether the vector search returned irrelevant results, the context rule suppressed the right source, or the knowledge graph had stale data.

## See also

- [Optimization patterns](./06_optimization-patterns.md) — practical recipes for improving memory quality
- [Hooks and action blocks](./03_hooks-and-action-blocks.md) — action blocks as eval subjects
