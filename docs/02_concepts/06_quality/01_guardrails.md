---
sidebar_position: 1
title: Guardrails
description: How Codebolt keeps a single agent run from going off the rails
---

# Guardrails

CodeBolt uses policy profiles to control agent tool requests. A profile defines rules for particular tool types and a fallback decision when no rule matches. Threads can select a profile and otherwise use the project default.

When a rule requires approval, the user can review the tool and its arguments and decide whether it should proceed. Review the active profile before relying on its restrictions.

Use [Guardrails](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md) to configure profiles, permissions, and approvals. [Evals and Optimization](./02_evals-and-optimization.md) covers evaluating agent behavior.
