---
title: getDefaultProfile
---

# `getDefaultProfile`

```typescript
client.profile.getDefaultProfile(): Promise<UserProfile>
```

Retrieves the default user profile for the current session.

Returns the full profile object including user identity, preferences, and configured
defaults. Use this to display user information or check profile settings.

## Parameters

_No parameters._

## Returns

`Promise<UserProfile>` — A promise that resolves to the user's profile data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.profile.getDefaultProfile();
console.log(result);
```
