---
title: Browser API
---

# Browser API

Browser API - browser automation

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`click`](./click) | Clicks an element in the browser. |
| [`fill`](./fill) | Fills a form field in the browser. |
| [`navigate`](./navigate) | Navigates the browser to a URL. |
| [`screenshot`](./screenshot) | Takes a screenshot of the current browser viewport. |
| [`sendAction`](./sendAction) | Sends a generic browser action. |

## Methods

---

### `click`

```typescript
client.browser.click(data: BrowserClickRequest): Promise<BrowserActionResult>
```

Clicks an element in the browser.

Simulates a mouse click on the specified element, identified by
a CSS selector or other locator strategy.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserClickRequest` | Yes | The click request |

**Returns:** `Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after the click

[Full reference →](./click)

---

### `fill`

```typescript
client.browser.fill(data: BrowserFillRequest): Promise<BrowserActionResult>
```

Fills a form field in the browser.

Types text into the specified form field, replacing any existing content.
The field is identified by a CSS selector or other locator strategy.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserFillRequest` | Yes | The fill request |

**Returns:** `Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after the fill

[Full reference →](./fill)

---

### `navigate`

```typescript
client.browser.navigate(data: BrowserNavigateRequest): Promise<BrowserActionResult>
```

Navigates the browser to a URL.

Loads the specified URL in the browser, waiting for the page to
reach a ready state before resolving.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserNavigateRequest` | Yes | The navigation request |

**Returns:** `Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after navigation completes

[Full reference →](./navigate)

---

### `screenshot`

```typescript
client.browser.screenshot(data?: BrowserScreenshotRequest): Promise<BrowserActionResult>
```

Takes a screenshot of the current browser viewport.

Captures the visible portion of the browser page as an image.
Useful for visual verification and debugging during automated testing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserScreenshotRequest` | No | Optional screenshot configuration |

**Returns:** `Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult containing the screenshot data

[Full reference →](./screenshot)

---

### `sendAction`

```typescript
client.browser.sendAction(data: BrowserSendActionRequest): Promise<BrowserActionResult>
```

Sends a generic browser action.

Executes an arbitrary browser action command. Use this for actions
that don't have a dedicated convenience method, or for sending
complex multi-step actions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserSendActionRequest` | Yes | The browser action payload describing the action to perform |

**Returns:** `Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult with the action outcome

[Full reference →](./sendAction)

