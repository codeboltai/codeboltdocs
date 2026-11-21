---
name: search
description: Performs a search on the current page using a specified query.
cbbaseinfo:
  description: Performs a search on the current page using a specified query.
data:
  name: search
  category: browser
  link: search.md
---

# search

```text
codebolt.browser.search(elementid: string, query: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Performs a search on the current page using a specified query.

## Parameters

- `elementid` — The ID of the element to perform the search in.
- `query` — The search query.
- `options` — Optional browser operation options

## Returns

A promise that resolves with the search results.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page with a search feature
  await codebolt.browser.goToPage("https://example.com");
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Perform a search using the search input element
  const searchResult = await codebolt.browser.search("search-input", "test query");
  console.log('✅ Search performed:', searchResult);

  // Check if the search was successful
  if (searchResult.success) {
    console.log('Search query executed successfully');
  } else {
    console.error('Search failed:', searchResult.error);
  }

  // Example with different search queries
  await codebolt.browser.search("searchBox", "codebolt browser automation");
  await codebolt.browser.search("q", "JavaScript tutorials");
});
```
