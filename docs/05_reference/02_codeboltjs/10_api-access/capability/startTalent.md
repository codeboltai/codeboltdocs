---
name: startTalent
description: Start a talent execution.
cbbaseinfo:
  description: Start a talent execution.
data:
  name: startTalent
  category: capability
  link: startTalent.md
---

# startTalent

```text
codebolt.capability.startTalent(talentName: string, params?: Record<string, any>, timeout?: number): Promise<StartCapabilityResponse>
```

Start a talent execution

## Parameters

- `talentName` — Name of the talent to execute
- `params` — Optional parameters to pass to the talent
- `timeout` — Optional execution timeout in milliseconds

## Returns

Promise resolving to execution ID

Requirements: 9.4

## When to use it

Start a specific talent after checking that its declared inputs and output suit the task.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Use industry-specific talents
  const legalAnalysis = await codebolt.capability.startTalent('legal-analyzer', {
    document: 'contract.pdf'
  });

  const medicalAnalysis = await codebolt.capability.startTalent('medical-analyzer', {
    records: 'patient-data.json'
  });
});
```

## More examples

### Execute a Talent

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.capability.startTalent('code-reviewer', {
    repository: 'https://github.com/user/repo',
    branch: 'main'
  });

  if (result.success) {
    console.log('Talent execution started:', result.executionId);
  }
});
```

### Specialized Domain Processing

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const analysis = await codebolt.capability.startTalent(
    'financial-analyzer',
    {
      data: 'financial-data.json',
      reportType: 'detailed',
      includeCharts: true
    },
    45000
  );

  console.log('Financial analysis started:', analysis.executionId);
});
```

### Domain-Specific Workflow

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Legal document analysis
  const legalReview = await codebolt.capability.startTalent('legal-doc-analyzer', {
    document: 'contract.pdf',
    jurisdiction: 'US',
    checkClauses: ['liability', 'termination', 'confidentiality']
  });

  // Medical text processing
  const medicalExtract = await codebolt.capability.startTalent('medical-entity-extractor', {
    text: 'Patient medical record text...',
    extractEntities: ['diagnoses', 'medications', 'procedures']
  });
});
```
