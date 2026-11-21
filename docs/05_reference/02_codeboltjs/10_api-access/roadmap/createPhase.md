---
name: createPhase
description: Create a new phase in the roadmap.
cbbaseinfo:
  description: Create a new phase in the roadmap.
data:
  name: createPhase
  category: roadmap
  link: createPhase.md
---

# createPhase

```text
codebolt.roadmap.createPhase(data: CreatePhaseData, projectPath?: string): Promise<RoadmapPhaseResponse>
```

Create a new phase in the roadmap

## When to use it

Create a named planning phase for a milestone or release.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create phase with just a name
  const result = await codebolt.roadmap.createPhase({
    name: 'Backlog'
  });

  console.log('Backlog phase created');
});
```

## More examples

### Create Basic Phase

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new phase
  const result = await codebolt.roadmap.createPhase({
    name: 'Phase 1: Foundation',
    description: 'Core infrastructure and setup'
  });

  console.log('Phase created:', result.phase.id);
  console.log('Name:', result.phase.name);
  console.log('Order:', result.phase.order);
});
```

### Create Multiple Phases

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create project phases in order
  const phases = [
    { name: 'Discovery', description: 'Research and planning' },
    { name: 'Design', description: 'Architecture and UI/UX design' },
    { name: 'Development', description: 'Core implementation' },
    { name: 'Testing', description: 'QA and bug fixes' },
    { name: 'Launch', description: 'Deployment and release' }
  ];

  for (let i = 0; i < phases.length; i++) {
    const result = await codebolt.roadmap.createPhase({
      name: phases[i].name,
      description: phases[i].description,
      order: i + 1
    });

    console.log(`✓ Created: ${result.phase.name}`);
  }
});
```

### Create Phase for Specific Project

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create phase in a specific project
  const result = await codebolt.roadmap.createPhase({
    name: 'Q1 2026 Sprint',
    description: 'Features planned for Q1'
  }, '/path/to/project');

  console.log('Phase created for project');
});
```

### Create Phase with Explicit Order

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Insert phase at specific position
  const result = await codebolt.roadmap.createPhase({
    name: 'Phase 2.5: Additional Features',
    description: 'Extra features added to scope',
    order: 3  // Will be inserted as the 3rd phase
  });
});
```

### Create Phase and Add Features

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create phase and immediately add features
  const phase = await codebolt.roadmap.createPhase({
    name: 'Authentication',
    description: 'User authentication and authorization'
  });

  // Add features to the phase
  await codebolt.roadmap.createFeature(phase.phase.id, {
    title: 'User Registration',
    description: 'Allow users to register with email',
    impact: 'high',
    difficulty: 'easy'
  });

  await codebolt.roadmap.createFeature(phase.phase.id, {
    title: 'User Login',
    description: 'Login with email and password',
    impact: 'high',
    difficulty: 'easy'
  });

  await codebolt.roadmap.createFeature(phase.phase.id, {
    title: 'Password Reset',
    description: 'Forgot password flow',
    impact: 'medium',
    difficulty: 'medium'
  });

  console.log('Phase created with 3 features');
});
```

### Create Phase for Time-Based Planning

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create time-based phases
  const quarters = [
    { name: 'Q1 2026', order: 1 },
    { name: 'Q2 2026', order: 2 },
    { name: 'Q3 2026', order: 3 },
    { name: 'Q4 2026', order: 4 }
  ];

  for (const quarter of quarters) {
    await codebolt.roadmap.createPhase({
      name: quarter.name,
      description: `Features planned for ${quarter.name}`,
      order: quarter.order
    });

    console.log(`Created ${quarter.name} phase`);
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Initialize project with standard phases
async function initializeProjectPhases(projectPath: string) {
  const standardPhases = [
    'Planning',
    'Design',
    'Development',
    'Testing',
    'Deployment'
  ];

  for (let i = 0; i < standardPhases.length; i++) {
    await codebolt.roadmap.createPhase({
      name: standardPhases[i],
      order: i + 1
    }, projectPath);
  }
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Create phases for sprints
async function createSprintPhases(numSprints: number) {
  for (let i = 1; i <= numSprints; i++) {
    await codebolt.roadmap.createPhase({
      name: `Sprint ${i}`,
      description: `2-week sprint ${i}`,
      order: i
    });
  }
}
```
