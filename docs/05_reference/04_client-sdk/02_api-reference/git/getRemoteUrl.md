---
title: getRemoteUrl
---

# `getRemoteUrl`

```typescript
client.git.getRemoteUrl(): Promise<GitRemoteUrlResponse>
```

Retrieves the configured remote URL for the repository.

Returns the URL of the primary remote (typically "origin"). Useful
for displaying repository information or constructing web links.

## Parameters

_No parameters._

## Returns

`Promise<GitRemoteUrlResponse>` — A promise that resolves to a  containing the remote URL

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.getRemoteUrl();
console.log(result);
```
