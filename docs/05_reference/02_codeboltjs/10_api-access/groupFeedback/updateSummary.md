---
name: updateSummary
cbbaseinfo:
  description: Updates the summary of a feedback session, consolidating key points and action items.
cbparameters:
  parameters:
    - name: params
      typeName: IUpdateSummaryParams
      description: Parameters including feedbackId and the new summary content.
  returns:
    signatureTypeName: "Promise<IUpdateSummaryResponse>"
    description: A promise that resolves with the updated summary.
data:
  name: updateSummary
  category: groupFeedback
  link: updateSummary.md
---
# updateSummary

```typescript
codebolt.groupFeedback.updateSummary(params: IUpdateSummaryParams): Promise<IUpdateSummaryResponse>
```

Updates the summary of a feedback session, consolidating key points and action items.
### Parameters

- **`params`** ([IUpdateSummaryParams](/docs/reference/codeboltjs/type-reference/codeboltjs/interfaces/IUpdateSummaryParams)): Parameters including feedbackId and the new summary content.

### Returns

- **`Promise<[IUpdateSummaryResponse](/docs/reference/codeboltjs/type-reference/codeboltjs/interfaces/IUpdateSummaryResponse)>`**: A promise that resolves with the updated summary.

### Examples

#### Example 1: Update Feedback Summary

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.groupFeedback.updateSummary({
    feedbackId: 'feedback-123',
    summary: `Key Points:
- Code structure is well-organized
- Security concerns addressed
- Performance improvements suggested

Action Items:
1. Add rate limiting (assigned to John)
2. Implement caching (assigned to Sarah)
3. Add unit tests (assigned to Mike)`
  });

  console.log('Summary updated');
});
```

### Common Use Cases

- **Consolidate Feedback**: Summarize key points
- **Action Items**: Document action items and assignments
- **Meeting Notes**: Create meeting summaries

### Notes

- Useful for closing feedback loops
- Can be updated multiple times
- AI-generated summaries can be customized
