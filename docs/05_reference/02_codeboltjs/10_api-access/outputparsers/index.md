# Outputparsers

Parse structured output formats.

## When to use it

Parse model or tool output when the expected format is known. Check parsing results before using the values in another operation.

## Example

### Quick Start

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Parse JSON
  const jsonResult = await codebolt.outputparsers.parseJSON('{"name": "test", "value": 123}');
  if (jsonResult.success) {
      console.log(jsonResult.parsed);
  }

  // Parse CSV
  const csvResult = await codebolt.outputparsers.parseCSV('name,age\nJohn,25\nJane,30');
  if (csvResult.success) {
      console.log(csvResult.parsed);
  }

  // Parse Text
  const textResult = await codebolt.outputparsers.parseText('Line 1\nLine 2\nLine 3');
  if (textResult.success) {
      console.log(textResult.parsed);
  }

  // Parse XML
  const xmlResult = await codebolt.outputparsers.parseXML('<root><item>Test</item></root>');
  if (xmlResult.success) {
      console.log(xmlResult.parsed);
  }
});
```

## SDK methods

### parseJSON

[`parseJSON`](parseJSON.md) · Parses JSON string and returns a result object.

### parseXML

[`parseXML`](parseXML.md) · Parses XML string and returns a result object.

### parseCSV

[`parseCSV`](parseCSV.md) · Parses CSV string and returns a result object.

### parseText

[`parseText`](parseText.md) · Parses text string and returns a result object with lines.

### parseErrors

Parses the given output and returns all the error messages.

```text
codebolt.outputparsers.parseErrors(output: ParsableOutput): string[]
```

### parseWarnings

Parses the given output and returns all the warning messages.

```text
codebolt.outputparsers.parseWarnings(output: ParsableOutput): string[]
```
