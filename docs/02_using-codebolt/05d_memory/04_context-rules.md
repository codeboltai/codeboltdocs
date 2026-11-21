---
sidebar_position: 4
title: Context Rules
description: Select Persistent Memory definitions by matching conditions on a context assembly request.
---

# Context Rules

Context rule engines add Persistent Memory definitions to a context assembly request when conditions match. Open **Context → Context Assembly** from the desktop bottom bar to view and run rule engines.

## Rule structure

A rule contains conditions and the Persistent Memory definitions to add. All conditions in a rule must match. Use separate rules when different conditions should select the same memory.

For example, add a rule that checks whether `input.text` contains `refactor` and adds a definition for architecture decisions.

## Condition fields

Use `input.<field>` for request input, `scope.<scope_type>.<variable>` for scope variables, and `addVar.<variable>` for additional variables. For example, `scope.swarm.swarm_id` can select memory for a specific swarm.

## Condition operators

Use `eq` and `neq` for equality, `exists` and `not_exists` to test presence, and `contains`, `starts_with`, or `ends_with` for text matching. The rule builder also supports membership and numeric comparisons.

## Test a rule engine

Select **Run** for the engine, supply sample input and scope variables, and inspect the trace. Check which rules matched and which definitions contributed to the assembled context.

See [Context Assembly](./03_context-assembly.md) and [Persistent Memory](./05_persistent-memory.md).
