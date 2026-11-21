---
name: createInstance
description: Create a new knowledge graph instance.
cbbaseinfo:
  description: Create a new knowledge graph instance.
data:
  name: createInstance
  category: knowledgeGraph
  link: createInstance.md
---

# createInstance

```text
codebolt.knowledgeGraph.createInstance(config: CreateKGInstanceParams): Promise<KGInstanceResponse>
```

Create a new knowledge graph instance

## Parameters

- `config` — Instance configuration

## When to use it

Create an instance from a template when you need a separate graph for a project or workflow.

## Examples

### Create Basic Instance

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an instance from a template
  const instance = await codebolt.knowledgeGraph.createInstance({
      templateId: 'template-123',
      name: 'My Knowledge Graph'
  });

  if (instance.success) {
      if (instance.data == null) throw new Error('The response is missing data.');
      console.log('✅ Instance created:', instance.data.id);
      console.log('Instance name:', instance.data.name);
      console.log('Template ID:', instance.data.templateId);
  }
});
```

### Create Instance with Description

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a fully described instance
  const instance = await codebolt.knowledgeGraph.createInstance({
      templateId: 'template-social-network-123',
      name: 'Company Social Graph',
      description: 'Knowledge graph tracking employee connections and collaborations'
  });

  console.log('Instance Details:');
  if (instance.data == null) throw new Error('The response is missing data.');
  console.log('- ID:', instance.data.id);
  console.log('- Name:', instance.data.name);
  console.log('- Description:', instance.data.description);
  console.log('- Created:', instance.data.createdAt);
});
```

### Create Multiple Instances from Same Template

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create multiple instances for different departments
  const templateId = 'template-project-mgmt-123';
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR'];

  const instances = [];

  for (const dept of departments) {
      const instance = await codebolt.knowledgeGraph.createInstance({
          templateId,
          name: `${dept} Projects`,
          description: `Project tracking for ${dept} department`
      });

      if (instance.success) {
          instances.push(instance.data);
          if (instance.data == null) throw new Error('The response is missing data.');
          console.log(`✅ Created ${dept} instance:`, instance.data.id);
      }
  }

  console.log(`Created ${instances.length} project tracking instances`);
});
```

### Create Instance for Different Environments

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create instances for different environments
  const templateId = 'template-app-architecture-123';
  const environments = [
      { name: 'Development', suffix: '-dev' },
      { name: 'Staging', suffix: '-staging' },
      { name: 'Production', suffix: '-prod' }
  ];

  for (const env of environments) {
      const instance = await codebolt.knowledgeGraph.createInstance({
          templateId,
          name: `App Architecture ${env.name}`,
          description: `Architecture documentation for ${env.name.toLowerCase()} environment`
      });

      if (instance.success) {
          console.log(`✅ Created ${env.name} instance`);
          // You could add environment-specific configurations here
      }
  }
});
```
