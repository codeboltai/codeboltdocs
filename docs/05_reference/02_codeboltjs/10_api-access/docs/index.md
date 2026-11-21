# Documentation

Search Codebolt documentation and retrieve SDK specifications and knowledge entries.

The documentation SDK provides search, specification lookup, and cache management. `knowledgeSearch` and `knowledgeGet` work with the documentation knowledge collection.

## SDK methods

### search

```text
codebolt.docs.search(params: DocsSearchParams): Promise<DocsToolResponse<unknown>>
```

### knowledgeSearch

```text
codebolt.docs.knowledgeSearch(params: DocsKnowledgeSearchParams): Promise<DocsToolResponse<unknown>>
```

### knowledgeGet

```text
codebolt.docs.knowledgeGet(params: DocsKnowledgeGetParams): Promise<DocsToolResponse<unknown>>
```

### knowledgeManifest

```text
codebolt.docs.knowledgeManifest(params?: DocsSourceParams): Promise<DocsToolResponse<unknown>>
```

### getSpec

```text
codebolt.docs.getSpec(params: DocsGetSpecParams): Promise<DocsToolResponse<unknown>>
```

### getModuleSpec

```text
codebolt.docs.getModuleSpec(params: DocsGetModuleSpecParams): Promise<DocsToolResponse<unknown>>
```

### getModuleDts

```text
codebolt.docs.getModuleDts(params: DocsGetModuleDtsParams): Promise<DocsToolResponse<unknown>>
```

### manifest

```text
codebolt.docs.manifest(params?: DocsSourceParams): Promise<DocsToolResponse<unknown>>
```

### cacheStatus

```text
codebolt.docs.cacheStatus(): Promise<DocsToolResponse<unknown>>
```

### downloadLatest

```text
codebolt.docs.downloadLatest(): Promise<DocsToolResponse<unknown>>
```

### clearCache

```text
codebolt.docs.clearCache(): Promise<DocsToolResponse<unknown>>
```
