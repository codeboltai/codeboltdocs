---
name: createRole
description: Create a new role in a swarm.
cbbaseinfo:
  description: Create a new role in a swarm.
data:
  name: createRole
  category: swarm
  link: createRole.md
---

# createRole

```text
codebolt.swarm.createRole(swarmId: string, data: CreateRoleRequest): Promise<CreateRoleResponse>
```

Create a new role in a swarm

## Parameters

- `swarmId` — ID of the swarm
- `data` — Role creation data

## Returns

Promise resolving to created role details

## When to use it

Define a responsibility to assign to agents in the swarm.

## Examples

### Create Basic Role

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple role
  const result = await codebolt.swarm.createRole('swarm-123', {
      name: 'Developer',
      createdBy: 'admin-001'
  });

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('✅ Role created:', result.data.role);
      console.log('Role ID:', result.data.role.id);
      console.log('Assignees:', result.data.role.assigneeCount);
  } else {
      console.error('❌ Role creation failed:', result.error);
  }
});
```

### Create Role with Permissions

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a role with specific permissions
  const result = await codebolt.swarm.createRole('swarm-123', {
      name: 'Senior Developer',
      description: 'Experienced developer with additional permissions',
      permissions: [
          'code.write',
          'code.review',
          'code.deploy',
          'team.lead',
          'decision.make'
      ],
      maxAssignees: 5,
      createdBy: 'admin-001'
  });

  console.log('Role Configuration:');
  if (result.data == null) throw new Error('The response is missing data.');
  console.log('- Name:', result.data.role.name);
  console.log('- Permissions:', result.data.role.permissions);
  console.log('- Max Assignees:', result.data.role.maxAssignees);
});
```

### Create Hierarchical Roles

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Define role hierarchy
  const roles = [
      {
          name: 'Junior Developer',
          description: 'Entry-level developer role',
          permissions: ['code.read', 'task.view'],
          maxAssignees: 10
      },
      {
          name: 'Developer',
          description: 'Standard developer role',
          permissions: ['code.read', 'code.write', 'task.view', 'task.update'],
          maxAssignees: 8
      },
      {
          name: 'Senior Developer',
          description: 'Experienced developer with leadership',
          permissions: ['code.read', 'code.write', 'code.review', 'team.lead'],
          maxAssignees: 5
      },
      {
          name: 'Tech Lead',
          description: 'Technical leadership role',
          permissions: ['code.*', 'team.*', 'deploy.*'],
          maxAssignees: 2
      }
  ];

  const swarmId = 'swarm-123';

  for (const roleConfig of roles) {
      const result = await codebolt.swarm.createRole(swarmId, {
          ...roleConfig,
          createdBy: 'admin-001'
      });

      if (result.success) {
          console.log(`✅ Created ${roleConfig.name} role`);
      }
  }
});
```

### Create Specialized Roles

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create specialized functional roles
  const specializations = [
      {
          name: 'Security Auditor',
          description: 'Responsible for security reviews and audits',
          permissions: ['security.scan', 'security.audit', 'report.generate'],
          maxAssignees: 3,
          metadata: { category: 'security', certification: 'CISSP' }
      },
      {
          name: 'Performance Optimizer',
          description: 'Focuses on performance optimization',
          permissions: ['performance.analyze', 'performance.optimize', 'metrics.view'],
          maxAssignees: 4,
          metadata: { category: 'performance' }
      },
      {
          name: 'Documentation Writer',
          description: 'Creates and maintains documentation',
          permissions: ['docs.write', 'docs.publish', 'docs.review'],
          maxAssignees: 6,
          metadata: { category: 'documentation' }
      }
  ];

  const swarmId = 'swarm-123';

  for (const spec of specializations) {
      const result = await codebolt.swarm.createRole(swarmId, {
          ...spec,
          createdBy: 'admin-001'
      });

      if (result.success) {
          console.log(`✅ Created ${spec.name} role`);
      }
  }
});
```
