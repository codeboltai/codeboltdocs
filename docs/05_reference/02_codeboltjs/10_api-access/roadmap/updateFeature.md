---
name: updateFeature
description: Update an existing feature.
cbbaseinfo:
  description: Update an existing feature.
data:
  name: updateFeature
  category: roadmap
  link: updateFeature.md
---

# updateFeature

```text
codebolt.roadmap.updateFeature(featureId: string, data: UpdateFeatureData, projectPath?: string): Promise<RoadmapFeatureResponse>
```

Update an existing feature

## When to use it

Update roadmap metadata when a feature's priority, status, or plan changes.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Change feature priority
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    priority: 5
  });

  console.log('Priority updated to:', result.feature.priority);
});
```

## More examples

### Update Feature Status

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update feature status to in-progress
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    status: 'in-progress'
  });

  console.log('Feature status updated:', result.feature.status);
});
```

### Update Multiple Fields

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update multiple feature properties
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    title: 'User Authentication & Authorization',
    description: 'Updated: Added OAuth2 support and role-based access control',
    impact: 'critical',
    priority: 1
  });

  console.log('Feature updated');
});
```

### Mark Feature as Complete

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Mark feature as completed
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    status: 'completed'
  });

  console.log('Feature completed!');
  console.log('Updated at:', result.feature.updatedAt);
});
```

### Add Tags to Feature

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add tags to existing feature
  const currentFeature = await codebolt.roadmap.getFeatures('phase_001');
  const feature = currentFeature.features.find(f => f.id === 'feat_001');

  if (feature == null) throw new Error('The response is missing feature.');
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    tags: [...(feature.tags || []), 'urgent', 'backend']
  });

  console.log('Tags updated:', result.feature.tags);
});
```

### Update Feature During Development

```typescript
import codebolt from '@codebolt/codeboltjs';

// Progressively update feature as work progresses
async function updateFeatureProgress(featureId: string) {
  // Start work
  await codebolt.roadmap.updateFeature(featureId, {
    status: 'in-progress'
  });

  // Work on feature...

  // Complete feature
  await codebolt.roadmap.updateFeature(featureId, {
    status: 'completed'
  });

  console.log('Feature workflow complete');
}
```

### Update Impact Assessment

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Reassess and update impact
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    impact: 'high',
    difficulty: 'medium'
  });

  console.log('Impact and difficulty updated');
});
```

### Update Feature Description

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update with more detailed description
  const result = await codebolt.roadmap.updateFeature('feat_001', {
    description: `
## User Authentication

Implement secure user authentication with:
- Email/password registration and login
- OAuth2 integration (Google, GitHub)
- Password reset via email
- Session management
- Remember me functionality
- Multi-factor authentication (optional)

## Security Considerations
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CSRF protection
- Secure session storage
  `.trim()
  });

  console.log('Description updated with details');
});
```

### Batch Update Features

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update multiple features in a phase
  async function batchUpdateFeatures(featureIds: string[], updates: any) {
    for (const id of featureIds) {
      await codebolt.roadmap.updateFeature(id, updates);
      console.log(`✓ Updated: ${id}`);
    }
  }

  // Usage - mark all phase features as in-progress
  const phaseFeatures = await codebolt.roadmap.getFeatures('phase_001');
  const featureIds = phaseFeatures.features.map(f => f.id);

  await batchUpdateFeatures(featureIds, { status: 'in-progress' });
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Standard feature workflow
async function featureWorkflow(featureId: string) {
  // Pending -> In Progress
  await codebolt.roadmap.updateFeature(featureId, {
    status: 'in-progress'
  });

  // Work on feature...

  // In Progress -> Completed
  await codebolt.roadmap.updateFeature(featureId, {
    status: 'completed'
  });
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Rebalance priorities based on changes
async function reprioritizeFeatures(featureIds: string[]) {
  for (let i = 0; i < featureIds.length; i++) {
    await codebolt.roadmap.updateFeature(featureIds[i], {
      priority: i + 1
    });
  }
}
```
