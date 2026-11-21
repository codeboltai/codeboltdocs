# Project

Read project settings, paths, sibling directories, and editor file status.

## When to use it

Read the current project path and settings when a workflow needs to resolve files or inspect its configuration.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.project.getProjectPath();
  console.log(result);
});
```

## More examples

### Project Execution with Monitoring

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  class ProjectRunner {
      async run() {
          console.log('🔄 Preparing to run project...');

          // Validate project setup
          const pathInfo = await codebolt.project.getProjectPath();

          if (!pathInfo.success) {
              throw new Error('Cannot run: No project open');
          }

          console.log(`📂 Project: ${pathInfo.projectName}`);

          // Check editor status
          const editorStatus = await codebolt.project.getEditorFileStatus();

          if (editorStatus.success) {
              console.log('📝 Editor files:', editorStatus.editorStatus);
          }

          // Run project
          console.log('🚀 Starting project execution...');
          codebolt.project.runProject();

          console.log('✅ Project run command sent');
          console.log('💡 Monitor terminal for build output');
      }

      async runWithValidation() {
          const validation = await this.validate();

          if (!validation.valid) {
              console.error('❌ Project validation failed:');
              validation.errors.forEach(e => console.error(`  - ${e}`));
              return false;
          }

          await this.run();
          return true;
      }

      async validate() {
          const errors = [];

          const pathInfo = await codebolt.project.getProjectPath();
          if (!pathInfo.success) {
              errors.push('No project path available');
          }

          const settings = await codebolt.project.getProjectSettings();
          if (!settings.success) {
              errors.push('No project settings available');
          }

          return {
              valid: errors.length === 0,
              errors
          };
      }
  }

  // Usage
  const runner = new ProjectRunner();
  await runner.runWithValidation();
});
```

### Pitfall 1: Not Checking Project Availability

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Wrong - assumes project is open
  codebolt.project.runProject();

  // ✅ Correct - check first
  const pathInfo = await codebolt.project.getProjectPath();
  if (pathInfo.success) {
      codebolt.project.runProject();
  } else {
      console.error('No project is currently open');
  }
});
```

### Pitfall 2: Ignoring Editor State

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Wrong - doesn't check for unsaved changes
  codebolt.project.runProject();

  // ✅ Correct - check editor state
  const editorStatus = await codebolt.project.getEditorFileStatus();
  if (editorStatus.success) {
      console.log('Editor status:', editorStatus.editorStatus);
  }
  codebolt.project.runProject();
});
```

## SDK methods

### getProjectSettings

[`getProjectSettings`](getProjectSettings.md) · Retrieves the project settings from the server.

### getProjectPath

[`getProjectPath`](getProjectPath.md) · Retrieves the path of the current project.

### getSiblingDirectories

Retrieves sibling directories configured for the current project.

```text
codebolt.project.getSiblingDirectories(projectPath?: string): Promise<GetSiblingDirectoriesResponse>
```

### getRepoMap

[`getRepoMap`](getRepoMap.md)

### runProject

[`runProject`](runProject.md)

### getEditorFileStatus

[`getEditorFileStatus`](getEditorFileStatus.md)
