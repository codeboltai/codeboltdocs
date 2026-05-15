---
name: advancedActions
cbbaseinfo:
  description: Advanced browser interaction, inspection, state, and diagnostics APIs.
data:
  name: advancedActions
  category: browser
  link: advancedActions.md
---
# Advanced Browser Actions

These APIs extend the basic browser module with locator-based interactions, element queries, page state checks, storage, cookies, network inspection, diagnostics, uploads, downloads, and tab utilities.

Most methods accept an optional `BrowserOperationOptions` object. Pass `{ instanceId }` to target a specific browser instance.

## Locators

Several methods accept a `BrowserLocator`:

```ts
type BrowserLocator =
  | string
  | {
      kind?: 'css' | 'id' | 'role' | 'text' | 'label' | 'placeholder' | 'alt' | 'title' | 'testid';
      type?: 'css' | 'id' | 'role' | 'text' | 'label' | 'placeholder' | 'alt' | 'title' | 'testid';
      value: string;
      exact?: boolean;
      index?: number;
    };
```

String locators are treated as selectors by most interaction methods.

```js
await codebolt.browser.click('#submit');
await codebolt.browser.hover({ kind: 'text', value: 'Save changes' });
await codebolt.browser.find('testid', 'login-button');
```

## Interaction Helpers

```ts
codebolt.browser.doubleClick(target, options?)
codebolt.browser.hover(target, options?)
codebolt.browser.focus(target, options?)
codebolt.browser.press(key, options?)
codebolt.browser.check(target, options?)
codebolt.browser.uncheck(target, options?)
codebolt.browser.select(target, value, options?)
codebolt.browser.setViewport(width, height, options?)
```

Examples:

```js
await codebolt.browser.focus('#email');
await codebolt.browser.type('#email', 'user@example.com');
await codebolt.browser.press('Enter');

await codebolt.browser.check('#terms');
await codebolt.browser.select('#plan', 'pro');
await codebolt.browser.setViewport(1280, 720);
```

## Element Query APIs

### find

```ts
codebolt.browser.find(kind, value, options?)
```

Finds elements by `css`, `id`, `role`, `text`, `label`, `placeholder`, `alt`, `title`, or `testid`.

The response uses `findResponse` and includes:

- `payload.found`: whether any element matched
- `payload.elements`: matched element summaries
- `payload.currentUrl`: current page URL

```js
const result = await codebolt.browser.find('text', 'Apply', { exact: false });

if (result.payload.found) {
  console.log(result.payload.elements[0].selector);
}
```

### get

```ts
codebolt.browser.get(target, options?)
```

Reads data from the page or from a selected element.

Supported `target` values:

| Target | Description |
| --- | --- |
| `text` | Text content for the selected element or page |
| `html` | HTML for the selected element or page |
| `value` | Form value |
| `attr` | Attribute value; pass `options.attr` |
| `title` | Document title |
| `url` | Current URL |
| `count` | Count matching elements |
| `box` | Bounding box |
| `styles` | Computed styles; pass `options.pseudo` for pseudo-elements |

```js
const title = await codebolt.browser.get('title');
const intro = await codebolt.browser.get('text', { selector: '#intro' });
const buttonCount = await codebolt.browser.get('count', {
  selector: { kind: 'css', value: 'button' }
});
const href = await codebolt.browser.get('attr', {
  selector: 'a.primary',
  attr: 'href'
});
```

The response uses `getResponse` and returns the requested value in `payload.value` and `payload.content`.

### is

```ts
codebolt.browser.is(target, selector, options?)
```

Checks element state.

Supported `target` values:

| Target | Description |
| --- | --- |
| `visible` | Element is visible in the page |
| `enabled` | Element is not disabled |
| `checked` | Checkbox or radio input is checked |

```js
const visible = await codebolt.browser.is('visible', '#submit');
const checked = await codebolt.browser.is('checked', '#terms');
```

The response uses `isResponse` and returns the boolean in `payload.value`.

## Cookies and Storage

```ts
codebolt.browser.cookies(action, cookie?, options?)
codebolt.browser.storage(area, action, key?, value?, options?)
```

Cookie actions:

| Action | Description |
| --- | --- |
| `get` | Return cookies for the current page/session |
| `set` | Set a cookie using `{ name, value, path?, expires? }` |
| `clear` | Clear cookies |

Storage areas are `local` and `session`. Storage actions are `get`, `set`, `remove`, and `clear`.

```js
await codebolt.browser.storage('local', 'set', 'theme', 'dark');
const theme = await codebolt.browser.storage('local', 'get', 'theme');

await codebolt.browser.cookies('set', {
  name: 'session_mode',
  value: 'test',
  path: '/'
});
const cookies = await codebolt.browser.cookies('get');
```

## Console, Errors, and Highlighting

```ts
codebolt.browser.console(options?)
codebolt.browser.errors(options?)
codebolt.browser.highlight(target, options?)
codebolt.browser.inspect(options?)
```

Use `console({ clear: true })` or `errors({ clear: true })` to clear captured entries after reading them.

```js
const logs = await codebolt.browser.console();
const errors = await codebolt.browser.errors();

await codebolt.browser.highlight('#submit');
await codebolt.browser.inspect({ mode: 'highlight', target: '#submit' });
```

`inspect()` supports `mode: 'open' | 'close' | 'highlight'`.

## Clipboard

```ts
codebolt.browser.clipboard('write', text, options?)
codebolt.browser.clipboard('read', undefined, options?)
```

```js
await codebolt.browser.clipboard('write', 'copied from an agent');
const copied = await codebolt.browser.clipboard('read');
```

Clipboard operations use Electron clipboard access when available, then fall back to page clipboard APIs.

## Network

```ts
codebolt.browser.network(action, options?)
```

Supported actions:

| Action | Description |
| --- | --- |
| `start` | Begin capturing network requests |
| `requests` | Return captured requests and responses |
| `har` | Return a HAR-style capture |
| `clear` | Clear captured network entries |
| `stop` | Stop capture |

```js
await codebolt.browser.network('start');
await codebolt.browser.goToPage('http://localhost:3000');
const requests = await codebolt.browser.network('requests');
const har = await codebolt.browser.network('har');
await codebolt.browser.network('stop');
```

## Trace, Profiler, and Recording

```ts
codebolt.browser.trace(action, options?)
codebolt.browser.profiler(action)
codebolt.browser.record(action, options?)
```

```js
await codebolt.browser.trace('start');
await codebolt.browser.profiler('start');
await codebolt.browser.record('start', { intervalMs: 500, maxFrames: 10 });

await codebolt.browser.goToPage('https://example.com');

const recording = await codebolt.browser.record('stop');
const profile = await codebolt.browser.profiler('stop');
const trace = await codebolt.browser.trace('stop', { filename: 'trace.json' });
```

`trace('start')` accepts optional `categories`. `record('start')` accepts `intervalMs` and `maxFrames`.

## Uploads and Downloads

```ts
codebolt.browser.upload(selector, paths, options?)
codebolt.browser.download(url, options?)
```

```js
await codebolt.browser.upload('#file-input', [
  'D:/Test/browser/.codebolt/browser-test-output/upload-fixture.txt'
]);

await codebolt.browser.download('http://localhost:3000/report.csv', {
  filename: 'D:/Test/browser/.codebolt/browser-test-output/report.csv'
});
```

## Batch Actions

```ts
codebolt.browser.batch(actions, options?)
```

Runs multiple browser actions against the same browser instance. Pass `{ bail: true }` to stop on the first failure.

```js
const result = await codebolt.browser.batch([
  { action: 'getUrl' },
  { action: 'getContent' }
], { bail: true });
```

The response contains each action result in `payload.value`.

## Tabs

```ts
codebolt.browser.tab(action, options?)
```

Supported actions are `list`, `new`, `close`, and `select`.

```js
const tabs = await codebolt.browser.tab('list');
await codebolt.browser.tab('new', { url: 'https://example.com' });
await codebolt.browser.tab('select', { index: 0 });
await codebolt.browser.tab('close', { index: 1 });
```

## Response Notes

Advanced actions return `BrowserActionResponseData` unless noted otherwise. The response usually has this shape:

```js
{
  event: 'browserActionResponse',
  eventId: 'browser-..._action_...',
  success: true,
  payload: {
    success: true,
    value: 'operation-specific value',
    content: 'human-readable content',
    currentUrl: 'http://127.0.0.1:3000/page',
    logs: 'captured console output'
  }
}
```

`find()`, `get()`, and `is()` use specific response events:

| Method | Response event | Main payload fields |
| --- | --- | --- |
| `find()` | `findResponse` | `found`, `elements`, `currentUrl` |
| `get()` | `getResponse` | `value`, `content`, `currentUrl` |
| `is()` | `isResponse` | `value`, `content`, `currentUrl` |

