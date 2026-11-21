---
title: getEditorConfig
---

# `getEditorConfig`

```typescript
client.editorApi.getEditorConfig(): Promise<EditorConfig>
```

Retrieves the current editor configuration.

Returns settings that control editor behavior such as theme, font size,
tab width, and other preferences. Useful for synchronizing editor state
across components or persisting user preferences.

## Parameters

_No parameters._

## Returns

`Promise<EditorConfig>` — A promise that resolves to the current

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.editorApi.getEditorConfig();
console.log(result);
```
