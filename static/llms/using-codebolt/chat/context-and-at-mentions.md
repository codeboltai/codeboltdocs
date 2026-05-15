# Context and @-mentions

> What the agent sees when you type a message isn't just the message — it's a carefully assembled prompt drawing from your project, recent turns, memory, and.

![Context and @-mentions](/productImages/chat/mentions.gif)

What the agent sees when you type a message isn't just the message — it's a carefully assembled prompt drawing from your project, recent turns, memory, and anything you explicitly pointed at with `@`. Understanding what's in the context is how you make agents behave better.

## What's automatically in the context

Every turn, the [context assembler](../../04_build-on-codebolt/09_internals/03_subsystems/07_context-assembly.md) pulls from a bunch of sources. The usual set:

| Source | What |
|---|---|
| System prompt | The agent's guiding prompt (fixed per agent) |
| Active rules | Matching context rules from the project |
| Recent history | The last N turns in this thread |
| Persistent memory | Workspace-wide facts filtered by the current task |
| Vector hits | Top-k semantically similar chunks from the codebase |
| Knowledge graph | Nearby entities to anything the task mentions |
| Codemap | Compressed architectural summary of the project |
| Environment | Current directory, git branch, time of day |
| Open files | Whatever's open in the editor |
| Your message | What you just typed |

All of this is budget-capped, merged, and sent to the LLM. You don't need to put things in the context manually — most of it gets there automatically.

## When automatic isn't enough

Automatic context assembly is good, but it can miss things:

- **A file the agent didn't know was relevant.** Vector search and codemap may not surface it.
- **A specific line or symbol you want attention on.** The agent might read the whole file when you meant one function.
- **Something outside the project** — a URL, a doc, a paste.
- **Past work** — a specific earlier chat turn you want the agent to revisit.

For these, use `@`-mentions.

## Chat box triggers

The current GUI composer supports several structured triggers, not just `@`.

### `@` for project context

Typing `@` opens a picker centered on:

| Trigger | Picks |
|---|---|
| `@` | Files |
| `@` | Folders |
| `@` | Docs |

These are the main context-injection picks for project material.

### Other triggers besides `@`

The same chat box also supports other structured inputs:

| Trigger | Purpose |
|---|---|
| `/` | Agent action suggestions |
| `#` | Agents and docs |
| `$` | MCP tools when MCP input is enabled |

In practice:

- use `@` when you want to point at project files, folders, or docs
- use `/` when you want to insert an available action
- use `#` when you want to refer to an agent or a doc source
- use `$` when you want to reference an MCP tool

Mentions and picks render as chips or structured input items rather than plain pasted text.

### Other context-rich input

The chat input also captures other non-text context:

- dragged or pasted images
- dropped files
- detected links in the editor content
- copied code selections from Monaco with file/line context

Those are not `@` mentions, but they still become structured inputs that can influence what the agent sees.

## How mentions work under the hood

An `@` mention becomes an explicit context item in the assembled prompt:

- `@src/auth/session.ts` → the full file content is injected into the prompt with a clear marker.
- `@#getUser` → the symbol's definition + usages are injected.
- `@:src/auth/` → a listing of the directory is injected.
- `@!https://...` → the URL is fetched (if the browser tool is allowed) and the content injected.

Mentions take precedence over automatic context. If the budget is tight, automatic context is dropped before mentions are.

The context assembly pipeline resolves these mentions into structured context entries before passing them to the LLM. See [Processors](../../04_build-on-codebolt/03_processors/01_what-are-processors.md) for how this works.

## Viewing the assembled context

Click the "details" button on any turn (or `/explain`) to see what the agent actually received. You'll see:

- The full list of messages sent to the LLM.
- Which sources each piece came from.
- What was dropped or compressed to fit the budget.
- The tool schemas available.

This is the fastest way to understand why an agent did (or didn't) do something. "The agent ignored my instruction" is almost always "the instruction wasn't in the assembled context after compression".

## Context rules

For things you always want in the context on specific topics, don't rely on mentions every turn — write a **context rule**:

```yaml
# .codebolt/context-rules/auth.yaml
when:
  task_contains: [auth, login, session]
then:
  always_include:
    - path: docs/security-decisions.md
    - path: src/auth/README.md
  boost:
    - kg_entity: AuthService
      weight: 2.0
  exclude:
    - path: generated/**
```

This rule fires automatically every time the current task contains "auth", "login", or "session". It guarantees the security docs and the AuthService graph entries are always included for those tasks.

Rules live in `.codebolt/context-rules/` and are project-local. See [Context Assembly internals](../../04_build-on-codebolt/09_internals/03_subsystems/07_context-assembly.md) for the rule engine.

## Budget and compression

Every LLM has a context window. Codebolt's assembler fits your prompt under a target budget (usually 60-80% of the model's max, to leave room for the response). If the assembled prompt is too big, it compresses in this order:

1. **Drop the lowest-relevance hits** from each source (vector hits first, then KG, then persistent memory).
2. **Compress older turns** — turns are summarised, with a marker in the stream.
3. **Summarise long tool outputs**.
4. **Hard-truncate** as a last resort, with an explicit `[... N tokens omitted ...]` marker.

If compression happens, you'll see a subtle marker in the chat. The exact control surface for compaction depends on the current UI; older slash-command examples in this page should not be read as the current GUI contract.

## Long conversations

After ~20-30 turns in one thread, you'll usually see compression kick in. Three strategies for long conversations:

1. **Let compression do its work.** For most threads this is fine.
2. **Start a new tab** — copy the important decisions into a memory note, start fresh. Cleanest for a long-running project.
3. **Use the thread UI to branch or reopen related work** instead of forcing everything into one long transcript.

Agents also have a `LoopDetectionModifier` that catches repetitive behaviour, so a compressed thread usually degrades gracefully rather than suddenly.

## What NOT to put in context

Some things look tempting but hurt more than they help:

- **Whole directories** when you only need one file. Budget bloat, lower relevance.
- **Every file you've edited today**. The assembler is already tracking recent edits.
- **Long copy-pastes of output** when you could point at the command with `@>last`.
- **Your entire project readme** when you could point at specific sections.
- **Sensitive data the LLM shouldn't see**. Use a [redacting hook](../../04_build-on-codebolt/05_plugins/01_overview.md) at the workspace level instead of relying on memory.

## See also

- [Chat Overview](./01_overview.md)
- [Checkpoints and rollback](./04_checkpoints-and-rollback.md)
- [Context Assembly internals](../../04_build-on-codebolt/09_internals/03_subsystems/07_context-assembly.md)
- [Processors](../../04_build-on-codebolt/03_processors/01_what-are-processors.md)
