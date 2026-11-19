---
sidebar_position: 7
title: Review & Merge Design
description: Design review and merge handoffs for multi-agent work.
---

# Review & Merge Design

Use a review request to make a change and its evidence visible before merging. Link jobs, artifacts, and feedback to the request so the reviewer can see how the change was produced.

## Child agent review

The project **Merge Config** controls the handoff from child to parent. Choose **Parent reviews and merges** to let the parent review directly. Choose **Another agent must approve before the parent merges** when you need an independent review. The server checks the selected policy before it allows the handoff to merge.

## Check conflicts

Use **Check Conflicts** on a review-and-merge request before merging. Resolve reported conflicts in the appropriate review or source environment and inspect the changes again before applying them.

See [Review and Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md) for the desktop flow.
