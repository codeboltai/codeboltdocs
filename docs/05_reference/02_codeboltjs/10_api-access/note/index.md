# Notes

Create, search, and edit notes.

## SDK methods

### create

```text
codebolt.note.create(fileName: string, content?: string): Promise<CreateFileResponse>
```

### list

```text
codebolt.note.list(): Promise<FileListResponse>
```

### get

```text
codebolt.note.get(filePath: string): Promise<ReadFileResponse>
```

### update

```text
codebolt.note.update(filePath: string, content: string): Promise<UpdateFileResponse>
```

### delete

```text
codebolt.note.delete(filePath: string): Promise<DeleteFileResponse>
```

### addComment

```text
codebolt.note.addComment(filePath: string, comment: Omit<NoteComment, "id" | "createdAt"> & { id?: string; createdAt?: string; }): Promise<{ success: boolean; comment: NoteComment; }>
```

### listComments

```text
codebolt.note.listComments(filePath: string): Promise<{ success: boolean; comments: NoteComment[]; }>
```

### resolveComment

```text
codebolt.note.resolveComment(filePath: string, commentId: string): Promise<{ success: boolean; commentId: string; }>
```

### deleteComment

```text
codebolt.note.deleteComment(filePath: string, commentId: string): Promise<{ success: boolean; commentId: string; }>
```

### linkArtifact

```text
codebolt.note.linkArtifact(filePath: string, artifactPath: string): Promise<UpdateFileResponse>
```
