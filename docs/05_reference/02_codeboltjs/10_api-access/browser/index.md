# Browser

Interact with Codebolt browser instances and their pages.

`listBrowserInstances` and `getBrowserInstance` only reflect the active instance ID tracked by this SDK process. The list is empty before the SDK tracks an instance.

## When to use it

Open a page and inspect rendered content when a task depends on the DOM. Capture a screenshot for visual evidence or record the page state to help reproduce a UI issue.

## Examples

### Open a browser instance and look up its ID

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  await codebolt.browser.goToPage('https://example.com/', { instanceId });
  const active = await codebolt.browser.getBrowserInstance(instanceId);
  console.log('Tracked instance', active?.instanceId);
  console.log('Tracked instances', await codebolt.browser.listBrowserInstances());
});
```

### Active Instance Pattern (Recommended for LLM Usage)

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Simple usage - no instance management needed
  await codebolt.browser.goToPage('https://example.com');
  const content = await codebolt.browser.getContent();
  await codebolt.browser.screenshot();

  // Active instance is automatically managed
});
```

### Pitfall 2: Not Cleaning Up Resources

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Leaves browser open
  await codebolt.browser.newPage();
  await codebolt.browser.goToPage('https://example.com');
  // Forget to close...

  // ✅ Good: Always cleanup
  try {
      await codebolt.browser.newPage();
      await codebolt.browser.goToPage('https://example.com');
      // Do work...
  } finally {
      codebolt.browser.close();
  }
});
```

### Clean Up Resources

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const page = await codebolt.browser.newPage();
  try {
      // Work with page
  } finally {
      codebolt.browser.close();
  }
});
```

## SDK methods

### execution

Persistent trusted JavaScript controlling an attached visible browser instance.

```text
codebolt.browser.execution(payload: { operation: "create" | "execute" | "reset" | "close"; runtime?: "trusted-node" | "restricted"; sessionId?: string; code?: string; timeoutMs?: number; }, options?: BrowserOperationOptions): Promise<any>
```

### newPage

[`newPage`](newPage.md) · Opens a new page in the browser.

### getUrl

[`getUrl`](getUrl.md) · Retrieves the current URL of the browser's active page.

### goToPage

[`goToPage`](goToPage.md) · Navigates to a specified URL.

### launch

Launches or navigates the browser to a URL using the server launch action.

```text
codebolt.browser.launch(url?: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### goToUrl

Navigates to a URL using the server go_to_url action.

```text
codebolt.browser.goToUrl(url: string, options?: BrowserOperationOptions): Promise<GoToPageResponse>
```

### goBack

Navigates one entry back in browser history.

```text
codebolt.browser.goBack(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### goForward

Navigates one entry forward in browser history.

```text
codebolt.browser.goForward(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### refresh

Refreshes the current page.

```text
codebolt.browser.refresh(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### screenshot

[`screenshot`](screenshot.md) · Takes a screenshot of the current page.

### getHTML

[`getHTML`](getHTML.md) · Retrieves the HTML content of the current page.

### getMarkdown

[`getMarkdown`](getMarkdown.md) · Retrieves the Markdown content of the current page.

### getPDF

[`getPDF`](getPDF.md) · Retrieves the PDF content of the current page.

### pdfToText

[`pdfToText`](pdfToText.md) · Converts the PDF content of the current page to text.

### getContent

[`getContent`](getContent.md) · Retrieves the content of the current page.

### getSnapShot

[`getSnapShot`](getSnapShot.md) · Retrieves the snapshot of the current page.

### getBrowserInfo

[`getBrowserInfo`](getBrowserInfo.md) · Retrieves browser info like height width scrollx scrolly of the current page.

### extractText

[`extractText`](extractText.md) · Extracts text from the current page.

### extractContent

Extracts structured content from the current page.

```text
codebolt.browser.extractContent(options?: BrowserOperationOptions & { goal?: string; }): Promise<BrowserActionResponseData>
```

### getCurrentState

Retrieves the current browser state.

```text
codebolt.browser.getCurrentState(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### getActionableElements

Retrieves actionable elements from the current page.

```text
codebolt.browser.getActionableElements(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### close

[`close`](close.md) · Closes the current page.

### scroll

[`scroll`](scroll.md) · Scrolls the current page in a specified direction by a specified number of pixels.

### scrollDown

Scrolls down by a specified number of pixels.

```text
codebolt.browser.scrollDown(pixels?: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### scrollUp

Scrolls up by a specified number of pixels.

```text
codebolt.browser.scrollUp(pixels?: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### scrollToText

Scrolls until the provided text is visible.

```text
codebolt.browser.scrollToText(text: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### type

[`type`](type.md) · Types text into a specified element on the page.

### inputText

Inputs text into a specified element using the server input_text action.

```text
codebolt.browser.inputText(elementid: string, text: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### sendKeys

Sends keyboard keys to the browser.

```text
codebolt.browser.sendKeys(keys: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### click

[`click`](click.md) · Clicks on a specified element on the page.

### clickElement

Clicks an element using the server click_element action.

```text
codebolt.browser.clickElement(elementid: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### doubleClick

```text
codebolt.browser.doubleClick(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### hover

```text
codebolt.browser.hover(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### focus

```text
codebolt.browser.focus(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### press

```text
codebolt.browser.press(key: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### check

```text
codebolt.browser.check(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### uncheck

```text
codebolt.browser.uncheck(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### select

```text
codebolt.browser.select(target: BrowserLocator, value: string | string[], options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

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

### errors

```text
codebolt.browser.errors(options?: BrowserOperationOptions & { clear?: boolean; }): Promise<BrowserActionResponseData>
```

### highlight

```text
codebolt.browser.highlight(target: BrowserLocator, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### clipboard

```text
codebolt.browser.clipboard(clipboardAction: "read" | "write", text?: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### batch

```text
codebolt.browser.batch(actions: Array<Record<string, any>>, options?: BrowserOperationOptions & { bail?: boolean; }): Promise<BrowserActionResponseData>
```

### trace

```text
codebolt.browser.trace(traceAction: "start" | "stop", options?: BrowserOperationOptions & { categories?: string[]; filename?: string; }): Promise<BrowserActionResponseData>
```

### profiler

```text
codebolt.browser.profiler(profilerAction: "start" | "stop", options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### record

```text
codebolt.browser.record(recordAction: "start" | "stop", options?: BrowserOperationOptions & { intervalMs?: number; maxFrames?: number; }): Promise<BrowserActionResponseData>
```

### inspect

```text
codebolt.browser.inspect(options?: BrowserOperationOptions & { target?: BrowserLocator; mode?: "open" | "close" | "highlight"; }): Promise<BrowserActionResponseData>
```

### network

```text
codebolt.browser.network(networkAction: "start" | "stop" | "requests" | "clear" | "har", options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### upload

```text
codebolt.browser.upload(selector: BrowserLocator, paths: string[], options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### download

```text
codebolt.browser.download(url: string, options?: BrowserOperationOptions & { filename?: string; path?: string; }): Promise<BrowserActionResponseData>
```

### tab

```text
codebolt.browser.tab(tabAction: "list" | "new" | "close" | "select", options?: BrowserOperationOptions & { url?: string; index?: number; }): Promise<BrowserActionResponseData>
```

### enter

[`enter`](enter.md) · Simulates the Enter key press on the current page.

### search

[`search`](search.md) · Performs a search on the current page using a specified query.

### wait

Waits for a browser condition or timeout.

```text
codebolt.browser.wait(options?: BrowserOperationOptions & { timeout?: number; text?: string; selector?: BrowserLocator; }): Promise<BrowserActionResponseData>
```

### browserAction

Executes a raw browser action with custom parameters.

```text
codebolt.browser.browserAction(params: BrowserActionPayload, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

### listBrowserInstances

[`listBrowserInstances`](listInstances.md) · Returns an empty array when the SDK has no active instance ID.

### getBrowserInstance

[`getBrowserInstance`](getInstance.md) · Looks up the supplied ID in the SDK’s locally tracked browser instance list and returns the matching entry or `null`.

### setActiveBrowserInstance

[`setActiveBrowserInstance`](setActiveInstance.md) · Set the active browser instance.

### openNewBrowserInstance

[`openNewBrowserInstance`](openNewInstance.md) · Open a new browser instance.

### closeBrowserInstance

[`closeBrowserInstance`](closeInstance.md) · Close a browser instance.

### executeOnInstance

[`executeOnInstance`](executeOnInstance.md) · Execute action on specific browser instance.

## Related pages

- [Advanced Browser Actions](./advancedActions.md)
