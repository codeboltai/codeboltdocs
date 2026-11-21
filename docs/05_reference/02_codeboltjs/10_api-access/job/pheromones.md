# Pheromone Operations

Pheromone types define the signals jobs can carry. Agents can deposit or remove them and query the recorded or aggregated values.

## When to use it

Leave a typed signal about a job, such as interest or a risk discovered during review. Treat the signal as input to scheduling decisions.

## Examples

### getPheromoneTypes

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.getPheromoneTypes();
  console.log('Available types:', result.types);
  // [{ name: 'interested', displayName: 'Interest', color: '#4CAF50' }, ...]
});
```

### addPheromoneType

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.addPheromoneType({
    name: 'blocked',
    displayName: 'Blocked',
    description: 'Indicates the job is blocked',
    color: '#F44336'
  });
});
```

### removePheromoneType

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.removePheromoneType('blocked');
});
```

### depositPheromone

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.depositPheromone('JOB-123', {
    type: 'interested',
    intensity: 0.8,  // 0-1 range
    depositedBy: 'agent-456',
    depositedByName: 'Code Agent'
  });
});
```

### removePheromone

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Remove specific agent's pheromone
  await codebolt.job.removePheromone('JOB-123', 'interested', 'agent-456');

  // Remove all pheromones of a type (omit depositedBy)
  await codebolt.job.removePheromone('JOB-123', 'interested');
});
```

### getPheromones

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.getPheromones('JOB-123');
  result.pheromones.forEach(p => {
    console.log(`${p.type}: ${p.intensity} by ${p.depositedByName}`);
  });
});
```

### getPheromonesAggregated

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.getPheromonesAggregated('JOB-123');
  result.aggregations.forEach(agg => {
    console.log(`${agg.type}: total=${agg.totalIntensity}, count=${agg.count}`);
    console.log(`Depositors: ${agg.depositors.join(', ')}`);
  });
});
```

### listJobsByPheromone

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find all jobs with 'interested' pheromone
  const result = await codebolt.job.listJobsByPheromone('interested');

  // With minimum intensity filter
  const highInterest = await codebolt.job.listJobsByPheromone('interested', 0.7);
  console.log(`Found ${highInterest.totalCount} high-interest jobs`);
});
```

### getPheromonesWithDecay

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.getPheromonesWithDecay('JOB-123');
  // Intensities reflect time-based decay
});
```

### getPheromonesAggregatedWithDecay

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.getPheromonesAggregatedWithDecay('JOB-123');
  // Aggregations reflect decayed values
});
```

## SDK methods

### getPheromoneTypes

```text
codebolt.job.getPheromoneTypes(): Promise<JobPheromoneTypesResponse>
```

### addPheromoneType

```text
codebolt.job.addPheromoneType(data: AddPheromoneTypeData): Promise<JobPheromoneTypeResponse>
```

### removePheromoneType

```text
codebolt.job.removePheromoneType(name: string): Promise<JobPheromoneTypeResponse>
```

### depositPheromone

```text
codebolt.job.depositPheromone(jobId: string, deposit: DepositPheromoneData): Promise<JobPheromoneDepositResponse>
```

### removePheromone

```text
codebolt.job.removePheromone(jobId: string, type: string, depositedBy?: string): Promise<JobPheromoneRemoveResponse>
```

### getPheromones

```text
codebolt.job.getPheromones(jobId: string): Promise<JobPheromoneListResponse>
```

### getPheromonesAggregated

```text
codebolt.job.getPheromonesAggregated(jobId: string): Promise<JobPheromoneAggregatedResponse>
```

### listJobsByPheromone

```text
codebolt.job.listJobsByPheromone(type: string, minIntensity?: number): Promise<JobPheromoneSearchResponse>
```

### getPheromonesWithDecay

```text
codebolt.job.getPheromonesWithDecay(jobId: string): Promise<JobPheromoneListResponse>
```

### getPheromonesAggregatedWithDecay

```text
codebolt.job.getPheromonesAggregatedWithDecay(jobId: string): Promise<JobPheromoneAggregatedResponse>
```
