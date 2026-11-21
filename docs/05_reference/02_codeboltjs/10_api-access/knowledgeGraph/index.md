# Knowledge Graph

Manage graph records and query relationships.

## Create a graph from an existing template

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const instance = await codebolt.knowledgeGraph.createInstance({
    templateId: 'template-id',
    name: 'Project dependencies',
  });

  if (!instance.success || !instance.data) {
    throw new Error(instance.error ?? 'Could not create the graph.');
  }
  console.log('Graph instance ID', instance.data.id);
});
```

## When to use it

Model project relationships by creating a template and a graph instance. Add or query records in the instance as your data grows.

## SDK methods

### createInstanceTemplate

[`createInstanceTemplate`](createInstanceTemplate.md) · Create a new instance template.

### getInstanceTemplate

Get an instance template by ID.

```text
codebolt.knowledgeGraph.getInstanceTemplate(templateId: string): Promise<KGInstanceTemplateResponse>
```

### listInstanceTemplates

List all instance templates.

```text
codebolt.knowledgeGraph.listInstanceTemplates(): Promise<KGInstanceTemplateListResponse>
```

### updateInstanceTemplate

Update an instance template.

```text
codebolt.knowledgeGraph.updateInstanceTemplate(templateId: string, updates: Partial<CreateKGInstanceTemplateParams>): Promise<KGInstanceTemplateResponse>
```

### deleteInstanceTemplate

Delete an instance template.

```text
codebolt.knowledgeGraph.deleteInstanceTemplate(templateId: string): Promise<KGDeleteResponse>
```

### createInstance

[`createInstance`](createInstance.md) · Create a new knowledge graph instance.

### getInstance

Get an instance by ID.

```text
codebolt.knowledgeGraph.getInstance(instanceId: string): Promise<KGInstanceResponse>
```

### listInstances

List instances, optionally filtered by template.

```text
codebolt.knowledgeGraph.listInstances(templateId?: string): Promise<KGInstanceListResponse>
```

### deleteInstance

Delete an instance.

```text
codebolt.knowledgeGraph.deleteInstance(instanceId: string): Promise<KGDeleteResponse>
```

### addMemoryRecord

[`addMemoryRecord`](addMemoryRecord.md) · Add a memory record to an instance.

### addMemoryRecords

Add multiple memory records to an instance.

```text
codebolt.knowledgeGraph.addMemoryRecords(instanceId: string, records: CreateKGMemoryRecordParams[]): Promise<KGMemoryRecordListResponse>
```

### getMemoryRecord

Get a memory record by ID.

```text
codebolt.knowledgeGraph.getMemoryRecord(instanceId: string, recordId: string): Promise<KGMemoryRecordResponse>
```

### listMemoryRecords

List memory records in an instance.

```text
codebolt.knowledgeGraph.listMemoryRecords(instanceId: string, filters?: ListKGMemoryRecordsParams): Promise<KGMemoryRecordListResponse>
```

### updateMemoryRecord

Update a memory record.

```text
codebolt.knowledgeGraph.updateMemoryRecord(instanceId: string, recordId: string, updates: Partial<CreateKGMemoryRecordParams>): Promise<KGMemoryRecordResponse>
```

### deleteMemoryRecord

Delete a memory record.

```text
codebolt.knowledgeGraph.deleteMemoryRecord(instanceId: string, recordId: string): Promise<KGDeleteResponse>
```

### addEdge

Add an edge to an instance.

```text
codebolt.knowledgeGraph.addEdge(instanceId: string, edge: CreateKGEdgeParams): Promise<KGEdgeResponse>
```

### addEdges

Add multiple edges to an instance.

```text
codebolt.knowledgeGraph.addEdges(instanceId: string, edges: CreateKGEdgeParams[]): Promise<KGEdgeListResponse>
```

### listEdges

List edges in an instance.

```text
codebolt.knowledgeGraph.listEdges(instanceId: string, filters?: ListKGEdgesParams): Promise<KGEdgeListResponse>
```

### deleteEdge

Delete an edge.

```text
codebolt.knowledgeGraph.deleteEdge(instanceId: string, edgeId: string): Promise<KGDeleteResponse>
```

### createViewTemplate

Create a view template.

```text
codebolt.knowledgeGraph.createViewTemplate(config: CreateKGViewTemplateParams): Promise<KGViewTemplateResponse>
```

### getViewTemplate

Get a view template by ID.

```text
codebolt.knowledgeGraph.getViewTemplate(templateId: string): Promise<KGViewTemplateResponse>
```

### listViewTemplates

List view templates.

```text
codebolt.knowledgeGraph.listViewTemplates(applicableTemplateId?: string): Promise<KGViewTemplateListResponse>
```

### updateViewTemplate

Update a view template.

```text
codebolt.knowledgeGraph.updateViewTemplate(templateId: string, updates: Partial<CreateKGViewTemplateParams>): Promise<KGViewTemplateResponse>
```

### deleteViewTemplate

Delete a view template.

```text
codebolt.knowledgeGraph.deleteViewTemplate(templateId: string): Promise<KGDeleteResponse>
```

### createView

Create a view.

```text
codebolt.knowledgeGraph.createView(config: CreateKGViewParams): Promise<KGViewResponse>
```

### listViews

List views for an instance.

```text
codebolt.knowledgeGraph.listViews(instanceId: string): Promise<KGViewListResponse>
```

### executeView

Execute a view query.

```text
codebolt.knowledgeGraph.executeView(viewId: string): Promise<KGViewExecuteResponse>
```

### deleteView

Delete a view.

```text
codebolt.knowledgeGraph.deleteView(viewId: string): Promise<KGDeleteResponse>
```
