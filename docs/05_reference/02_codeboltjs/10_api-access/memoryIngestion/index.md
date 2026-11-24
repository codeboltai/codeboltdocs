# Memory Ingestion

**Default server support.** The application has an ingestion service, but the default agent WebSocket dispatcher does not forward `memoryIngestion.*` requests to it. A caller can wait without receiving a response. For storing and retrieving individual values from an agent, see [DB Memory](../dbmemory/index.md).

Manage memory ingestion pipelines and run processors.

## Request examples for a compatible server

### Request format

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an ingestion pipeline
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Conversation Summary Pipeline',
      description: 'Summarizes conversations and stores in vector DB',
      trigger: 'onConversationEnd',
      trigger_config: {
          min_length: 5,
          include_metadata: true
      },
      processors: [
          {
              type: 'llm_summarize',
              config: {
                  model: 'gpt-4',
                  max_length: 500,
                  style: 'concise'
              },
              order: 1
          },
          {
              type: 'embed',
              config: {
                  model: 'text-embedding-ada-002'
              },
              order: 2
          }
      ],
      routing: {
          destination: 'vectordb',
          destination_id: 'conversation-vectors',
          field_mapping: {
              summary: 'text',
              timestamp: 'metadata.timestamp'
          }
      }
  });

  // Activate the pipeline
  if (pipeline.data == null) throw new Error('The response is missing data.');
  await codebolt.memoryIngestion.activate(pipeline.data.pipeline.id);

  // Execute manually
  if (pipeline.data == null) throw new Error('The response is missing data.');
  const result = await codebolt.memoryIngestion.execute({
      pipelineId: pipeline.data.pipeline.id,
      eventType: 'conversation_end',
      threadId: 'thread-123',
      payload: {
          conversation: '... conversation text ...'
      }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Processed:', result.data.result.processedCount);
});
```

## SDK methods

### create

[`create`](create.md) · Create a new ingestion pipeline.

### get

Get an ingestion pipeline by ID.

```text
codebolt.memoryIngestion.get(pipelineId: string): Promise<IngestionPipelineResponse>
```

### list

List ingestion pipelines.

```text
codebolt.memoryIngestion.list(filters?: ListIngestionPipelineParams): Promise<IngestionPipelineListResponse>
```

### update

Update an ingestion pipeline.

```text
codebolt.memoryIngestion.update(pipelineId: string, updates: UpdateIngestionPipelineParams): Promise<IngestionPipelineResponse>
```

### delete

Delete an ingestion pipeline.

```text
codebolt.memoryIngestion.delete(pipelineId: string): Promise<IngestionPipelineResponse>
```

### execute

[`execute`](execute.md) · Execute an ingestion pipeline.

### validate

Validate a pipeline configuration.

```text
codebolt.memoryIngestion.validate(pipeline: CreateIngestionPipelineParams): Promise<IngestionValidateResponse>
```

### getProcessorSpecs

Get available processor specifications.

```text
codebolt.memoryIngestion.getProcessorSpecs(): Promise<IngestionProcessorSpecsResponse>
```

### activate

Activate an ingestion pipeline.

```text
codebolt.memoryIngestion.activate(pipelineId: string): Promise<IngestionPipelineResponse>
```

### disable

Disable an ingestion pipeline.

```text
codebolt.memoryIngestion.disable(pipelineId: string): Promise<IngestionPipelineResponse>
```

### duplicate

Duplicate an ingestion pipeline.

```text
codebolt.memoryIngestion.duplicate(pipelineId: string, newId?: string, newLabel?: string): Promise<IngestionPipelineResponse>
```
