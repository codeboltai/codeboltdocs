---
name: createFeature
description: Create a new feature in a phase.
cbbaseinfo:
  description: Create a new feature in a phase.
data:
  name: createFeature
  category: roadmap
  link: createFeature.md
---

# createFeature

```text
codebolt.roadmap.createFeature(phaseId: string, data: CreateFeatureData, projectPath?: string): Promise<RoadmapFeatureResponse>
```

Create a new feature in a phase

## When to use it

Track a feature in the appropriate roadmap phase or backlog.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature already in progress
  const result = await codebolt.roadmap.createFeature('phase_001', {
    title: 'API Documentation',
    description: 'Generate API documentation from code',
    impact: 'medium',
    difficulty: 'easy',
    status: 'in-progress',
    tags: ['documentation', 'api']
  });

  console.log('Feature created with in-progress status');
});
```

## More examples

### Create Basic Feature

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple feature
  const result = await codebolt.roadmap.createFeature('phase_001', {
    title: 'User Login',
    description: 'Allow users to login with email and password'
  });

  console.log('Feature created:', result.feature.id);
  console.log('Title:', result.feature.title);
  console.log('Status:', result.feature.status); // 'pending'
});
```

### Create Feature with Impact and Difficulty

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature with impact and difficulty ratings
  const result = await codebolt.roadmap.createFeature('phase_001', {
    title: 'Payment Processing',
    description: 'Integrate Stripe for credit card payments',
    impact: 'critical',
    difficulty: 'hard',
    priority: 1,
    category: 'payments'
  });

  console.log('High-priority critical feature created');
});
```

### Create Feature with Tags

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature with tags for categorization
  const result = await codebolt.roadmap.createFeature('phase_001', {
    title: 'Search Functionality',
    description: 'Full-text search across all content',
    impact: 'high',
    difficulty: 'medium',
    priority: 5,
    tags: ['search', 'elastic', 'backend', 'api'],
    category: 'Core Features'
  });

  console.log('Feature with tags created');
});
```

### Create Feature with Creator Info

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature with creator attribution
  const result = await codebolt.roadmap.createFeature('phase_002', {
    title: 'User Dashboard',
    description: 'Personalized dashboard for users',
    impact: 'high',
    difficulty: 'medium',
    createdBy: {
      id: 'user_123',
      name: 'John Doe',
      type: 'user'
    }
  });

  console.log('Feature created with creator info');
});
```

### Create Feature for Specific Project

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create feature in specific project
  const result = await codebolt.roadmap.createFeature(
    'phase_001',
    {
      title: 'Database Migration',
      description: 'Migrate to PostgreSQL',
      impact: 'critical',
      difficulty: 'very-hard'
    },
    '/path/to/project'
  );

  console.log('Feature created for specific project');
});
```

### Create Feature with Full Details

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create comprehensive feature
  const result = await codebolt.roadmap.createFeature('phase_002', {
    title: 'Real-time Notifications',
    description: `
Implement real-time push notifications using WebSockets.

## Requirements
- Support for desktop and mobile browsers
- Configurable notification types
- User preferences management
- Delivery status tracking

## Technical Approach
- Use WebSocket for real-time communication
- Implement service workers for push notifications
- Store notification preferences in database
  `.trim(),
    impact: 'high',
    difficulty: 'hard',
    priority: 3,
    category: 'User Engagement',
    tags: ['websocket', 'notifications', 'real-time', 'frontend'],
    status: 'pending',
    createdBy: {
      id: 'agent_fe_001',
      name: 'Frontend Agent',
      type: 'agent'
    }
  });

  console.log('Comprehensive feature created');
});
```

### Batch Feature Creation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create multiple features for a phase
  async function populatePhaseWithFeatures(phaseId: string, featureList: any[]) {
    const created = [];

    for (const featureData of featureList) {
      const result = await codebolt.roadmap.createFeature(phaseId, featureData);

      if (result.feature) {
        created.push(result.feature);
        console.log(`✓ Created: ${featureData.title}`);
      }
    }

    console.log(`Created ${created.length} features`);
    return created;
  }

  // Usage
  const features = [
    { title: 'Auth', impact: 'critical', difficulty: 'medium' },
    { title: 'Database', impact: 'critical', difficulty: 'hard' },
    { title: 'API', impact: 'high', difficulty: 'medium' }
  ];

  await populatePhaseWithFeatures('phase_001', features);
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Add items to backlog phase
async function addToBacklog(title: string, priority: number) {
  const phases = await codebolt.roadmap.getPhases();
  const backlog = phases.phases.find(p => p.name === 'Backlog');

  if (backlog) {
    await codebolt.roadmap.createFeature(backlog.id, {
      title,
      priority,
      status: 'pending'
    });
  }
}
```
