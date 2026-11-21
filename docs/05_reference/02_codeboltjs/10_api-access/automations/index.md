# Automations

Manage automation definitions and inspect their runs.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.automations.list();
  console.log(response);
});
```

## SDK methods

### list

```text
codebolt.automations.list(): Promise<IListAutomationsResponse>
```

### get

```text
codebolt.automations.get(params: IGetAutomationParams | string): Promise<IGetAutomationResponse>
```

### create

```text
codebolt.automations.create(config: ICreateAutomationParams): Promise<IAutomationResponse>
```

### update

```text
codebolt.automations.update(params: IUpdateAutomationParams | string, config?: Partial<Automation>): Promise<IAutomationResponse>
```

### delete

```text
codebolt.automations.delete(params: IDeleteAutomationParams | string): Promise<IAutomationResponse>
```

### enable

```text
codebolt.automations.enable(params: IDeleteAutomationParams | string): Promise<IAutomationResponse>
```

### disable

```text
codebolt.automations.disable(params: IDeleteAutomationParams | string): Promise<IAutomationResponse>
```

### run

```text
codebolt.automations.run(params: IRunAutomationParams | string): Promise<IRunAutomationResponse>
```

### runs

```text
codebolt.automations.runs(params: IListAutomationRunsParams | string): Promise<IListAutomationRunsResponse>
```
