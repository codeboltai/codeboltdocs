---
name: getProjectState
description: Retrieves the current project state from the server via WebSocket.
cbbaseinfo:
  description: Retrieves the current project state from the server via WebSocket.
data:
  name: getProjectState
  category: cbstate
  link: getProjectState.md
---

# getProjectState

```text
codebolt.cbstate.getProjectState(): Promise<GetProjectStateResponse>
```

Retrieves the current project state from the server via WebSocket.

## Returns

A promise that resolves with the project's state.

## When to use it

Read project-level values shared by workflows, such as a review status saved under a custom key.

## Examples

### Access Basic Project Information

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const projectState = await codebolt.cbstate.getProjectState();

  // Access basic project details
  if (projectState.projectState == null) throw new Error('The response is missing projectState.');
  const projectPath = projectState.projectState.projectPath;
  if (projectState.projectState == null) throw new Error('The response is missing projectState.');
  const projectName = projectState.projectState.projectName;
  if (projectState.projectState == null) throw new Error('The response is missing projectState.');
  const tokenUsed = projectState.projectState.token_used;

  console.log(`Project Name: ${projectName}`);
  console.log(`Project Path: ${projectPath}`);
  console.log(`Tokens Used: ${tokenUsed}`);
});
```

### Access Custom Project Settings

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const projectState = await codebolt.cbstate.getProjectState();
  if (projectState.projectState == null) throw new Error('The response is missing projectState.');
  const state = projectState.projectState.state;

  // Access custom data you've stored with updateProjectState
  if (state.project_name) {
      console.log('Custom Project Name:', state.project_name);
  }
  if (state.version) {
      console.log('Project Version:', state.version);
  }
  if (state.environment) {
      console.log('Environment:', state.environment);
  }
});
```

### Monitor Project Changes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function monitorProject() {
      const projectState = await codebolt.cbstate.getProjectState();

      if (projectState.projectState == null) throw new Error('The response is missing projectState.');
      const summary = {
          projectInfo: {
              name: projectState.projectState.projectName,
              path: projectState.projectState.projectPath,
              customName: projectState.projectState.state.project_name
          },
          usage: {
              tokensUsed: projectState.projectState.token_used,
              chatSessions: projectState.projectState.chats.length,
              lastModified: projectState.projectState.state.last_modified
          },
          configuration: {
              version: projectState.projectState.state.version,
              environment: projectState.projectState.state.environment,
              customSettings: Object.keys(projectState.projectState.state).length
          }
      };

      console.log('Project Summary:', summary);
      return summary;
  }

  monitorProject();
});
```
