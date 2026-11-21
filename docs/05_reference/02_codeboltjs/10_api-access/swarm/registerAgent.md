---
name: registerAgent
description: Register an agent to a swarm.
cbbaseinfo:
  description: Register an agent to a swarm.
data:
  name: registerAgent
  category: swarm
  link: registerAgent.md
---

# registerAgent

```text
codebolt.swarm.registerAgent(swarmId: string, data: AgentRegistration): Promise<RegisterAgentResponse>
```

Register an agent to a swarm

## Parameters

- `swarmId` — ID of the swarm
- `data` — Agent registration data

## Returns

Promise resolving to registered agent ID

## When to use it

Add an agent to a swarm before assigning it a role or including it in coordination.

## Examples

### Register Basic Internal Agent

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Register a simple internal agent
  const result = await codebolt.swarm.registerAgent('swarm-123', {
      name: 'Code Assistant',
      capabilities: ['code_generation', 'debugging'],
      agentType: 'internal'
  });

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('✅ Agent registered:', result.data.agentId);
      console.log('Swarm ID:', result.data.swarmId);
  } else {
      console.error('❌ Registration failed:', result.error);
  }
});
```

### Register External Agent with Connection Info

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Register an external agent with connection details
  const result = await codebolt.swarm.registerAgent('swarm-123', {
      name: 'External Analyzer',
      capabilities: ['data_analysis', 'reporting'],
      agentType: 'external',
      connectionInfo: {
          endpoint: 'wss://external-service.example.com/agent',
          protocol: 'websocket'
      },
      metadata: {
          version: '2.0.0',
          provider: 'External Service Inc',
          region: 'us-east-1'
      }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('External agent registered:', result.data.agentId);
});
```

### Register Agent with Custom ID

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Register agent with a specific ID
  const result = await codebolt.swarm.registerAgent('swarm-123', {
      agentId: 'custom-agent-456',
      name: 'Specialized Agent',
      capabilities: ['specialized_task'],
      agentType: 'internal'
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Agent registered with custom ID:', result.data.agentId);
});
```

### Comprehensive Agent Registration

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Register a fully configured agent
  const result = await codebolt.swarm.registerAgent('swarm-123', {
      agentId: 'agent-full-config-001',
      name: 'Full Stack Developer',
      capabilities: [
          'frontend',
          'backend',
          'database',
          'testing',
          'deployment'
      ],
      agentType: 'internal',
      metadata: {
          experience: 'senior',
          languages: ['JavaScript', 'Python', 'Go'],
          certifications: ['AWS', 'Kubernetes'],
          maxConcurrentTasks: 5,
          responseTime: 'fast',
          availability: '24/7'
      }
  });

  if (result.success) {
      console.log('Agent Configuration:');
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('- ID:', result.data.agentId);
      console.log('- Name:', result.data.swarmId);
      console.log('- Status: Registered and Ready');
  }
});
```
