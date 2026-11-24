---
sidebar_position: 5
title: Memory Evaluation
description: Test whether an agent retrieves and uses a known project record.
---

# Memory Evaluation

Evaluating memory means measuring whether agents are retrieving the right information at the right time and whether the pipeline that writes to storage is producing quality embeddings and knowledge graph entries. Use a known record and an expected answer to measure recall.

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
| `semantic` | Response contains the expected text, ignoring case |

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

Use `semantic` mode when capitalization may differ:

```typescript
{
  type: 'expected-output',
  expectedOutput: 'kuzu',
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

The evaluator opens a deliberation with the listed agents and immediately requests the winning option. If no winner is available yet, it uses a score of 50.

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

Run the same suite against the same agent and stored records before and after changing one retrieval setting. Save the two run IDs and compare their task scores and answers. Use the context assembly trace to check whether the expected record reached the agent.

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

Open the **Eval** panel and select the run to inspect its results. An evaluator scores the subject's output. To investigate a low score, compare that output with the memory records and the [assembly trace](./02g_context-assembly.md).

## See also

- [Optimization patterns](./06_optimization-patterns.md) — practical recipes for improving memory quality
- [Hooks and action blocks](./03_hooks-and-action-blocks.md) — action blocks as eval subjects
