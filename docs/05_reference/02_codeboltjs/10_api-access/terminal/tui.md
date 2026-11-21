# Interactive terminal sessions

Use `codebolt.terminal.tui` to start or attach to an interactive terminal, read its screen, and send input. A session mirrors its terminal output so an agent can wait for a prompt or inspect a screen region.

## Run a command and respond to its prompt

The execution environment needs Node.js on its path. This example starts a background terminal, waits for its prompt, and sends one line of input.

```ts
import { randomUUID } from 'node:crypto';
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const sessionId = randomUUID();
  const program = [
    'console.log("READY");',
    'process.stdin.once("data", input => {',
    '  console.log("ECHO:" + input.toString().trim());',
    '  process.stdin.pause();',
    '});',
  ].join('\n');

  const started = await codebolt.terminal.tui.run({
    command: 'node',
    args: ['-e', program],
    visible: false,
    sessionId,
  });
  if (!started.success) throw new Error(started.error ?? 'Terminal launch failed.');

  try {
    const ready = await codebolt.terminal.tui.wait({
      sessionId,
      text: 'READY',
      timeoutMs: 10_000,
    });
    if (!ready.success || !ready.result?.found) throw new Error('The prompt did not appear.');

    const written = await codebolt.terminal.tui.write({ sessionId, data: 'hello\r' });
    if (!written.success) throw new Error(written.error ?? 'Could not write to the terminal.');

    const echoed = await codebolt.terminal.tui.wait({
      sessionId,
      text: 'ECHO:hello',
      timeoutMs: 10_000,
    });
    if (!echoed.success || !echoed.result?.found) throw new Error('The reply did not appear.');

    const screen = await codebolt.terminal.tui.screen({ sessionId });
    if (screen.success) console.log(screen.result?.output);
  } finally {
    await codebolt.terminal.tui.kill({ sessionId });
  }
});
```

Set `visible: true` to request a CodeBolt Terminal panel. A visible run needs a connected desktop client. Pass a fresh `terminalId` for each visible test run when you need a distinct panel.

## Attach to an open terminal

Replace `your-terminal-id` with an existing terminal ID. The session mirrors that terminal. Calling `kill` on the attached session detaches the mirror and leaves the original process running.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const attached = await codebolt.terminal.tui.attach({ terminalId: 'your-terminal-id' });
  if (!attached.success) throw new Error(attached.error ?? 'Could not attach to the terminal.');

  const sessionId = attached.result?.sessionId;
  if (!sessionId) throw new Error('The terminal response did not include a session ID.');
  try {
    const screen = await codebolt.terminal.tui.screen({ sessionId, trimWhitespace: true });
    if (screen.success) console.log(screen.result?.output);
  } finally {
    await codebolt.terminal.tui.kill({ sessionId });
  }
});
```

## Methods

Session operations accept a `sessionId` unless indicated. Use the returned session ID to keep calls scoped to a specific terminal.

| Method | Inputs and behavior |
| --- | --- |
| `run` | Takes `command` and optional `args`, `cwd`, `env`, `cols`, `rows`, `visible`, `sessionId`, and `terminalId`. Starts an owned terminal session. |
| `attach` | Takes an existing `terminalId` or `pid` plus optional dimensions. Attaches a mirror. |
| `output` | Accepts `mode` of `streaming`, `snapshot`, or `screen`. Streaming reads and clears the output buffer, snapshot reads its tail, and screen reads the visible text. |
| `screen` | Reads the current screen. Accepts `trimWhitespace` and `includeEmpty`. |
| `type` | Takes `text` and sends it to the session. |
| `write` | Takes raw `data`, such as text with a carriage return. |
| `press` | Takes a string or array of `keys`, such as `Enter` or `Ctrl+C`. |
| `resize` | Takes `cols` and `rows` and resizes the terminal and mirror. |
| `search` | Takes `pattern` and an optional `regex` flag to search the screen. |
| `region` | Takes zero-based `row` and `col` plus `rows` and `cols` to read a region. |
| `cursor` | Reads the cursor position and current line metadata. |
| `wait` | Takes optional `text`, `gone`, `stable`, and `timeoutMs`. Check `result.found` to tell whether the condition was met. |
| `wheel` | Takes `direction` and optional `amount`, `row`, `col`, and `protocol`. |
| `sessions.list()` | Lists sessions and returns the active session ID. |
| `sessions.switch(sessionId)` | Sets the active session used by calls that omit an ID. |
| `kill` | Disposes the session. Stops owned processes and detaches attached mirrors. |
| `cleanup` | Takes `exitedOnly` or `all` options to clear session records. |
