---
sidebar_position: 9
title: Guardrails & Eval
description: Understand how guarded tool calls use a policy profile and where evaluations fit.
---

# Guardrails and Evals

Guarded tool calls resolve a policy profile from the thread or project. The engine uses the selected profile to evaluate the tool intent against its permissions.

## Tool decisions

The engine checks applicable rules for the tool, tool category, and wildcard entries. A rule can allow or deny an operation, request an approval, or ask the LLM evaluator to assess the intent. For `askFromLLM`, the rule's risk policy maps the result to a decision.

Use [Guardrails and Policy Profiles](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md) to configure the profile and review approval options.

## Evals

Use [Eval Tasks](../../02_using-codebolt/05e_eval-and-optimization/02_eval-tasks.md) to evaluate a subject against defined criteria. The eval workflow measures outcomes and can be used to compare changes to an agent or configuration.
