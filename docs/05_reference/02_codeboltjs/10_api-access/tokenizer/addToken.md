---
name: addToken
description: Encodes text using the GPT-2 tokenizer.
cbbaseinfo:
  description: Encodes text using the GPT-2 tokenizer.
data:
  name: addToken
  category: tokenizer
  link: addToken.md
---

# addToken

```text
codebolt.tokenizer.addToken(text: string): Promise<AddTokenResponse>
```

Pass the text to encode. The SDK calls the argument `key`. The server sends the token IDs as a comma-separated string in `token` and the number of IDs in `count`.

## When to use it

Estimate the token count for text you plan to send in a prompt. Compare model-specific limits using that model's tokenizer when accuracy matters.

## Estimate the size of a prompt

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.tokenizer.addToken('Summarize the project setup steps.');
  if (response.success) {
    console.log('Token count', response.count);
    console.log('Token IDs', response.token);
  }
});
```
