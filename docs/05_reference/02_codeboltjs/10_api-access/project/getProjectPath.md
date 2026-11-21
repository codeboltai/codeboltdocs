---
name: getProjectPath
description: Retrieves the path of the current project.
cbbaseinfo:
  description: Retrieves the path of the current project.
data:
  name: getProjectPath
  category: project
  link: getProjectPath.md
---

# getProjectPath

```text
codebolt.project.getProjectPath(): Promise<GetProjectPathResponse>
```

Retrieves the path of the current project.

## Returns

A promise that resolves with the project path response.

## When to use it

Resolve project-relative files or show the active project location before running a script.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.project.getProjectPath();
  console.log(result);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Handling the complete response
  const projectInfo = await codebolt.project.getProjectPath();
  console.log("Full Response:", projectInfo);
  // }
});
```
