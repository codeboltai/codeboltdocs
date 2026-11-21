# Named Tags

List named tags and send a message to a named recipient.

## SDK methods

### list

```text
codebolt.namedTag.list(query?: string): Promise<{ success: boolean; data: NamedTagOption[]; }>
```

### generateNamedTag

```text
codebolt.namedTag.generateNamedTag(agentInstanceId: string): Promise<{ success: boolean; data?: { namedTag: NamedTagOption; }; error?: string; }>
```

### sendToNamedTag

```text
codebolt.namedTag.sendToNamedTag(options: SendToNamedTagOptions): Promise<SendToNamedTagResponse>
```
