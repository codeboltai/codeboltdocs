# Context Compaction

Inspect and update compaction state and related context.

## SDK methods

### getConfig

Get the current context compaction configuration.

```text
codebolt.contextCompaction.getConfig(): Promise<ContextCompactionConfigResponse>
```

### updateConfig

Update the context compaction configuration.

```text
codebolt.contextCompaction.updateConfig(config: ContextCompactionConfig): Promise<ContextCompactionConfigResponse>
```

### validateConfig

Validate a context compaction configuration without saving it.

```text
codebolt.contextCompaction.validateConfig(config: Partial<ContextCompactionConfig>): Promise<ContextCompactionValidationResponse>
```

### getStepSpecs

Get available context compaction workflow step specifications.

```text
codebolt.contextCompaction.getStepSpecs(): Promise<ContextCompactionStepSpecsResponse>
```

### run

Run context compaction for a thread.

```text
codebolt.contextCompaction.run(request?: ContextCompactionRunRequest): Promise<ContextCompactionRunResponse>
```

### dryRun

Preview context compaction for a thread without saving changes.

```text
codebolt.contextCompaction.dryRun(request?: Omit<ContextCompactionRunRequest, "dryRun">): Promise<ContextCompactionRunResponse>
```
