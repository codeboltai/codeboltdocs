# Source file analysis

`getJsTree` is absent from the SDK’s code utilities. Use [listCodeDefinitionNames](../fs/listCodeDefinitionNames.md) to look up definition names in workspace files.

## Example

### List definition names in workspace source files

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fs.listCodeDefinitionNames('./src');
  if (result.success) console.log(result.definitions ?? result.result);
});
```
