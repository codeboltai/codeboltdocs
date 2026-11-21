---
name: startSkill
description: Start a skill execution.
cbbaseinfo:
  description: Start a skill execution.
data:
  name: startSkill
  category: capability
  link: startSkill.md
---

# startSkill

```text
codebolt.capability.startSkill(skillName: string, params?: Record<string, any>, timeout?: number): Promise<StartCapabilityResponse>
```

Start a skill execution

## Parameters

- `skillName` — Name of the skill to execute
- `params` — Optional parameters to pass to the skill
- `timeout` — Optional execution timeout in milliseconds

## Returns

Promise resolving to execution ID

Requirements: 9.4

## When to use it

Use this method to start a skill you found in the catalog. Supply the input fields documented by that skill.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Run a skill with custom parameters
  const execution = await codebolt.capability.startSkill(
    'file-converter',
    {
      inputFile: 'document.pdf',
      outputFormat: 'docx',
      preserveFormatting: true
    }
  );

  console.log('Conversion started with ID:', execution.executionId);
});
```

## More examples

### Execute with Timeout

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Run a skill with custom timeout
  const result = await codebolt.capability.startSkill(
    'data-processor',
    {
      dataset: 'large-dataset.csv',
      operations: ['clean', 'transform', 'validate']
    },
    60000 // 60 seconds
  );

  console.log('Processing started:', result.executionId);
});
```

### Process Text with Skill

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Use a text processing skill
  const textResult = await codebolt.capability.startSkill(
    'text-summarizer',
    {
      text: 'Long text content to summarize...',
      maxLength: 200,
      style: 'concise'
    }
  );

  if (textResult.success) {
    console.log('Summary:', textResult.result);
  }
});
```

### Image Processing Workflow

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Chain multiple skills for image processing
  const workflow = async (imagePath: string) => {
    // Step 1: Resize image
    const resize = await codebolt.capability.startSkill(
      'image-resizer',
      {
        input: imagePath,
        width: 800,
        height: 600,
        maintainAspectRatio: true
      }
    );

    if (!resize.success) {
      throw new Error('Resize failed');
    }

    // Step 2: Apply filters
    const filter = await codebolt.capability.startSkill(
      'image-filter',
      {
        input: resize.result?.outputPath,
        filter: 'grayscale',
        intensity: 0.8
      }
    );

    if (!filter.success) {
      throw new Error('Filter failed');
    }

    // Step 3: Optimize
    const optimize = await codebolt.capability.startSkill(
      'image-optimizer',
      {
        input: filter.result?.outputPath,
        quality: 85,
        format: 'webp'
      }
    );

    return optimize;
  };

  const result = await workflow('input.jpg');
  console.log('Workflow completed:', result.executionId);
});
```

### Data Validation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const validateData = async (data: any) => {
    const result = await codebolt.capability.startSkill(
      'json-validator',
      {
        data: JSON.stringify(data),
        schema: 'user-schema'
      }
    );

    return result.success && result.result?.valid === true;
  };

  const isValid = await validateData({ name: 'John', age: 30 });
  console.log('Data valid:', isValid);
});
```

### Format Conversion

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const convertFormat = async (input: string, fromFormat: string, toFormat: string) => {
    const result = await codebolt.capability.startSkill(
      'format-converter',
      {
        input,
        fromFormat,
        toFormat,
        preserveStructure: true
      }
    );

    if (result.success) {
      return result.result?.output;
    } else {
      throw new Error(result.error);
    }
  };

  const json = await convertFormat('data.xml', 'xml', 'json');
  console.log('Converted data:', json);
});
```

### Content Analysis

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const analyzeContent = async (content: string) => {
    const sentiment = await codebolt.capability.startSkill(
      'sentiment-analyzer',
      { text: content }
    );

    const keywords = await codebolt.capability.startSkill(
      'keyword-extractor',
      { text: content, limit: 10 }
    );

    return {
      sentiment: sentiment.result?.score,
      keywords: keywords.result?.keywords
    };
  };

  const analysis = await analyzeContent('Great product, highly recommended!');
  console.log('Analysis:', analysis);
});
```

### File Operations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const processFile = async (filePath: string) => {
    // Get file info
    const info = await codebolt.capability.startSkill(
      'file-info',
      { path: filePath }
    );

    console.log('File info:', info.result);

    // Extract metadata
    const metadata = await codebolt.capability.startSkill(
      'metadata-extractor',
      { file: filePath }
    );

    console.log('Metadata:', metadata.result);

    return { info: info.result, metadata: metadata.result };
  };
});
```
