---
name: parseJSON
description: Parses JSON string and returns a result object.
cbbaseinfo:
  description: Parses JSON string and returns a result object.
data:
  name: parseJSON
  category: outputparsers
  link: parseJSON.md
---

# parseJSON

```text
codebolt.outputparsers.parseJSON(jsonString: string): ParseResult<unknown>
```

Parses JSON string and returns a result object.

## Parameters

- `jsonString` — The JSON string to parse.

## Returns

An object with success flag and parsed data or error.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const invalidJson = '{"name": "test", "value": 123, "active":}';
  const result = await codebolt.outputparsers.parseJSON(invalidJson);
  console.log(result);
  // Output: { success: false, error: SyntaxError... }
});
```

## More examples

### Valid JSON Parsing

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const validJson = '{"name": "test", "value": 123, "active": true}';
  const result = await codebolt.outputparsers.parseJSON(validJson);
  console.log(result);
  // Output: { success: true, parsed: { name: 'test', value: 123, active: true } }
});
```

### Complex JSON Object

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const complexJson = JSON.stringify({
      users: [
          { id: 1, name: 'Alice', roles: ['admin', 'user'] },
          { id: 2, name: 'Bob', roles: ['user'] }
      ],
      metadata: {
          total: 2,
          timestamp: new Date().toISOString()
      }
  });
  const result = await codebolt.outputparsers.parseJSON(complexJson);
  console.log(result);
  // Output: { success: true, parsed: { users: [...], metadata: {...} } }
});
```
