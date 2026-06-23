---
sidebar_position: 10
title: Multi-Agent Patterns
description: When one agent isn't enough — five recurring shapes for getting agents to work together.
---

import PatternIcons from '@site/src/components/diagrams/PatternIcons';
import SwarmArchitecture from '@site/src/components/diagrams/SwarmArchitecture';

# Multi-Agent Patterns

A single agent is the right answer most of the time. Reach for multi-agent when the work is **embarrassingly parallel**, sub-tasks need **different prompts or tools**, a **second perspective** improves quality, or the task has **distinct phases** better separated.

<PatternIcons />

## The five patterns

### 1. Swarm (parallel specialists)
N agents process the same input independently, each looking for something different. A coordinator merges results.

<SwarmArchitecture />

**Use for:** code review (security, perf, style as separate reviewers), data triage.

### 2. Plan → Execute → Review
A planner produces a structured plan; an executor runs it; a reviewer checks the result.

**Use for:** multi-step tasks where the plan is non-obvious and worth scrutinizing.

### 3. Debate
Two agents argue opposing positions; a judge decides.

**Use for:** decisions where overconfidence is the failure mode (security, correctness).

### 4. Stigmergy
Agents leave traces in shared memory; later agents react to those traces. No direct coordination.

**Use for:** open-ended exploration where the right path emerges from accumulated work.

### 5. Reputation
Multiple agent variants compete; the system tracks which produces good results and routes future work to them.

**Use for:** A/B testing prompts and models in production.

## What pattern selection depends on

| Situation | Pattern |
|---|---|
| Independence of sub-tasks | Swarm |
| Sequential dependency | Plan → Execute → Review |
| Adversarial check needed | Debate |
| No clear plan in advance | Stigmergy |
| Long-term self-improvement | Reputation |

## Cost discipline

Multi-agent multiplies LLM calls. A 5-agent swarm runs 5× the calls of a single agent — if quality doesn't improve 5×, just use one.

![Running a swarm](/productImages/multiagentusage/running_swarm.png)

→ **Read the full concept pages: [Multi-Agent Patterns](../../02_concepts/07_multi-agent/01_multi-agent-patterns.md) · [Orchestration Flows](../../02_concepts/07_multi-agent/02_orchestration-flows.md) · [Dispute Resolution](../../02_concepts/07_multi-agent/03_dispute-resolution.md)**

## See also

- [Agents](./03_agents.md)
- [The Planning System](./11_planning.md)
