---
name: getCapabilityDetail
description: Get detailed information about a specific capability.
cbbaseinfo:
  description: Get detailed information about a specific capability.
data:
  name: getCapabilityDetail
  category: capability
  link: getCapabilityDetail.md
---

# getCapabilityDetail

```text
codebolt.capability.getCapabilityDetail(capabilityName: string, capabilityType?: CapabilityType): Promise<GetCapabilityDetailResponse>
```

Get detailed information about a specific capability

## Parameters

- `capabilityName` — Name of the capability
- `capabilityType` — Optional type to narrow search

## Returns

Promise resolving to capability details

Requirements: 9.2

## When to use it

Read the input and output declarations before building a call or showing a capability configuration form.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get details to understand what the capability returns
  const result = await codebolt.capability.getCapabilityDetail('csv-analyzer', 'skill');

  if (result.capability?.metadata?.outputs) {
    console.log('Output Structure:');
    result.capability.metadata.outputs.forEach(output => {
      console.log(`- ${output.name} (${output.type}): ${output.description || 'No description'}`);
    });

    // Prepare output parsing logic
    const outputTypes = result.capability.metadata.outputs.map(o => o.type);
    console.log('Expected output types:', outputTypes);
  }
});
```

## More examples

### Inspect Input Parameters

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get capability details to understand required parameters
  const detail = await codebolt.capability.getCapabilityDetail('image-resizer', 'skill');

  if (detail.capability?.metadata?.inputs) {
    console.log('Required Parameters:');
    detail.capability.metadata.inputs
      .filter(input => input.required)
      .forEach(input => {
        console.log(`- ${input.name} (${input.type}): ${input.description || 'No description'}`);
      });

    console.log('\nOptional Parameters:');
    detail.capability.metadata.inputs
      .filter(input => !input.required)
      .forEach(input => {
        const defaultVal = input.default !== undefined ? ` (default: ${input.default})` : '';
        console.log(`- ${input.name} (${input.type}): ${input.description || 'No description'}${defaultVal}`);
      });
  }
});
```
