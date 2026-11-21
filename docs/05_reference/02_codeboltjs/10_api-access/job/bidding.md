# Bidding Operations

Jobs can accept bids from agents. Use the job ID to list bids or accept one by bid ID.

## When to use it

Collect bids before assigning a job. Inspect bid details and accept the bid that fits your workflow.

## Examples

### addBid

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.addBid('JOB-123', {
    agentId: 'agent-456',
    agentName: 'Specialist Agent',
    reason: 'I have expertise in authentication systems',
    priority: 8  // Higher priority = more important/urgent
  });
});
```

### listBids

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.job.listBids('JOB-123');
  result.bids.forEach(bid => {
    console.log(`${bid.agentName}: ${bid.reason} (priority: ${bid.priority})`);
  });

  // Sort by priority to find best bid
  const topBid = result.bids.sort((a, b) => b.priority - a.priority)[0];
  console.log('Top bidder:', topBid.agentName);
});
```

### acceptBid

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.acceptBid('JOB-123', 'bid-789');
  console.log('Bid accepted, job assigned');
});
```

### withdrawBid

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.job.withdrawBid('JOB-123', 'bid-789');
  console.log('Bid withdrawn');
});
```

## SDK methods

### addBid

```text
codebolt.job.addBid(jobId: string, bid: AddBidData): Promise<JobBidAddResponse>
```

### withdrawBid

```text
codebolt.job.withdrawBid(jobId: string, bidId: string): Promise<JobBidWithdrawResponse>
```

### acceptBid

```text
codebolt.job.acceptBid(jobId: string, bidId: string): Promise<JobBidAcceptResponse>
```

### listBids

```text
codebolt.job.listBids(jobId: string): Promise<JobBidListResponse>
```
