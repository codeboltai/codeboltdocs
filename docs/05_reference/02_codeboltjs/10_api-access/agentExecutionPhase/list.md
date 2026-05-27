---
name: list
cbbaseinfo:
  description: Lists every phase in the project catalog, alphabetically sorted by name.
cbparameters:
  parameters: []
  returns:
    signatureTypeName: "Promise<ListPhasesResponse>"
    description: A promise that resolves with the catalog's full phase list.
data:
  name: list
  category: agentExecutionPhase
  link: list.md
---

# list

```ts
codebolt.agentExecutionPhase.list(): Promise<ListPhasesResponse>
```

Returns every phase in the project catalog, sorted alphabetically by name. The catalog is a record of phases that have been used or explicitly defined in this project — not a closed enum — so the list grows as agents discover new ones via `set()`.

## Response

```ts
{
  success: true;
  type: 'agentExecutionPhase.listResponse';
  data: Array<{
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }>;
}
```

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

const { data } = await codebolt.agentExecutionPhase.list();
for (const phase of data ?? []) {
  console.log(`${phase.name} — ${phase.description}`);
}
```

The default project catalog seeds four phases on first read: `planning`, `execution`, `verification`, `idle`. Any phase a running agent sets via `set()` is appended automatically.
