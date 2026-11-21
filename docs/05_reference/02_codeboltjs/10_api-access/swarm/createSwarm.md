---
name: createSwarm
description: Create a new swarm.
cbbaseinfo:
  description: Create a new swarm.
data:
  name: createSwarm
  category: swarm
  link: createSwarm.md
---

# createSwarm

```text
codebolt.swarm.createSwarm(data: CreateSwarmRequest): Promise<CreateSwarmResponse>
```

Create a new swarm

## Parameters

- `data` — Swarm creation data

## Returns

Promise resolving to created swarm details

## When to use it

Establish a group for related work before adding teams, roles, or participants.

## Examples

### Basic Swarm Creation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple swarm
  const swarm = await codebolt.swarm.createSwarm({
      name: 'Task Force Alpha'
  });

  if (swarm.success) {
      if (swarm.data == null) throw new Error('The response is missing data.');
      console.log('✅ Swarm created:', swarm.data.swarm);
      console.log('Swarm ID:', swarm.data.swarm.id);
  } else {
      console.error('❌ Failed to create swarm:', swarm.error);
  }
});
```

### Swarm with Full Configuration

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a fully configured swarm
  const swarm = await codebolt.swarm.createSwarm({
      name: 'Development Team',
      description: 'A swarm for coordinating software development tasks',
      allowExternalAgents: false,
      maxAgents: 20
  });

  console.log('Swarm Configuration:');
  if (swarm.data == null) throw new Error('The response is missing data.');
  console.log('- ID:', swarm.data.swarm.id);
  console.log('- Name:', swarm.data.swarm.name);
  console.log('- Description:', swarm.data.swarm.description);
  console.log('- Created At:', swarm.data.swarm.createdAt);
});
```

### Creating Multiple Specialized Swarms

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create multiple swarms for different purposes
  const swarms = [
      {
          name: 'Research Team',
          description: 'Handles research and analysis tasks',
          allowExternalAgents: true,
          maxAgents: 15
      },
      {
          name: 'Development Team',
          description: 'Manages development and deployment',
          allowExternalAgents: false,
          maxAgents: 25
      },
      {
          name: 'QA Team',
          description: 'Quality assurance and testing',
          allowExternalAgents: false,
          maxAgents: 10
      }
  ];

  for (const config of swarms) {
      const swarm = await codebolt.swarm.createSwarm(config);
      if (swarm.data == null) throw new Error('The response is missing data.');
      console.log(`✅ Created ${config.name}:`, swarm.data.swarm.id);
  }
});
```

### Error Handling

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
      const swarm = await codebolt.swarm.createSwarm({
          name: 'Test Swarm',
          maxAgents: -1 // Invalid configuration
      });

      if (!swarm.success) {
          if (swarm.error == null) throw new Error('The response is missing error.');
          console.error('Creation failed:', swarm.error.message);
          // Handle specific error cases
          if (swarm.error.code === 'INVALID_CONFIG') {
              console.log('Please check your configuration parameters');
          }
      }
  } catch (error) {
      console.error('Unexpected error:', error);
  }
});
```
