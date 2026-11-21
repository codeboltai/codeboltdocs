---
name: getToken
description: Sends a string to the tokenizer endpoint.
cbbaseinfo:
  description: Sends a string to the tokenizer endpoint.
data:
  name: getToken
  category: tokenizer
  link: getToken.md
---

# getToken

```text
codebolt.tokenizer.getToken(key: string): Promise<GetTokenResponse>
```

The current SDK accepts a string and forwards it to the server tokenizer. For string input the server returns that string in `tokens`. It does not look up a saved value.

## When to use it

Inspect the response shape when maintaining an existing integration. Use [addToken](./addToken.md) to encode text or count tokens.

## Inspect the response for string input

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.tokenizer.getToken('CodeBolt');
  if (result.success) console.log(result.tokens?.[0]); // CodeBolt
});
```
