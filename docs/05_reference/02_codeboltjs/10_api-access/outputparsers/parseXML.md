---
name: parseXML
description: Parses XML string and returns a result object.
cbbaseinfo:
  description: Parses XML string and returns a result object.
data:
  name: parseXML
  category: outputparsers
  link: parseXML.md
---

# parseXML

```text
codebolt.outputparsers.parseXML(xmlString: string): ParseResult<{ rootElement: string; [key: string]: unknown; }>
```

Parses XML string and returns a result object.

## Parameters

- `xmlString` — The XML string to parse.

## Returns

An object with success flag and parsed data.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const invalidXml = 'not valid xml';
  const result = await codebolt.outputparsers.parseXML(invalidXml);
  console.log(result);
  // Output: { success: false, parsed: undefined }
});
```

## More examples

### Valid XML Parsing

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const xmlData = '<root><item id="1">Test Item</item><item id="2">Another Item</item></root>';
  const result = await codebolt.outputparsers.parseXML(xmlData);
  console.log(result);
  // }
});
```
