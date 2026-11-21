---
name: updateProjectState
description: Updates the project state on the server via WebSocket.
cbbaseinfo:
  description: Updates the project state on the server via WebSocket.
data:
  name: updateProjectState
  category: cbstate
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

## When to use it

Store a shared project value under a key. Use a workflow-specific key to avoid replacing another workflow's value.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Save your project name
  await codebolt.cbstate.updateProjectState('project_name', 'My Awesome App');

  // The response will be:
  // { type: 'updateProjectStateResponse', message: 'success' }
});
```

## More examples

### Store Different Types of Data

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store text
  await codebolt.cbstate.updateProjectState('project_description', 'A cool web application');

  // Store numbers (as strings)
  await codebolt.cbstate.updateProjectState('version_number', '1.0.0');

  // Store dates
  await codebolt.cbstate.updateProjectState('created_date', new Date().toISOString());

  // Store true/false values
  await codebolt.cbstate.updateProjectState('is_published', 'true');
});
```

### Working with Complex Data

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store user preferences
  const userPreferences = {
      theme: 'dark',
      language: 'english',
      notifications: true,
      autoSave: true
  };

  await codebolt.cbstate.updateProjectState('user_preferences', JSON.stringify(userPreferences));

  // Store a list of features
  const enabledFeatures = ['chat', 'file-upload', 'dark-mode'];
  await codebolt.cbstate.updateProjectState('enabled_features', JSON.stringify(enabledFeatures));
});
```

### Complete Example - Project Setup

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function setupProject() {
      try {
          // Basic project info
          await codebolt.cbstate.updateProjectState('project_name', 'Todo App');
          await codebolt.cbstate.updateProjectState('version', '1.0.0');
          await codebolt.cbstate.updateProjectState('environment', 'development');

          // Project settings
          const settings = {
              theme: 'light',
              language: 'en',
              autoSave: true
          };
          await codebolt.cbstate.updateProjectState('settings', JSON.stringify(settings));

          // Track when project was last updated
          await codebolt.cbstate.updateProjectState('last_updated', new Date().toISOString());

          console.log('✅ Project setup complete!');
      } catch (error) {
          console.error('❌ Setup failed:', error);
      }
  }

  // Run the setup
  setupProject();
});
```
