---
name: startCapability
description: Start a capability execution.
cbbaseinfo:
  description: Start a capability execution.
data:
  name: startCapability
  category: capability
  link: startCapability.md
---

# startCapability

```text
codebolt.capability.startCapability(capabilityName: string, capabilityType: CapabilityType, params?: Record<string, any>, optionsOrTimeout?: number | StartCapabilityOptions): Promise<StartCapabilityResponse>
```

Start a capability execution

## Parameters

- `capabilityName` — Name of the capability to execute
- `capabilityType` — Type of the capability (skill, power, talent, etc.)
- `params` — Optional parameters to pass to the capability

## Returns

Promise resolving to execution ID

Requirements: 9.4

## When to use it

Run a selected capability with its declared inputs. Keep the returned execution ID if you need to inspect or stop the run.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start a long-running capability with extended timeout
  const result = await codebolt.capability.startCapability(
    'video-processor',
    'power',
    {
      inputFile: 'video.mp4',
      outputFormat: 'webm',
      quality: 'high'
    },
    300000 // 5 minutes in milliseconds
  );

  console.log('Video processing started:', result.executionId);
});
```

## More examples

### Execute with Parameters

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute with custom parameters
  const execution = await codebolt.capability.startCapability(
    'image-resizer',
    'skill',
    {
      inputFile: 'image.png',
      width: 800,
      height: 600,
      quality: 90,
      format: 'jpeg'
    }
  );

  console.log('Processing image with ID:', execution.executionId);
});
```

### Data Processing Pipeline

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const runDataPipeline = async (inputFile: string) => {
    // Step 1: Validate input
    const validation = await codebolt.capability.startCapability(
      'data-validator',
      'skill',
      { inputFile }
    );

    if (!validation.success) {
      throw new Error('Validation failed');
    }

    // Step 2: Transform data
    const transform = await codebolt.capability.startCapability(
      'data-transformer',
      'skill',
      { inputFile, outputFormat: 'json' }
    );

    // Step 3: Analyze results
    const analysis = await codebolt.capability.startCapability(
      'data-analyzer',
      'power',
      { source: transform.executionId }
    );

    return analysis;
  };
});
```

### Conditional Execution

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const smartProcessor = async (file: string) => {
    // Check file type
    const typeCheck = await codebolt.capability.startCapability(
      'file-type-detector',
      'skill',
      { file }
    );

    const fileType = typeCheck.result?.type;

    // Choose appropriate processor
    if (fileType === 'image') {
      return await codebolt.capability.startCapability(
        'image-processor',
        'skill',
        { file }
      );
    } else if (fileType === 'document') {
      return await codebolt.capability.startCapability(
        'document-processor',
        'skill',
        { file }
      );
    } else {
      throw new Error('Unsupported file type');
    }
  };
});
```
