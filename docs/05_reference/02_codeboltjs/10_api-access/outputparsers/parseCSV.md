---
name: parseCSV
description: Parses CSV string and returns a result object.
cbbaseinfo:
  description: Parses CSV string and returns a result object.
data:
  name: parseCSV
  category: outputparsers
  link: parseCSV.md
---

# parseCSV

```text
codebolt.outputparsers.parseCSV(csvString: string): ParseResult<CSVRow[]>
```

Parses CSV string and returns a result object.

## Parameters

- `csvString` — The CSV string to parse.

## Returns

An object with success flag and parsed data or error.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const csvData = 'product,price\nLaptop,999\nMouse,29';
  const result = await codebolt.outputparsers.parseCSV(csvData);
  console.log(result);
  // Output: {
  //   success: true,
  //   parsed: [
  //     { product: 'Laptop', price: '999' },
  //     { product: 'Mouse', price: '29' }
  //   ]
  // }
});
```

## More examples

### Valid CSV Parsing

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const csvData = 'name,age,city\nJohn,25,New York\nJane,30,Los Angeles\nBob,35,Chicago';
  const result = await codebolt.outputparsers.parseCSV(csvData);
  console.log(result);
  // }
});
```
