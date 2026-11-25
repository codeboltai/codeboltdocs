---
displayed_sidebar: getStartedSidebar
sidebar_position: 11
title: Multi-Agent Patterns
description: When one agent isn't enough. Five recurring shapes for getting agents to work together.
---

import PatternIcons from '@site/src/components/diagrams/PatternIcons';

# Multi-Agent Patterns

When one agent isn't enough. Five recurring shapes for getting agents to work together.

<PatternIcons />

## When you need more than one agent

A single agent is the right answer most of the time. Reach for multi-agent when:
- The work is **embarrassingly parallel** (review 50 files independently).
- Different sub-tasks need **different prompts or tools**.
- A second perspective improves quality (a reviewer behind a coder).
- The task has **distinct phases** (plan, execute, verify) better separated.

Don't reach for multi-agent for "complexity for its own sake". More agents = more failure modes.

## The five patterns

### 1. Swarm (parallel specialists)
N agents process the same input independently, each looking for something different. A coordinator merges results.
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
An orchestrator can compare the results of agent variants and use those scores when choosing an agent for future tasks. Define the selection policy in the orchestrator.
**Use for:** A/B testing prompts and models in production.

## What pattern selection depends on

- **Independence of sub-tasks** → swarm
- **Sequential dependency** → plan-execute-review
- **Adversarial check needed** → debate
- **No clear plan in advance** → stigmergy
- **Long-term self-improvement** → reputation

## Cost discipline

Multi-agent multiplies LLM calls. Budget accordingly. Compare the total model calls and run time for your task. Workers may take different numbers of turns, and review can add another run.

## See also

- [Multi-Agent Orchestration](../../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md)
- [Multi-agent usage](../../02_using-codebolt/07_multi-agent-usage/01_overview.md)
- [When multi-agent](../../04_build-on-codebolt/08_multi-agent-orchestration/02_when-multi-agent.md)
