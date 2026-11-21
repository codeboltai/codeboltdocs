---
sidebar_position: 5
title: Inline Edit and Ctrl+K
description: Request and review a change to a selection in the desktop editor.
---

# Inline Edit and Ctrl+K

Use inline edit for a focused change in the current file.

![Inline Edit and Ctrl+K](/productImages/chat/controll+k.gif)

## The flow

1. Select the code you want to change.
2. Press **Ctrl+K**, or **Cmd+K** on macOS, to open the inline prompt.
3. Enter a specific instruction, such as `Extract the validation into a helper function`, and press **Enter**.
4. Review the proposed change. Click **Accept** or press **Ctrl+Enter** (**Cmd+Enter** on macOS) to keep it. Click **Reject** or press **Esc** to discard it.
5. To try a different instruction, reject the proposal and open inline edit again.

## Choose the inline-edit agent

Open **Settings → Code Editor Setting** and select the agent for **Ctrl+K / Cmd+K** code editing.

Use [Chat](./01_overview.md) for changes across multiple files. To inspect an accepted edit in a Git project, open **Source Control** in the editor's file sidebar and select the changed file under **Changes**.
