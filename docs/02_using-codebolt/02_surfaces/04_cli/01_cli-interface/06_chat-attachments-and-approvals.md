---
sidebar_position: 4
title: "Chat, Attachments & Approvals"
description: Send prompts, reference files, attach images, and respond to approval requests in the Codebolt terminal interface.
---

# Chat, Attachments & Approvals

Open **Chat** from the top bar. Type a prompt in the composer and press `Enter`. Use `Ctrl+J` to add a line to the prompt.

## Guide a running agent

| To | Use |
|---|---|
| Give the agent a new direction during the run | Type a follow-up and press `Enter`. The message appears in Chat as **Steering**. |
| Queue work for after the current step | Type the next instruction and press `Ctrl+Enter`. Chat shows a **Step queued** message. |
| Stop the active run | Dismiss any open picker or respond to any approval request, then press `Esc`. |

With the composer focused and its menus closed, press `Up` or `Down` to recall sent prompts from the current conversation. Press `Down` past the newest entry to return to your draft.

## Reference a file

1. Type `@` at the start of a word in the composer.
2. Type part of the file name or path to narrow the suggestions.
3. Highlight the file with the arrow keys and press `Enter` to insert its path. Finish writing your prompt and press `Enter` to send it.

For example, type `Explain how`, choose your entry-point file with `@`, then ask what it initializes at startup.

## Attach an image

1. Paste a path to a local image, or paste a single HTTP or HTTPS URL that serves an image.
2. Wait for the attachment to appear in the composer. The size limit is 15 MiB per image.
3. Add a text prompt and press `Enter` to send it as a regular chat message.

Send image attachments when the agent is idle. If the composer text is empty, press `Backspace` or `Delete` to remove the last image.

## Respond to an approval request

When an action requires approval, review the request in Chat. Use `Up` and `Down` to select an option, then press `Enter`. When the request offers approval and rejection, press `Y` to approve or `N` to reject. You can also press `Esc` to choose rejection when it’s available.

To choose an enabled policy profile for the current conversation, open the [Command Palette](./07_conversations-and-slash-commands.md#open-the-command-palette) with `Ctrl+P` and select `/guardrail`.

## Check steps and todos

In an active thread, press `Ctrl+B` then `d` to open **Steps**, or `Ctrl+B` then `o` to open **Todos**. If the agent changed files, open the [Git tab](./03_tabs-and-panels.md#git-tab) to check the working tree.
