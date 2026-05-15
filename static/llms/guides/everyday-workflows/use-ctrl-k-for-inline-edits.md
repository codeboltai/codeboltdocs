# Use Ctrl+K for Inline Edits

> The fastest AI workflow in Codebolt: select code, press Ctrl+K, type what you want, accept or reject. No chat tab. No thread. Just an inline diff.

The fastest AI workflow in Codebolt: select code, press Ctrl+K, type what you want, accept or reject. No chat tab. No thread. Just an inline diff.

**Use case:** small focused edits where a chat conversation is overkill.

## The flow

1. **Select** — highlight the code you want changed.
2. **Press Ctrl+K** (Cmd+K on macOS).
3. **Type** the instruction.
4. **Enter** — the LLM produces a replacement.
5. **Review** the inline diff.
6. **Tab to accept**, **Esc to reject**, **Ctrl+Enter to re-prompt**.

That's the whole loop.

## Example instructions that work

- `add error handling`
- `convert to async/await`
- `extract the validation into a helper function`
- `add JSDoc comments`
- `use Map instead of plain object`
- `fix the off-by-one in the loop`
- `remove the unused imports`
- `split this function at the obvious boundary`
- `rewrite as a switch statement`
- `add input validation for empty strings`

Short, specific, imperative. The code is already providing the context.

## Example instructions that don't work

- `improve this` — what does improve mean?
- `make it better` — same problem
- `refactor` — refactor how?
- `fix the bug` — what bug?

Vague prompts get guessed interpretations.

## What to select

### Select the smallest coherent unit

- A single statement to change one line.
- A function body to refactor internals.
- A class to restructure.
- A file section (not the whole file) for localised changes.

### Don't select more than the change needs

Selecting 500 lines for a change that affects 10 is slower and less accurate. The LLM has more to think about; the diff is harder to review.

### Don't select less than the change needs

If you want to extract a function, select the whole block being extracted plus the context where it's called from. The LLM needs to see both.

## Re-prompting

If the first result isn't right, **Ctrl+Enter** instead of Esc. This keeps the same selection but lets you refine the instruction. Faster than starting over.

Common re-prompts:

- `actually, don't remove the comment` — preserves specific things from the original
- `keep the variable names the same` — when renaming drifted
- `use a const not a let` — style correction
- `shorter — one line if possible` — compression

## When Ctrl+K isn't the right tool

**Use chat instead when:**

- The change spans multiple files.
- You need to think through the approach before changing code.
- The change depends on knowledge from elsewhere in the codebase.
- You want to iterate with many back-and-forth turns.
- You need tool calls beyond file editing.

Ctrl+K is optimised for "I know exactly what I want, just do it". For "I want to figure out what to do", use chat.

## Keyboard flow without leaving the editor

A typical inline-edit rhythm:

```
Click to position cursor
Shift+arrows to select
Ctrl+K
Type instruction
Enter
Tab (accept) or Esc (reject) or Ctrl+Enter (retry)
Continue typing
```

No mouse, no context switches. Fast.

## Checkpoints and Ctrl+K

Every accepted inline edit creates a checkpoint. You can:

- **Rollback** to before the edit with the checkpoint strip.
- **Review all inline edits** on a file via the gutter markers.
- **Branch** into a new chat thread from a specific edit if you want to explore further.

## See also

- [Inline edit and Ctrl+K (full reference)](../../02_using-codebolt/03_chat/05_inline-edit-and-ctrl-k.md)
- [Model selection](../../02_using-codebolt/03_chat/06_model-selection.md)
- [Checkpoints and rollback](../../02_using-codebolt/03_chat/04_checkpoints-and-rollback.md)
