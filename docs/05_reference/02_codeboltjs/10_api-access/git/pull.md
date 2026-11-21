---
name: pull
description: Pulls the latest changes from the remote repository to the local repository at the given path.
cbbaseinfo:
  description: Pulls the latest changes from the remote repository to the local repository at the given path.
data:
  name: pull
  category: git
  link: pull.md
---

# pull

```text
codebolt.git.pull(): Promise<GitPullResponse>
```

Pulls the latest changes from the remote repository to the local repository at the given path.

## Returns

A promise that resolves with the response from the pull event.

## When to use it

Bring remote changes into the current checkout. Inspect the result and resolve reported conflicts before continuing.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 2: Pull with status check
async function pullWithStatusCheck() {
    try {
        // Check status before pull
        const statusBefore = await codebolt.git.status();
        console.log("Current branch:", statusBefore.data?.current);
        console.log("Behind remote:", statusBefore.data?.behind);

        // Pull latest changes
        const pullResult = await codebolt.git.pull();

        if (pullResult.success) {
            console.log("✅ Pull successful");
            console.log(`📊 Changes: ${pullResult.changes || 0}`);
            console.log(`➕ Insertions: ${pullResult.insertions || 0}`);
            console.log(`➖ Deletions: ${pullResult.deletions || 0}`);

            // Check status after pull
            const statusAfter = await codebolt.git.status();
            console.log("Now behind remote:", statusAfter.data?.behind);

            return true;
        } else {
            console.error("❌ Pull failed:", pullResult.error);
            return false;
        }
    } catch (error) {
        console.error("Error during pull operation:", error);
        return false;
    }
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 3: Safe pull with conflict detection
async function safePull() {
    try {
        // Check for uncommitted changes
        const status = await codebolt.git.status();

        if (!status.data) {
            console.error("❌ Unable to get repository status");
            return false;
        }

        // Warn about uncommitted changes
        const hasUncommitted = status.data.modified.length > 0 ||
                              status.data.not_added.length > 0 ||
                              status.data.staged.length > 0;

        if (hasUncommitted) {
            console.log("⚠️  Warning: You have uncommitted changes");
            console.log("Modified files:", status.data.modified.length);
            console.log("Untracked files:", status.data.not_added.length);
            console.log("Staged files:", status.data.staged.length);
        }

        // Check for conflicts
        if (status.data.conflicted.length > 0) {
            console.error("❌ Cannot pull with unresolved conflicts:");
            status.data.conflicted.forEach(file => console.log(`  - ${file}`));
            return false;
        }

        // Perform pull
        const pullResult = await codebolt.git.pull();

        if (pullResult.success) {
            console.log("✅ Pull completed successfully");

            if (pullResult.changes && pullResult.changes > 0) {
                console.log(`📦 Pulled ${pullResult.changes} changes`);
                console.log(`📝 ${pullResult.insertions || 0} insertions, ${pullResult.deletions || 0} deletions`);
            } else {
                console.log("📋 Repository is already up to date");
            }

            return true;
        } else {
            console.error("❌ Pull failed:", pullResult.error);
            return false;
        }
    } catch (error) {
        console.error("Error in safe pull:", error);
        return false;
    }
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 4: Pull with automatic conflict resolution workflow
async function pullWithConflictHandling() {
    const pullResult = await codebolt.git.pull();

    if (pullResult.success) {
        console.log("✅ Pull successful");
        return true;
    } else {
        // Check if it's a conflict error
        if (pullResult.error?.includes('conflict') || pullResult.error?.includes('merge')) {
            console.log("⚠️  Pull resulted in conflicts");

            // Check status to see conflicted files
            const status = await codebolt.git.status();
            if (status.data?.conflicted && status.data.conflicted.length > 0) {
                console.log("📋 Conflicted files:");
                status.data.conflicted.forEach(file => console.log(`  - ${file}`));
                console.log("💡 Resolve conflicts manually and then commit");
                return false;
            }
        }

        console.error("❌ Pull failed:", pullResult.error);
        return false;
    }
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 5: Synchronization check before pull
async function syncCheck() {
    try {
        const status = await codebolt.git.status();

        if (!status.data) {
            console.error("❌ Unable to get repository status");
            return false;
        }

        const { ahead, behind, current, tracking } = status.data;

        console.log(`📍 Current branch: ${current}`);
        console.log(`🔗 Tracking: ${tracking || 'Not tracking any remote'}`);

        if (behind === 0) {
            console.log("✅ Repository is up to date");
            return true;
        }

        console.log(`⬇️  ${behind} commits behind remote`);

        // Pull to sync
        const pullResult = await codebolt.git.pull();

        if (pullResult.success) {
            console.log(`✅ Synchronized with remote (${pullResult.changes || 0} changes)`);
            return true;
        } else {
            console.error("❌ Failed to synchronize:", pullResult.error);
            return false;
        }
    } catch (error) {
        console.error("Error in sync check:", error);
        return false;
    }
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Error handling
  try {
      const pullResult = await codebolt.git.pull();

      if (pullResult.success) {
          console.log('✅ Pull completed successfully');
          console.log('Changes pulled:', pullResult.changes || 0);
          console.log('Insertions:', pullResult.insertions || 0);
          console.log('Deletions:', pullResult.deletions || 0);
      } else {
          console.error('❌ Pull failed:', pullResult.error);
          console.error('Message:', pullResult.message);
      }
  } catch (error) {
      console.error('Error during pull operation:', error);
  }
});
```
