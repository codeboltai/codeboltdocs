---
sidebar_position: 6
title: Error Handling
description: The most underrated skill in MCP tool authoring
---

# Error Handling in Tools

The most underrated skill in MCP tool authoring. A tool that errors well helps the agent recover; a tool that errors badly creates stuck loops and abandoned runs.

## Exceptions vs structured errors

**Throw an exception** when something unrecoverable happened: the process is broken, a critical dependency is unavailable, invariants are violated. The tool framework catches and returns a generic failure.

**Return a structured error** when the agent did something wrong that it could plausibly fix on its next attempt: wrong arguments, not-found, permission denied, rate limited.

The difference matters because:

- **Exceptions are opaque.** The LLM sees "tool failed" with no guidance.
- **Structured errors carry actionable information.** The LLM reads the reason, corrects its approach, and retries.

**Rule of thumb: prefer structured errors.** Only throw when the tool itself is broken, not when the input is wrong.

## Structured error shape

Return an object that tells the agent what went wrong and what to do about it:

```js
return {
  content: [{
    type: "text",
    text: JSON.stringify({
      ok: false,
      error: "not_found",
      message: "Ticker 'APLE' not found.",
      suggestions: ["AAPL", "APPL"],
      hint: "Did you mean AAPL? Ticker symbols must match exactly; US equities only."
    })
  }],
  isError: true
};
```

Three fields that make errors recoverable:

- **`error`** — a short, stable error code. `not_found`, `rate_limited`, `invalid_argument`, `permission_denied`. The LLM can pattern-match on these.
- **`message`** — human-readable explanation. Used directly in agent reasoning.
- **`hint` or `suggestions`** — what to try next. This is the gold. A good hint converts a dead-end tool call into a successful recovery.

## Error catalog

Common errors and how to return them:

### Not found

```json
{
  "ok": false,
  "error": "not_found",
  "message": "No file at 'src/auth/sesion.ts'.",
  "hint": "Similar files exist: src/auth/session.ts, src/auth/sessions.ts. Did you mean one of those?"
}
```

The suggestions come from a cheap fuzzy match against available names. This alone converts typo errors into successful retries.

### Invalid argument

```json
{
  "ok": false,
  "error": "invalid_argument",
  "field": "symbol",
  "message": "Symbol must be 1-5 uppercase letters. Got 'aapl'.",
  "hint": "Ticker symbols are case-sensitive. Try 'AAPL'."
}
```

Naming the specific field helps the LLM know what to fix.

### Permission denied

```json
{
  "ok": false,
  "error": "permission_denied",
  "message": "Write access to 'infra/' is blocked by workspace policy.",
  "hint": "Do not attempt to modify files under infra/. If the task requires this, tell the user instead of retrying."
}
```

Notice the hint ends with "tell the user instead of retrying". This is important — without it, the agent will try again with different paths and fail again. Explicit "don't retry" guidance breaks loops.

### Rate limited

```json
{
  "ok": false,
  "error": "rate_limited",
  "message": "API rate limit hit.",
  "retry_after_seconds": 30,
  "hint": "Wait 30 seconds before retrying, or switch to a cached result if acceptable."
}
```

`retry_after_seconds` is a hint the framework can use to pause before retry.

### External service down

```json
{
  "ok": false,
  "error": "upstream_unavailable",
  "message": "Cannot reach api.example.com (connection refused).",
  "hint": "This error is likely transient. Wait a few seconds before retrying. If it persists, the external service is down — report this to the user rather than looping."
}
```

Again: explicit loop-breaking guidance.

### Ambiguous input

```json
{
  "ok": false,
  "error": "ambiguous",
  "message": "Multiple files match 'session': src/auth/session.ts, src/db/session.ts, src/ws/session.ts.",
  "options": [
    { "path": "src/auth/session.ts" },
    { "path": "src/db/session.ts" },
    { "path": "src/ws/session.ts" }
  ],
  "hint": "Specify the exact path from the options above."
}
```

Don't guess when there are multiple matches — return the options and let the LLM (or the user) pick.

## When to throw

Throw an exception when:

- **The tool itself is broken.** A required env var is missing, a config file is malformed, the binary can't start.
- **An invariant is violated.** Internal state is inconsistent in a way that shouldn't happen.
- **Security-critical operations must fail loudly.** Catching an error in auth verification and returning it as data is dangerous; throw.

When you throw, write a clear error message. The framework logs the exception and returns a generic failure to the agent, but the logs are where you'll debug from.

## Logging vs returning

Don't log and return. Do one or the other:

- **Log** (to stderr or a file) when the information is for you, the tool author, to debug later.
- **Return** (in the structured error) when the information is for the agent to act on.

Duplicating the two is fine, but make sure the returned version is self-contained — the agent won't see your logs.

**Never log to stdout.** Stdio transport uses stdout for protocol messages. Your log line becomes garbage in the MCP stream and the server will reject all subsequent messages.

## Retries

Should a tool retry internally before returning an error? Usually **no**:

- The agent has its own retry logic, informed by the error type.
- Internal retries hide failure modes that the agent should know about.
- They add latency the LLM can't account for.

Exception: fast retries for clearly transient errors (connection reset, one-time 500) are fine if they don't add meaningful latency. Budget: 2-3 retries with short backoff, then return the error.

## Partial results

When a tool can do part of its work and fail at the rest, return the partial result:

```json
{
  "ok": "partial",
  "error": "rate_limited",
  "processed": 15,
  "total": 50,
  "results": [ ... ],
  "message": "Processed 15 of 50 items before hitting rate limit.",
  "hint": "Call again with 'continue_from: 16' to resume."
}
```

Partial results are much more useful than an all-or-nothing failure. The agent can make progress.

## Idempotency for retries

If your tool is idempotent (calling it twice with the same args has the same effect as calling it once), say so in the description. The framework and agent can then retry aggressively on failure without worrying about side effects.

For non-idempotent tools (send email, charge a card, create a row), retries are dangerous. Consider returning an **idempotency token** with the first response and require the caller to pass it on retry:

```json
{
  "ok": false,
  "error": "rate_limited",
  "idempotency_token": "charge_abc123",
  "hint": "Retry with this idempotency_token to ensure the charge isn't duplicated."
}
```

## Testing error paths

It's easy to test the happy path and forget the error paths. A few tests to add:

- **Invalid input** — wrong type, missing required field, out-of-range value.
- **Not found** — referenced thing doesn't exist.
- **Upstream error** — mock the external service returning 500.
- **Rate limit** — mock a 429.
- **Timeout** — simulate a hanging upstream.

Each test should verify the error shape is structured (not an exception) and that the error code matches the expected category.

## Error types in Codebolt

When building MCP tools with the CodeboltJS tool framework, use `ToolErrorType.MCP_TOOL_ERROR` for MCP-specific errors:

```ts
import { ToolErrorType } from '@codebolt/codeboltjs';

// In your tool's execute method
if (!serverName) {
  return this.createErrorResponse('Server name is required', ToolErrorType.MCP_TOOL_ERROR);
}
```

The tool execution flow returns results as `[didUserReject, result]` tuples — if the user rejects a tool confirmation prompt, `didUserReject` is `true` and the agent can handle it gracefully.

## Anti-patterns to avoid

- **Catching exceptions to return `"ok": false, "error": "unknown"`**. The caller loses all diagnostic information. Either handle the specific case or let the exception propagate.
- **Stack traces in error messages.** The LLM doesn't benefit from them and they bloat tokens. Log the stack; return a summary.
- **Silent failures.** Returning `"ok": true` when the operation actually failed is the worst outcome. Prefer crashing loudly.
- **Inconsistent error shapes across tools in the same server.** Pick a shape and use it everywhere. Consistency lets the agent pattern-match.
- **Errors without hints.** An error without guidance just says "you failed". With a hint, it says "you failed and here's how to fix it".

## See also

- [Tool schema](./03_tool-schema.md)
- [Parameter validation](./03_tool-schema.md)
- [Tool call end-to-end (internals)](../../02_architecture/04_data-flow-walkthroughs/tool-call-end-to-end.md)
- [Guardrails & Eval (internals)](../../09_internals/03_subsystems/09_guardrails-and-eval.md)
