---
title: Git API
---

# Git API

Git API - git operations

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`branch`](./branch) | Lists branches in the repository. |
| [`checkout`](./checkout) | Checks out an existing branch or commit. |
| [`commit`](./commit) | Creates a new Git commit with the staged changes. |
| [`createBranch`](./createBranch) | Creates a new Git branch. |
| [`diff`](./diff) | Retrieves the current diff of changes in the working directory. |
| [`download`](./download) | Downloads (clones) a remote Git repository. |
| [`getRemoteUrl`](./getRemoteUrl) | Retrieves the configured remote URL for the repository. |
| [`graph`](./graph) | Retrieves the commit graph (history) of the repository. |
| [`init`](./init) | Initializes a new Git repository in the workspace. |
| [`publishRemote`](./publishRemote) | Publishes the local repository to a new remote. |
| [`pull`](./pull) | Pulls changes from the remote repository. |
| [`push`](./push) | Pushes committed changes to the remote repository. |
| [`pushToRemote`](./pushToRemote) | Pushes committed changes to the remote repository. |
| [`revert`](./revert) | Reverts changes to tracked files in the working directory. |
| [`revertUntracked`](./revertUntracked) | Removes untracked files from the working directory. |
| [`status`](./status) | Retrieves the current Git status of the working directory. |

## Methods

---

### `branch`

```typescript
client.git.branch(data?: GitBranchRequest): Promise<GitBranch[]>
```

Lists branches in the repository.

Returns all local (and optionally remote) branches with their
metadata. Useful for branch selection UIs and workflow logic.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitBranchRequest` | No | Optional parameters to filter branches (e.g., local-only, remote) |

**Returns:** `Promise<GitBranch[]>` — A promise that resolves to an array of  objects

[Full reference →](./branch)

---

### `checkout`

```typescript
client.git.checkout(data: GitCheckoutRequest): Promise<unknown>
```

Checks out an existing branch or commit.

Switches the working directory to the specified branch, tag, or
commit hash.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCheckoutRequest` | Yes | Checkout parameters specifying the target branch or commit |

**Returns:** `Promise<unknown>` — A promise that resolves when the checkout is complete

[Full reference →](./checkout)

---

### `commit`

```typescript
client.git.commit(data: GitCommitRequest): Promise<unknown>
```

Creates a new Git commit with the staged changes.

Commits all currently staged files with the provided commit message
and optional author information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCommitRequest` | Yes | Commit parameters including the commit message |

**Returns:** `Promise<unknown>` — A promise that resolves when the commit is created

[Full reference →](./commit)

---

### `createBranch`

```typescript
client.git.createBranch(data: GitCreateBranchRequest): Promise<unknown>
```

Creates a new Git branch.

Creates a branch with the specified name, optionally based on a
given starting point (commit, tag, or another branch).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCreateBranchRequest` | Yes | Branch creation parameters including the new branch name |

**Returns:** `Promise<unknown>` — A promise that resolves when the branch has been created

[Full reference →](./createBranch)

---

### `diff`

```typescript
client.git.diff(data?: GitDiffRequest): Promise<GitDiff[]>
```

Retrieves the current diff of changes in the working directory.

Compares the working tree against the latest commit to show all
unstaged modifications. Optionally filters to a specific file path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitDiffRequest` | No | Optional filter parameters |

**Returns:** `Promise<GitDiff[]>` — A promise that resolves to an array of  objects with file changes and line modifications

[Full reference →](./diff)

---

### `download`

```typescript
client.git.download(data: GitDownloadRequest): Promise<unknown>
```

Downloads (clones) a remote Git repository.

Clones a repository from a URL into the workspace. Use this to
set up a project from an existing remote repository.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitDownloadRequest` | Yes | Clone parameters including the repository URL |

**Returns:** `Promise<unknown>` — A promise that resolves when the download/clone is complete

[Full reference →](./download)

---

### `getRemoteUrl`

```typescript
client.git.getRemoteUrl(): Promise<GitRemoteUrlResponse>
```

Retrieves the configured remote URL for the repository.

Returns the URL of the primary remote (typically "origin"). Useful
for displaying repository information or constructing web links.

_No parameters._

**Returns:** `Promise<GitRemoteUrlResponse>` — A promise that resolves to a  containing the remote URL

[Full reference →](./getRemoteUrl)

---

### `graph`

```typescript
client.git.graph(data?: GitGraphRequest): Promise<GitCommit[]>
```

Retrieves the commit graph (history) of the repository.

Returns an array of commits representing the repository's history.
Useful for rendering commit timelines or inspecting past changes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitGraphRequest` | No | Optional parameters to filter the graph (e.g., branch, limit) |

**Returns:** `Promise<GitCommit[]>` — A promise that resolves to an array of  objects

[Full reference →](./graph)

---

### `init`

```typescript
client.git.init(data?: GitInitRequest): Promise<unknown>
```

Initializes a new Git repository in the workspace.

Creates a new `.git` directory and sets up the repository. If the
repository already exists, behavior depends on the server configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitInitRequest` | No | Optional initialization parameters such as default branch name |

**Returns:** `Promise<unknown>` — A promise that resolves when initialization is complete

[Full reference →](./init)

---

### `publishRemote`

```typescript
client.git.publishRemote(data: GitPublishRemoteRequest): Promise<unknown>
```

Publishes the local repository to a new remote.

Sets up a remote and pushes the local repository to it for the first
time. Use this when the repository does not yet have a remote configured.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPublishRemoteRequest` | Yes | Remote publication parameters including the target URL |

**Returns:** `Promise<unknown>` — A promise that resolves when publishing is complete

[Full reference →](./publishRemote)

---

### `pull`

```typescript
client.git.pull(data?: GitPullRequest): Promise<unknown>
```

Pulls changes from the remote repository.

Downloads and integrates remote changes into the current branch.
Equivalent to running `git pull` from the command line.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPullRequest` | No | Optional pull parameters such as remote name or branch |

**Returns:** `Promise<unknown>` — A promise that resolves when the pull is complete

[Full reference →](./pull)

---

### `push`

```typescript
client.git.push(data?: GitPushRequest): Promise<unknown>
```

Pushes committed changes to the remote repository.

An alias for  providing a shorter method name.
Both methods perform the same push operation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPushRequest` | No | Optional push parameters such as branch or force flag |

**Returns:** `Promise<unknown>` — A promise that resolves when the push is complete

[Full reference →](./push)

---

### `pushToRemote`

```typescript
client.git.pushToRemote(data?: GitPushRequest): Promise<unknown>
```

Pushes committed changes to the remote repository.

Uploads local commits to the configured remote. This is the standard
way to share local changes with the remote repository.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPushRequest` | No | Optional push parameters such as branch or force flag |

**Returns:** `Promise<unknown>` — A promise that resolves when the push is complete

[Full reference →](./pushToRemote)

---

### `revert`

```typescript
client.git.revert(data: GitRevertRequest): Promise<unknown>
```

Reverts changes to tracked files in the working directory.

Discards uncommitted modifications to files that are already tracked
by Git, restoring them to their last committed state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitRevertRequest` | Yes | Request specifying which files to revert |

**Returns:** `Promise<unknown>` — A promise that resolves when the revert is complete

[Full reference →](./revert)

---

### `revertUntracked`

```typescript
client.git.revertUntracked(data: GitRevertRequest): Promise<unknown>
```

Removes untracked files from the working directory.

Deletes files that are not tracked by Git (i.e., new files that
have not been staged or committed). Use with caution as this
operation cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitRevertRequest` | Yes | Request specifying which untracked files to remove |

**Returns:** `Promise<unknown>` — A promise that resolves when the untracked files have been removed

[Full reference →](./revertUntracked)

---

### `status`

```typescript
client.git.status(data?: GitStatusRequest): Promise<GitStatus>
```

Retrieves the current Git status of the working directory.

Returns information about staged, unstaged, and untracked files,
similar to running `git status` from the command line.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitStatusRequest` | No | Optional parameters to scope the status check |

**Returns:** `Promise<GitStatus>` — A promise that resolves to the  of the repository

[Full reference →](./status)

