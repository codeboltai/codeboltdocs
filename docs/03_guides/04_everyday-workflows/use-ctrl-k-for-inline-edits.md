---
sidebar_position: 5
title: Use Ctrl+K for Inline Edits
description: Apply and review a focused inline edit with keyboard shortcuts.
---

# Use Ctrl+K for Inline Edits

Try an inline edit on one function. Select its body and press **Ctrl+K** (**Cmd+K** on macOS). Enter a specific prompt, such as:

```text
Add a check for an empty input while keeping the existing return type.
```

Press **Enter** and review the proposed diff. Accept it with **Ctrl+Enter** (**Cmd+Enter** on macOS) or the **Accept** button. To discard the suggestion, use **Esc** or **Reject**.

If the proposed change misses the goal, reject it, select the code again, and provide a more specific instruction. In a Git repository, confirm the accepted changes in **Source Control → Changes**.

See [Inline Edit and Ctrl+K](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/05_inline-edit-and-ctrl-k.md) for the editor controls and agent setting.
