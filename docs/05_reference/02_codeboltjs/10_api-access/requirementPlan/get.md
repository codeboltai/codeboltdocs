---
name: get
description: Get a feature plan by file path.
cbbaseinfo:
  description: Get a feature plan by file path.
data:
  name: get
  category: requirementPlan
  link: get.md
---

# get

```text
codebolt.featurePlan.get(filePath: string): Promise<FeaturePlanGetResponse>
```

Get a feature plan by file path

## Parameters

- `filePath` — Path to the plan file

## Returns

Promise resolving to the plan document

## When to use it

Read a feature plan by path before displaying its sections or updating its content.

## Examples

### Basic Retrieval

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get a requirement plan
  const result = await codebolt.featurePlan.get('plans/project-requirements.plan');

  if (result.success && result.data) {
    const plan = result.data;
    console.log('Title:', plan.title);
    console.log('Version:', plan.version);
    console.log('Sections:', plan.sections.length);
  }
});
```

### Display Plan Details

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve and display plan information
  const result = await codebolt.featurePlan.get('plans/api-requirements.plan');

  if (result.success && result.data) {
    const plan = result.data;

    console.log('=== Requirement Plan ===');
    console.log('Title:', plan.title);
    console.log('Version:', plan.version);

    if (plan.description) {
      console.log('Description:', plan.description);
    }

    console.log('Created:', new Date(plan.createdAt).toLocaleString());
    console.log('Updated:', new Date(plan.updatedAt).toLocaleString());
    console.log('\nSections:');

    plan.sections.forEach((section, index) => {
      console.log(`${index + 1}. ${section.title || 'Untitled'} (${section.type})`);
    });
  }
});
```

### Find Specific Section

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get plan and find a specific section
  const result = await codebolt.featurePlan.get('plans/project.plan');

  if (result.success && result.data) {
    const overviewSection = result.data.sections.find(
      section => section.title === 'Overview'
    );

    if (overviewSection) {
      console.log('Found Overview section:');
      console.log(overviewSection.content);
    } else {
      console.log('Overview section not found');
    }
  }
});
```

### Get and Transform Plan

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get plan and transform for display
  const result = await codebolt.featurePlan.get('plans/project.plan');

  if (result.success && result.data) {
    const displayData = {
      title: result.data.title,
      sectionCount: result.data.sections.length,
      sections: result.data.sections.map(section => ({
        title: section.title || 'Untitled',
        type: section.type,
        hasContent: !!section.content,
        hasLink: !!section.linkedFile
      }))
    };

    console.log(JSON.stringify(displayData, null, 2));
  }
});
```

### Get and Export Plan

```typescript
import codebolt from '@codebolt/codeboltjs';

// Get plan and export as JSON
async function exportPlan(filePath: string) {
  const result = await codebolt.featurePlan.get(filePath);

  if (result.success && result.data) {
    const exported = {
      meta: {
        title: result.data.title,
        version: result.data.version,
        exportedAt: new Date().toISOString()
      },
      sections: result.data.sections.map(section => ({
        id: section.id,
        title: section.title,
        type: section.type,
        content: section.content,
        linkedFile: section.linkedFile,
        order: section.order
      }))
    };

    return JSON.stringify(exported, null, 2);
  }

  throw new Error('Failed to export plan');
}
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle retrieval errors
  const result = await codebolt.featurePlan.get('nonexistent.plan');

  if (!result.success) {
    console.error('Failed to get plan');

    if (result.error) {
      if (result.error.includes('file not found')) {
        console.error('Plan file does not exist');
      } else if (result.error.includes('invalid format')) {
        console.error('Plan file is corrupted or invalid');
      } else if (result.error.includes('access denied')) {
        console.error('No permission to read file');
      } else {
        console.error('Error:', result.error);
      }
    }
  }
});
```

### Get with Retry

```typescript
import codebolt from '@codebolt/codeboltjs';

// Get plan with retry logic
async function getPlanWithRetry(filePath: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const result = await codebolt.featurePlan.get(filePath);

    if (result.success) {
      return result.data;
    }

    // Wait before retrying
    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw new Error('Failed to get plan after retries');
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Generate table of contents
async function generateTOC(filePath: string) {
  const result = await codebolt.featurePlan.get(filePath);

  if (result.success && result.data) {
    console.log(`# Table of Contents: ${result.data.title}\n`);

    result.data.sections.forEach((section, index) => {
      const indent = '  '.repeat(Math.floor(index / 10));
      console.log(`${indent}${index + 1}. ${section.title || 'Untitled'}`);
      console.log(`${indent}   [${section.type}]\n`);
    });
  }
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Check if linked files exist
async function validateLinks(filePath: string) {
  const result = await codebolt.featurePlan.get(filePath);

  if (result.success && result.data) {
    const linkSections = result.data.sections.filter(s =>
      ['specs-link', 'actionplan-link', 'uiflow-link'].includes(s.type)
    );

    console.log(`Checking ${linkSections.length} linked files...`);

    for (const section of linkSections) {
      if (section.linkedFile) {
        // Check if file exists (implementation depends on your file system access)
        console.log(`Checking: ${section.linkedFile}`);
      }
    }
  }
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Calculate plan statistics
async function getPlanStats(filePath: string) {
  const result = await codebolt.featurePlan.get(filePath);

  if (result.success && result.data) {
    const stats = {
      totalSections: result.data.sections.length,
      byType: {} as Record<string, number>,
      withContent: 0,
      withLinks: 0
    };

    for (const section of result.data.sections) {
      stats.byType[section.type] = (stats.byType[section.type] || 0) + 1;
      if (section.content) stats.withContent++;
      if (section.linkedFile) stats.withLinks++;
    }

    return stats;
  }
}
```
