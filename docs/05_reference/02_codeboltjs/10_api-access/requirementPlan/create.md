---
name: create
description: Create a new feature plan file.
cbbaseinfo:
  description: Create a new feature plan file.
data:
  name: create
  category: requirementPlan
  link: create.md
---

# create

```text
codebolt.featurePlan.create(fileName: string): Promise<FeaturePlanCreateResponse>
```

Create a new feature plan file

## Parameters

- `fileName` — Name for the new plan file (without .plan extension)

## Returns

Promise resolving to creation result with file path

## When to use it

Create a feature plan before adding requirements and reference sections.

## Examples

### Create Basic Plan

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new requirement plan
  const result = await codebolt.featurePlan.create('project-requirements');

  if (result.success) {
    console.log('Plan created at:', result.filePath);
    // Output: Plan created at: /path/to/project-requirements.plan
  } else {
    console.error('Failed to create plan:', result.error);
  }
});
```

### Create Multiple Plans

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create separate plans for different components
  const plans = [
    'frontend-requirements',
    'backend-requirements',
    'api-requirements',
    'database-requirements'
  ];

  for (const planName of plans) {
    const result = await codebolt.featurePlan.create(planName);

    if (result.success) {
      console.log(`✓ Created: ${planName}`);
    } else {
      console.error(`✗ Failed: ${planName} - ${result.error}`);
    }
  }
});
```

### Create and Initialize Plan

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create plan and immediately add initial sections
  async function createInitializedPlan(fileName: string, title: string, overview: string) {
    // Create the plan
    const createResult = await codebolt.featurePlan.create(fileName);

    if (!createResult.success) {
      throw new Error(`Failed to create plan: ${createResult.error}`);
    }

    const planPath = createResult.filePath!;

    // Add overview section
    await codebolt.featurePlan.addSection(
      planPath,
      {
        type: 'markdown',
        title: 'Overview',
        content: `# ${title}\n\n${overview}`
      }
    );

    console.log(`Plan created and initialized: ${planPath}`);
    return planPath;
  }

  // Usage
  const planPath = await createInitializedPlan(
    'user-auth-requirements',
    'User Authentication Requirements',
    'This document outlines the requirements for user authentication and authorization.'
  );
});
```

### Create Plan for Project Phase

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create requirement plans for each project phase
  const phases = [
    { name: 'phase1-discovery', title: 'Phase 1: Discovery' },
    { name: 'phase2-design', title: 'Phase 2: Design' },
    { name: 'phase3-development', title: 'Phase 3: Development' },
    { name: 'phase4-testing', title: 'Phase 4: Testing' }
  ];

  for (const phase of phases) {
    const result = await codebolt.featurePlan.create(phase.name);

    if (result.success) {
      // Add phase-specific sections
      await codebolt.featurePlan.addSection(
        result.filePath!,
        {
          type: 'markdown',
          title: 'Phase Overview',
          content: `# ${phase.title}\n\nRequirements for this phase...`
        }
      );

      console.log(`Created plan for ${phase.title}`);
    }
  }
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle creation errors
  const result = await codebolt.featurePlan.create('existing-plan');

  if (!result.success) {
    console.error('Creation failed');

    if (result.error) {
      if (result.error.includes('already exists')) {
        console.error('A plan with this name already exists');
        // Handle by loading existing or using a different name
      } else if (result.error.includes('invalid filename')) {
        console.error('Invalid filename format');
      } else if (result.error.includes('permission denied')) {
        console.error('No permission to create file');
      } else {
        console.error('Error:', result.error);
      }
    }
  }
});
```

### Create Plan with Metadata

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create plan and store metadata
  async function createTrackedPlan(fileName: string, metadata: any) {
    const result = await codebolt.featurePlan.create(fileName);

    if (result.success) {
      // Add metadata section
      await codebolt.featurePlan.addSection(
        result.filePath!,
        {
          type: 'markdown',
          title: 'Metadata',
          content: `
## Document Information

- Created: ${new Date().toISOString()}
- Author: ${metadata.author}
- Version: ${metadata.version}
- Status: ${metadata.status}
- Tags: ${metadata.tags?.join(', ') || 'none'}
        `.trim()
        }
      );

      return result.filePath;
    }

    throw new Error(result.error);
  }

  // Usage
  const planPath = await createTrackedPlan('api-requirements', {
    author: 'John Doe',
    version: '1.0.0',
    status: 'draft',
    tags: ['api', 'backend', 'priority']
  });
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Create requirement plans when initializing a project
async function initializeProjectRequirements(projectName: string) {
  const plans = [
    `${projectName}-overview`,
    `${projectName}-functional`,
    `${projectName}-technical`,
    `${projectName}-ui-ux`
  ];

  const createdPaths: string[] = [];

  for (const planName of plans) {
    const result = await codebolt.featurePlan.create(planName);
    if (result.success && result.filePath) {
      createdPaths.push(result.filePath);
    }
  }

  return createdPaths;
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Create a plan from template
async function createFromTemplate(templateName: string, targetName: string) {
  // Create new plan
  const result = await codebolt.featurePlan.create(targetName);

  if (result.success && result.filePath) {
    // Copy template content
    const template = await codebolt.featurePlan.get(
      `templates/${templateName}.plan`
    );

    if (template.success && template.data) {
      await codebolt.featurePlan.update(
        result.filePath,
        template.data
      );
    }

    return result.filePath;
  }

  throw new Error('Failed to create from template');
}
```
