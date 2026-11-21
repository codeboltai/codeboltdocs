# Environments

Inspect and manage environments, providers, and environment runtimes.

Queries target Codebolt’s environment service. Use [Computer Use](../computerUse/index.md) when you need to interact with the desktop in the connected environment.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.environment.listEnvironments();
  console.log(response);
});
```

## SDK methods

### listEnvironments

```text
codebolt.environment.listEnvironments(): Promise<EnvironmentServiceResponse<{ environments: Environment[]; }>>
```

### lazyRequest

```text
codebolt.environment.lazyRequest<T = unknown>(action: string, params?: Record<string, unknown>): Promise<EnvironmentServiceResponse<T>>
```

### listLazyRuntimes

```text
codebolt.environment.listLazyRuntimes(params?: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### getLazyRuntime

```text
codebolt.environment.getLazyRuntime(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### startLazyRuntime

```text
codebolt.environment.startLazyRuntime(params?: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### stopLazyRuntime

```text
codebolt.environment.stopLazyRuntime(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### listLazyThreads

```text
codebolt.environment.listLazyThreads(params?: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### getLazyThread

```text
codebolt.environment.getLazyThread(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### getLazyThreadMessages

```text
codebolt.environment.getLazyThreadMessages(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### attachLazyThread

```text
codebolt.environment.attachLazyThread(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### detachLazyThread

```text
codebolt.environment.detachLazyThread(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### sendLazyThreadMessage

```text
codebolt.environment.sendLazyThreadMessage(params: Record<string, unknown>): Promise<EnvironmentServiceResponse<unknown>>
```

### getEnvironment

```text
codebolt.environment.getEnvironment(environmentId: string): Promise<EnvironmentServiceResponse<{ environment: Environment; }>>
```

### createEnvironment

```text
codebolt.environment.createEnvironment(environmentData: CreateEnvironmentRequest): Promise<EnvironmentServiceResponse<{ environment: Environment; }>>
```

### updateEnvironment

```text
codebolt.environment.updateEnvironment(environmentId: string, updateData: UpdateEnvironmentRequest): Promise<EnvironmentServiceResponse<{ environment: Environment; }>>
```

### deleteEnvironment

```text
codebolt.environment.deleteEnvironment(environmentId: string): Promise<EnvironmentServiceResponse>
```

### mergeAndCloseEnvironment

```text
codebolt.environment.mergeAndCloseEnvironment(environmentId: string): Promise<EnvironmentServiceResponse<MergeAndCloseEnvironmentResult>>
```

### startEnvironment

```text
codebolt.environment.startEnvironment(environmentId: string): Promise<EnvironmentServiceResponse>
```

### stopEnvironment

```text
codebolt.environment.stopEnvironment(environmentId: string): Promise<EnvironmentServiceResponse>
```

### restartEnvironment

```text
codebolt.environment.restartEnvironment(environmentId: string): Promise<EnvironmentServiceResponse>
```

### getEnvironmentStatus

```text
codebolt.environment.getEnvironmentStatus(environmentId: string): Promise<EnvironmentServiceResponse<EnvironmentRuntimeStatus>>
```

### getEnvironmentScreenStatus

```text
codebolt.environment.getEnvironmentScreenStatus(environmentId: string): Promise<EnvironmentServiceResponse<{ status: EnvironmentScreenStatus; }>>
```

### captureEnvironmentScreen

```text
codebolt.environment.captureEnvironmentScreen(environmentId: string): Promise<EnvironmentServiceResponse<{ capture: EnvironmentScreenCapture; }>>
```

### createEnvironmentScreenSession

```text
codebolt.environment.createEnvironmentScreenSession(environmentId: string): Promise<EnvironmentServiceResponse<{ session: EnvironmentScreenSession; }>>
```

### computerUse

```text
codebolt.environment.computerUse(environmentId: string, request: ComputerUseRequest): Promise<EnvironmentServiceResponse<{ result: ComputerUseResult; }>>
```

### getRunningProviders

```text
codebolt.environment.getRunningProviders(): Promise<EnvironmentServiceResponse<{ providers: string[]; }>>
```

### getLocalProviders

```text
codebolt.environment.getLocalProviders(): Promise<EnvironmentServiceResponse<{ providers: ProviderData[]; }>>
```

### getRunnerProviders

```text
codebolt.environment.getRunnerProviders(): Promise<EnvironmentServiceResponse<{ providers: ProviderData[]; }>>
```

### getEnvironmentHierarchy

```text
codebolt.environment.getEnvironmentHierarchy(): Promise<EnvironmentServiceResponse<EnvironmentHierarchyData>>
```

### getEnvironmentProviderHierarchy

```text
codebolt.environment.getEnvironmentProviderHierarchy(): Promise<EnvironmentServiceResponse<EnvironmentProviderHierarchyData>>
```

### getEnvironmentStatistics

```text
codebolt.environment.getEnvironmentStatistics(): Promise<EnvironmentServiceResponse<{ statistics: Record<string, unknown>; }>>
```

### sendMessageToEnvironment

```text
codebolt.environment.sendMessageToEnvironment(environmentId: string, message: unknown): Promise<EnvironmentServiceResponse>
```

### startAgentInEnvironment

```text
codebolt.environment.startAgentInEnvironment(environmentId: string, task: string, agentId?: string, threadId?: string): Promise<EnvironmentServiceResponse>
```
