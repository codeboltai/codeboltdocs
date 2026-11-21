# Web Fetch

Fetch the content of a web page.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.webFetch.fetch({
    url: 'https://example.com/',
    prompt: 'Extract the page title',
  });
  console.log(result);
});
```

## SDK methods

### fetch

Fetch a URL through the CodeBolt server-side web_fetch tool.

```text
codebolt.webFetch.fetch(params: WebFetchParams): Promise<WebFetchResponse>
```
