# Context Compaction

Use `codebolt.contextCompaction` in a connected agent to read project profiles, preview changes to a context thread, or apply a saved profile.

## SDK methods

### getConfig

Get the current context compaction configuration.

```text
codebolt.contextCompaction.getConfig(): Promise<ContextCompactionConfigResponse>
```

### updateConfig

Save a complete project configuration. Read the current configuration from `getConfig()` under `data.config` before editing its profiles.

```text
codebolt.contextCompaction.updateConfig(config: ContextCompactionConfig): Promise<ContextCompactionConfigResponse>
```

### validateConfig

Inspect `data.validation.valid`, `errors`, and `warnings` before saving.

```text
codebolt.contextCompaction.validateConfig(config: Partial<ContextCompactionConfig>): Promise<ContextCompactionValidationResponse>
```

### getStepSpecs

Read `data.specs` for the available workflow steps, their labels, and their parameters.

```text
codebolt.contextCompaction.getStepSpecs(): Promise<ContextCompactionStepSpecsResponse>
```

### run

Pass `threadId` to select a context thread and optionally `profileId` to select a saved profile. If you omit `threadId`, the server tries to resolve it from the current message. Check both the response’s `success` and `data.result.success`. When `data.result.deferred` is true, inspect `deferredReason` before treating the run as complete.

```text
codebolt.contextCompaction.run(request?: ContextCompactionRunRequest): Promise<ContextCompactionRunResponse>
```

### dryRun

Execute the workflow without writing its result to the thread. A completed preview returns `data.result.preview`, `stats`, and `stepResults` inside the run result.

```text
codebolt.contextCompaction.dryRun(request?: Omit<ContextCompactionRunRequest, "dryRun">): Promise<ContextCompactionRunResponse>
```

See the [agent preview example](../../../../04_build-on-codebolt/07a_memory-management/02h_context-compaction.md) for result handling.
