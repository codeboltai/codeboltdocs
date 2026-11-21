---
sidebar_label: State
---

# State

Read application, agent, and project state and update state values.

Access state through `codebolt.cbstate` on the default client.

## When to use it

Keep run-specific data in agent state and share project-level values through project state. Use a distinct key for each workflow.

## Examples

### Basic Usage

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store temporary agent session data
  await codebolt.cbstate.addToAgentState('user_id', 'user_123');
  await codebolt.cbstate.addToAgentState('session_start', new Date().toISOString());

  // Store persistent project settings
  await codebolt.cbstate.updateProjectState('project_name', 'My Awesome App');
  await codebolt.cbstate.updateProjectState('version', '1.0.0');

  // Retrieve agent state
  const agentState = await codebolt.cbstate.getAgentState();
  console.log('Agent data:', agentState.payload);

  // Retrieve project state
  const projectState = await codebolt.cbstate.getProjectState();
  console.log('Project data:', projectState.projectState);
});
```

### Workflow 4: State Synchronization

```javascript
import codebolt from '@codebolt/codeboltjs';

async function syncAgentToProject() {
  try {
    // Get agent state
    const agentState = await codebolt.cbstate.getAgentState();

    // Extract important data to persist
    if (agentState.payload == null) throw new Error('The response is missing payload.');
    const sessionSummary = {
      sessionId: agentState.payload.session_id,
      startTime: agentState.payload.session_start,
      lastActivity: agentState.payload.last_activity,
      actionsCompleted: agentState.payload.current_step
    };

    // Store in project state for persistence
    await codebolt.cbstate.updateProjectState(
      'last_session_summary',
      JSON.stringify(sessionSummary)
    );

    console.log('✅ State synchronized to project');
    return sessionSummary;
  } catch (error) {
    console.error('❌ Sync failed:', error);
    return null;
  }
}
```

### Integration with Memory Module

```javascript
import codebolt from '@codebolt/codeboltjs';

async function cacheStateInMemory() {
  try {
    const projectState = await codebolt.cbstate.getProjectState();

    // Cache frequently accessed state data in memory
    if (projectState.projectState == null) throw new Error('The response is missing projectState.');
    await codebolt.dbmemory.addKnowledge(
      'cache:project_config',
      projectState.projectState.state
    );

    if (projectState.projectState == null) throw new Error('The response is missing projectState.');
    await codebolt.dbmemory.addKnowledge(
      'cache:project_metadata',
      {
        name: projectState.projectState.projectName,
        path: projectState.projectState.projectPath,
        tokensUsed: projectState.projectState.token_used
      }
    );

    console.log('✅ State cached in memory');
    return true;
  } catch (error) {
    console.error('❌ Caching failed:', error);
    return false;
  }
}
```

### Choose the Right State Level

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ✅ Good: Use agent state for temporary data
  await codebolt.cbstate.addToAgentState('temp_counter', '5');

  // ✅ Good: Use project state for persistent data
  await codebolt.cbstate.updateProjectState('project_name', 'My App');

  // ❌ Bad: Don't store temporary data in project state
  await codebolt.cbstate.updateProjectState('temp_counter', '5'); // Wastes persistent storage
});
```

### Use Descriptive Key Names

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ✅ Good: Descriptive, namespaced keys
  await codebolt.cbstate.addToAgentState('user:session:id', 'sess_123');
  await codebolt.cbstate.addToAgentState('user:preferences:theme', 'dark');
  await codebolt.cbstate.updateProjectState('project:version', '1.0.0');

  // ❌ Bad: Vague or conflicting keys
  await codebolt.cbstate.addToAgentState('id', 'sess_123');
  await codebolt.cbstate.addToAgentState('data', 'dark');
  await codebolt.cbstate.updateProjectState('version', '1.0.0');
});
```

### Batch State Updates

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Multiple sequential calls
  await codebolt.cbstate.addToAgentState('key1', 'value1');
  await codebolt.cbstate.addToAgentState('key2', 'value2');
  await codebolt.cbstate.addToAgentState('key3', 'value3');

  // ✅ Good: Use Promise.all for parallel updates
  await Promise.all([
    codebolt.cbstate.addToAgentState('key1', 'value1'),
    codebolt.cbstate.addToAgentState('key2', 'value2'),
    codebolt.cbstate.addToAgentState('key3', 'value3')
  ]);
});
```

### Pitfall 3: Confusing State Levels

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Problem: Using wrong state level
  await codebolt.cbstate.addToAgentState('project_name', 'My App'); // Lost when session ends

  // ✅ Solution: Use project state for persistent data
  await codebolt.cbstate.updateProjectState('project_name', 'My App');
});
```

## SDK methods

### getApplicationState

[`getApplicationState`](getApplicationState.md) · Retrieves the current application state from the server via WebSocket.

### addToAgentState

[`addToAgentState`](addToAgentState.md) · Adds a key-value pair to the agent's state on the server via WebSocket.

### getAgentState

[`getAgentState`](getAgentState.md) · Retrieves the current state of the agent from the server via WebSocket.

### getProjectState

[`getProjectState`](getProjectState.md) · Retrieves the current project state from the server via WebSocket.

### updateProjectState

[`updateProjectState`](updateProjectState.md) · Updates the project state on the server via WebSocket.
