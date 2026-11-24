---
name: execute
description: Execute an ingestion pipeline.
cbbaseinfo:
  description: Execute an ingestion pipeline.
data:
  name: execute
  category: memoryIngestion
  link: execute.md
---

# execute

**Default server support.** The application has an ingestion service, but the default agent WebSocket dispatcher does not forward `memoryIngestion.*` requests to it. A caller can wait without receiving a response. For storing and retrieving individual values from an agent, see [DB Memory](../dbmemory/index.md).

```text
codebolt.memoryIngestion.execute(params: ExecuteIngestionParams): Promise<IngestionExecuteResponse>
```

Execute an ingestion pipeline

## Parameters

- `params` — Execution parameters

## Intended use

Run an existing pipeline on input data after choosing the appropriate processing configuration.

## Request examples for a compatible server

### Basic Pipeline Execution

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a pipeline with data
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: 'pipeline-123',
      payload: {
          text: 'This is the content to process...'
      }
  });

  if (result.success) {
      console.log('✅ Pipeline executed');
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('Processed:', result.data.result.processedCount);
      console.log('Routed:', result.data.result.routedCount);
  }
});
```

### Execute with Full Context

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute with complete context
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: 'pipeline-123',
      eventType: 'conversation_end',
      trigger: 'manual',
      threadId: 'thread-456',
      agentId: 'agent-789',
      swarmId: 'swarm-001',
      projectId: 'project-abc',
      payload: {
          conversation: {
              messages: [
                  { role: 'user', content: 'Hello' },
                  { role: 'assistant', content: 'Hi there!' }
              ],
              summary: 'Greeting exchange',
              duration: 30
          }
      }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Execution result:', result.data.result);
});
```

### Execute Document Processing Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Process a document through pipeline
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: 'doc-processor-123',
      eventType: 'file_change',
      payload: {
          file: 'README.md',
          content: '# Project Documentation\n\nThis is the documentation...',
          language: 'markdown',
          size: 2048
      }
  });

  if (result.success) {
      console.log('Document processed successfully');
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('Execution time:', result.data.result.executionTime, 'ms');
  }
});
```

### Execute Conversation Summarization

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Summarize a conversation
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: 'summarizer-123',
      eventType: 'conversation_end',
      threadId: 'thread-789',
      payload: {
          conversation_history: [
              { speaker: 'User', text: 'How do I implement caching?' },
              { speaker: 'Assistant', text: 'You can use Redis...' },
              { speaker: 'User', text: 'What about in-memory caching?' },
              { speaker: 'Assistant', text: 'Node.js has built-in...' }
          ],
          metadata: {
              topic: 'caching',
              language: 'javascript',
              resolved: true
          }
      }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Summary generated:', result.data.result);
});
```

### Execute Data Import Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Import external data through pipeline
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: 'import-pipeline-123',
      trigger: 'manual',
      projectId: 'project-abc',
      payload: {
          source: 'external_api',
          data: [
              { id: 1, name: 'Item 1', category: 'A' },
              { id: 2, name: 'Item 2', category: 'B' },
              { id: 3, name: 'Item 3', category: 'A' }
          ],
          metadata: {
              import_time: new Date().toISOString(),
              source_url: 'https://api.example.com/data'
          }
      }
  });

  if (result.success) {
      console.log('Data import completed');
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('Items processed:', result.data.result.processedCount);
  }
});
```
