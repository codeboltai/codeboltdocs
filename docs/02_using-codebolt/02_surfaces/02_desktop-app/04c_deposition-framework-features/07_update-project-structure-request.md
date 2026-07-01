---
sidebar_position: 8
title: Update Project Structure Request
description: Use project structure update requests as durable proposals with disputes, watchers, comments, status, and merge state.
---

# Update Project Structure Request

The **Update Project Structure Request** panel stores proposed project-structure changes before they are accepted into the project model.

Open via: **Execution menu -> Update Project Structure Request**, **Swarm menu -> Update Project Structure Request**, or from project-structure workflows that create an update request.

## What gets deposited

- Request title, description, author, and author type.
- Proposed package, API route, UI route, database, dependency, run command, build tool, deployment, framework, design guideline, data store, interface, and application-layer changes.
- Review status such as draft, waiting for dispute, disputed, actively being worked, waiting to merge, or merged.
- Disputes, dispute comments, watchers, and merge timestamp.

## Pickup workflow

1. Open the update request.
2. Review the proposed changes and current status.
3. Resolve disputes or add comments when another agent or user needs clarification.
4. Merge only after the request reaches the correct review state.

## See also

- [Review Merge Requests](./01_review-merge-requests.md)
- [Deposition Framework](../../../../03_guides/03_loops-and-deposition-engineering/deposition-framework.md)
