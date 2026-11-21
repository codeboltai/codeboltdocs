---
name: addMemoryRecord
description: Add a memory record to an instance.
cbbaseinfo:
  description: Add a memory record to an instance.
data:
  name: addMemoryRecord
  category: knowledgeGraph
  link: addMemoryRecord.md
---

# addMemoryRecord

```text
codebolt.knowledgeGraph.addMemoryRecord(instanceId: string, record: CreateKGMemoryRecordParams): Promise<KGMemoryRecordResponse>
```

Add a memory record to an instance

## Parameters

- `instanceId` — Instance ID
- `record` — Record data

## When to use it

Add a structured record to an existing graph instance for later lookup or relationship queries.

## Examples

### Add Simple Record

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a person record
  const record = await codebolt.knowledgeGraph.addMemoryRecord(
      'instance-123',
      {
          kind: 'person',
          attributes: {
              name: 'Alice Johnson',
              email: 'alice@example.com',
              age: 30
          }
      }
  );

  if (record.success) {
      if (record.data == null) throw new Error('The response is missing data.');
      console.log('✅ Record created:', record.data.id);
      console.log('Record kind:', record.data.kind);
      console.log('Attributes:', record.data.attributes);
  }
});
```

### Add Record with Validity Period

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a record with time-based validity
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  const record = await codebolt.knowledgeGraph.addMemoryRecord(
      'instance-123',
      {
          kind: 'employee',
          attributes: {
              name: 'Bob Smith',
              position: 'Senior Developer',
              department: 'Engineering'
          },
          valid_from: now.toISOString(),
          valid_to: nextYear.toISOString()
      }
  );

  console.log('✅ Employee record created with validity period');
});
```

### Add Multiple Records

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add multiple people to the graph
  const people = [
      { kind: 'person', attributes: { name: 'Alice', age: 30, city: 'NYC' } },
      { kind: 'person', attributes: { name: 'Bob', age: 25, city: 'LA' } },
      { kind: 'person', attributes: { name: 'Charlie', age: 35, city: 'SF' } },
      { kind: 'person', attributes: { name: 'Diana', age: 28, city: 'Seattle' } }
  ];

  const instanceId = 'instance-123';
  const records = [];

  for (const person of people) {
      const record = await codebolt.knowledgeGraph.addMemoryRecord(instanceId, person);
      if (record.success) {
          records.push(record.data);
          console.log(`✅ Added ${person.attributes.name}`);
      }
  }

  console.log(`✅ Added ${records.length} people to the knowledge graph`);
});
```

### Add Records with Different Types

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add different types of records to a project management graph
  const instanceId = 'instance-projects-123';

  const project = await codebolt.knowledgeGraph.addMemoryRecord(instanceId, {
      kind: 'project',
      attributes: {
          name: 'Website Redesign',
          status: 'In Progress',
          budget: 50000,
          start_date: '2024-01-01'
      }
  });

  const task1 = await codebolt.knowledgeGraph.addMemoryRecord(instanceId, {
      kind: 'task',
      attributes: {
          title: 'Design mockups',
          status: 'Completed',
          priority: 1,
          estimated_hours: 40
      }
  });

  const task2 = await codebolt.knowledgeGraph.addMemoryRecord(instanceId, {
      kind: 'task',
      attributes: {
          title: 'Implement frontend',
          status: 'In Progress',
          priority: 2,
          estimated_hours: 80
      }
  });

  const resource = await codebolt.knowledgeGraph.addMemoryRecord(instanceId, {
      kind: 'resource',
      attributes: {
          name: 'Development Team',
          type: 'human',
          availability: 100,
          cost_per_hour: 100
      }
  });

  console.log('✅ Project structure created with project, tasks, and resources');
});
```

### Add Record with JSON Attributes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a document with complex nested metadata
  const record = await codebolt.knowledgeGraph.addMemoryRecord(
      'instance-docs-123',
      {
          kind: 'document',
          attributes: {
              title: 'API Documentation',
              content: 'This is the API documentation...',
              metadata: {
                  author: 'John Doe',
                  version: '1.0.0',
                  tags: ['api', 'documentation', 'reference'],
                  reviews: [
                      { reviewer: 'Alice', approved: true },
                      { reviewer: 'Bob', approved: true }
                  ]
              }
          }
      }
  );

  console.log('✅ Document with complex metadata added');
});
```
