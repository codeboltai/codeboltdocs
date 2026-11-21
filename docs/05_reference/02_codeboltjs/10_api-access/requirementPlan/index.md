---
sidebar_position: 1
title: Requirement Plan Module
---

# Requirement Plan Module

The current API is [Feature Plan](../featurePlan/index.md). Use `codebolt.featurePlan` to create or edit plans and their sections.

## When to use it

Use a feature plan to group Markdown sections and linked planning material. Add or update sections when implementation requirements change.

## Examples

### Markdown Section

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.featurePlan.addSection(
    'plans/project-requirements.plan',
    {
      type: 'markdown',
      title: 'Introduction',
      content: '# Introduction\n\nThis is the introduction...'
    }
  );
});
```

### Code Block Section

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.featurePlan.addSection(
    'plans/project-requirements.plan',
    {
      type: 'code-block',
      title: 'Example Implementation',
      content: '```typescript\nconst example = "code";\n```'
    }
  );
});
```

### Update Section Content

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update a section's content
  await codebolt.featurePlan.updateSection(
    'plans/project-requirements.plan',
    'section-123',
    {
      content: '# Updated Content\n\nThis is the new content...'
    }
  );

  // Update section title and content
  await codebolt.featurePlan.updateSection(
    'plans/project-requirements.plan',
    'section-123',
    {
      title: 'Revised Requirements',
      content: 'New content here...'
    }
  );
});
```

### Reorder Sections

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Reorder sections for better flow
  await codebolt.featurePlan.reorderSections(
    'plans/project-requirements.plan',
    ['section-001', 'section-003', 'section-002', 'section-004']
  );
});
```

### Remove Outdated Sections

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Remove a section that's no longer needed
  await codebolt.featurePlan.removeSection(
    'plans/project-requirements.plan',
    'section-old-requirements'
  );
});
```

### List and Browse Plans

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all requirement plans
  const plans = await codebolt.featurePlan.list();

  if (plans.success) {
    if (plans.plans == null) throw new Error('The response is missing plans.');
    console.log(`Found ${plans.plans.length} requirement plans:`);

    for (const plan of plans.plans) {
      console.log(`- ${plan.fileName} (${plan.filePath})`);

      // Load and display plan details
      const planDetails = await codebolt.featurePlan.get(plan.filePath);
      if (planDetails.success && planDetails.data) {
        console.log(`  Sections: ${planDetails.data.sections.length}`);
        console.log(`  Last Updated: ${planDetails.data.updatedAt}`);
      }
    }
  }
});
```

### Request Review

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Submit plan for review
  const reviewResult = await codebolt.featurePlan.review(
    'plans/project-requirements.plan'
  );

  if (reviewResult.success) {
    console.log('Plan submitted for review');
    console.log('Status:', reviewResult.status);
  }
});
```

### Section Order Management

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add section at specific position
  await codebolt.featurePlan.addSection(
    'plan.plan',
    {
      type: 'markdown',
      title: 'New Section',
      content: '...'
    },
    2  // Insert after index 2
  );

  // Reorder all sections
  await codebolt.featurePlan.reorderSections(
    'plan.plan',
    ['sec-1', 'sec-3', 'sec-2']  // New order
  );
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
    const plan = await codebolt.featurePlan.create('new-plan');

    if (plan.success) {
      console.log('Plan created:', plan.filePath);
    } else {
      console.error('Failed to create plan:', plan.error);
    }
  } catch (error) {
    console.error('Exception:', error);
  }
});
```
