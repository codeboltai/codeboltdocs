---
name: getPortfoliosByProject
description: Get portfolios by project.
cbbaseinfo:
  description: Get portfolios by project.
data:
  name: getPortfoliosByProject
  category: agentPortfolio
  link: getPortfoliosByProject.md
---

# getPortfoliosByProject

```text
codebolt.agentPortfolio.getPortfoliosByProject(projectId: string): Promise<GetPortfoliosByProjectResponse>
```

Get portfolios by project

## Parameters

- `projectId` — The project ID

## Returns

Promise resolving to the list of portfolios for the project

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.agentPortfolio.getPortfoliosByProject('project-456');
  console.log(result);
});
```
