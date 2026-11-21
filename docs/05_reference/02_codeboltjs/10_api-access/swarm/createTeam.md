---
name: createTeam
description: Create a new team in a swarm.
cbbaseinfo:
  description: Create a new team in a swarm.
data:
  name: createTeam
  category: swarm
  link: createTeam.md
---

# createTeam

```text
codebolt.swarm.createTeam(swarmId: string, data: CreateTeamRequest): Promise<CreateTeamResponse>
```

Create a new team in a swarm

## Parameters

- `swarmId` — ID of the swarm
- `data` — Team creation data

## Returns

Promise resolving to created team details

## When to use it

Group agents around a responsibility such as documentation or testing within an existing swarm.

## Examples

### Create Basic Team

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple team
  const result = await codebolt.swarm.createTeam('swarm-123', {
      name: 'Frontend Developers',
      createdBy: 'admin-agent-001'
  });

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('✅ Team created:', result.data.team);
      console.log('Team ID:', result.data.team.id);
      console.log('Member Count:', result.data.team.memberCount);
  } else {
      console.error('❌ Team creation failed:', result.error);
  }
});
```

### Create Team with Full Configuration

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a fully configured team
  const result = await codebolt.swarm.createTeam('swarm-123', {
      name: 'Quality Assurance Team',
      description: 'Responsible for all testing and quality assurance activities',
      maxMembers: 10,
      createdBy: 'manager-001',
      metadata: {
          department: 'QA',
          budget: '50000',
          tools: ['Jest', 'Cypress', 'Selenium'],
          priority: 'high'
      }
  });

  console.log('Team Configuration:');
  if (result.data == null) throw new Error('The response is missing data.');
  console.log('- Name:', result.data.team.name);
  console.log('- Description:', result.data.team.description);
  console.log('- Max Members:', result.data.team.maxMembers);
  console.log('- Created:', result.data.team.createdAt);
});
```

### Create Multiple Teams

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Define team structure
  const teamConfigs = [
      {
          name: 'Frontend Team',
          description: 'UI/UX and frontend development',
          maxMembers: 8,
          createdBy: 'admin-001'
      },
      {
          name: 'Backend Team',
          description: 'Server-side logic and APIs',
          maxMembers: 6,
          createdBy: 'admin-001'
      },
      {
          name: 'DevOps Team',
          description: 'Infrastructure and deployment',
          maxMembers: 4,
          createdBy: 'admin-001'
      },
      {
          name: 'Design Team',
          description: 'Product design and user experience',
          maxMembers: 5,
          createdBy: 'admin-001'
      }
  ];

  // Create all teams
  const swarmId = 'swarm-123';
  const teams = [];

  for (const config of teamConfigs) {
      const result = await codebolt.swarm.createTeam(swarmId, config);
      if (result.success) {
          if (result.data == null) throw new Error('The response is missing data.');
          teams.push(result.data.team);
          if (result.data == null) throw new Error('The response is missing data.');
          console.log(`✅ Created ${config.name}:`, result.data.team.id);
      }
  }

  console.log(`Successfully created ${teams.length} teams`);
});
```

### Create Specialized Teams by Function

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create functionally specialized teams
  const functions = [
      {
          name: 'Research & Development',
          description: 'Explores new technologies and approaches',
          maxMembers: 12,
          metadata: { innovation: true, experimental: true }
      },
      {
          name: 'Production Support',
          description: 'Maintains production systems',
          maxMembers: 8,
          metadata: { critical: true, oncall: true }
      },
      {
          name: 'Security Team',
          description: 'Security audits and vulnerability management',
          maxMembers: 6,
          metadata: { security: true, compliance: true }
      }
  ];

  const swarmId = 'swarm-123';

  for (const func of functions) {
      const result = await codebolt.swarm.createTeam(swarmId, {
          ...func,
          createdBy: 'security-admin-001'
      });

      if (result.success) {
          console.log(`✅ Created ${func.name} team`);
      }
  }
});
```
