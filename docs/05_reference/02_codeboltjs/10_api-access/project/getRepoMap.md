---
name: getRepoMap
description: Requests the repository map for the supplied message context.
cbbaseinfo:
  description: Requests the repository map for the supplied message context.
data:
  name: getRepoMap
  category: project
  link: getRepoMap.md
---

# getRepoMap

```text
codebolt.project.getRepoMap(message: any): Promise<GetProjectPathResponse>
```

Requests the repository map for the supplied message context.

The SDK declares `GetProjectPathResponse` as its return type. The application sends a `getRepoMapResponse` with the map in `repoMap`.

## When to use it

Request a repository map when you need a structural view. Use project search when you need a specific implementation.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Repository map with specific parameters
  const detailedMap = await codebolt.project.getRepoMap({
    includeHidden: false,
    maxDepth: 5,
    excludePatterns: ['node_modules', '.git', 'dist']
  });
  console.log("Detailed Repository Map:", detailedMap);
});
```
