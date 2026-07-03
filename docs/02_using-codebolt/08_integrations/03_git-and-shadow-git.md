---
sidebar_position: 3
title: Git and Shadow Git
description: Codebolt uses your real Git repository for source control and uses Shadow Git as an internal checkpoint system for restoring work after agent actions.
---

# Git and Shadow Git

Codebolt uses two Git-related systems while you work on a project:

- **Git** is your real project repository.
- **Shadow Git** is Codebolt's internal checkpoint system.

They are related because both track file states, but they are used for different reasons.

## Git

Git is the normal `.git` repository inside your project.

It is the same Git repository you use from:

- the terminal
- GitHub Desktop or another Git client
- the Codebolt Source Control panel
- the Codebolt Git Graph panel

Use real Git when you want to keep intentional project history:

- commit finished work
- switch branches
- create branches
- pull changes
- push changes
- review actual commit history
- collaborate through a remote repository

When Codebolt shows Git status, branches, commits, or Git Graph, it is reading this real repository.

When you commit or push from Codebolt, it affects your real Git history.

## Shadow Git

Shadow Git is Codebolt's private checkpoint system.

Before Codebolt sends some user actions to an agent, it tries to save a checkpoint of the current project files. That checkpoint is stored in Shadow Git, not in your real Git history.

Codebolt currently creates Shadow Git checkpoints for flows such as:

- chat messages
- task execution
- scheduled task execution
- action-plan build execution

The checkpoint hash is attached to the user message. If the agent changes files and the result is not what you wanted, Codebolt can restore the project files back to that checkpoint.

## Why Shadow Git exists

Agents can change many files quickly. Real Git is best for deliberate commits, but it is not ideal for creating a commit before every chat message or agent step.

Shadow Git gives Codebolt a local restore point without polluting your real Git history.

Use Shadow Git when you need to:

- undo changes made after an agent action
- return files to the state before a message was sent
- recover from a bad agent edit without creating real Git commits

## Restore from a checkpoint

When a user message has a Shadow Git checkpoint, Codebolt can show a restore control on that message after the agent stops processing.

Restoring a checkpoint:

1. checks that the Shadow Git checkpoint exists
2. finds which files will change
3. creates an automatic backup checkpoint of the current state
4. restores the project files to the selected checkpoint
5. shows the files changed by the restore

The restore changes files in your active project. It does not add, remove, or rewrite commits in your real Git history.

After a restore, your real Git repository may show file changes if the restored files differ from `HEAD`.

```mdx-code-block
{/* Add screenshot: Chat message with Shadow Git restore button and restored files list. */}
```

## Git vs Shadow Git

| Question | Git | Shadow Git |
| --- | --- | --- |
| What is it for? | Source control and collaboration | Local checkpoint and restore |
| Is it your real repository? | Yes | No |
| Does it create normal commits? | Yes, when you commit | No |
| Does it appear in Git Graph? | Yes | No |
| Can it push to a remote? | Yes | No |
| Is it useful for agent rollback? | Not directly | Yes |
| Can it change project files? | Yes | Yes, when restoring |

## Recommended workflow

Use both systems together:

1. Let the agent make changes.
2. Review the changed files.
3. If the result is wrong, restore from the Shadow Git checkpoint.
4. If the result is correct, commit the changes to real Git.
5. Push or sync when you are ready to share the work.

This keeps your real Git history clean while still giving you a fast rollback path for agent work.

## Important notes

- Shadow Git is local Codebolt recovery state.
- Shadow Git checkpoints are not pushed to your remote.
- Git Graph shows real Git commits, not Shadow Git checkpoints.
- A failed Shadow Git checkpoint does not block chat or task execution. Codebolt sends the message without a restore checkpoint.
- Restoring from Shadow Git affects files on disk, so review the result in real Git before committing.

## See also

- [Checkpoints and rollback](../02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md)
- [Checkpoint and rollback internals](../../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/checkpoint-and-rollback.md)
- [Project and workspace internals](../../04_build-on-codebolt/07b_subsystems/10_project-and-workspace.md)
