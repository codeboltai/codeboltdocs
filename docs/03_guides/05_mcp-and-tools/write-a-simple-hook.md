---
sidebar_position: 3
title: Write a Simple Hook
description: Hooks are the fastest way to add cross-cutting behaviour to Codebolt — logging, policy, redaction, alerts. You'll write a working hook in ~10 minutes.
---

# Write a Simple Hook

Hooks are the fastest way to add cross-cutting behaviour to Codebolt — logging, policy, redaction, alerts. You'll write a working hook in ~10 minutes.

**You'll need:** a Codebolt project open. Node.js 18+ if writing a code hook (YAML hooks need no setup).

## What we're building

A hook that logs every file write an agent makes to a file under `.codebolt/audit.log`. Trivial, but end-to-end: create the hook, enable it, verify it fires.

## Step 1 — pick a phase

File writes fire the `after_file_write` hook phase. See [Hook Types](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md) for the full list.

## Step 2 — write the hook

Create `.codebolt/hooks/audit-writes.ts`:

```ts
import fs from "node:fs/promises";
import path from "node:path";

export default {
  phase: "after_file_write",
  handler: async (ctx) => {
    const logPath = path.join(ctx.workspace.root, ".codebolt", "audit.log");
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      agent: ctx.by_agent,
      runId: ctx.runId,
      path: ctx.path,
      bytes: ctx.bytes,
    }) + "\n";

    await fs.appendFile(logPath, line);

    return { verdict: "observe" };
  },
};
```

What's here:
- **`phase`** — when this hook fires.
- **`handler`** — the function that runs. Receives a context object specific to the phase.
- **`verdict: "observe"`** — we're only watching, not blocking or modifying.
- **Side effect** — append to the audit log file.

## Step 3 — enable the hook

Hooks in `.codebolt/hooks/` are picked up when the project is loaded. Restart Codebolt or reload the project for new hooks to take effect.

## Step 4 — trigger the hook

Run any agent that writes a file:

```bash
codebolt --prompt "add a comment to README.md saying 'hi from an agent'" --agent generalist
```

After it finishes, check the audit log:

```bash
cat .codebolt/audit.log
```

You should see one or more JSON lines, one per file write the agent made.

## Step 5 — test it

Trigger a few different changes and confirm they all get logged:

- Modify a file in a subdirectory.
- Create a new file.
- Let the agent touch multiple files.

Each should produce an audit entry.

## Variations

### Block writes outside a specific directory

```ts
export default {
  phase: "before_tool_call",
  match: { tool: "codebolt_fs.write_file" },
  handler: async (ctx) => {
    const target = ctx.args.path;
    if (!target.startsWith("src/")) {
      return {
        verdict: "deny",
        reason: `Writes are only allowed under src/. Got: ${target}`,
      };
    }
    return { verdict: "allow" };
  },
};
```

### Rate-limit a tool

```ts
const recentCalls: number[] = [];

export default {
  phase: "before_tool_call",
  match: { tool: "external_api.query" },
  handler: async (ctx) => {
    const now = Date.now();
    while (recentCalls.length && now - recentCalls[0] > 60_000) {
      recentCalls.shift();
    }
    if (recentCalls.length >= 10) {
      return {
        verdict: "deny",
        reason: "Rate limit: external_api.query capped at 10/minute.",
      };
    }
    recentCalls.push(now);
    return { verdict: "allow" };
  },
};
```

Note: this example uses in-memory state, which doesn't survive restarts. For persistent state, write to a file or use a database.

### YAML-only hook (no code)

For simple pattern matching, YAML is enough:

```yaml
# .codebolt/hooks/no-dot-env-reads.yaml
name: no-dot-env-reads
phase: before_tool_call
match:
  tool: "codebolt_fs.read_file"
  args:
    path_ends_with: ".env"
verdict: deny
reason: "Reading .env files is blocked. If you need the value, read from process.env."
```

No code, no dependencies. Drop the file and it's active.

## Testing hooks

For code hooks, test them as pure functions:

```ts
import hook from "./audit-writes";

test("logs a write", async () => {
  const ctx = {
    workspace: { root: "/tmp/test" },
    by_agent: "generalist",
    runId: "run_test",
    path: "README.md",
    bytes: 42,
  };
  const result = await hook.handler(ctx as any);
  expect(result.verdict).toBe("observe");
  // Verify the log file was written (if you want a full test)
});
```

See [Hook Examples](../../04_build-on-codebolt/05_plugins/03_functionalities.md) for more patterns.

## Common pitfalls

- **Writing to stdout.** Hook code runs in a worker — `console.log` is fine, but in stdio-transport contexts (local MCP servers), stdout is reserved. Use `ctx.log.*` for safety.
- **Slow hooks.** Hooks run on the critical path. Don't make synchronous network calls. Defer expensive work with fire-and-forget.
- **Modifying state that isn't yours.** Hooks should be idempotent and side-effect-free where possible. Auditing to a file is fine; mutating another tool's state is asking for trouble.
- **Too-broad matches.** A hook with no `match` fires on every event of its phase — usually fine for observation, often wrong for denial.

## See also

- [Hooks Overview](../../04_build-on-codebolt/05_plugins/01_overview.md)
- [Hook Types](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md)
- [Hook Examples](../../04_build-on-codebolt/05_plugins/03_functionalities.md)
