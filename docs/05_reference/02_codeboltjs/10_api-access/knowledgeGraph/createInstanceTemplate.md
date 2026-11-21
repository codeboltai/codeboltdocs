---
name: createInstanceTemplate
description: Create a new instance template.
cbbaseinfo:
  description: Create a new instance template.
data:
  name: createInstanceTemplate
  category: knowledgeGraph
  link: createInstanceTemplate.md
---

# createInstanceTemplate

```text
codebolt.knowledgeGraph.createInstanceTemplate(config: CreateKGInstanceTemplateParams): Promise<KGInstanceTemplateResponse>
```

Create a new instance template

## Parameters

- `config` — Template configuration

## When to use it

Define a reusable graph structure that multiple instances can share.

## Examples

### Create Simple Person Template

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a template for tracking people
  const template = await codebolt.knowledgeGraph.createInstanceTemplate({
      name: 'Person Directory',
      description: 'Simple template for person records',
      record_kinds: [
          {
              name: 'person',
              label: 'Person',
              description: 'A person entity',
              attributes: {
                  name: { type: 'string', required: true },
                  email: { type: 'string' },
                  age: { type: 'number' }
              }
          }
      ],
      edge_types: []
  });

  if (template.success) {
      if (template.data == null) throw new Error('The response is missing data.');
      console.log('✅ Template created:', template.data.id);
      console.log('Template name:', template.data.name);
  }
});
```

### Create Social Network Template

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a comprehensive social network template
  const template = await codebolt.knowledgeGraph.createInstanceTemplate({
      name: 'Social Network',
      description: 'Template for social relationships and interactions',
      record_kinds: [
          {
              name: 'person',
              label: 'Person',
              description: 'A person in the network',
              attributes: {
                  name: { type: 'string', required: true },
                  handle: { type: 'string' },
                  bio: { type: 'string' },
                  joined_date: { type: 'date' },
                  verified: { type: 'boolean', default: false }
              }
          },
          {
              name: 'post',
              label: 'Post',
              description: 'A social media post',
              attributes: {
                  content: { type: 'string', required: true },
                  timestamp: { type: 'date' },
                  likes: { type: 'number', default: 0 }
              }
          },
          {
              name: 'group',
              label: 'Group',
              description: 'A group or community',
              attributes: {
                  name: { type: 'string', required: true },
                  description: { type: 'string' },
                  member_count: { type: 'number' }
              }
          }
      ],
      edge_types: [
          {
              name: 'follows',
              label: 'Follows',
              description: 'Person follows another person',
              from_kinds: ['person'],
              to_kinds: ['person']
          },
          {
              name: 'authored',
              label: 'Authored',
              description: 'Person created a post',
              from_kinds: ['person'],
              to_kinds: ['post']
          },
          {
              name: 'member_of',
              label: 'Member Of',
              description: 'Person is a member of a group',
              from_kinds: ['person'],
              to_kinds: ['group']
          }
      ]
  });

  if (template.data == null) throw new Error('The response is missing data.');
  console.log('Social network template created with',
      template.data.record_kinds.length, 'node types and',
      template.data.edge_types.length, 'relationship types');
});
```

### Create Project Management Template

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Template for project management
  const template = await codebolt.knowledgeGraph.createInstanceTemplate({
      name: 'Project Management',
      description: 'Track projects, tasks, and resources',
      record_kinds: [
          {
              name: 'project',
              label: 'Project',
              attributes: {
                  name: { type: 'string', required: true },
                  description: { type: 'string' },
                  status: { type: 'string' },
                  budget: { type: 'number' },
                  start_date: { type: 'date' },
                  end_date: { type: 'date' }
              }
          },
          {
              name: 'task',
              label: 'Task',
              attributes: {
                  title: { type: 'string', required: true },
                  description: { type: 'string' },
                  status: { type: 'string' },
                  priority: { type: 'number' },
                  estimated_hours: { type: 'number' }
              }
          },
          {
              name: 'resource',
              label: 'Resource',
              attributes: {
                  name: { type: 'string', required: true },
                  type: { type: 'string' },
                  availability: { type: 'number' },
                  cost_per_hour: { type: 'number' }
              }
          }
      ],
      edge_types: [
          {
              name: 'contains',
              label: 'Contains',
              from_kinds: ['project'],
              to_kinds: ['task']
          },
          {
              name: 'requires',
              label: 'Requires',
              from_kinds: ['task'],
              to_kinds: ['resource']
          },
          {
              name: 'depends_on',
              label: 'Depends On',
              from_kinds: ['task'],
              to_kinds: ['task']
          }
      ]
  });

  console.log('✅ Project management template created');
});
```

### Create Knowledge Graph with JSON Attributes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Template with complex nested data
  const template = await codebolt.knowledgeGraph.createInstanceTemplate({
      name: 'Document Repository',
      record_kinds: [
          {
              name: 'document',
              label: 'Document',
              attributes: {
                  title: { type: 'string', required: true },
                  metadata: { type: 'json' },
                  tags: { type: 'json' }
              }
          }
      ],
      edge_types: [
          {
              name: 'references',
              label: 'References',
              from_kinds: ['document'],
              to_kinds: ['document'],
              attributes: {
                  context: { type: 'string' },
                  confidence: { type: 'number' }
              }
          }
      ]
  });

  console.log('Document repository template created');
});
```
