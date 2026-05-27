---
name: set
cbbaseinfo:
  description: Sets the calling thread's current execution phase, auto-adding the phase to the project catalog if it is new.
cbparameters:
  parameters:
    - name: name
      type: string
      required: true
      description: Phase name, e.g. "planning", "coding", "verification". Must match `^[a-z][a-z0-9_-]*$` and be at most 50 characters.
    - name: description
      type: string
      required: false
      description: Optional human-readable description. Used only if this phase is being auto-added to the catalog; ignored if the phase already exists.
  returns:
    signatureTypeName: "Promise<SetPhaseResponse>"
    description: A promise that resolves with the new phase, the previous phase (if any), and whether this call auto-added the phase to the catalog.
data:
  name: set
  category: agentExecutionPhase
  link: set.md
---

# set

```ts
codebolt.agentExecutionPhase.set(
  name: string,
  description?: string
): Promise<SetPhaseResponse>
```

Sets the calling thread's current execution phase. Atomically:

1. Upserts the phase into the project catalog. If `name` was previously unknown, it is added with the provided description (or empty if omitted) and `data.isNew` will be `true` on the response.
2. Writes the new phase onto the thread record. `data.previousPhase` reports the phase that was active beforehand.
3. Emits `agent:phase:changed` on the application event bus, fires the `agentPhaseChanged` hook, and broadcasts a thread update so the UI refreshes.

The call requires a thread context — it returns an error if no `threadId` is associated with the request.

## Parameters

- **`name`** — Phase name. Must satisfy `^[a-z][a-z0-9_-]*$` and be ≤ 50 characters. Whitespace is trimmed.
- **`description`** — Optional. Only persisted when the phase is being auto-added; updates to existing-phase descriptions must go through `update()` on the catalog API.

## Response

```ts
{
  success: boolean;
  type: 'agentExecutionPhase.setResponse';
  requestId?: string;
  data?: {
    phase: string;                                    // the phase that was set
    previousPhase?: string;                            // prior thread.phase, if any
    isNew: boolean;                                    // true if auto-added to catalog
    threadId: string;
    catalogEntry: {
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  error?: string;
}
```

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

// Move into planning
await codebolt.agentExecutionPhase.set('planning');

// Later: switch to coding. Auto-adds "coding" to the catalog the first time
// any agent uses it.
const res = await codebolt.agentExecutionPhase.set('coding', 'Implementing the planned changes');
if (res.data?.isNew) {
  console.log(`Catalog learned a new phase: ${res.data.phase}`);
}
console.log(`Previous phase was: ${res.data?.previousPhase ?? '(none)'}`);
```

A hook can react to this with:

```yaml
when:
  type: agentPhaseChanged
  phase: coding
```
