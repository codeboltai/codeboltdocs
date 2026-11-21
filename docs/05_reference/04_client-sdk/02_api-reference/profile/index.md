---
title: Profile API
---

# Profile API

Profile API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getDefaultProfile`](./getDefaultProfile) | Retrieves the default user profile for the current session. |
| [`setDefaultAgent`](./setDefaultAgent) | Sets the default agent for the user's profile. |

## Methods

---

### `getDefaultProfile`

```typescript
client.profile.getDefaultProfile(): Promise<UserProfile>
```

Retrieves the default user profile for the current session.

Returns the full profile object including user identity, preferences, and configured
defaults. Use this to display user information or check profile settings.

_No parameters._

**Returns:** `Promise<UserProfile>` — A promise that resolves to the user's profile data

[Full reference →](./getDefaultProfile)

---

### `setDefaultAgent`

```typescript
client.profile.setDefaultAgent(data: SetDefaultAgentRequest): Promise<void>
```

Sets the default agent for the user's profile.

Configures which agent is automatically selected when the user starts a new
conversation or task. This persists across sessions until changed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetDefaultAgentRequest` | Yes | The request containing the agent to set as default |

**Returns:** `Promise<void>` — A promise that resolves when the default agent has been updated

[Full reference →](./setDefaultAgent)

