# Advanced Browser Actions

Use these browser commands on the active Codebolt browser instance. Pass `BrowserOperationOptions` for the methods that accept it when targeting another instance.

## Examples

### Locators

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.click('#submit');
  await codebolt.browser.hover({ kind: 'text', value: 'Save changes' });
  await codebolt.browser.find('testid', 'login-button');
});
```

### Interaction Helpers

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.focus('#email');
  await codebolt.browser.type('#email', 'user@example.com');
  await codebolt.browser.press('Enter');

  await codebolt.browser.check('#terms');
  await codebolt.browser.select('#plan', 'pro');
  await codebolt.browser.setViewport(1280, 720);
});
```

### get

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const title = await codebolt.browser.get('title');
  const intro = await codebolt.browser.get('text', { selector: '#intro' });
  const buttonCount = await codebolt.browser.get('count', {
    selector: { kind: 'css', value: 'button' }
  });
  const href = await codebolt.browser.get('attr', {
    selector: 'a.primary',
    attr: 'href'
  });
});
```

### is

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const visible = await codebolt.browser.is('visible', '#submit');
  const checked = await codebolt.browser.is('checked', '#terms');
});
```

### Cookies and Storage

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.storage('local', 'set', 'theme', 'dark');
  const theme = await codebolt.browser.storage('local', 'get', 'theme');

  await codebolt.browser.cookies('set', {
    name: 'session_mode',
    value: 'test',
    path: '/'
  });
  const cookies = await codebolt.browser.cookies('get');
});
```

### Console, Errors, and Highlighting

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const logs = await codebolt.browser.console();
  const errors = await codebolt.browser.errors();

  await codebolt.browser.highlight('#submit');
  await codebolt.browser.inspect({ mode: 'highlight', target: '#submit' });
});
```

### Clipboard

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.clipboard('write', 'copied from an agent');
  const copied = await codebolt.browser.clipboard('read');
});
```

### Network

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.network('start');
  await codebolt.browser.goToPage('http://localhost:3000');
  const requests = await codebolt.browser.network('requests');
  const har = await codebolt.browser.network('har');
  await codebolt.browser.network('stop');
});
```

### Trace, Profiler, and Recording

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.trace('start');
  await codebolt.browser.profiler('start');
  await codebolt.browser.record('start', { intervalMs: 500, maxFrames: 10 });

  await codebolt.browser.goToPage('https://example.com');

  const recording = await codebolt.browser.record('stop');
  const profile = await codebolt.browser.profiler('stop');
  const trace = await codebolt.browser.trace('stop', { filename: 'trace.json' });
});
```

### Uploads and Downloads

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.browser.upload('#file-input', [
    'D:/Test/browser/.codebolt/browser-test-output/upload-fixture.txt'
  ]);

  await codebolt.browser.download('http://localhost:3000/report.csv', {
    filename: 'D:/Test/browser/.codebolt/browser-test-output/report.csv'
  });
});
```

### Batch Actions

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.browser.batch([
    { action: 'getUrl' },
    { action: 'getContent' }
  ], { bail: true });
});
```

### Tabs

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const tabs = await codebolt.browser.tab('list');
  await codebolt.browser.tab('new', { url: 'https://example.com' });
  await codebolt.browser.tab('select', { index: 0 });
  await codebolt.browser.tab('close', { index: 1 });
});
```

## SDK methods

### find

```text
codebolt.browser.find(kind: BrowserLocatorKind, value: string, options?: BrowserOperationOptions & { exact?: boolean; index?: number; }): Promise<BrowserActionResponseData>
```

### get

```text
codebolt.browser.get(target: BrowserGetTarget, options?: BrowserOperationOptions & { selector?: BrowserLocator; attr?: string; pseudo?: string; }): Promise<BrowserActionResponseData>
```

### is

```text
codebolt.browser.is(target: BrowserIsTarget, selector: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### batch

```text
codebolt.browser.batch(actions: Array<Record<string, any>>, options?: BrowserOperationOptions & { bail?: boolean; }): Promise<BrowserActionResponseData>
```

### setViewport

```text
codebolt.browser.setViewport(width: number, height: number, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### cookies

```text
codebolt.browser.cookies(action: BrowserCookieAction, cookie?: { name?: string; value?: string; domain?: string; url?: string; path?: string; expires?: string | Date; }, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### storage

```text
codebolt.browser.storage(area: BrowserStorageArea, action: BrowserStorageAction, key?: string, value?: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### console

```text
codebolt.browser.console(options?: BrowserOperationOptions & { clear?: boolean; }): Promise<BrowserActionResponseData>
```

### network

```text
codebolt.browser.network(networkAction: "start" | "stop" | "requests" | "clear" | "har", options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### wait

Waits for a browser condition or timeout.

```text
codebolt.browser.wait(options?: BrowserOperationOptions & { timeout?: number; text?: string; selector?: BrowserLocator; }): Promise<BrowserActionResponseData>
```

### trace

```text
codebolt.browser.trace(traceAction: "start" | "stop", options?: BrowserOperationOptions & { categories?: string[]; filename?: string; }): Promise<BrowserActionResponseData>
```
