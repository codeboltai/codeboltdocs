---
name: tui
cbbaseinfo:
  description: Controls interactive terminal UI sessions through CodeboltJS. Agents can run a command in a visible Terminal panel, run it in a background PTY, attach to an existing terminal by PID or terminalId, read screen state, wait for text, send text or keys, resize, scroll, and clean up sessions.
cbparameters:
  parameters: []
  returns:
    signatureTypeName: "Promise<TuiResponse>"
    description: "Every TUI method returns a terminal response envelope with success metadata and an operation-specific result."
data:
  name: tui
  category: terminal
  link: tui.md
---
# terminal.tui

```typescript
codebolt.terminal.tui
```

The `terminal.tui` namespace is for testing and controlling interactive terminal applications. It keeps a headless xterm mirror for each TUI session so an agent can inspect what is on screen, wait for output, type text, press keys, and attach to visible user terminals.

Use this API when a command is interactive or screen-oriented, for example CLIs with prompts, menus, curses-style output, REPLs, installers, and terminal dashboards.

## Session Types

### Visible Terminal Panel

Use `visible: true` to open a real CodeBolt Terminal panel. The user can see and type in this terminal while the agent can also mirror and control it.

```js
const runId = Date.now();
const terminalId = `agent-tui-${runId}`;

const session = await codebolt.terminal.tui.run({
  command: 'node',
  args: ['interactive-fixture.js'],
  visible: true,
  terminalId,
  sessionId: `visible-${runId}`,
  cols: 100,
  rows: 30,
});

await codebolt.terminal.tui.wait({
  sessionId: session.result.sessionId,
  text: 'READY',
  timeoutMs: 10000,
});
```

### Background PTY

Use `visible: false` when the terminal should run headlessly and not open a UI panel.

```js
const session = await codebolt.terminal.tui.run({
  command: 'node',
  args: ['interactive-fixture.js'],
  visible: false,
  sessionId: 'background-smoke',
});
```

### Existing Terminal Attachment

Use `attach()` to mirror and control an already-running terminal. You can attach by `terminalId` or by OS `pid`.

```js
const attached = await codebolt.terminal.tui.attach({
  terminalId: 'agent-tui-123',
  sessionId: 'attached-to-visible-terminal',
  cols: 100,
  rows: 30,
});
```

Attachments do not own the underlying process. Calling `kill()` on an attached session detaches the mirror without killing the terminal process.

## Methods

### run(params)

Starts a command in a new TUI session.

```typescript
codebolt.terminal.tui.run(params: {
  command: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
  cols?: number;
  rows?: number;
  visible?: boolean;
  sessionId?: string;
  terminalId?: string | number;
}): Promise<TuiRunResponse>
```

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `command` | `string` | Executable to run. |
| `args` | `string[]` | Optional command arguments. |
| `cwd` | `string` | Working directory. Defaults to the active project path. |
| `env` | `Record<string, string>` | Extra environment variables. |
| `cols` | `number` | Terminal columns. Defaults to `120`. |
| `rows` | `number` | Terminal rows. Defaults to `40`. |
| `visible` | `boolean` | `true` opens a CodeBolt Terminal panel. `false` runs in the background. Defaults to `true`. |
| `sessionId` | `string` | Stable id for later calls. If omitted, CodeBolt generates one. |
| `terminalId` | `string | number` | Stable visible Terminal panel id. Use a unique id for fresh visible runs. |

### attach(params)

Creates a TUI mirror for an existing terminal process.

```typescript
codebolt.terminal.tui.attach(params: {
  sessionId?: string;
  pid?: number;
  terminalId?: string | number;
  cols?: number;
  rows?: number;
}): Promise<TuiAttachResponse>
```

Provide either `pid` or `terminalId`. Attached sessions have `ownsProcess: false`.

### output(params)

Reads terminal output.

```typescript
codebolt.terminal.tui.output(params?: {
  sessionId?: string;
  mode?: 'streaming' | 'snapshot' | 'screen';
  trimWhitespace?: boolean;
  includeEmpty?: boolean;
}): Promise<TuiOutputResponse>
```

Modes:

| Mode | Behavior |
| --- | --- |
| `screen` | Returns the current visible screen from the xterm mirror. |
| `snapshot` | Returns a tail of accumulated output. |
| `streaming` | Returns buffered output and clears the session buffer. |

### screen(params)

Shortcut for current screen output.

```typescript
codebolt.terminal.tui.screen(params?: {
  sessionId?: string;
  trimWhitespace?: boolean;
  includeEmpty?: boolean;
}): Promise<TuiOutputResponse>
```

### type(params)

Types text into the TUI.

```typescript
codebolt.terminal.tui.type(params: {
  sessionId?: string;
  text: string;
}): Promise<TuiWriteResponse>
```

### write(params)

Writes raw data to the PTY. Use this for carriage returns, escape sequences, or exact input.

```typescript
codebolt.terminal.tui.write(params: {
  sessionId?: string;
  data: string;
}): Promise<TuiWriteResponse>
```

Example:

```js
await codebolt.terminal.tui.write({
  sessionId,
  data: 'answer\r',
});
```

### press(params)

Sends key sequences.

```typescript
codebolt.terminal.tui.press(params: {
  sessionId?: string;
  keys: string[] | string;
}): Promise<TuiWriteResponse>
```

Common keys include `Enter`, `Tab`, `Escape`, `Backspace`, arrow keys, and control chords such as `Ctrl+C`.

### resize(params)

Resizes the mirror and PTY.

```typescript
codebolt.terminal.tui.resize(params: {
  sessionId?: string;
  cols: number;
  rows: number;
}): Promise<TuiResizeResponse>
```

### search(params)

Searches the current visible screen.

```typescript
codebolt.terminal.tui.search(params: {
  sessionId?: string;
  pattern: string;
  regex?: boolean;
}): Promise<TuiSearchResponse>
```

### region(params)

Reads a rectangular screen region.

```typescript
codebolt.terminal.tui.region(params: {
  sessionId?: string;
  row: number;
  col: number;
  rows: number;
  cols: number;
  trimWhitespace?: boolean;
}): Promise<TuiRegionResponse>
```

Rows and columns are zero-based.

### cursor(params)

Gets cursor position and current line metadata.

```typescript
codebolt.terminal.tui.cursor(params?: {
  sessionId?: string;
}): Promise<TuiCursorResponse>
```

### wait(params)

Waits for a condition.

```typescript
codebolt.terminal.tui.wait(params: {
  sessionId?: string;
  text?: string;
  gone?: boolean;
  stable?: boolean;
  timeoutMs?: number;
}): Promise<TuiWaitResponse>
```

Examples:

```js
await codebolt.terminal.tui.wait({ sessionId, text: 'READY', timeoutMs: 10000 });
await codebolt.terminal.tui.wait({ sessionId, text: 'Loading', gone: true });
await codebolt.terminal.tui.wait({ sessionId, stable: true, timeoutMs: 5000 });
```

### wheel(params)

Sends mouse wheel input.

```typescript
codebolt.terminal.tui.wheel(params: {
  sessionId?: string;
  direction: 'up' | 'down' | 'left' | 'right';
  amount?: number;
  row?: number;
  col?: number;
  protocol?: 'auto' | 'sgr' | 'normal';
}): Promise<TuiWheelResponse>
```

### sessions.list()

Lists active TUI sessions.

```typescript
codebolt.terminal.tui.sessions.list(): Promise<TuiSessionsListResponse>
```

### sessions.switch(sessionId)

Sets the active session used by calls that omit `sessionId`.

```typescript
codebolt.terminal.tui.sessions.switch(sessionId: string): Promise<TuiSessionsSwitchResponse>
```

### kill(params)

Disposes a session. If the session owns its process, this kills the PTY process. If it is attached to an existing terminal, this only detaches the mirror.

```typescript
codebolt.terminal.tui.kill(params?: {
  sessionId?: string;
}): Promise<TuiKillResponse>
```

### cleanup(params)

Cleans up exited or all TUI sessions.

```typescript
codebolt.terminal.tui.cleanup(params?: {
  exitedOnly?: boolean;
  all?: boolean;
}): Promise<TuiCleanupResponse>
```

## End-to-End Example

```js
import codebolt from '@codebolt/codeboltjs';

const runId = Date.now();
const sessionId = `fixture-${runId}`;
const terminalId = `fixture-terminal-${runId}`;

const started = await codebolt.terminal.tui.run({
  command: 'node',
  args: ['interactive-fixture.js'],
  visible: true,
  sessionId,
  terminalId,
  cols: 100,
  rows: 30,
});

await codebolt.terminal.tui.wait({
  sessionId: started.result.sessionId,
  text: 'TUI_READY',
  timeoutMs: 10000,
});

await codebolt.terminal.tui.type({
  sessionId,
  text: 'alpha-value',
});
await codebolt.terminal.tui.press({
  sessionId,
  keys: 'Enter',
});

const echoed = await codebolt.terminal.tui.wait({
  sessionId,
  text: 'ECHO:alpha-value',
  timeoutMs: 10000,
});

if (!echoed.result.found) {
  const screen = await codebolt.terminal.tui.screen({ sessionId });
  throw new Error(`Expected echo was not found:\n${screen.result.output}`);
}

await codebolt.terminal.tui.kill({ sessionId });
```

## Testing Guidance

- Use unique `sessionId` and `terminalId` values for smoke tests. Reusing a visible `terminalId` can attach to an old open Terminal panel instead of proving that a new terminal path works.
- Prefer `wait({ text, timeoutMs })` over fixed sleeps.
- For visible terminal tests, assert both the `run()` response and the mirrored output.
- Always call `kill()` or `cleanup()` in `finally` blocks.
- Use `visible: false` for CI-style background checks when user interaction is not needed.

## Troubleshooting

### The visible Terminal opens, but waits time out

Check that the run used a fresh `terminalId` and that `run()` returned a non-zero `pid`. If the terminal id points to an existing panel, the test may attach to the wrong terminal.

### `screen()` returns empty output

The mirror may be attached before the program has printed output, or the wrong session may be active. Use explicit `sessionId` values and wait for known text before reading the screen.

### Attached session kills the terminal process

Attached sessions should return `ownsProcess: false`. `kill()` should detach only those sessions. If you need to stop the terminal process, kill the owning session or send an interrupt/write command to the program itself.
