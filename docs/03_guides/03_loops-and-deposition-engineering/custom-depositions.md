---
sidebar_position: 5
title: Custom Depositions
description: Design depositions for custom plugins, custom UIs, and dedicated UI tools
---

import CustomDepositionDiagram from '@site/src/components/diagrams/CustomDepositionDiagram';

# Custom Depositions

Custom depositions adapt the deposition framework to custom plugins and custom UIs. Instead of using one generic record, you define the fields that your UI and tools need to continue a workflow later.

**Use case:** you build a custom plugin or custom UI and provide dedicated tools for actions and interactions inside that UI.

## Design the deposition

Start with the UI workflow:

- **Custom plugin:** owns the backend capability or integration.
- **Custom UI:** gives users a focused surface for the workflow.
- **Dedicated tools:** trigger actions, fetch state, submit choices, or update records.
- **Deposition:** stores the UI state, tool outputs, result, and next action.

## Define required fields

A custom UI deposition should specify:

- **UI state:** the selected item, active step, form state, or current view.
- **Tool actions:** which UI tools ran and what they returned.
- **Interaction result:** what the user or agent decided.
- **Artifact references:** IDs, paths, thread IDs, run IDs, or external records.
- **Next action:** what the next agent or UI interaction should do.



The custom UI can load this deposition later and show the same workflow state to another agent or user.

## Practical tips

- **Keep fields close to the UI.** Store the state the panel needs to reopen the workflow.
- **Record tool outputs.** The next agent should not have to rerun every action.
- **Use stable IDs.** Prefer record IDs, thread IDs, run IDs, and artifact paths.
- **Name the next action.** Make the pickup step explicit.

## See also

- [Deposition Framework](./deposition-framework.md)
- [Custom UIs](../../04_build-on-codebolt/04_custom-uis/01_overview.md)
- [Plugins Overview](../../04_build-on-codebolt/05_plugins/01_overview.md)
- [Action Blocks](../../04_build-on-codebolt/03_agent-extensions/05_action-blocks/01_overview.md)
