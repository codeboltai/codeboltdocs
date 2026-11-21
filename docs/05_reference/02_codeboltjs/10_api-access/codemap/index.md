---
sidebar_position: 1
title: Codemap Module
---

# Codemap

Create, read, and edit codemaps.

## When to use it

Find a stored codemap by name or ID, then retrieve or update that map. Use it to preserve a specific explanation of code relationships or a workflow.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.codemap.list();
  console.log(result);
});
```

## Find and open a saved codemap

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.codemap.list();
  const item = response.data?.codemaps[0];
  if (!response.success || !item) return;

  const details = await codebolt.codemap.get(item.id);
  console.log(details.data?.codemap);
});
```

## SDK methods

### list

List all codemaps for a project.

```text
codebolt.codemap.list(projectPath?: string): Promise<CodemapListResponse>
```

### get

Get a specific codemap by ID.

```text
codebolt.codemap.get(codemapId: string, projectPath?: string): Promise<CodemapGetResponse>
```

### create

Create a placeholder codemap (status: 'creating').

```text
codebolt.codemap.create(data: CreateCodemapData, projectPath?: string): Promise<CodemapCreateResponse>
```

### save

Save a complete codemap with content.

```text
codebolt.codemap.save(codemapId: string, codemap: Codemap, projectPath?: string): Promise<CodemapSaveResponse>
```

### setStatus

Set the status of a codemap.

```text
codebolt.codemap.setStatus(codemapId: string, status: CodemapStatus, error?: string, projectPath?: string): Promise<CodemapUpdateResponse>
```

### update

Update codemap info (title, description, etc.).

```text
codebolt.codemap.update(codemapId: string, data: UpdateCodemapData, projectPath?: string): Promise<CodemapUpdateResponse>
```

### delete

Delete a codemap.

```text
codebolt.codemap.delete(codemapId: string, projectPath?: string): Promise<CodemapDeleteResponse>
```
