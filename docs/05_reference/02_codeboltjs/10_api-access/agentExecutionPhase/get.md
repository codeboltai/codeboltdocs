---
name: get
cbbaseinfo:
  description: Gets the calling thread's current execution phase, or looks up a phase definition by name.
cbparameters:
  parameters:
    - name: name
      type: string
      required: false
      description: When omitted, returns the calling thread's current phase. When provided, returns the catalog entry for that phase name.
  returns:
    signatureTypeName: "Promise<GetPhaseResponse>"
    description: A promise that resolves with either the thread phase (`{ phase, threadId }`) or the catalog entry.
data:
  name: get
  category: agentExecutionPhase
  link: get.md
---

# get

```ts
codebolt.agentExecutionPhase.get(name?: string): Promise<GetPhaseResponse>
```

Two modes:

- **`get()`** — returns `{ phase, threadId }` for the thread the caller is running in. `phase` is `null` if the agent has not set one yet.
- **`get('coding')`** — returns the catalog entry for the named phase, or an error if the catalog does not contain it.

## Parameters

- **`name`** — Optional. Phase name to look up in the catalog. Omit to read the thread's current phase.

## Response

Thread-current variant:

```ts
{
  success: true;
  type: 'agentExecutionPhase.getResponse';
  data: { phase: string | null; threadId: string };
}
```

Catalog-lookup variant:

```ts
{
  success: true;
  type: 'agentExecutionPhase.getResponse';
  data: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
```

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

// What am I doing right now?
const current = await codebolt.agentExecutionPhase.get();
console.log(current.data); // { phase: 'coding', threadId: '...' }

// Get the description of a known phase
const def = await codebolt.agentExecutionPhase.get('verification');
console.log(def.data); // { name: 'verification', description: '...', ... }
```
