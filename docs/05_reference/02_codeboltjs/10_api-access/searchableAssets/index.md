# Searchable Assets

Search registered assets and register agent-local runtime tools.

## SDK methods

### search

```text
codebolt.searchableAssets.search(query: string, options?: SearchableAssetsSearchOptions): Promise<SearchableAssetsSearchResponse>
```

### registerRuntimeTools

```text
codebolt.searchableAssets.registerRuntimeTools(runtimeToolSetId: string, tools: unknown[], options?: RuntimeToolSetOptions): Promise<SearchableAssetsResponse>
```

### unregisterRuntimeTools

```text
codebolt.searchableAssets.unregisterRuntimeTools(runtimeToolSetId: string): Promise<SearchableAssetsResponse>
```
