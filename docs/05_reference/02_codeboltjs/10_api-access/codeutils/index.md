# Codeutils

Collect source files as Markdown and use the SDK’s code matcher endpoints.

For workspace definition names, see [listCodeDefinitionNames](../fs/listCodeDefinitionNames.md).

## When to use it

Collect source as Markdown for inspection or use the matcher methods to interpret tool diagnostics. Search the project when you only need a small set of files.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.codeutils.getMatcherList();
  console.log(result);
});
```

## SDK methods

### getAllFilesAsMarkDown

[`getAllFilesAsMarkDown`](getAllFilesAsMarkDown.md) · Retrieves all files as Markdown.

### performMatch

[`performMatch`](performMatch.md) · Performs a matching operation based on the provided matcher definition and problem patterns.

### getMatcherList

[`getMatcherList`](getMatcherList.md) · Retrieves the list of matchers.

### matchDetail

[`matchDetail`](matchDetail.md) · Retrieves details of a match.
