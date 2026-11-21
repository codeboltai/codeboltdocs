# Tokenizer

Tokenize text and count tokens.

## When to use it

Use the tokenizer to estimate how much text fits before sending a model request. The encoder uses GPT-2 tokenization, so model-specific usage counts can differ.

## Count tokens in a proposed prompt

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.tokenizer.addToken('Explain the two main setup steps.');
  if (response.success) console.log(response.count);
});
```

## SDK methods

- [addToken](./addToken.md) encodes text and returns the token IDs and count.
- [getToken](./getToken.md) sends a string to the tokenizer endpoint.
