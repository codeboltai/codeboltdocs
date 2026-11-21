---
name: addToAgentState
description: Adds a key-value pair to the agent's state on the server via WebSocket.
cbbaseinfo:
  description: Adds a key-value pair to the agent's state on the server via WebSocket.
data:
  name: addToAgentState
  category: cbstate
  link: addToAgentState.md
---

# addToAgentState

```text
codebolt.cbstate.addToAgentState(key: string, value: string): Promise<AddToAgentStateResponse>
```

Adds a key-value pair to the agent's state on the server via WebSocket.

## Parameters

- `key` — The key to add to the agent's state.
- `value` — The value associated with the key.

## Returns

A promise that resolves with the response to the addition request.

## When to use it

Save a short progress marker or preference under a key so a later agent operation can read it back.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Save a user's theme preference for this session
  const result = await codebolt.cbstate.addToAgentState('user_preference', 'dark_theme');
  console.log('Response:', result);
  // Output: { type: 'addToAgentStateResponse', payload: { sucess: true } }
});
```

## More examples

### Store Different Types of Session Data

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store session ID
  await codebolt.cbstate.addToAgentState('session_id', 'sess_' + Date.now());

  // Store user language preference
  await codebolt.cbstate.addToAgentState('user_language', 'en');

  // Store debug mode setting
  await codebolt.cbstate.addToAgentState('debug_mode', 'true');

  // Store current timestamp
  await codebolt.cbstate.addToAgentState('last_activity', new Date().toISOString());

  // Store current step in a process
  await codebolt.cbstate.addToAgentState('current_step', '3');
});
```

### Working with Complex Data

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Store user preferences as JSON
  const userPreferences = {
      theme: 'dark',
      notifications: true,
      autoSave: false,
      language: 'en'
  };
  await codebolt.cbstate.addToAgentState('user_preferences', JSON.stringify(userPreferences));

  // Store a list of completed tasks
  const completedTasks = ['task1', 'task2', 'task3'];
  await codebolt.cbstate.addToAgentState('completed_tasks', JSON.stringify(completedTasks));

  // Store configuration settings
  const agentConfig = {
      maxRetries: 3,
      timeout: 5000,
      enableLogging: true
  };
  await codebolt.cbstate.addToAgentState('agent_config', JSON.stringify(agentConfig));
});
```

### Complete Example - Agent Session Setup

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function setupAgentSession() {
      try {
          // Basic session info
          await codebolt.cbstate.addToAgentState('session_id', 'sess_' + Date.now());
          await codebolt.cbstate.addToAgentState('user_language', 'en');
          await codebolt.cbstate.addToAgentState('debug_mode', 'false');

          // User preferences
          const preferences = {
              theme: 'dark',
              notifications: true,
              autoComplete: true
          };
          await codebolt.cbstate.addToAgentState('user_preferences', JSON.stringify(preferences));

          // Track session start time
          await codebolt.cbstate.addToAgentState('session_start', new Date().toISOString());

          // Initialize progress tracking
          await codebolt.cbstate.addToAgentState('current_step', '1');
          await codebolt.cbstate.addToAgentState('total_steps', '5');

          console.log('✅ Agent session setup complete!');
      } catch (error) {
          console.error('❌ Session setup failed:', error);
      }
  }

  // Run the setup
  setupAgentSession();
});
```

### Consideration 1: Batch Updates

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Slow: Sequential updates
  for (let i = 0; i < 100; i++) {
    await codebolt.cbstate.addToAgentState(`item_${i}`, `value_${i}`);
  }

  // ✅ Fast: Parallel updates
  const updates = Array.from({ length: 100 }, (_, i) =>
    codebolt.cbstate.addToAgentState(`item_${i}`, `value_${i}`)
  );
  await Promise.all(updates);
});
```

### Pitfall 1: Race Conditions

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Problem: Race condition
  await codebolt.cbstate.addToAgentState('counter', '1');
  await codebolt.cbstate.addToAgentState('counter', '2'); // May overwrite first

  // ✅ Solution: Use atomic operations with unique keys
  await codebolt.cbstate.addToAgentState(`counter_${Date.now()}`, '1');
  await codebolt.cbstate.addToAgentState(`counter_${Date.now()}`, '2');
});
```
