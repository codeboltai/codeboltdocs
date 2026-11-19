---
title: "Git Gateway Commands"
---

Use `codebolt command git` against a running server. Pass `--help` to a subcommand for its full options and accepted values.

| Subcommand | Purpose | Required flags | Help |
| --- | --- | --- | --- |
| `add` | Adds all changes to the Git staging area. | None | `codebolt command git add --help` |
| `branch` | Creates a new branch in the Git repository. | `--branch` | `codebolt command git branch --help` |
| `checkout` | Checks out a branch in the Git repository. | `--branch` | `codebolt command git checkout --help` |
| `clone` | Clones a remote Git repository. | `--url` | `codebolt command git clone --help` |
| `commit` | Commits staged changes with a message. | `--message` | `codebolt command git commit --help` |
| `diff` | Retrieves the diff for a specific commit. | `--commit-hash` | `codebolt command git diff --help` |
| `init` | Initializes a new Git repository at the specified path. | `--path` | `codebolt command git init --help` |
| `logs` | Retrieves the commit logs for the Git repository. | `--path` | `codebolt command git logs --help` |
| `pull` | Pulls changes from the remote repository. | None | `codebolt command git pull --help` |
| `push` | Pushes local commits to the remote repository. | None | `codebolt command git push --help` |
| `status` | Retrieves the status of the Git repository. | None | `codebolt command git status --help` |
