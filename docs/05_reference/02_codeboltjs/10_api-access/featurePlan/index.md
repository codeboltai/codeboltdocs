# Feature Plan

Create and maintain feature plan documents and their sections.

The SDK identifies feature plans by file path for reads and edits. Pass a file name to `create` and the plan path to `get`, `update`, and section operations.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.featurePlan.list();
  console.log(result);
});
```

## SDK methods

### create

Create a new feature plan file.

```text
codebolt.featurePlan.create(fileName: string): Promise<FeaturePlanCreateResponse>
```

### get

Get a feature plan by file path.

```text
codebolt.featurePlan.get(filePath: string): Promise<FeaturePlanGetResponse>
```

### update

Update a feature plan.

```text
codebolt.featurePlan.update(filePath: string, content: string | FeaturePlanDocument): Promise<FeaturePlanUpdateResponse>
```

### list

List all feature plans in the project.

```text
codebolt.featurePlan.list(): Promise<FeaturePlanListResponse>
```

### addSection

Add a section to a feature plan.

```text
codebolt.featurePlan.addSection(filePath: string, section: Omit<FeaturePlanSection, "id" | "order">, afterIndex?: number): Promise<FeaturePlanSectionResponse>
```

### updateSection

Update a section in a feature plan.

```text
codebolt.featurePlan.updateSection(filePath: string, sectionId: string, updates: Partial<FeaturePlanSection>): Promise<FeaturePlanSectionResponse>
```

### removeSection

Remove a section from a feature plan.

```text
codebolt.featurePlan.removeSection(filePath: string, sectionId: string): Promise<FeaturePlanSectionResponse>
```

### reorderSections

Reorder sections in a feature plan.

```text
codebolt.featurePlan.reorderSections(filePath: string, sectionIds: string[]): Promise<FeaturePlanSectionResponse>
```

### review

Request a review for a feature plan.

```text
codebolt.featurePlan.review(filePath: string): Promise<FeaturePlanReviewResponse>
```
