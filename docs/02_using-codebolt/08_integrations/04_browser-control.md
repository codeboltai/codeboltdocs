---
sidebar_position: 4
title: Browser Control
description: Use the browser tools available to an agent to inspect pages.
---

# Browser Control

![Browser Control](/productImages/integrations/browser.png)

An agent with browser tools can open a page, inspect its contents, and capture screenshots. Check the agent's available tools and the active [Policy Profile](../05b_guardrails-and-settings/01_guardrails.md#policy-profiles) before assigning browser work.

## Example

Ask an agent with browser access to open a running local app, check that its main heading renders, and capture a screenshot. Give the agent the address as seen from its runtime. A local server address refers to the machine or environment running the browser.

Custom agents can use the [CodeboltJS Browser API](../../05_reference/02_codeboltjs/10_api-access/browser/index.md) for page operations such as navigation, reading content, and screenshots.

## See also

- [Preview & Browser](../02_surfaces/02_desktop-app/03b_code-and-terminal/05_preview-browser.md)
- [Custom Tools](../04b_agent-extensions/07_custom-tools.md)
