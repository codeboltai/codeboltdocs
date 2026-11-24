---
name: create
description: Create a new ingestion pipeline.
cbbaseinfo:
  description: Create a new ingestion pipeline.
data:
  name: create
  category: memoryIngestion
  link: create.md
---

# create

**Default server support.** The application has an ingestion service, but the default agent WebSocket dispatcher does not forward `memoryIngestion.*` requests to it. A caller can wait without receiving a response. For storing and retrieving individual values from an agent, see [DB Memory](../dbmemory/index.md).

```text
codebolt.memoryIngestion.create(config: CreateIngestionPipelineParams): Promise<IngestionPipelineResponse>
```

Create a new ingestion pipeline

## Parameters

- `config` — Pipeline configuration

## Intended use

Create a pipeline that describes how incoming content should be transformed or stored.

## Request examples for a compatible server

### Create Basic Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple ingestion pipeline
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Conversation Summarizer',
      trigger: 'onConversationEnd',
      processors: [
          {
              type: 'llm_summarize',
              config: { max_length: 300 }
          }
      ],
      routing: {
          destination: 'vectordb',
          destination_id: 'summaries-vectors'
      }
  });

  if (pipeline.success) {
      if (pipeline.data == null) throw new Error('The response is missing data.');
      console.log('✅ Pipeline created:', pipeline.data.pipeline.id);
  }
});
```

### Create Pipeline with Multiple Processors

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create pipeline with processing chain
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Document Processor',
      description: 'Extracts and embeds document content',
      trigger: 'onFileChange',
      trigger_config: {
          file_patterns: ['*.md', '*.txt']
      },
      processors: [
          {
              type: 'filter',
              config: { min_length: 100 },
              order: 1
          },
          {
              type: 'llm_extract',
              config: {
                  extract: ['title', 'summary', 'keywords'],
                  model: 'gpt-4'
              },
              order: 2
          },
          {
              type: 'embed',
              config: { model: 'text-embedding-ada-002' },
              order: 3
          }
      ],
      routing: {
          destination: 'vectordb',
          destination_id: 'docs-vectors',
          field_mapping: {
              summary: 'text',
              keywords: 'metadata.tags'
          }
      }
  });

  console.log('✅ Document processor pipeline created');
});
```

### Create Manual Trigger Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create manually triggered pipeline
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Data Import Pipeline',
      description: 'Imports and processes external data',
      trigger: 'manual',
      processors: [
          {
              type: 'transform',
              config: {
                  transformations: [
                      { field: 'date', operation: 'to_iso_date' },
                      { field: 'tags', operation: 'split', delimiter: ',' }
                  ]
              }
          }
      ],
      routing: {
          destination: 'kv',
          destination_id: 'imported-data',
          field_mapping: {
              id: 'key',
              '*': 'value'
          }
      }
  });

  console.log('✅ Manual import pipeline created');
});
```

### Create Scheduled Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create scheduled pipeline
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Daily Report Generator',
      description: 'Generates daily summary reports',
      trigger: 'onSchedule',
      trigger_config: {
          schedule: '0 9 * * *', // Cron: 9 AM daily
          timezone: 'UTC'
      },
      processors: [
          {
              type: 'aggregate',
              config: {
                  period: '24h',
                  metrics: ['count', 'avg', 'sum']
              }
          },
          {
              type: 'llm_summarize',
              config: {
                  template: 'Daily Summary:\n{aggregated_data}',
                  style: 'professional'
              }
          }
      ],
      routing: {
          destination: 'kv',
          destination_id: 'daily-reports',
          field_mapping: {
              date: 'key',
              summary: 'value'
          }
      }
  });

  console.log('✅ Scheduled pipeline created');
});
```

### Create Agent Completion Pipeline

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create pipeline that triggers on agent completion
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Agent Output Processor',
      description: 'Processes and stores agent outputs',
      trigger: 'onAgentComplete',
      trigger_config: {
          agent_types: ['coder', 'analyzer'],
          include_metadata: true
      },
      processors: [
          {
              type: 'filter',
              config: {
                  filter_expression: 'output.status == "success"'
              }
          },
          {
              type: 'transform',
              config: {
                  add_fields: {
                      processed_at: '{timestamp}',
                      agent_type: '{agent.type}'
                  }
              }
          },
          {
              type: 'embed',
              config: { model: 'text-embedding-ada-002' }
          }
      ],
      routing: {
          destination: 'vectordb',
          destination_id: 'agent-outputs',
          field_mapping: {
              output: 'text',
              metadata: 'metadata'
          }
      }
  });

  console.log('✅ Agent output pipeline created');
});
```

### Create Pipeline with Knowledge Graph Routing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create pipeline that routes to knowledge graph
  const pipeline = await codebolt.memoryIngestion.create({
      label: 'Entity Extractor',
      description: 'Extracts entities and stores in knowledge graph',
      trigger: 'onConversationEnd',
      processors: [
          {
              type: 'llm_extract',
              config: {
                  extract: ['entities', 'relationships'],
                  model: 'gpt-4',
                  prompt_template: 'Extract entities and relationships from: {text}'
              }
          },
          {
              type: 'transform',
              config: {
                  format_for: 'knowledge_graph'
              }
          }
      ],
      routing: {
          destination: 'kg',
          destination_id: 'entity-graph',
          field_mapping: {
              entities: 'nodes',
              relationships: 'edges'
          }
      }
  });

  console.log('✅ Entity extraction pipeline created');
});
```
