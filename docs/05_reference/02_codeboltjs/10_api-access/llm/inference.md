---
name: inference
description: Sends model input items to Codebolt.
cbbaseinfo:
  description: Sends model input items to Codebolt.
data:
  name: inference
  category: llm
  link: inference.md
---

# inference

```text
codebolt.llm.inference(params: LLMInferenceParams): Promise<{ completion: LLMCompletion; } & Record<string, any>>
```

Sends model input items to Codebolt. The SDK defaults to `codebolt.llm.v2` and saves input to context unless `saveToContext` is false. Pass `llmrole` to select a configured model role. Read plain text from `completion.output_text` and structured items from `completion.items`.

## When to use it

Use inference to answer a question, explain code, or produce structured tool requests. Send the conversation in `input` and read the answer from `completion.output_text`.

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

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Basic inference with simple message
  const response = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'Hello! This is a test message. Please respond with a simple greeting.'
      }
    ],
    llmrole: 'assistant'
  });
  console.log("Response:", response.completion.output_text);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Multi-turn conversation
  const conversationResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: 'You are a helpful coding assistant.'
      },
      { type: 'message',
        role: 'user',
        content: 'Write a simple JavaScript function that adds two numbers.'
      }
    ],
    llmrole: 'assistant',
    max_output_tokens: 500,
    temperature: 0.7
  });
  console.log("Code Response:", conversationResponse.completion.output_text);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Using tools with the LLM
  const toolResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'What is the weather like today?'
      }
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get the current weather for a location',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'The city and state, e.g. San Francisco, CA'
              }
            },
            required: ['location']
          }
        }
      }
    ],
    tool_choice: 'auto',
    llmrole: 'assistant'
  });
  console.log("Tool Response:", toolResponse);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Forcing tool usage
  const forcedToolResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'Calculate the sum of 25 and 17'
      }
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'calculate',
          description: 'Perform mathematical calculations',
          parameters: {
            type: 'object',
            properties: {
              operation: { type: 'string' },
              numbers: { type: 'array', items: { type: 'number' } }
            },
            required: ['operation', 'numbers']
          }
        }
      }
    ],
    tool_choice: 'required',
    llmrole: 'assistant'
  });
  console.log("Forced Tool Response:", forcedToolResponse);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Handling tool call responses
  const toolCallResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'What files are in the current directory?'
      },
      { type: 'message',
        role: 'assistant',
        content: null,
        tool_calls: [
          {
            id: 'call_123',
            type: 'function',
            function: {
              name: 'list_files',
              arguments: '{"path": "."}'
            }
          }
        ]
      },
      { type: 'message',
        role: 'tool',
        tool_call_id: 'call_123',
        content: 'file1.txt, file2.js, folder1/'
      }
    ],
    llmrole: 'assistant'
  });
  console.log("Tool Call Response:", toolCallResponse.completion.output_text);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Streaming response (if supported)
  const streamResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'user',
        content: 'Write a detailed explanation of machine learning.'
      }
    ],
    llmrole: 'assistant',
    stream: true,
    max_output_tokens: 1000
  });
  console.log("Stream Response:", streamResponse);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 7: Error handling
  try {
    const errorResponse = await codebolt.llm.inference({
      input: [
        { type: 'message',
          role: 'user',
          content: 'Test message'
        }
      ],
      llmrole: 'invalid_role'
    });
    console.log("Response:", errorResponse);
  } catch (error) {
    console.error("Error:", error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 8: Complex conversation with system prompt
  const complexResponse = await codebolt.llm.inference({
    input: [
      { type: 'message',
        role: 'system',
        content: 'You are an expert software architect. Provide detailed technical explanations.'
      },
      { type: 'message',
        role: 'user',
        content: 'Explain the differences between microservices and monolithic architecture.'
      }
    ],
    llmrole: 'assistant',
    temperature: 0.3,
    max_output_tokens: 800
  });
  console.log("Complex Response:", complexResponse.completion.output_text);
});
```
