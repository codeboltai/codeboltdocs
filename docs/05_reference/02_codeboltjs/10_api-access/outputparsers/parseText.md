---
name: parseText
description: Parses text string and returns a result object with lines.
cbbaseinfo:
  description: Parses text string and returns a result object with lines.
data:
  name: parseText
  category: outputparsers
  link: parseText.md
---

# parseText

```text
codebolt.outputparsers.parseText(text: string): ParseResult<string[]>
```

Parses text string and returns a result object with lines.

## Parameters

- `text` — The text to parse.

## Returns

An object with success flag and parsed lines.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const emptyText = '';
  const result = await codebolt.outputparsers.parseText(emptyText);
  console.log(result);
  // Output: { success: true, parsed: [] }
});
```

## More examples

### Multi-line Text Parsing

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const textData = 'Line 1\nLine 2\nLine 3\nLine 4';
  const result = await codebolt.outputparsers.parseText(textData);
  console.log(result);
  // Output: { success: true, parsed: ['Line 1', 'Line 2', 'Line 3', 'Line 4'] }
});
```

### Single Line Text

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const singleLine = 'Hello World';
  const result = await codebolt.outputparsers.parseText(singleLine);
  console.log(result);
  // Output: { success: true, parsed: ['Hello World'] }
});
```

### Text with Various Content

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const logData = 'INFO: Application started\nWARNING: Low memory\nERROR: Database connection failed\nINFO: Retrying connection';
  const result = await codebolt.outputparsers.parseText(logData);
  console.log(result);
  // }
});
```
