---
name: create
description: Create a new update request.
cbbaseinfo:
  description: Create a new update request.
data:
  name: create
  category: projectStructureUpdateRequest
  link: create.md
---

# create

```text
codebolt.projectStructureUpdateRequest.create(data: CreateUpdateRequestData, workspacePath?: string): Promise<UpdateRequestResponse>
```

Create a new update request

## When to use it

Submit a proposed package, route, or dependency change for review. Supply the affected package and the operation you want reviewed.

## Example

### Propose adding a package to the project structure

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.projectStructureUpdateRequest.create({
    title: 'Add the documentation package',
    author: 'docs-agent-id',
    authorType: 'agent',
    changes: [{
      packageId: 'documentation',
      packageAction: 'create',
      packageName: 'Documentation',
      packagePath: 'docs',
    }],
  });
  console.log(response);
});
```
