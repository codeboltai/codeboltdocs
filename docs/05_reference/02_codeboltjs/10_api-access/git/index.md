# Git

Run Git operations against the current repository.

## When to use it

Inspect status and diffs before committing. Use pull and push when you intend to synchronize the current branch with its remote.

## Examples

### Clone an Existing Repository

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Clone a repository from GitHub
  await codebolt.git.clone('https://github.com/user/repo.git', './my-project');
  console.log('✅ Repository cloned');

  // Check the status
  const status = await codebolt.git.status();
  console.log('Repository status:', status);
});
```

### Basic Branch Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new feature branch
  await codebolt.git.branch('feature/new-feature');
  console.log('✅ Branch created');

  // Switch to the new branch
  await codebolt.git.checkout('feature/new-feature');
  console.log('✅ Switched to feature branch');

  // Make changes and commit
  await codebolt.fs.createFile('feature.js', '// Feature implementation', '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('feat: add new feature');

  // Switch back to main branch
  await codebolt.git.checkout('main');
});
```

### Collaboration Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Pull latest changes
  await codebolt.git.pull();

  // Make your changes
  await codebolt.fs.createFile('new-feature.js', '// New feature', '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('feat: add new feature');

  // Push changes to remote
  await codebolt.git.push();
});
```

### Code Review Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature branch
  await codebolt.git.branch('feature/code-review');
  await codebolt.git.checkout('feature/code-review');

  // Make changes
  await codebolt.fs.updateFile('app.js', '.', '// Updated code');
  await codebolt.git.addAll();
  await codebolt.git.commit('refactor: improve app logic');

  // Push and create pull request (if using GitHub)
  await codebolt.git.push();
  console.log('✅ Ready for code review');
});
```

### Integration with File System Module

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create .gitignore and commit
  const gitignore = `node_modules/
.env
dist/
*.log`;

  await codebolt.fs.createFile('.gitignore', gitignore, '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('chore: add gitignore file');
});
```

### Pitfall 1: Committing Without Staging

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Forgetting to stage changes
  await codebolt.git.commit('New feature');

  // ✅ Good: Stage changes before committing
  await codebolt.git.addAll();
  await codebolt.git.commit('New feature');
});
```

### Pitfall 4: Poor Commit Messages

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Vague commit messages
  await codebolt.git.commit('update');
  await codebolt.git.commit('fix');
  await codebolt.git.commit('changes');

  // ✅ Good: Descriptive, conventional commits
  await codebolt.git.commit('feat: add user authentication');
  await codebolt.git.commit('fix: resolve login bug');
  await codebolt.git.commit('docs: update API documentation');
});
```

### Use Conventional Commits

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Follow conventional commit format
  await codebolt.git.commit('feat: add new feature');
  await codebolt.git.commit('fix: resolve critical bug');
  await codebolt.git.commit('docs: update README');
  await codebolt.git.commit('refactor: improve code structure');
});
```

### Create Feature Branches

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Always create branches for features
  await codebolt.git.branch('feature/user-auth');
  await codebolt.git.checkout('feature/user-auth');
  // Work on feature...
  await codebolt.git.checkout('main');
});
```

### Check Status Before Operations

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Always check repository status
  const status = await codebolt.git.status();
  if (status.data?.conflicted?.length === 0) {
      await codebolt.git.commit('Safe to commit');
  }
});
```

### Write Meaningful Commit Messages

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Include context in commit messages
  await codebolt.git.commit(
      'feat: implement OAuth2 authentication\n\n' +
      '- Add Google OAuth provider\n' +
      '- Implement token refresh mechanism\n' +
      '- Add user session management\n\n' +
      'Fixes #123'
  );
});
```

### Pull Before Push

```js
import codebolt from '@codebolt/codeboltjs';

// Always pull before pushing to avoid conflicts
async function safePush() {
    await codebolt.git.pull();
    await codebolt.git.push();
    console.log('✅ Changes pushed successfully');
}
```

### Use Atomic Commits

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // One logical change per commit
  await codebolt.fs.createFile('auth.js', '// auth code', '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('feat: add authentication module');

  await codebolt.fs.createFile('auth.test.js', '// test code', '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('test: add authentication tests');
});
```

## SDK methods

### init

[`init`](init.md) · Initializes a new Git repository at the given path.

### pull

[`pull`](pull.md) · Pulls the latest changes from the remote repository to the local repository at the given path.

### push

[`push`](push.md) · Pushes local repository changes to the remote repository at the given path.

### status

[`status`](status.md) · Retrieves the status of the local repository at the given path.

### addAll

[`addAll`](add.md) · Adds changes in the local repository to the staging area at the given path.

### commit

[`commit`](commit.md) · Commits the staged changes in the local repository with the given commit message.

### checkout

[`checkout`](checkout.md) · Checks out a branch or commit in the local repository at the given path.

### branch

[`branch`](branch.md) · Creates a new branch in the local repository at the given path.

### logs

[`logs`](logs.md) · Retrieves the commit logs for the local repository at the given path.

### diff

[`diff`](diff.md) · Retrieves the diff of changes for a specific commit in the local repository.

### clone

[`clone`](clone.md) · Clones a remote Git repository to the specified path.
