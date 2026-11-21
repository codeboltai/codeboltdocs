# Artifacts

Create, list, update, and delete artifacts.

The SDK unwraps the application response’s `data` field. Use the artifact ID returned by `create` or `list` for further operations.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { artifacts, totalCount } = await codebolt.artifact.list();
  console.log(totalCount, artifacts);
});
```

## SDK methods

### list

```text
codebolt.artifact.list(filters?: ArtifactFilters): Promise<{ artifacts: Artifact[]; totalCount: number; }>
```

### get

```text
codebolt.artifact.get(id: string): Promise<{ artifact: Artifact; }>
```

### create

```text
codebolt.artifact.create(data: CreateArtifact): Promise<{ artifact: Artifact; }>
```

### update

```text
codebolt.artifact.update(id: string, data: UpdateArtifact): Promise<{ artifact: Artifact; }>
```

### delete

```text
codebolt.artifact.delete(id: string): Promise<{ deleted: boolean; }>
```
