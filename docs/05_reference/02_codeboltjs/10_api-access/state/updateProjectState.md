---
name: updateProjectState
description: Updates the project state on the server via WebSocket.
cbbaseinfo:
  description: Updates the project state on the server via WebSocket.
data:
  name: updateProjectState
  category: state
  link: updateProjectState.md
---

# updateProjectState

```text
codebolt.cbstate.updateProjectState(key: string, value: any): Promise<UpdateProjectStateResponse>
```

Updates the project state on the server via WebSocket.

## Parameters

- `key` — The key to update in the project state.
- `value` — The value to set for the key.

## Returns

A promise that resolves with the response to the update request.

## Examples

### Update Simple Project Status

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update project status
  const result = await codebolt.cbstate.updateProjectState('status', 'completed');
  console.log('Project state updated:', result);

  // }
});
```

### Explanation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.cbstate.updateProjectState('status', 'active');
  await codebolt.cbstate.updateProjectState('version', '2.0.0');
  await codebolt.cbstate.updateProjectState('completionPercentage', 75);
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.cbstate.updateProjectState('settings', {
    theme: 'dark',
    language: 'en',
    notifications: true
  });
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.cbstate.updateProjectState('completedMilestones', [
    'milestone-001',
    'milestone-002'
  ]);
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.cbstate.updateProjectState('metrics', {
    performance: {
      loadTime: 1200,
      responseTime: 300
    },
    usage: {
      activeUsers: 150,
      totalRequests: 5000
    }
  });
});
```
