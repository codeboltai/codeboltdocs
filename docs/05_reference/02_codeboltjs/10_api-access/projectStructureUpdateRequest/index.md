# Project Structure Update Request

Submit and review proposed changes to the project structure.

## When to use it

Propose a structural change for review, then inspect its status, comments, and merge outcome.

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

## SDK methods

### create

[`create`](create.md) · Create a new update request.

### get

Get an update request by ID.

```text
codebolt.projectStructureUpdateRequest.get(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### list

List update requests.

```text
codebolt.projectStructureUpdateRequest.list(filters?: UpdateRequestFilters, workspacePath?: string): Promise<UpdateRequestListResponse>
```

### update

Update an existing update request.

```text
codebolt.projectStructureUpdateRequest.update(id: string, updates: UpdateUpdateRequestData, workspacePath?: string): Promise<UpdateRequestResponse>
```

### delete

Delete an update request.

```text
codebolt.projectStructureUpdateRequest.delete(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### submit

Submit an update request for review.

```text
codebolt.projectStructureUpdateRequest.submit(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### startWork

Start working on an update request.

```text
codebolt.projectStructureUpdateRequest.startWork(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### complete

Complete work on an update request.

```text
codebolt.projectStructureUpdateRequest.complete(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### merge

Merge an update request.

```text
codebolt.projectStructureUpdateRequest.merge(id: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### addDispute

Add a dispute.

```text
codebolt.projectStructureUpdateRequest.addDispute(id: string, data: CreateDisputeData, workspacePath?: string): Promise<UpdateRequestResponse>
```

### resolveDispute

Resolve a dispute.

```text
codebolt.projectStructureUpdateRequest.resolveDispute(id: string, disputeId: string, resolutionSummary?: string, workspacePath?: string): Promise<UpdateRequestResponse>
```

### addComment

Add a comment.

```text
codebolt.projectStructureUpdateRequest.addComment(id: string, disputeId: string, data: AddCommentData, workspacePath?: string): Promise<UpdateRequestResponse>
```

### watch

Watch an update request.

```text
codebolt.projectStructureUpdateRequest.watch(id: string, data: AddWatcherData, workspacePath?: string): Promise<UpdateRequestResponse>
```

### unwatch

Stop watching an update request.

```text
codebolt.projectStructureUpdateRequest.unwatch(id: string, watcherId: string, workspacePath?: string): Promise<UpdateRequestResponse>
```
