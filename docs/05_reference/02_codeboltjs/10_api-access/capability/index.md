# Capability

Register, find, and manage capabilities.

## When to use it

Discover installed skills, powers, and talents, inspect their declared inputs, then track an execution using its returned ID.

## Examples

### Discovering Capabilities

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List all capabilities
  const allCapabilities = await codebolt.capability.listCapabilities();

  // Filter by type
  const skills = await codebolt.capability.listSkills();

  // Filter by tag
  const aiCapabilities = await codebolt.capability.getCapabilitiesByTag('ai');

  // Filter by author
  const myCapabilities = await codebolt.capability.getCapabilitiesByAuthor('developer-name');
});
```

### Executing Capabilities

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a skill with parameters
  const result = await codebolt.capability.startSkill(
    'image-resizer',
    { width: 800, height: 600, quality: 90 }
  );

  // Execute with custom timeout
  const longRunning = await codebolt.capability.startPower(
    'data-processor',
    { source: 'large-dataset.csv' },
    120000 // 2 minutes
  );
});
```

## SDK methods

### listCapabilities

[`listCapabilities`](listCapabilities.md) · List all available capabilities with optional filtering.

### listCapabilitiesByType

List capabilities by type.

```text
codebolt.capability.listCapabilitiesByType(capabilityType: CapabilityType): Promise<ListCapabilitiesResponse>
```

### listSkills

[`listSkills`](listSkills.md) · List all available skills.

### listPowers

[`listPowers`](listPowers.md) · List all available powers.

### listTalents

[`listTalents`](listTalents.md) · List all available talents.

### getCapabilityDetail

[`getCapabilityDetail`](getCapabilityDetail.md) · Get detailed information about a specific capability.

### listExecutors

[`listExecutors`](listExecutors.md) · List all available capability executors.

### startCapability

[`startCapability`](startCapability.md) · Start a capability execution.

### startSkill

[`startSkill`](startSkill.md) · Start a skill execution.

### startPower

[`startPower`](startPower.md) · Start a power execution.

### startTalent

[`startTalent`](startTalent.md) · Start a talent execution.

### stopCapability

[`stopCapability`](stopCapability.md) · Stop a running capability execution.

### getExecutionStatus

[`getExecutionStatus`](getExecutionStatus.md) · Get the status of a capability execution.

### getCapabilitiesByTag

[`getCapabilitiesByTag`](getCapabilitiesByTag.md) · Get capabilities by tag.

### getCapabilitiesByAuthor

[`getCapabilitiesByAuthor`](getCapabilitiesByAuthor.md) · Get capabilities by author.
