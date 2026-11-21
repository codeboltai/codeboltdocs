---
name: click
description: Simulates a click event on an element with the specified ID.
cbbaseinfo:
  description: Simulates a click event on an element with the specified ID.
data:
  name: click
  category: crawler
  link: click.md
---

# click

```text
codebolt.crawler.click(id: string): Promise<any>
```

Simulates a click event on an element with the specified ID.

## Parameters

- `id` — The ID of the element to be clicked.

## Returns

A promise that resolves when the click action is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
    const response = await codebolt.crawler.click('element-id');
    console.log('Click response:', response);
  } catch (error) {
    console.error('Click failed:', error);
  }
});
```

## More examples

### Basic Click

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start crawler, navigate, and click an element
  codebolt.crawler.start();
  codebolt.crawler.goToPage('https://example.com');

  // Wait for page load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click an element by ID
  await codebolt.crawler.click('submit-button');
  console.log('Clicked submit button');
});
```
