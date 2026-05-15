---
sidebar_position: 1
title: Authentication & Authorization
description: "How Codebolt signs users in, creates the local app user, and validates thread access for self-executed remote agents."
---

# Authentication & Authorization

Codebolt signs you in through the Codebolt portal, then the local backend creates or reuses a matching local user record for the app.

## Authentication

### Sign in from the app

In the current UI, sign-in starts from the app's authentication screen.

1. Codebolt opens the browser to the hosted sign-in page.
2. The sign-in page completes the login flow and associates the session with a one-time token.
3. The UI polls the hosted API with that one-time token until it receives the authenticated user payload.

The authenticated payload used by the UI includes:

- `jwtToken`
- `userId`
- `userName`

After that response is received, the UI stores the returned token in its local auth state and uses it to connect the signed-in user to the local Codebolt backend.

### Local user creation and lookup

After browser sign-in succeeds, the UI calls the local backend:

- `POST /users/checkifuserexistslocally`
- `POST /users/createUser` when the local user does not already exist

This flow is implemented so the local server can maintain its own active user and workspace state. In practice:

- the UI sends `username` and `token` to the local backend
- the server checks the local database through its user service
- if the user does not exist locally, the server registers a new local user record
- the server sets that user as the active local user

If the server already has workspace information for that user, the UI continues into the app. If not, the UI sends the user into the setup flow.

### What is stored locally

The current UI stores signed-in user details in local client state, including the auth token and basic user identity fields. The local backend also keeps track of the active user and default profile state after login succeeds.

### Signing out

Signing out from the UI calls:

```http
POST /users/logout
```

On the server, logout clears the local user session through the database helper logout path. This is a local app logout flow; it is not documented in the current codebase as a broader account revocation or identity-provider logout sequence.

## Authorization

The current codebase does not expose a large user-role or token-scope system in this account flow.

For the user-facing app flow reviewed here:

- authentication determines which Codebolt user was returned from the browser sign-in
- the local backend decides whether that user already exists locally or needs to be created
- the app proceeds using that active local user context

This page does not cover:

- owner, admin, or member account roles
- personal access token scopes
- OAuth client authorization flows
- SAML, OIDC, LDAP, or MFA configuration

## Self-executed Remote Agent Tokens

There is one separate authorization-like flow in the current server: thread tokens for self-executed remote agents.

When a self-executed remote agent is used, the server can generate a thread token for a specific thread. The UI can fetch that token from:

```http
GET /application/threadToken?threadId=<threadId>
```

That token is then passed to the agent connection, and the WebSocket layer validates it before associating the remote agent with the thread. This is separate from normal user sign-in:

- browser sign-in authenticates the user
- thread tokens authorize a self-executed remote agent to attach to a specific thread

## See also

- [Account Overview](../01_overview.md)
- [Usage and Billing](./03_usage-and-billing.md)
- [Remote Execution](../../04_build-on-codebolt/11_agent-infrastructure/09_remote-execution.md)
