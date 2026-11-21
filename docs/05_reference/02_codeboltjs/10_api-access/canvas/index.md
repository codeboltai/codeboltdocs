# Canvas

Create canvases and manage their content and artifact links.

This module exposes the SDK’s canvas records and content operations. Use the canvas ID returned by `create` or `list` for subsequent operations.

## SDK methods

### create

```text
codebolt.canvas.create(fileName?: string): Promise<CreateFileResponse>
```

### list

```text
codebolt.canvas.list(scope?: CanvasListScope): Promise<FileListResponse>
```

### get

```text
codebolt.canvas.get(filePath: string): Promise<ReadFileResponse>
```

### delete

```text
codebolt.canvas.delete(filePath: string): Promise<DeleteFileResponse>
```

### readme

```text
codebolt.canvas.readme(): { success: boolean; content: string; }
```

### getContent

```text
codebolt.canvas.getContent(filePath: string): Promise<{ success: boolean; data: any; filePath: string; }>
```

### addContent

```text
codebolt.canvas.addContent(filePath: string, content: { elements?: unknown[]; appState?: Record<string, unknown>; files?: Record<string, unknown>; }): Promise<UpdateFileResponse>
```

### replaceContent

```text
codebolt.canvas.replaceContent(filePath: string, content: unknown): Promise<UpdateFileResponse>
```

### linkArtifact

```text
codebolt.canvas.linkArtifact(filePath: string, artifactPath: string): Promise<UpdateFileResponse>
```
