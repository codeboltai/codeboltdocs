---
name: status
description: Retrieves the status of the local repository at the given path.
cbbaseinfo:
  description: Retrieves the status of the local repository at the given path.
data:
  name: status
  category: git
  link: status.md
---

# status

```text
codebolt.git.status(): Promise<GitStatusResponse>
```

Retrieves the status of the local repository at the given path.

## Returns

A promise that resolves with the response from the status event.

## When to use it

Check pending changes before staging or committing. Use the result to identify which files still need review.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Comprehensive status analysis
  const status = await codebolt.git.status();
  if (status.success && status.data) {
      const data = status.data;

      console.log(`📍 Current branch: ${data.current}`);
      console.log(`🔗 Tracking: ${data.tracking || 'Not tracking any remote'}`);
      console.log(`⬆️  Ahead: ${data.ahead} commits`);
      console.log(`⬇️  Behind: ${data.behind} commits`);

      if (data.not_added.length > 0) {
          console.log(`📄 Untracked files (${data.not_added.length}):`);
          data.not_added.forEach(file => console.log(`  - ${file}`));
      }

      if (data.modified.length > 0) {
          console.log(`✏️  Modified files (${data.modified.length}):`);
          data.modified.forEach(file => console.log(`  - ${file}`));
      }

      if (data.staged.length > 0) {
          console.log(`✅ Staged files (${data.staged.length}):`);
          data.staged.forEach(file => console.log(`  - ${file}`));
      }

      if (data.conflicted.length > 0) {
          console.log(`⚠️  Conflicted files (${data.conflicted.length}):`);
          data.conflicted.forEach(file => console.log(`  - ${file}`));
      }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Status-based workflow decisions
  const repoStatus = await codebolt.git.status();
  if (repoStatus.data) {
      const hasChanges = repoStatus.data.modified.length > 0 ||
                        repoStatus.data.not_added.length > 0 ||
                        repoStatus.data.staged.length > 0;

      if (hasChanges) {
          console.log("📝 Repository has changes");

          if (repoStatus.data.staged.length > 0) {
              console.log("✅ Ready to commit staged changes");
          }

          if (repoStatus.data.modified.length > 0) {
              console.log("⚠️  Modified files need to be staged");
          }

          if (repoStatus.data.not_added.length > 0) {
              console.log("📄 New files need to be added");
          }
      } else {
          console.log("✨ Working tree is clean");
      }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 4: Pre-commit status check
async function preCommitCheck() {
    const status = await codebolt.git.status();

    if (!status.success) {
        console.error("❌ Failed to get repository status:", status.error);
        return false;
    }

    if (!status.data?.staged || status.data.staged.length === 0) {
        console.log("⚠️  No staged changes to commit");
        return false;
    }

    if (status.data.conflicted.length > 0) {
        console.error("❌ Cannot commit with unresolved conflicts:");
        status.data.conflicted.forEach(file => console.log(`  - ${file}`));
        return false;
    }

    console.log(`✅ Ready to commit ${status.data.staged.length} staged files`);
    return true;
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Repository synchronization check
  const syncStatus = await codebolt.git.status();
  if (syncStatus.data) {
      const { ahead, behind, current, tracking } = syncStatus.data;

      if (!tracking) {
          console.log("🔗 Branch is not tracking a remote");
      } else if (ahead > 0 && behind > 0) {
          console.log(`🔄 Branch diverged: ${ahead} ahead, ${behind} behind ${tracking}`);
      } else if (ahead > 0) {
          console.log(`⬆️  Branch is ${ahead} commits ahead of ${tracking}`);
      } else if (behind > 0) {
          console.log(`⬇️  Branch is ${behind} commits behind ${tracking}`);
      } else {
          console.log(`✅ Branch is up to date with ${tracking}`);
      }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Error handling
  try {
      const statusResult = await codebolt.git.status();

      if (statusResult.success) {
          console.log('✅ Status retrieved successfully');
          // Process status data...
      } else {
          console.error('❌ Failed to get status:', statusResult.error);
      }
  } catch (error) {
      console.error('Error getting Git status:', error);
  }
});
```
