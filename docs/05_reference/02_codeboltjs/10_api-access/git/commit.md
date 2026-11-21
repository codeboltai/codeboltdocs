---
name: commit
description: Commits the staged changes in the local repository with the given commit message.
cbbaseinfo:
  description: Commits the staged changes in the local repository with the given commit message.
data:
  name: commit
  category: git
  link: commit.md
---

# commit

```text
codebolt.git.commit(message: string): Promise<GitCommitResponse>
```

Commits the staged changes in the local repository with the given commit message.

## Parameters

- `message` — The commit message to use for the commit.

## Returns

A promise that resolves with the response from the commit event.

## When to use it

Record staged work under a descriptive message after checking what is included.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

// Example 2: Complete commit workflow
async function completeCommitWorkflow() {
    try {
        // 1. Check repository status
        const status = await codebolt.git.status();
        console.log("Staged files:", status.data?.staged?.length || 0);

        if (!status.data?.staged || status.data.staged.length === 0) {
            console.log("⚠️  No staged changes to commit");
            return false;
        }

        // 2. Create commit with descriptive message
        const commitResult = await codebolt.git.commit('Add new features and bug fixes');

        if (commitResult.success) {
            console.log("✅ Commit created successfully");
            console.log("Commit hash:", commitResult.hash);
            console.log("Commit details:", commitResult.content);
            return true;
        } else {
            console.error("❌ Failed to create commit:", commitResult.error);
            return false;
        }
    } catch (error) {
        console.error("Error in commit workflow:", error);
        return false;
    }
}
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 7: Error handling
  try {
      const commitResult = await codebolt.git.commit('Fix critical bug in user authentication');

      if (commitResult.success) {
          console.log('✅ Commit created successfully');
          console.log('Commit hash:', commitResult.hash);
          console.log('Commit content:', commitResult.content);
      } else {
          console.error('❌ Failed to create commit:', commitResult.error);
          console.error('Message:', commitResult.message);
      }
  } catch (error) {
      console.error('Error creating commit:', error);
  }
});
```
