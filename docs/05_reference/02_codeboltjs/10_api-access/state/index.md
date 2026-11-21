# State API

Use [`codebolt.cbstate`](../cbstate/index.md) on the default client for application, agent, and project state.

## Example

### Quick Start Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get application state
  const appState = await codebolt.cbstate.getApplicationState();
  console.log('Application state:', appState);

  // Add to agent state
  await codebolt.cbstate.addToAgentState('lastTask', 'data-processing');

  // Get agent state
  const agentState = await codebolt.cbstate.getAgentState();
  console.log('Agent state:', agentState);

  // Update project state
  await codebolt.cbstate.updateProjectState('status', 'active');

  // Get project state
  const projectState = await codebolt.cbstate.getProjectState();
  console.log('Project state:', projectState);
});
```
