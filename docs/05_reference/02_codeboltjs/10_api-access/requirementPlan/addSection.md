---
name: addSection
description: Add a section to a feature plan.
cbbaseinfo:
  description: Add a section to a feature plan.
data:
  name: addSection
  category: requirementPlan
  link: addSection.md
---

# addSection

```text
codebolt.featurePlan.addSection(filePath: string, section: Omit<FeaturePlanSection, "id" | "order">, afterIndex?: number): Promise<FeaturePlanSectionResponse>
```

Add a section to a feature plan

## Parameters

- `filePath` — Path to the plan file
- `section` — Section data to add
- `afterIndex` — Optional index to insert after (-1 for beginning)

## Returns

Promise resolving to updated document

## When to use it

Add a requirement or code example to an existing feature plan. Pick the section type that matches the content.

## Examples

### Add Markdown Section

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a markdown overview section
  const result = await codebolt.featurePlan.addSection(
    'plans/project-requirements.plan',
    {
      type: 'markdown',
      title: 'Project Overview',
      content: `
# Project Overview

This document outlines the requirements for the new project.

## Objectives
- Improve user experience
- Increase performance
- Add new features

## Scope
This project covers the frontend application and API integration.
    `.trim()
    }
  );

  if (result.success && result.document) {
    console.log('Section added successfully');
    console.log('Total sections:', result.document.sections.length);
  }
});
```

### Add Code Example Section

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add a code example section
  const result = await codebolt.featurePlan.addSection(
    'plans/api-requirements.plan',
    {
      type: 'code-block',
      title: 'Authentication Example',
      content: `
\`\`\`typescript
import { authenticate } from './auth';

// Authenticate user
const token = await authenticate({
  username: 'user@example.com',
  password: 'securepassword'
});

console.log('Token:', token);
\`\`\`
    `.trim()
    }
  );
});
```

### Add Section at Specific Position

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add section at the beginning
  await codebolt.featurePlan.addSection(
    'plan.plan',
    {
      type: 'markdown',
      title: 'Introduction',
      content: 'Welcome to the requirements...'
    },
    -1  // Insert at beginning
  );

  // Add section after index 1 (second position)
  await codebolt.featurePlan.addSection(
    'plan.plan',
    {
      type: 'markdown',
      title: 'Section 2',
      content: 'Content here...'
    },
    1  // Insert after section at index 1
  );
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle errors when adding sections
  const result = await codebolt.featurePlan.addSection(
    'nonexistent.plan',
    {
      type: 'markdown',
      title: 'Test',
      content: 'Content'
    }
  );

  if (!result.success) {
    console.error('Failed to add section');

    if (result.error) {
      if (result.error.includes('file not found')) {
        console.error('Plan file does not exist');
      } else if (result.error.includes('invalid section type')) {
        console.error('Invalid section type specified');
      } else {
        console.error('Error:', result.error);
      }
    }
  }
});
```

### Add Section and Verify

```typescript
import codebolt from '@codebolt/codeboltjs';

// Add section and verify it was added correctly
async function addAndVerifySection(
  filePath: string,
  section: any,
  afterIndex?: number
) {
  // Get current section count
  const before = await codebolt.featurePlan.get(filePath);
  const beforeCount = before.success ? before.data?.sections.length || 0 : 0;

  // Add section
  const result = await codebolt.featurePlan.addSection(
    filePath,
    section,
    afterIndex
  );

  if (result.success && result.document) {
    const afterCount = result.document.sections.length;

    if (afterCount === beforeCount + 1) {
      console.log('✓ Section added successfully');
      return result.document;
    } else {
      console.error('✗ Section count mismatch');
    }
  }

  throw new Error('Failed to add section');
}
```

### Dynamic Section Content

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Generate section content dynamically
  async function addRequirementsList(
    filePath: string,
    requirements: string[]
  ) {
    const content = requirements.map((req, index) => {
      const num = String(index + 1).padStart(3, '0');
      return `### REQ-${num}: ${req}`;
    }).join('\n\n');

    await codebolt.featurePlan.addSection(
      filePath,
      {
        type: 'markdown',
        title: 'Requirements List',
        content: `# Requirements\n\n${content}`
      }
    );
  }

  // Usage
  await addRequirementsList(
    'plans/project.plan',
    [
      'User shall be able to login',
      'User shall be able to reset password',
      'User shall be able to update profile',
      'User shall be able to logout'
    ]
  );
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add multiple code examples
  const examples = [
    { title: 'Authentication', language: 'typescript', code: '...' },
    { title: 'Database', language: 'sql', code: '...' },
    { title: 'API', language: 'javascript', code: '...' }
  ];

  for (const example of examples) {
    await codebolt.featurePlan.addSection(
      'plan.plan',
      {
        type: 'code-block',
        title: example.title,
        content: `\`\`\`${example.language}\n${example.code}\n\`\`\``
      }
    );
  }
});
```
