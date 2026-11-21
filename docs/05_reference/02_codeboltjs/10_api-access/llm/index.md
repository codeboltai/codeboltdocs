# LLM

Run model inference and inspect or configure model roles.

The request uses `input` items and defaults to `formatVersion: "codebolt.llm.v2"`. Inference returns a `completion` object. Read prose from `completion.output_text` and inspect `completion.items` for structured output and tool calls.

## When to use it

Use inference for a new model request. Pick an LLM role to use the appropriate model configuration and inspect the completion for text or tool calls.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user', content: 'Summarize the purpose of a README in one sentence.' }],
  });
  console.log(result.completion.output_text);
});
```

## More examples

### Basic LLM Usage

```javascript
import codebolt from '@codebolt/codeboltjs';

async function quickStart() {
  // Simple inference
  const response = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'Hello! Can you help me write a JavaScript function?'
      }
    ],
    llmrole: 'assistant'
  });

  console.log('Response:', response.content);
  console.log('Tokens used:', response.usage?.total_tokens);
}
```

### Minimal Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // One-line inference
  const result = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user', content: 'Explain quantum computing' }],
    llmrole: 'assistant'
  });
  console.log(result.content);
});
```

### Workflow 2: Code Generation and Refactoring

```javascript
import codebolt from '@codebolt/codeboltjs';

async function codeWorkflow() {
  // Generate code
  const codeResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: 'You are an expert programmer. Write clean, well-documented code.'
      },
      { type: 'message',
        role: 'user',
        content: 'Write a JavaScript function to validate email addresses using regex.'
      }
    ],
    llmrole: 'assistant',
    temperature: 0.3,
    max_output_tokens: 500
  });

  console.log('Generated Code:\n', codeResponse.content);

  // Refactor the generated code
  const refactorResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: 'You are a code optimization expert.'
      },
      { type: 'message',
        role: 'user',
        content: `Refactor this code for better performance:\n${codeResponse.content}`
      }
    ],
    llmrole: 'assistant',
    temperature: 0.2
  });

  console.log('Refactored Code:\n', refactorResponse.content);
}
```

### Workflow 4: Streaming Responses

```javascript
import codebolt from '@codebolt/codeboltjs';

async function streamingExample() {
  const response = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'Write a detailed explanation of async/await in JavaScript'
      }
    ],
    llmrole: 'assistant',
    stream: true,
    max_output_tokens: 1000
  });

  // Handle streaming response
  if (response.stream) {
    for await (const chunk of response.stream) {
      process.stdout.write(chunk.content || '');
    }
    console.log('\nStreaming complete');
  } else {
    console.log(response.content);
  }
}
```

### Integration with VectorDB

```javascript
import codebolt from '@codebolt/codeboltjs';

async function llmWithVectorDB() {
  // Add knowledge to vector database
  await codebolt.vectordb.addVectorItem({
    type: 'documentation',
    content: 'React is a JavaScript library for building user interfaces.',
    tags: ['react', 'javascript', 'frontend']
  });

  // Query similar knowledge
  const similar = await codebolt.vectordb.queryVectorItem('What is React?');

  // Use retrieved context in LLM prompt
  const context = similar.item?.[0]?.item?.content || '';

  const response = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: `You are a helpful assistant. Use this context when answering: ${context}`
      },
      { type: 'message',
        role: 'user',
        content: 'What is React and what are its main features?'
      }
    ],
    llmrole: 'assistant',
    max_output_tokens: 500
  });

  console.log('Enhanced Response:', response.content);
}
```

### Integration with File System

```javascript
import codebolt from '@codebolt/codeboltjs';

async function llmWithFileSystem() {
  // Read code from file
  const codeContent = await codebolt.fs.readFile('./src/utils.js');

  // Analyze code with LLM
  const analysis = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: 'You are a code reviewer. Analyze code for bugs, performance issues, and best practices.'
      },
      { type: 'message',
        role: 'user',
        content: `Review this code:\n\`\`\`javascript\n${codeContent}\n\`\`\``
      }
    ],
    llmrole: 'assistant',
    max_output_tokens: 1000
  });

  // Save analysis to file
  await codebolt.fs.writeToFile(
    './code-review.md',
    `# Code Review\n\n${analysis.content}`
  );

  console.log('Code review saved to code-review.md');
}
```

### Temperature Tuning

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Use low temperature for deterministic outputs
  const codeGeneration = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user', content: 'Write a function to sort an array' }],
    llmrole: 'assistant',
    temperature: 0.2, // Low = more deterministic
    max_output_tokens: 500
  });

  // Use high temperature for creative tasks
  const creativeWriting = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user', content: 'Write a creative story about AI' }],
    llmrole: 'assistant',
    temperature: 0.9, // High = more creative
    max_output_tokens: 1000
  });
});
```

## SDK methods

### inference

[`inference`](inference.md) · Sends an inference request using codebolt.llm.v2 input items with tools support.

### getModelConfig

Gets the model configuration for a specific model or the default application model.

```text
codebolt.llm.getModelConfig(modelId?: string): Promise<{ config: LLMModelConfig | null; success: boolean; error?: string; }>
```

### listRoles

Lists global LLM role mappings or an agent's explicit/effective role mappings.

```text
codebolt.llm.listRoles(params?: LLMListRolesParams): Promise<LLMRolesResponse>
```

### setRole

Creates or updates a global or agent-specific LLM role mapping.

```text
codebolt.llm.setRole(params: LLMSetRoleParams): Promise<LLMRolesResponse>
```

### deleteRole

Deletes a global or agent-specific LLM role mapping by name.

```text
codebolt.llm.deleteRole(params: LLMDeleteRoleParams): Promise<LLMRolesResponse>
```

### getConfiguredProviders

Lists configured LLM providers/models.

```text
codebolt.llm.getConfiguredProviders(params?: LLMConfiguredProvidersParams): Promise<LLMConfiguredProvidersResponse>
```

### getAgentLlmRoles

Lists the LLM roles a target agent can have overridden and their resolved provider/model.

```text
codebolt.llm.getAgentLlmRoles(params?: LLMAgentConfiguredRolesParams): Promise<LLMAgentConfiguredRolesResponse>
```
